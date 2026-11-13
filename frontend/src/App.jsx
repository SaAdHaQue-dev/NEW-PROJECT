import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LandmarkProjects from './components/LandmarkProjects';
import FeatureTicker from './components/FeatureTicker';
import StatsSection from './components/StatsSection';
import LuxuryLiving from './components/LuxuryLiving';
import Leadership from './components/Leadership';
import Expertise from './components/Expertise';
import Testimonials from './components/Testimonials';
import NewsTrends from './components/NewsTrends';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import ProjectModal from './components/ProjectModal';
import { websiteData } from './data/websiteData.js';
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import { adminService } from './admin/adminService';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#admin' ? 'admin' : 'site';
  });
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => adminService.isAuthenticated());
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState(websiteData.luxuryLiving.projects);
  const [siteData, setSiteData] = useState(websiteData);
  const lenisRef = useRef(null);

  // Sync projects and site data from Backend API / MongoDB
  const refreshData = () => {
    const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    
    // Fetch Projects
    fetch(`${apiBase}/projects`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setProjects(data.data);
        }
      })
      .catch(() => {});

    // Fetch Site Content
    fetch(`${apiBase}/site`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setSiteData((prev) => ({
            ...prev,
            hero: { ...prev.hero, ...data.data.hero },
            brand: { ...prev.brand, ...data.data.brand },
            statistics: data.data.statistics || prev.statistics,
            landmarkSection: data.data.landmarkSection || prev.landmarkSection
          }));
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    refreshData();
  }, [currentView]);

  // Listen to hash changes (#admin)
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else if (currentView === 'admin' && window.location.hash !== '#admin') {
        setCurrentView('site');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [currentView]);

  // Initialize Lenis Smooth Scrolling for public site
  useEffect(() => {
    if (currentView !== 'site') return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Anchor links smooth navigation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId !== '#admin') {
          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            lenis.scrollTo(targetEl, { offset: -70, duration: 1.2 });
          }
        }
      });
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, [currentView]);

  // Pause smooth scroll when modal is active
  useEffect(() => {
    if (lenisRef.current) {
      if (isContactOpen || selectedProject) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isContactOpen, selectedProject]);

  const handleOpenContact = () => setIsContactOpen(true);
  const handleCloseContact = () => setIsContactOpen(false);
  const handleOpenProject = (project) => setSelectedProject(project);
  const handleCloseProject = () => setSelectedProject(null);

  const handleBackToSite = () => {
    window.location.hash = '';
    setCurrentView('site');
  };

  const handleLogout = () => {
    adminService.logout();
    setIsAdminLoggedIn(false);
  };

  // If in Admin View
  if (currentView === 'admin') {
    if (isAdminLoggedIn) {
      return (
        <AdminDashboard 
          onLogout={handleLogout} 
          onBackToSite={handleBackToSite} 
        />
      );
    }
    return (
      <AdminLogin 
        onLoginSuccess={() => setIsAdminLoggedIn(true)} 
        onBackToSite={handleBackToSite} 
      />
    );
  }

  // Public Main Website View
  return (
    <div className="min-h-screen bg-[#F6F5F0] text-[#141714] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Floating Navbar */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Page Content */}
      <main className="gpu-layer">
        {/* Hero Bento Section */}
        <Hero 
          onOpenContact={handleOpenContact} 
          onOpenProject={handleOpenProject} 
          customHero={siteData.hero}
        />

        {/* 3 Landmark Real Estate Projects Bento Cards */}
        <LandmarkProjects onOpenContact={handleOpenContact} />

        {/* Continuous Marquee Ticker Badges */}
        <FeatureTicker />

        {/* Statistics Dark Section (48+, 52+, 2.3b+, 18m+) */}
        <StatsSection customStats={siteData.statistics} />

        {/* Luxury Living Portfolio Showcase */}
        <LuxuryLiving 
          onOpenProject={handleOpenProject} 
          customProjects={projects} 
        />

        {/* Global Executive Leadership */}
        <Leadership />

        {/* The Expertise We Got (Capabilities & Process) */}
        <Expertise />

        {/* Happy Client Review (Testimonials) */}
        <Testimonials />

        {/* News, Inspiration and Trends (Blog) */}
        <NewsTrends />

        {/* Call to Action Banner */}
        <CtaSection onOpenContact={handleOpenContact} />
      </main>

      {/* Footer with Directory & Newsletter */}
      <Footer onOpenContact={handleOpenContact} />

      {/* Interactive Modals */}
      <ContactModal 
        isOpen={isContactOpen} 
        onClose={handleCloseContact} 
      />

      <ProjectModal 
        project={selectedProject} 
        onClose={handleCloseProject}
        onOpenContact={handleOpenContact}
      />
    </div>
  );
}
