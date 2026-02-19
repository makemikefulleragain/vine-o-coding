import React, { useState } from 'react';
import { supabase, SUPABASE_CONFIGURED } from '../lib/supabase';

export default function AuthPanel({ authUser, isAnonymous, onAuthChange, showToast }) {
  const [step, setStep] = useState('idle'); // idle | email | otp
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [flowType, setFlowType] = useState(''); // 'save' | 'signin'

  if (!SUPABASE_CONFIGURED) return null;

  const reset = () => {
    setStep('idle');
    setEmail('');
    setOtp('');
    setError('');
    setLoading(false);
    setFlowType('');
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (!email.trim()) { setError('Please enter your email'); return; }
    setError('');
    setLoading(true);

    try {
      if (flowType === 'save' && isAnonymous) {
        // Anonymous → permanent: link email to current anonymous user
        const { error: err } = await supabase.auth.updateUser({ email: email.trim() });
        if (err) throw err;
      } else {
        // Returning user sign-in
        const { error: err } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: { shouldCreateUser: true },
        });
        if (err) throw err;
      }
      setStep('otp');
      showToast?.(`Code sent to ${email.trim()}`, 'success');
    } catch (err) {
      console.error('Send OTP error:', err);
      if (err.message?.includes('rate') || err.message?.includes('security') || err.message?.includes('limit')) {
        setError('Email rate limit hit — wait a few minutes and try again. (Free tier: ~3 emails/hour)');
      } else if (err.message?.includes('not allowed')) {
        setError('Email not allowed. Please try a different email address.');
      } else {
        setError(err.message || 'Failed to send code. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp.trim() || otp.trim().length < 6) { setError('Please enter the code from your email'); return; }
    setError('');
    setLoading(true);

    try {
      if (flowType === 'save') {
        // Verifying email change for anonymous → permanent
        // updateUser({ email }) sends an email_change confirmation
        const { error: err } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: otp.trim(),
          type: 'email_change',
        });
        if (err) throw err;
        showToast?.('Account saved! You can now sign in from any device.', 'success', 5000);
      } else {
        // Returning user OTP verification
        const { error: err } = await supabase.auth.verifyOtp({
          email: email.trim(),
          token: otp.trim(),
          type: 'email',
        });
        if (err) throw err;
        showToast?.('Signed in successfully!', 'success');
      }
      reset();
      onAuthChange?.();
    } catch (err) {
      console.error('Verify OTP error:', err);
      if (err.message?.includes('expired')) {
        setError('Code expired. Please request a new one.');
      } else if (err.message?.includes('invalid') || err.message?.includes('Token')) {
        setError('Invalid code. Please check and try again.');
      } else {
        setError(err.message || 'Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // App.jsx will handle creating a new anonymous session via onAuthStateChange
      showToast?.('Signed out', 'info', 2000);
      onAuthChange?.();
    } catch (err) {
      console.error('Sign out error:', err);
      showToast?.('Sign out failed', 'error');
    }
  };

  // ── Idle state ──
  if (step === 'idle') {
    if (authUser && !isAnonymous) {
      // Signed in with email
      return (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-gray-500">📧 {authUser.email}</span>
          <button onClick={handleSignOut}
            className="text-gray-400 hover:text-red-500 transition-colors">
            Sign Out
          </button>
        </div>
      );
    }

    // Anonymous or no user
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-gray-400">Guest mode</span>
        <span className="text-gray-300">·</span>
        <button onClick={() => { setFlowType('save'); setStep('email'); }}
          className="text-indigo-500 hover:text-indigo-700 font-medium transition-colors">
          Save Your Account
        </button>
        <span className="text-gray-300">·</span>
        <button onClick={() => { setFlowType('signin'); setStep('email'); }}
          className="text-gray-500 hover:text-indigo-600 transition-colors">
          Sign In
        </button>
      </div>
    );
  }

  // ── Email input state ──
  if (step === 'email') {
    return (
      <form onSubmit={handleSendCode} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm max-w-sm mx-auto">
        <p className="text-sm font-medium text-gray-700 mb-2">
          {flowType === 'save' ? 'Save your account' : 'Sign in to your account'}
        </p>
        <p className="text-xs text-gray-500 mb-3">
          {flowType === 'save'
            ? "Add your email to access your grants from any device."
            : "Enter your email and we'll send you a 6-digit code."}
        </p>
        <div className="flex gap-2">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)}
            placeholder="your@email.com" autoFocus
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button type="submit" disabled={loading}
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors whitespace-nowrap">
            {loading ? '...' : 'Send Code'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <button type="button" onClick={reset} className="text-xs text-gray-400 hover:text-gray-600 mt-2">Cancel</button>
      </form>
    );
  }

  // ── OTP input state ──
  if (step === 'otp') {
    return (
      <form onSubmit={handleVerifyOtp} className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm max-w-sm mx-auto">
        <p className="text-sm font-medium text-gray-700 mb-2">Check your email</p>
        <p className="text-xs text-gray-500 mb-3">
          Enter the code sent to <strong>{email}</strong>
        </p>
        <div className="flex gap-2">
          <input type="text" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder="000000" maxLength={8} autoFocus inputMode="numeric"
            className="flex-1 px-3 py-1.5 text-sm text-center tracking-widest font-mono border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button type="submit" disabled={loading || otp.length < 6}
            className="px-3 py-1.5 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700 disabled:opacity-50 transition-colors">
            {loading ? '...' : 'Verify'}
          </button>
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        <div className="flex gap-3 mt-2">
          <button type="button" onClick={() => { setOtp(''); setStep('email'); setError(''); }}
            className="text-xs text-gray-400 hover:text-gray-600">Resend code</button>
          <button type="button" onClick={reset}
            className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
        </div>
      </form>
    );
  }

  return null;
}
