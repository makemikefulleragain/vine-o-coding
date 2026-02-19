// THE KITCHEN TABLE — compose.js
// Quick compose modal — email drafts + notes

const TEMPLATES = {
  'peak-body': (name, context) => `To: ${name}
Subject: Kamunity — Free Digital Tools for Community Organisations

Hi ${name.split(' ')[0]},

I'm Mike from Kamunity. We build free, constitutionally-grounded digital tools for community organisations — AI readiness assessments, digital sovereignty audits, and practical toolkits used by frontline workers.

${context ? context + '\n\n' : ''}I'd love to show you what we've built and explore whether it might serve your members. Would you have 20 minutes for a quick demo?

Warm regards,
Mike Fuller
Kamunity · kamunity.org`,

  'workshop': (name, context) => `To: ${name}
Subject: Workshop Collaboration — AI for Community Organisations

Hi ${name.split(' ')[0]},

I'm Mike from Kamunity. We run AI readiness and digital sovereignty workshops for community organisations.

${context ? context + '\n\n' : ''}I'd love to explore a collaboration — whether that's co-facilitation, a revenue share arrangement, or simply connecting our communities. Would you be open to a 20-minute conversation?

Warm regards,
Mike Fuller
Kamunity · kamunity.org`,

  'grant-reviewer': (name, context) => `To: ${name}
Subject: NLnet Application — Peer Review Request

Hi ${name.split(' ')[0]},

I'm Mike from Kamunity. I'm preparing a submission to NLnet NGI Zero Commons and would value your perspective as someone with experience in this space.

${context ? context + '\n\n' : ''}Would you be willing to review a draft application? Estimated time: 30–45 minutes. I'm happy to reciprocate in kind.

Warm regards,
Mike Fuller
Kamunity · kamunity.org`,

  'conference': (name, context) => `To: ${name}
Subject: Conference Proposal — Constitutional AI for Community Organisations

Hi ${name.split(' ')[0]},

I'm Mike from Kamunity. I'm submitting a speaker proposal on constitutional AI in community settings and wanted to make a personal connection first.

${context ? context + '\n\n' : ''}Our work sits at the intersection of digital sovereignty, community infrastructure, and practical AI ethics. I'd love to connect about shared interests.

Warm regards,
Mike Fuller
Kamunity · kamunity.org`,

  'default': (name, context) => `To: ${name}
Subject: Kamunity — Community Digital Sovereignty Tools

Hi ${name.split(' ')[0]},

I'm Mike from Kamunity. We build free, community-owned digital tools for community organisations.

${context ? context + '\n\n' : ''}I'd love to show you what we've built. Would you have 20 minutes for a quick demo?

Warm regards,
Mike Fuller
Kamunity · kamunity.org`,
};

export function initCompose() {
  // Inject FAB + modal into body
  const el = document.createElement('div');
  el.innerHTML = `
<button class="fab" id="fab-btn" onclick="KT.toggleCM()" title="Quick compose" aria-label="Quick compose">✏️</button>
<div class="cm" id="cm" role="dialog" aria-modal="true" aria-label="Quick compose">
  <h3>Quick Action</h3>
  <div class="cm-row">
    <select id="c-type" aria-label="Type">
      <option value="email">✉ Draft Email</option>
      <option value="note">📝 Quick Note</option>
    </select>
    <select id="c-template" aria-label="Template style">
      <option value="default">General</option>
      <option value="peak-body">Peak Body Intro</option>
      <option value="workshop">Workshop Offer</option>
      <option value="grant-reviewer">Grant Reviewer Ask</option>
      <option value="conference">Conference Proposal</option>
    </select>
  </div>
  <input id="c-to" placeholder="To / Subject…" aria-label="To or subject">
  <textarea id="c-body" placeholder="Context or key points…" aria-label="Body context"></textarea>
  <div class="btn-row">
    <button class="btn btn-primary" onclick="KT.genCompose()">Generate</button>
    <button class="btn btn-ghost" onclick="KT.cpCompose()">Copy</button>
    <button class="btn btn-ghost" onclick="KT.toggleCM()">Close</button>
  </div>
  <pre id="c-out" aria-live="polite"></pre>
</div>`;
  document.body.appendChild(el);

  window.KT = window.KT || {};

  window.KT.toggleCM = function() {
    const cm = document.getElementById('cm');
    const isOpen = cm.classList.toggle('open');
    document.getElementById('c-out').textContent = '';
    if (isOpen) document.getElementById('c-to').focus();
  };

  window.KT.openCM = function(name, type) {
    const cm = document.getElementById('cm');
    cm.classList.add('open');
    document.getElementById('c-type').value = 'email';
    if (type) document.getElementById('c-template').value = type;
    document.getElementById('c-to').value = name || '';
    document.getElementById('c-body').value = '';
    document.getElementById('c-out').textContent = '';
    document.getElementById('c-body').focus();
  };

  window.KT.genCompose = function() {
    const type = document.getElementById('c-type').value;
    const tmpl = document.getElementById('c-template').value;
    const to   = document.getElementById('c-to').value.trim();
    const body = document.getElementById('c-body').value.trim();
    const out  = document.getElementById('c-out');
    if (type === 'email') {
      const fn = TEMPLATES[tmpl] || TEMPLATES['default'];
      out.textContent = '--- DRAFT ---\n\n' + fn(to || 'there', body);
    } else {
      out.textContent = `Note — ${new Date().toLocaleString('en-AU')}\n${ to ? to + '\n' : ''}${body}`;
    }
  };

  window.KT.cpCompose = function() {
    const t = document.getElementById('c-out').textContent;
    if (!t) return;
    navigator.clipboard.writeText(t).then(() => {
      document.getElementById('c-out').textContent += '\n\n✓ Copied to clipboard';
    }).catch(() => {
      document.getElementById('c-out').textContent += '\n\n(Select all above and copy manually)';
    });
  };

  // Close on backdrop click
  document.addEventListener('click', e => {
    const cm = document.getElementById('cm');
    const fab = document.getElementById('fab-btn');
    if (cm && cm.classList.contains('open') && !cm.contains(e.target) && e.target !== fab) {
      cm.classList.remove('open');
    }
  });
}
