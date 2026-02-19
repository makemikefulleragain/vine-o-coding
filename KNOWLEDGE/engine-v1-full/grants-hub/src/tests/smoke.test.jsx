import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase';
import { EMPTY_GRANT, genId, lsLoad, lsSave, lsLoadGrants, exportJSON } from '../lib/storage';

// ── Smoke Test 1: Supabase client initializes ──
describe('Supabase client', () => {
  it('should detect configuration from env', () => {
    if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
      expect(SUPABASE_CONFIGURED).toBe(true);
      expect(supabase).not.toBeNull();
      expect(supabase.auth).toBeDefined();
      expect(supabase.from).toBeDefined();
    } else {
      expect(SUPABASE_CONFIGURED).toBe(false);
      expect(supabase).toBeNull();
    }
  });

  it('should have createClient return a valid client with auth and from methods', () => {
    if (!supabase) return;
    expect(typeof supabase.auth.getSession).toBe('function');
    expect(typeof supabase.auth.signInAnonymously).toBe('function');
    expect(typeof supabase.from).toBe('function');
  });
});

// ── Smoke Test 2: Supabase auth works (integration — hits real Supabase) ──
describe('Supabase auth (integration)', () => {
  it('should get or create an anonymous session', async () => {
    if (!supabase) return;

    const { data: { session } } = await supabase.auth.getSession();
    let userId = session?.user?.id;

    if (!userId) {
      const { data, error } = await supabase.auth.signInAnonymously();
      expect(error).toBeNull();
      expect(data.user).toBeDefined();
      userId = data.user.id;
    }

    expect(userId).toBeDefined();
    expect(typeof userId).toBe('string');
    expect(userId.length).toBeGreaterThan(0);
  });
});

// ── Smoke Test 3: App renders without crashing ──
describe('App component', () => {
  it('should render without crashing', () => {
    render(<App />);
    const title = screen.queryByText(/Grant Acquittal Helper/i);
    expect(title).toBeInTheDocument();
  });

  it('should show storage mode indicator after load', async () => {
    render(<App />);
    const indicator = await screen.findByText(/Cloud|Browser only/i, {}, { timeout: 10000 });
    expect(indicator).toBeInTheDocument();
  });

  it('should show grant list view (multi-grant) after load', async () => {
    render(<App />);
    const heading = await screen.findByText((content) => content.includes('Your Grants'), {}, { timeout: 10000 });
    expect(heading).toBeInTheDocument();
  }, 15000);

  it('should have a New Grant button', async () => {
    render(<App />);
    const btn = await screen.findByText(/New Grant/i, {}, { timeout: 10000 });
    expect(btn).toBeInTheDocument();
  });
});

// ── Smoke Test 4: Storage helpers work ──
describe('Storage helpers', () => {
  it('genId produces unique IDs', () => {
    const ids = new Set(Array.from({ length: 100 }, () => genId()));
    expect(ids.size).toBe(100);
  });

  it('lsSave and lsLoad round-trip data', () => {
    const testData = { foo: 'bar', num: 42 };
    lsSave('_test', testData);
    const loaded = lsLoad('_test', null);
    expect(loaded).toEqual(testData);
    localStorage.removeItem('gah__test');
  });

  it('EMPTY_GRANT has required fields', () => {
    expect(EMPTY_GRANT).toHaveProperty('funder');
    expect(EMPTY_GRANT).toHaveProperty('grantName');
    expect(EMPTY_GRANT).toHaveProperty('amount');
    expect(EMPTY_GRANT).toHaveProperty('deadline');
    expect(EMPTY_GRANT).toHaveProperty('narrative');
    expect(EMPTY_GRANT).toHaveProperty('categories');
    expect(EMPTY_GRANT).toHaveProperty('expenses');
  });

  it('lsLoadGrants returns array', () => {
    localStorage.removeItem('gah_grants');
    localStorage.removeItem('gah_grant');
    const result = lsLoadGrants();
    expect(Array.isArray(result)).toBe(true);
  });

  it('lsLoadGrants migrates single grant to array', () => {
    localStorage.removeItem('gah_grants');
    lsSave('grant', { ...EMPTY_GRANT, id: 'test-1', funder: 'Test Funder' });
    const result = lsLoadGrants();
    expect(result.length).toBe(1);
    expect(result[0].funder).toBe('Test Funder');
    localStorage.removeItem('gah_grants');
    localStorage.removeItem('gah_grant');
  });

  it('exportJSON is a function', () => {
    expect(typeof exportJSON).toBe('function');
  });
});
