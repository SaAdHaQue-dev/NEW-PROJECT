import React, { useState } from 'react';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { adminService } from './adminService';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await adminService.login(username, password);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.message || 'Invalid username or password');
      }
    } catch (err) {
      setError('Unable to reach server. Please ensure backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111411] text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Ambient background glows */}
      <div 
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.12) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.08) 0%, transparent 70%)' }}
      />

      {/* Back button */}
      <button
        onClick={onBackToSite}
        className="absolute top-6 left-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-400 hover:text-white transition-colors cursor-pointer py-2 px-4 rounded-full bg-stone-900 border border-stone-800"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Website</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-[#161B16] border border-stone-800/80 rounded-[32px] p-8 md:p-10 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#D4F138] flex items-center justify-center mx-auto mb-4 text-[#141714]">
            <ShieldCheck className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-white mb-1">
            Spaciaz Admin Portal
          </h2>
          <p className="text-xs text-stone-400">
            Confidential Executive Management Console
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-500 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#D4F138] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-400 mb-2">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-stone-500 absolute left-4 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-stone-900/90 border border-stone-800 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#D4F138] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-[#D4F138] hover:bg-[#c8e62f] text-[#141714] font-black text-sm tracking-wide shadow-md transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-stone-800 text-center">
          <p className="text-[11px] text-stone-500">
            Protected with 256-bit JWT & MongoDB RBAC Security.
          </p>
        </div>
      </div>
    </div>
  );
}

