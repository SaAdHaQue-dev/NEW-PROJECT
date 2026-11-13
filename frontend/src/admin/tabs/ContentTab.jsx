import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, RotateCcw } from 'lucide-react';
import { adminService } from '../adminService';

export default function ContentTab() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await adminService.getSiteContent();
      if (res.success && res.data) {
        setContent(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');

    try {
      const res = await adminService.updateSiteContent(content);
      if (res.success) {
        setMessage('Website content updated successfully! Changes are live.');
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      setMessage('Failed to update content: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return <div className="p-12 text-center text-stone-500">Loading website content...</div>;
  }

  return (
    <form onSubmit={handleSave} className="space-y-8 animate-in fade-in duration-200">
      
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-stone-200">
        <div>
          <h3 className="text-xl font-black text-[#141714]">
            Edit Hero Page & Site Content
          </h3>
          <p className="text-xs text-stone-500">
            Changes saved here update the live website immediately.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={loadContent}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-black text-xs shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {message && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{message}</span>
        </div>
      )}

      {/* Hero Section Card */}
      <div className="bg-white p-8 rounded-[32px] border border-stone-200 space-y-6">
        <h4 className="text-base font-extrabold text-[#141714] border-b border-stone-100 pb-3 uppercase tracking-wider text-xs">
          1. Hero Section Texts
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Headline Line 1
            </label>
            <input
              type="text"
              value={content.hero?.titleLine1 || ''}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, titleLine1: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Headline Line 2
            </label>
            <input
              type="text"
              value={content.hero?.titleLine2 || ''}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, titleLine2: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Headline Line 3
            </label>
            <input
              type="text"
              value={content.hero?.titleLine3 || ''}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, titleLine3: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
            Hero Subtitle / Description
          </label>
          <textarea
            rows="2"
            value={content.hero?.description || ''}
            onChange={(e) => setContent({
              ...content,
              hero: { ...content.hero, description: e.target.value }
            })}
            className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Years of Experience (Number)
            </label>
            <input
              type="text"
              value={content.hero?.yearsExperience || ''}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, yearsExperience: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Tower Skyscraper Image URL
            </label>
            <input
              type="url"
              value={content.hero?.towerImage || ''}
              onChange={(e) => setContent({
                ...content,
                hero: { ...content.hero, towerImage: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
        </div>
      </div>

      {/* Brand & Contact Information */}
      <div className="bg-white p-8 rounded-[32px] border border-stone-200 space-y-6">
        <h4 className="text-base font-extrabold text-[#141714] border-b border-stone-100 pb-3 uppercase tracking-wider text-xs">
          2. Brand & Contact Information
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Brand Name
            </label>
            <input
              type="text"
              value={content.brand?.name || ''}
              onChange={(e) => setContent({
                ...content,
                brand: { ...content.brand, name: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Contact Phone
            </label>
            <input
              type="text"
              value={content.brand?.phone || ''}
              onChange={(e) => setContent({
                ...content,
                brand: { ...content.brand, phone: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-600 mb-1.5 uppercase">
              Contact Email
            </label>
            <input
              type="email"
              value={content.brand?.email || ''}
              onChange={(e) => setContent({
                ...content,
                brand: { ...content.brand, email: e.target.value }
              })}
              className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-2.5 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="bg-white p-8 rounded-[32px] border border-stone-200 space-y-6">
        <h4 className="text-base font-extrabold text-[#141714] border-b border-stone-100 pb-3 uppercase tracking-wider text-xs">
          3. Dark Section Statistics Counters
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {content.statistics && content.statistics.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-[#F6F5F0] border border-stone-200">
              <label className="block text-xs font-bold text-stone-500 mb-1 uppercase">
                Metric {idx + 1}
              </label>
              <input
                type="text"
                value={stat.value}
                onChange={(e) => {
                  const updatedStats = [...content.statistics];
                  updatedStats[idx].value = e.target.value;
                  setContent({ ...content, statistics: updatedStats });
                }}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-base font-bold text-[#141714] mb-2"
              />
              <input
                type="text"
                value={stat.label.replace('\n', ' ')}
                onChange={(e) => {
                  const updatedStats = [...content.statistics];
                  updatedStats[idx].label = e.target.value;
                  setContent({ ...content, statistics: updatedStats });
                }}
                className="w-full bg-white border border-stone-200 rounded-xl px-3 py-1.5 text-xs text-stone-600"
              />
            </div>
          ))}
        </div>
      </div>

    </form>
  );
}

