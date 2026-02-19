import { useState, useEffect } from 'react';

const ADMIN_HASH = import.meta.env.VITE_ADMIN_HASH || '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'; // default: "admin"

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function AdminGate({ children }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const session = sessionStorage.getItem('ku-admin-auth');
    if (session === 'true') {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const hash = await hashPassword(password);
    if (hash === ADMIN_HASH) {
      sessionStorage.setItem('ku-admin-auth', 'true');
      setAuthenticated(true);
    } else {
      setError('Incorrect password');
      setPassword('');
    }
  }

  if (checking) return null;

  if (authenticated) return children;

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-ku-navy rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-ku-navy">Admin Area</h1>
            <p className="text-sm text-gray-500 mt-1">Enter the admin password to continue</p>
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-ku-teal focus:border-transparent mb-3"
              autoFocus
            />
            {error && (
              <p className="text-red-500 text-xs mb-3">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-ku-teal text-white font-semibold rounded-xl hover:bg-ku-teal-dark transition-colors cursor-pointer"
            >
              Enter
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-400 text-center mt-4">
          This area is for Kamunity team use only.
        </p>
      </div>
    </div>
  );
}
