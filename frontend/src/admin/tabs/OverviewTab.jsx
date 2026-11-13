import React from 'react';
import { Building2, Mail, Database, ArrowUpRight, Plus, Edit3, Shield } from 'lucide-react';

export default function OverviewTab({ stats, onNavigateTab }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-[#151915] text-white p-8 rounded-[32px] border border-stone-800 relative overflow-hidden">
        <div 
          className="absolute right-0 top-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.12) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-wider text-[#D4F138] block mb-2">
            Administrator Console
          </span>
          <h2 className="text-2xl sm:text-3xl font-black mb-3">
            Welcome to Spaciaz Master Control
          </h2>
          <p className="text-stone-300 text-sm leading-relaxed mb-6">
            Directly modify all website copy, manage luxury properties in MongoDB, and review client consultation inquiries.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigateTab('projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4F138] text-black font-bold text-xs shadow-md hover:bg-[#c6e52c] transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Project</span>
            </button>
            <button
              onClick={() => onNavigateTab('content')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Hero & Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Projects Metric */}
        <div className="bg-white p-6 rounded-[28px] border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Active Projects
            </span>
            <div className="text-3xl font-black text-[#141714]">
              {stats.projectCount}
            </div>
            <span className="text-xs font-semibold text-emerald-600 mt-1 inline-block">
              Synced with MongoDB
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-[#141714]">
            <Building2 className="w-6 h-6" />
          </div>
        </div>

        {/* Inquiries Metric */}
        <div className="bg-white p-6 rounded-[28px] border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Client Inquiries
            </span>
            <div className="text-3xl font-black text-[#141714]">
              {stats.inquiryCount}
            </div>
            <span className="text-xs font-semibold text-stone-500 mt-1 inline-block">
              From Contact Modal
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-stone-100 flex items-center justify-center text-[#141714]">
            <Mail className="w-6 h-6" />
          </div>
        </div>

        {/* Database Status */}
        <div className="bg-white p-6 rounded-[28px] border border-stone-200 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-1">
              Database Cluster
            </span>
            <div className="text-xl font-black text-[#141714] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
              Atlas Online
            </div>
            <span className="text-xs font-semibold text-stone-500 mt-1 inline-block">
              AWS Mumbai Cluster0
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-700">
            <Database className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => onNavigateTab('projects')}
          className="bg-white p-6 rounded-[28px] border border-stone-200 hover:border-[#141714] transition-all cursor-pointer group flex items-center justify-between"
        >
          <div>
            <h4 className="text-base font-bold text-[#141714] mb-1 group-hover:text-black">
              Manage Luxury Projects
            </h4>
            <p className="text-xs text-stone-500">
              Create, update, or remove portfolio showcase properties.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#D4F138] flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[#141714]" />
          </div>
        </div>

        <div 
          onClick={() => onNavigateTab('inquiries')}
          className="bg-white p-6 rounded-[28px] border border-stone-200 hover:border-[#141714] transition-all cursor-pointer group flex items-center justify-between"
        >
          <div>
            <h4 className="text-base font-bold text-[#141714] mb-1 group-hover:text-black">
              Review Client Leads
            </h4>
            <p className="text-xs text-stone-500">
              Check latest client contact messages and budgets.
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-stone-100 group-hover:bg-[#D4F138] flex items-center justify-center transition-colors">
            <ArrowUpRight className="w-4 h-4 text-[#141714]" />
          </div>
        </div>
      </div>

    </div>
  );
}

