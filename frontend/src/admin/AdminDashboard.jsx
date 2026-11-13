import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Mail, 
  Settings, 
  LogOut, 
  ExternalLink,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';
import { adminService } from './adminService';
import OverviewTab from './tabs/OverviewTab';
import ContentTab from './tabs/ContentTab';
import ProjectsTab from './tabs/ProjectsTab';
import InquiriesTab from './tabs/InquiriesTab';
import SettingsTab from './tabs/SettingsTab';

export default function AdminDashboard({ onLogout, onBackToSite, onContentSaved }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState({ projectCount: 4, inquiryCount: 1 });

  const currentAdmin = adminService.getCurrentAdmin();

  useEffect(() => {
    // Load summary numbers
    Promise.all([
      adminService.getProjects().catch(() => ({ data: [] })),
      adminService.getInquiries().catch(() => ({ data: [] }))
    ]).then(([projRes, inqRes]) => {
      setStats({
        projectCount: projRes.data?.length || 0,
        inquiryCount: inqRes.data?.length || 0
      });
    });
  }, [activeTab]);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'content', label: 'Hero & Content', icon: FileText },
    { id: 'projects', label: 'Projects (MongoDB)', icon: Building2 },
    { id: 'inquiries', label: 'Client Leads', icon: Mail, count: stats.inquiryCount },
    { id: 'settings', label: 'Admin Security', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#141714] font-['Plus_Jakarta_Sans',sans-serif] flex flex-col md:flex-row">
      
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-[#141714] text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#D4F138] flex items-center justify-center text-black">
            <ShieldCheck className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span className="font-black text-sm tracking-tight">Spaciaz Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-xl"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-[#141714] text-white p-6 flex flex-col justify-between transition-transform duration-300 md:static md:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div>
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-10 pb-6 border-b border-stone-800">
            <div className="w-9 h-9 rounded-xl bg-[#D4F138] flex items-center justify-center text-black shadow-sm">
              <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white block">
                spaciaz
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4F138]">
                Master Control
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-[#D4F138] text-[#141714] shadow-md' 
                      : 'text-stone-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.count !== undefined && item.count > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-black text-[#D4F138]' : 'bg-stone-800 text-stone-300'
                    }`}>
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-6 border-t border-stone-800 space-y-3">
          <button
            onClick={onBackToSite}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-xs text-stone-300 transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-[#D4F138]" />
              <span>View Live Website</span>
            </span>
          </button>

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Top Header */}
        <header className="bg-white/80 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-10 py-5 flex items-center justify-between sticky top-0 z-30">
          <div>
            <h1 className="text-lg font-black text-[#141714] capitalize">
              {activeTab.replace('-', ' ')}
            </h1>
            <p className="text-[11px] text-stone-500">
              Authenticated Admin: <strong className="text-[#141714]">{currentAdmin?.username || 'admin'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full border border-stone-200 text-xs font-bold text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Tab Body */}
        <div className="p-6 sm:p-10 flex-1 max-w-6xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab stats={stats} onNavigateTab={setActiveTab} />
          )}
          {activeTab === 'content' && <ContentTab onSaved={onContentSaved} />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'inquiries' && <InquiriesTab />}
          {activeTab === 'settings' && <SettingsTab />}
        </div>
      </main>

    </div>
  );
}

