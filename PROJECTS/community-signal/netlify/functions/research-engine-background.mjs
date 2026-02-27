/**
 * research-engine.mjs
 * HitLoop: Self-improving research engine
 *
 * Scheduled function — runs daily at 3am AWST (19:00 UTC previous day).
 * 
 * Flow:
 *   1. READ: Top N research topics from research_strategy (by priority_weight * score_avg)
 *   2. GENERATE: For each topic, Claude generates sector intelligence research
 *   3. INGEST: Push research → signal-ingest → filter → scored/tagged/stored
 *   4. GRADE: Read back signal scores from Supabase
 *   5. EVOLVE: Update research_strategy scores, retire low performers, seed new topics
 *
 * Two input sources feed research_strategy:
 *   - System-generated: from high-scoring signals + constellation patterns
 *   - Mob Field Reports: human-submitted via [FIELD] email prefix
 *
 * Env vars required:
 *   ANTHROPIC_API_KEY
 *   SUPABASE_URL
 *   SUPABASE_SERVICE_ROLE_KEY
 *   INGEST_SECRET
 *   URL (set automatically by Netlify)
 */

import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const supabase  = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const INGEST_SECRET = process.env.INGEST_SECRET;
const INGEST_URL = process.env.URL
  ? `${process.env.URL}/.netlify/functions/signal-ingest`
  : 'http://localhost:8888/.netlify/functions/signal-ingest';

const DAILY_RESEARCH_LIMIT = 5; // Lean setting: 5 prompts/day (~$0.15/day)

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'POST only' }) };
  }

  // Auth: require INGEST_SECRET
  const secret = event.headers['x-ingest-secret'];
  if (secret !== INGEST_SECRET) {
    return { statusCode: 401, body: JSON.stringify({ error: 'Unauthorized' }) };
  }
  console.log('research-engine: HitLoop starting');
  const startTime = Date.now();

  try {
    // Step 1: Select top N research topics
    const topics = await selectTopics();
    if (topics.length === 0) {
      console.log('research-engine: No active topics — seeding initial strategies');
      await seedInitialStrategies();
      return { statusCode: 200, body: JSON.stringify({ seeded: true }) };
    }

    console.log(`research-engine: Running ${topics.length} research topics`);

    // Step 2-4: For each topic, research → ingest → grade
    const results = [];
    for (const topic of topics) {
      const result = await runResearchCycle(topic);
      results.push(result);
      await sleep(2000); // Rate limiting courtesy
    }

    // Step 5: Evolve — update scores, retire low performers, seed new topics
    await evolveStrategies();

    const duration = Date.now() - startTime;
    console.log(`research-engine: Complete in ${duration}ms. Results:`, results);

    return {
      statusCode: 200,
      body: JSON.stringify({
        topics_run: results.length,
        total_signals: results.reduce((sum, r) => sum + r.signals_generated, 0),
        duration_ms: duration,
      }),
    };

  } catch (err) {
    console.error('research-engine: Fatal error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};

// ── Step 1: Select top N topics ───────────────────────────────────────────

async function selectTopics() {
  const { data, error } = await supabase
    .from('research_strategy')
    .select('*')
    .eq('status', 'active')
    .order('priority_weight', { ascending: false })
    .order('score_avg', { ascending: false })
    .limit(DAILY_RESEARCH_LIMIT);

  if (error) throw new Error(`Failed to select topics: ${error.message}`);
  return data || [];
}

// ── Step 2-4: Research → Ingest → Grade ───────────────────────────────────

async function runResearchCycle(topic) {
  const runStart = Date.now();
  console.log(`research-engine: Running topic "${topic.topic}"`);

  try {
    // Step 2: Generate research content via Claude
    const research = await generateResearch(topic);

    // Step 3: Ingest research → signal-filter pipeline
    const ingestResult = await ingestResearch(topic, research);

    // Step 4: Grade — read back signal scores (wait 5s for filter to complete)
    await sleep(5000);
    const avgScore = await gradeResearch(topic, research);

    // Log the run
    const duration = Date.now() - runStart;
    await logRun(topic.id, topic.prompt_template, ingestResult.queued || 0, avgScore, duration, 'success');

    // Update strategy score
    if (avgScore !== null) {
      await supabase.rpc('update_research_strategy_score', {
        p_strategy_id: topic.id,
        p_new_avg_score: avgScore,
      });
    }

    return {
      topic: topic.topic,
      signals_generated: ingestResult.queued || 0,
      avg_score: avgScore,
      status: 'success',
    };

  } catch (err) {
    console.error(`research-engine: Topic "${topic.topic}" failed:`, err.message);
    await logRun(topic.id, topic.prompt_template, 0, null, Date.now() - runStart, 'failure', err.message);
    return {
      topic: topic.topic,
      signals_generated: 0,
      avg_score: null,
      status: 'failure',
      error: err.message,
    };
  }
}

// ── Generate research via Claude ──────────────────────────────────────────

async function generateResearch(topic) {
  const systemPrompt = `You are a community sector intelligence researcher for Western Australia.
Your job is to generate targeted research reports on specific topics relevant to WA community sector organisations.

Current research topic: ${topic.topic}
Source: ${topic.source_type === 'mob_field' ? 'Human field report (high priority)' : 'System-generated'}

Generate a research report that:
- Focuses specifically on WA community sector implications
- Identifies actionable insights for small NFPs
- Highlights funding opportunities, policy changes, or sector trends
- Cites real organisations, programs, or initiatives where possible
- Is 300-800 words (enough for signal extraction, not too verbose)`;

  const userPrompt = topic.prompt_template;

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1500,
    messages: [{ role: 'user', content: userPrompt }],
    system: systemPrompt,
  });

  return message.content[0]?.text || '';
}

// ── Ingest research → signal-filter ───────────────────────────────────────

async function ingestResearch(topic, research) {
  const res = await fetch(INGEST_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-ingest-secret': INGEST_SECRET,
    },
    body: JSON.stringify({
      source_type: 'research',
      source_name: `HitLoop Research: ${topic.topic}`,
      source_attribution: `Automated research engine — topic: ${topic.topic}`,
      content: research,
    }),
  });

  if (!res.ok) {
    const err = await res.text().catch(() => res.status);
    throw new Error(`Ingest failed: ${res.status} ${err}`);
  }

  return await res.json();
}

// ── Grade research by reading back signal scores ──────────────────────────

async function gradeResearch(topic, research) {
  // Find signals created in the last 10 seconds with matching source_name
  const { data, error } = await supabase
    .from('sector_signals')
    .select('average_score')
    .ilike('source_name', `%${topic.topic}%`)
    .gte('created_at', new Date(Date.now() - 10000).toISOString())
    .order('created_at', { ascending: false })
    .limit(5);

  if (error || !data || data.length === 0) return null;

  const scores = data.map(s => s.average_score);
  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
}

// ── Log research run ──────────────────────────────────────────────────────

async function logRun(strategyId, promptUsed, signalsGenerated, avgScore, durationMs, status, errorMessage = null) {
  const { error } = await supabase.from('research_runs').insert({
    strategy_id: strategyId,
    prompt_used: promptUsed,
    signals_generated: signalsGenerated,
    avg_score: avgScore,
    duration_ms: durationMs,
    status,
    error_message: errorMessage,
  });

  if (error) {
    console.error('research_runs insert failed:', error.message);
  }
}

// ── Step 5: Evolve strategies ─────────────────────────────────────────────

async function evolveStrategies() {
  // Retire strategies with score < 4.0 after 5+ runs
  const { error: retireError } = await supabase
    .from('research_strategy')
    .update({ status: 'retired', updated_at: new Date().toISOString() })
    .eq('status', 'active')
    .lt('score_avg', 4.0)
    .gte('run_count', 5);

  if (retireError) {
    console.error('Failed to retire low performers:', retireError.message);
  }

  // Seed new system-generated topics from constellation hot spots
  await seedFromConstellation();
}

// ── Seed new topics from constellation patterns ───────────────────────────

async function seedFromConstellation() {
  // Find top 3 tag pairs with highest co-occurrence
  const { data, error } = await supabase
    .from('sector_constellation')
    .select('tag_a, tag_b, co_occurrence_count')
    .order('co_occurrence_count', { ascending: false })
    .limit(3);

  if (error || !data || data.length === 0) return;

  for (const pair of data) {
    const topic = `${pair.tag_a}+${pair.tag_b}`;
    
    // Check if topic already exists
    const { data: existing } = await supabase
      .from('research_strategy')
      .select('id')
      .eq('topic', topic)
      .single();

    if (existing) continue; // Already tracked

    // Create new strategy
    const promptTemplate = `Research the intersection of ${pair.tag_a} and ${pair.tag_b} in the Western Australian community sector. Focus on recent developments, funding opportunities, policy changes, and practical implications for small NFPs. Identify specific organisations, programs, or initiatives operating in this space.`;

    await supabase.from('research_strategy').insert({
      topic,
      source_type: 'system',
      prompt_template: promptTemplate,
      score_avg: 5.0,
      priority_weight: 1.0,
      status: 'active',
      notes: `Auto-generated from constellation pattern (${pair.co_occurrence_count} co-occurrences)`,
    });

    console.log(`research-engine: Seeded new topic from constellation: ${topic}`);
  }
}

// ── Seed initial strategies (first run) ───────────────────────────────────

async function seedInitialStrategies() {
  const initialTopics = [
    {
      topic: 'funding+governance',
      prompt_template: 'Research recent changes to community sector funding models and governance requirements in WA. Focus on grant compliance, acquittal burden, and new funding opportunities.',
    },
    {
      topic: 'digital-tools+workforce',
      prompt_template: 'Investigate digital tool adoption challenges and workforce capacity in WA community organisations. Identify training programs, digital inclusion initiatives, and tech support services.',
    },
    {
      topic: 'housing+health-wellbeing',
      prompt_template: 'Explore the intersection of housing crisis and health/wellbeing services in WA. Focus on homelessness support, affordable housing advocacy, and mental health impacts.',
    },
  ];

  for (const topic of initialTopics) {
    await supabase.from('research_strategy').insert({
      topic: topic.topic,
      source_type: 'system',
      prompt_template: topic.prompt_template,
      score_avg: 5.0,
      priority_weight: 1.0,
      status: 'active',
      notes: 'Initial seed topic',
    });
  }

  console.log('research-engine: Seeded 3 initial strategies');
}

// ── Util ──────────────────────────────────────────────────────────────────

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
