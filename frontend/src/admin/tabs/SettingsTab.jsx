import React, { useState } from 'react';
import { Lock, CheckCircle2, AlertCircle, Shield, Key } from 'lucide-react';
import { adminService } from '../adminService';

export default function SettingsTab() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });

  const currentAdmin = adminService.getCurrentAdmin();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    if (newPassword.length < 6) {
      return setStatus({ type: 'error', text: 'Password must be at least 6 characters long' });
    }
    if (newPassword !== confirmPassword) {
      return setStatus({ type: 'error', text: 'Passwords do not match' });
    }

    setLoading(true);
    try {
      const res = await adminService.changePassword(newPassword);
      if (res.success) {
        setStatus({ type: 'success', text: 'Password successfully updated in MongoDB!' });
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setStatus({ type: 'error', text: res.message || 'Failed to update password' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl animate-in fade-in duration-200">
      
      {/* Account Info Card */}
      <div className="bg-white p-8 rounded-[32px] border border-stone-200">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-[#141714]">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-[#141714]">
              Admin Account Credentials
            </h3>
            <p className="text-xs text-stone-500">
              Only authorized administrators can access this portal.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#F6F5F0] border border-stone-200 text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-stone-500 font-bold uppercase">Current Username:</span>
            <span className="font-mono font-bold text-[#141714]">
              {currentAdmin?.username || 'admin'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-bold uppercase">Role:</span>
            <span className="font-bold text-emerald-700 uppercase">
              {currentAdmin?.role || 'super_admin'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-stone-500 font-bold uppercase">Security Token:</span>
            <span className="text-stone-600 font-semibold">Active JWT Session</span>
          </div>
        </div>
      </div>

      {/* Change Password Card */}
      <div className="bg-white p-8 rounded-[32px] border border-stone-200">
        <h3 className="text-lg font-black text-[#141714] mb-2 flex items-center gap-2">
          <Key className="w-5 h-5 text-[#141714]" />
          <span>Change Admin Password</span>
        </h3>
        <p className="text-xs text-stone-500 mb-6">
          Update the confidential master password for this admin console.
        </p>

        {status.text && (
          <div className={`p-4 rounded-2xl mb-6 text-xs flex items-center gap-2.5 ${
            status.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            {status.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
            )}
            <span className="font-semibold">{status.text}</span>
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
              New Password
            </label>
            <input
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-stone-600 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-black text-xs shadow-md cursor-pointer disabled:opacity-50 transition-all"
          >
            {loading ? 'Updating Password...' : 'Update Password'}
          </button>
        </form>
      </div>

    </div>
  );
}

