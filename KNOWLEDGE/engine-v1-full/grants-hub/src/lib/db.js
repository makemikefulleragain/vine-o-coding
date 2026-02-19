import { supabase } from './supabase';

function dbGrantToLocal(g, cats, exps) {
  return {
    _dbId: g.id, id: g.id,
    funder: g.funder || '', grantName: g.grant_name || '',
    amount: parseFloat(g.amount) || 0, deadline: g.deadline || '',
    narrative: g.narrative || '',
    categories: (cats || []).map(c => ({
      id: c.id, name: c.name || '', budgeted: parseFloat(c.budgeted) || 0,
    })),
    expenses: (exps || []).map(e => ({
      id: e.id, date: e.date || '', desc: e.description || '',
      amount: parseFloat(e.amount) || 0, catId: e.category_id || '', receipt: e.receipt_ref || '',
    })),
  };
}

export async function sbLoadAllGrants(userId) {
  const { data: grants, error: gErr } = await supabase
    .from('grants').select('*').eq('user_id', userId).order('created_at', { ascending: true });
  if (gErr) throw gErr;
  if (!grants || grants.length === 0) return [];

  const results = [];
  for (const g of grants) {
    const { data: cats, error: cErr } = await supabase
      .from('budget_categories').select('*').eq('grant_id', g.id).order('sort_order');
    if (cErr) throw cErr;
    const { data: exps, error: eErr } = await supabase
      .from('expenses').select('*').eq('grant_id', g.id).order('date');
    if (eErr) throw eErr;
    results.push(dbGrantToLocal(g, cats, exps));
  }
  return results;
}

export async function sbDeleteGrant(grantId) {
  const { error } = await supabase.from('grants').delete().eq('id', grantId);
  if (error) throw error;
}

export async function sbLoadGrant(userId) {
  const { data: grants, error: gErr } = await supabase
    .from('grants').select('*').eq('user_id', userId).order('created_at', { ascending: true }).limit(1);
  if (gErr) throw gErr;
  if (!grants || grants.length === 0) return null;

  const g = grants[0];
  const { data: cats, error: cErr } = await supabase
    .from('budget_categories').select('*').eq('grant_id', g.id).order('sort_order');
  if (cErr) throw cErr;

  const { data: exps, error: eErr } = await supabase
    .from('expenses').select('*').eq('grant_id', g.id).order('date');
  if (eErr) throw eErr;

  return dbGrantToLocal(g, cats, exps);
}

export async function sbSaveGrant(userId, grant) {
  let grantId = grant._dbId;

  if (grantId) {
    const { error } = await supabase.from('grants').update({
      funder: grant.funder, grant_name: grant.grantName,
      amount: grant.amount, deadline: grant.deadline || null,
      narrative: grant.narrative || '',
    }).eq('id', grantId);
    if (error) throw error;
  } else {
    const { data, error } = await supabase.from('grants').insert({
      user_id: userId, funder: grant.funder, grant_name: grant.grantName,
      amount: grant.amount, deadline: grant.deadline || null,
      narrative: grant.narrative || '',
    }).select().single();
    if (error) throw error;
    grantId = data.id;
  }

  // Sync categories
  const { data: existingCats } = await supabase
    .from('budget_categories').select('id').eq('grant_id', grantId);
  const existingCatIds = new Set((existingCats || []).map(c => c.id));
  const currentCatIds = new Set(grant.categories.filter(c => existingCatIds.has(c.id)).map(c => c.id));

  const catsToDelete = [...existingCatIds].filter(id => !currentCatIds.has(id));
  if (catsToDelete.length > 0) {
    await supabase.from('budget_categories').delete().in('id', catsToDelete);
  }

  for (let i = 0; i < grant.categories.length; i++) {
    const c = grant.categories[i];
    if (existingCatIds.has(c.id)) {
      await supabase.from('budget_categories').update({
        name: c.name, budgeted: c.budgeted, sort_order: i,
      }).eq('id', c.id);
    } else {
      const { data, error } = await supabase.from('budget_categories').insert({
        grant_id: grantId, name: c.name, budgeted: c.budgeted, sort_order: i,
      }).select().single();
      if (error) throw error;
      c.id = data.id;
    }
  }

  // Sync expenses
  const { data: existingExps } = await supabase
    .from('expenses').select('id').eq('grant_id', grantId);
  const existingExpIds = new Set((existingExps || []).map(e => e.id));
  const currentExpIds = new Set(grant.expenses.filter(e => existingExpIds.has(e.id)).map(e => e.id));

  const expsToDelete = [...existingExpIds].filter(id => !currentExpIds.has(id));
  if (expsToDelete.length > 0) {
    await supabase.from('expenses').delete().in('id', expsToDelete);
  }

  for (const e of grant.expenses) {
    if (existingExpIds.has(e.id)) {
      await supabase.from('expenses').update({
        category_id: e.catId || null, date: e.date || null,
        description: e.desc, amount: e.amount, receipt_ref: e.receipt,
      }).eq('id', e.id);
    } else {
      const { data, error } = await supabase.from('expenses').insert({
        grant_id: grantId, category_id: e.catId || null, date: e.date || null,
        description: e.desc, amount: e.amount, receipt_ref: e.receipt,
      }).select().single();
      if (error) throw error;
      e.id = data.id;
    }
  }

  return grantId;
}
