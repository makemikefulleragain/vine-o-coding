import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, SUPABASE_CONFIGURED } from './lib/supabase';
import { lsSave, genId, EMPTY_GRANT, lsLoadGrants, exportJSON } from './lib/storage';
import { sbLoadAllGrants, sbSaveGrant, sbDeleteGrant } from './lib/db';
import GrantListView from './components/GrantListView';
import GrantDetailView from './components/GrantDetailView';
import AboutPage from './components/AboutPage';
import PrivacyPage from './components/PrivacyPage';
import FAQPage from './components/FAQPage';
import AuthPanel from './components/AuthPanel';
import FeedbackBanner from './components/FeedbackBanner';

const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSegji1CCptjZSMXxZrBkDxstUu9XLpS2JJPnJcr0szVxoXKIw/viewform?usp=dialog';

export default function App() {
  const [grants, setGrants] = useState([]);
  const [selectedGrantId, setSelectedGrantId] = useState(null);
  const [tab, setTab] = useState('setup');
  const [page, setPage] = useState('main'); // main | about | privacy | faq
  const [showCloudInfo, setShowCloudInfo] = useState(false);
  const [confirmDeleteAll, setConfirmDeleteAll] = useState(false);
  const [storageMode, setStorageMode] = useState('loading');
  const [saveStatus, setSaveStatus] = useState('');
  const [migrating, setMigrating] = useState(false);
  const [toast, setToast] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const userIdRef = useRef(null);
  const saveTimerRef = useRef(null);
  const initialLoadDone = useRef(false);

  const showToast = useCallback((msg, type = 'info', duration = 4000) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  const selectedGrant = grants.find(g => g.id === selectedGrantId) || null;

  const updateGrant = useCallback((updated) => {
    setGrants(prev => prev.map(g => g.id === updated.id ? updated : g));
  }, []);

  // ── Initialize auth + load data ──
  useEffect(() => {
    let cancelled = false;
    async function init() {
      if (!SUPABASE_CONFIGURED || !supabase) {
        const saved = lsLoadGrants();
        setGrants(saved);
        setStorageMode('local');
        initialLoadDone.current = true;
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();
        let userId = session?.user?.id;

        if (!userId) {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (error) throw error;
          userId = data.user.id;
        }

        if (cancelled) return;
        userIdRef.current = userId;
        setAuthUser(session?.user || null);
        setIsAnonymous(!session?.user?.email);

        const lsData = lsLoadGrants();
        const alreadyMigrated = localStorage.getItem('gah_migrated') === 'true';

        const dbGrants = await sbLoadAllGrants(userId);

        if (dbGrants.length > 0) {
          setGrants(dbGrants);
          setStorageMode('cloud');
        } else if (lsData.length > 0 && !alreadyMigrated) {
          if (cancelled) return;
          setMigrating(true);
          try {
            const migrated = [];
            for (const lsGrant of lsData) {
              const catIdMap = {};
              const newCats = (lsGrant.categories || []).map(c => {
                const newId = genId(); catIdMap[c.id] = newId;
                return { id: newId, name: c.name, budgeted: c.budgeted };
              });
              const newExps = (lsGrant.expenses || []).map(e => ({
                id: genId(), date: e.date, desc: e.desc,
                amount: e.amount, catId: catIdMap[e.catId] || '', receipt: e.receipt || '',
              }));
              const mg = {
                ...EMPTY_GRANT, id: genId(),
                funder: lsGrant.funder || '', grantName: lsGrant.grantName || '',
                amount: lsGrant.amount || 0, deadline: lsGrant.deadline || '',
                narrative: lsGrant.narrative || '',
                categories: newCats, expenses: newExps,
              };
              const dbId = await sbSaveGrant(userId, mg);
              mg._dbId = dbId; mg.id = dbId;
              migrated.push(mg);
            }
            localStorage.setItem('gah_migrated', 'true');
            setGrants(migrated);
            setStorageMode('cloud');
            showToast('Your existing data has been saved to the cloud!', 'success', 5000);
          } catch (err) {
            console.error('Migration failed:', err);
            setGrants(lsData);
            setStorageMode('local');
            showToast('Migration failed — working in browser-only mode', 'error', 6000);
          } finally { setMigrating(false); }
        } else {
          setStorageMode('cloud');
        }
        initialLoadDone.current = true;
      } catch (err) {
        console.error('Supabase init failed:', err);
        setGrants(lsLoadGrants());
        setStorageMode('local');
        initialLoadDone.current = true;
        showToast('Could not connect to cloud — working in browser-only mode', 'error', 6000);
      }
    }

    init();
    return () => { cancelled = true; };
  }, []);

  // ── Auth state change listener ──
  useEffect(() => {
    if (!SUPABASE_CONFIGURED || !supabase) return;
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const user = session?.user || null;
      setAuthUser(user);
      setIsAnonymous(!user?.email);
      if (user) {
        userIdRef.current = user.id;
        if (event === 'SIGNED_IN' && user.email) {
          // Returning user signed in — reload their data
          try {
            const dbGrants = await sbLoadAllGrants(user.id);
            setGrants(dbGrants);
            setStorageMode('cloud');
          } catch (err) {
            console.error('Failed to load data after sign-in:', err);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        // Create new anonymous session
        try {
          const { data, error } = await supabase.auth.signInAnonymously();
          if (!error && data.user) {
            userIdRef.current = data.user.id;
            setAuthUser(data.user);
            setIsAnonymous(true);
            setGrants([]);
            setStorageMode('cloud');
          }
        } catch (err) {
          console.error('Anonymous re-sign-in failed:', err);
        }
      }
    });
    return () => subscription?.unsubscribe();
  }, []);

  // ── Debounced save on grants change ──
  useEffect(() => {
    if (!initialLoadDone.current) return;
    lsSave('grants', grants);

    if (storageMode !== 'cloud' || !userIdRef.current || !selectedGrant) return;

    clearTimeout(saveTimerRef.current);
    setSaveStatus('saving');
    saveTimerRef.current = setTimeout(async () => {
      try {
        const g = grants.find(gr => gr.id === selectedGrantId);
        if (!g) return;
        const dbId = await sbSaveGrant(userIdRef.current, { ...g, _dbId: g._dbId || g.id });
        setGrants(prev => prev.map(gr => gr.id === g.id ? { ...gr, _dbId: dbId, id: dbId } : gr));
        if (selectedGrantId === g.id && dbId !== g.id) setSelectedGrantId(dbId);
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus(''), 2000);
      } catch (err) {
        console.error('Save failed:', err);
        setSaveStatus('error');
        showToast('Save failed — changes kept locally', 'error');
      }
    }, 800);
    return () => clearTimeout(saveTimerRef.current);
  }, [grants, storageMode]);

  // ── Grant CRUD operations ──
  const createGrant = useCallback(async () => {
    const newGrant = { ...EMPTY_GRANT, id: genId() };
    if (storageMode === 'cloud' && userIdRef.current) {
      try {
        const dbId = await sbSaveGrant(userIdRef.current, newGrant);
        newGrant._dbId = dbId; newGrant.id = dbId;
      } catch (err) {
        console.error('Create grant failed:', err);
        showToast('Could not save new grant to cloud', 'error');
      }
    }
    setGrants(prev => [...prev, newGrant]);
    setSelectedGrantId(newGrant.id);
    setTab('setup');
  }, [storageMode, showToast]);

  const deleteGrant = useCallback(async (grantId) => {
    if (storageMode === 'cloud') {
      try { await sbDeleteGrant(grantId); } catch (err) {
        console.error('Delete failed:', err);
        showToast('Could not delete grant from cloud', 'error');
        return;
      }
    }
    setGrants(prev => prev.filter(g => g.id !== grantId));
    if (selectedGrantId === grantId) setSelectedGrantId(null);
    showToast('Grant deleted', 'info', 2000);
  }, [storageMode, selectedGrantId, showToast]);

  const deleteAllData = useCallback(async () => {
    if (storageMode === 'cloud') {
      for (const g of grants) {
        try { await sbDeleteGrant(g.id); } catch (err) { console.error('Delete failed:', err); }
      }
    }
    localStorage.removeItem('gah_grants');
    localStorage.removeItem('gah_grant');
    localStorage.removeItem('gah_migrated');
    setGrants([]);
    setSelectedGrantId(null);
    setConfirmDeleteAll(false);
    showToast('All data deleted', 'info', 3000);
  }, [grants, storageMode, showToast]);

  // ── Page routing ──
  if (page === 'about') return (
    <div className="max-w-4xl mx-auto p-4">
      <AboutPage onBack={(target) => setPage(target || 'main')} authUser={authUser} showToast={showToast} />
    </div>
  );
  if (page === 'privacy') return (
    <div className="max-w-4xl mx-auto p-4">
      <PrivacyPage onBack={() => setPage('main')} />
    </div>
  );
  if (page === 'faq') return (
    <div className="max-w-4xl mx-auto p-4">
      <FAQPage onBack={() => setPage('main')} />
    </div>
  );

  // ── Render ──
  if (storageMode === 'loading' || migrating) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center mt-20">
        <div className="animate-pulse">
          <h1 className="text-2xl font-bold text-indigo-800 mb-2">Grant Acquittal Helper</h1>
          <p className="text-gray-500">{migrating ? 'Migrating your data to the cloud...' : 'Loading...'}</p>
        </div>
      </div>
    );
  }

  const storageIndicator = storageMode === 'cloud'
    ? { icon: '☁️', label: 'Cloud', color: 'text-green-600 bg-green-50', detail: 'Data saved to cloud' }
    : { icon: '💾', label: 'Browser only', color: 'text-amber-600 bg-amber-50', detail: 'Data saved to this browser only' };
  const saveIndicator = saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? '✓ Saved' : saveStatus === 'error' ? '⚠ Save failed' : '';

  return (
    <div className="max-w-4xl mx-auto p-4">
      <header className="text-center mb-6 no-print">
        <h1 className="text-3xl font-bold text-indigo-800">Grant Acquittal Helper</h1>
        <p className="text-gray-500 mt-1">Track spending and generate acquittal reports for your grants</p>
        <p className="text-xs text-amber-600 mt-1">This tool helps organise your data. It does not constitute financial advice. Verify requirements with your funder.</p>
        <div className="mt-2 no-print">
          <AuthPanel authUser={authUser} isAnonymous={isAnonymous}
            onAuthChange={() => {}} showToast={showToast} />
        </div>
        <div className="flex items-center justify-center gap-2 mt-2">
          <button onClick={() => setShowCloudInfo(!showCloudInfo)}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${storageIndicator.color} hover:opacity-80 transition-opacity`}
            title="Click for details">
            {storageIndicator.icon} {storageIndicator.label}
          </button>
          {saveIndicator && (
            <span className={`text-xs ${saveStatus === 'error' ? 'text-red-500' : 'text-gray-400'}`}>{saveIndicator}</span>
          )}
        </div>
      </header>

      {showCloudInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm text-blue-800 no-print">
          <div className="flex justify-between items-start">
            <div>
              {storageMode === 'cloud' ? (
                <>
                  <strong>Cloud mode active.</strong> Your data is stored in a secure Supabase database,
                  encrypted in transit (HTTPS) and at rest (AES-256). Only your anonymous session can access your data.
                  No email, password, or personal information is collected.
                  {' '}<button onClick={() => setPage('privacy')} className="text-indigo-600 hover:underline">Read our Privacy Policy</button>
                </>
              ) : (
                <>
                  <strong>Browser-only mode.</strong> Your data is stored in this browser's localStorage and never
                  leaves your device. If you clear your browser data, your data will be lost.
                  {' '}<button onClick={() => setPage('faq')} className="text-indigo-600 hover:underline">Learn more</button>
                </>
              )}
            </div>
            <button onClick={() => setShowCloudInfo(false)} className="text-blue-400 hover:text-blue-600 ml-2">&times;</button>
          </div>
        </div>
      )}

      {storageMode === 'local' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-sm text-amber-800 no-print">
          <strong>Browser-only mode:</strong> Your data is saved in this browser. It will be lost if you clear your browser data.
        </div>
      )}

      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-sm max-w-sm no-print ${
          toast.type === 'error' ? 'bg-red-50 text-red-800 border border-red-200' :
          toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' :
          'bg-blue-50 text-blue-800 border border-blue-200'
        }`}>
          {toast.msg}
        </div>
      )}

      {selectedGrant ? (
        <GrantDetailView grant={selectedGrant} setGrant={updateGrant} tab={tab} setTab={setTab}
          onBack={() => setSelectedGrantId(null)} feedbackUrl={FEEDBACK_URL} />
      ) : (
        <GrantListView grants={grants} onSelect={id => { setSelectedGrantId(id); setTab('setup'); }}
          onCreate={createGrant} onDelete={deleteGrant} onExport={() => exportJSON(grants)} onUpdateGrant={updateGrant} />
      )}

      <footer className="mt-12 pt-6 border-t text-center text-xs text-gray-400 space-y-2 no-print">
        <div className="flex justify-center gap-4">
          <button onClick={() => setPage('about')} className="hover:text-indigo-600 transition-colors">About</button>
          <button onClick={() => setPage('privacy')} className="hover:text-indigo-600 transition-colors">Privacy</button>
          <button onClick={() => setPage('faq')} className="hover:text-indigo-600 transition-colors">FAQ</button>
        </div>
        <div>
          {!confirmDeleteAll ? (
            <button onClick={() => setConfirmDeleteAll(true)} className="text-red-300 hover:text-red-500 transition-colors">
              Delete All My Data
            </button>
          ) : (
            <span className="text-red-600">
              Are you sure? This permanently deletes all grants.{' '}
              <button onClick={deleteAllData} className="font-medium underline">Yes, delete everything</button>{' · '}
              <button onClick={() => setConfirmDeleteAll(false)} className="underline">Cancel</button>
            </span>
          )}
        </div>
        <p>Built by <a href="https://kamunity.ai" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-indigo-600">Kamunity</a> for Australian communities</p>
      </footer>

      <FeedbackBanner feedbackUrl={FEEDBACK_URL} />
    </div>
  );
}
