import React, { useState } from 'react';
import { Phone, ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function Navbar({ onOpenContact, customBrand }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const brand = customBrand || websiteData.brand;
  const phone = brand?.phone || websiteData.brand.phone;
  const brandName = brand?.name || websiteData.brand.name;

  return (
    <header className="sticky top-0 z-50 pt-3 pb-3 px-4 md:px-8 bg-[#F6F5F0]/95 border-b border-stone-200/50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#141714] flex items-center justify-center p-1.5 transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
              <path d="M4 18L12 4L20 18H4Z" fill="#D4F138" />
              <circle cx="16" cy="18" r="3" fill="#D4F138" />
            </svg>
          </div>
          <span className="text-2xl font-black tracking-tight text-[#141714] font-['Plus_Jakarta_Sans']">
            {brandName}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {websiteData.navLinks.map((link, idx) => (
            <div 
              key={idx} 
              className="relative"
              onMouseEnter={() => link.hasDropdown && setActiveDropdown(idx)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={link.href}
                className="flex items-center gap-1 text-[15px] font-semibold text-[#141714]/85 hover:text-[#141714] transition-colors py-2"
              >
                {link.label}
                {link.hasDropdown && (
                  <ChevronDown className="w-3.5 h-3.5 text-[#141714]/60 transition-transform duration-200" />
                )}
              </a>

              {/* Dropdown Menu */}
              {link.hasDropdown && activeDropdown === idx && (
                <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 shadow-xl rounded-2xl py-3 px-2 z-50">
                  <a href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-[#F6F5F0] rounded-xl transition-colors">
                    Overview
                  </a>
                  <a href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-[#F6F5F0] rounded-xl transition-colors">
                    Featured Layouts
                  </a>
                  <a href={link.href} className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-black hover:bg-[#F6F5F0] rounded-xl transition-colors">
                    Specifications
                  </a>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section: Call Us & Get In Touch CTA */}
        <div className="hidden sm:flex items-center gap-6">
          <a 
            href={`tel:${phone.replace(/\s+/g, '')}`} 
            className="hidden xl:flex items-center gap-2 text-sm font-semibold text-[#141714]/90 hover:text-black transition-colors"
          >
            <span className="text-[#141714]/60 font-normal">Call Us:</span>
            <span>{phone}</span>
          </a>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-bold text-sm tracking-wide shadow-xs hover:shadow transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span>Get In Touch</span>
            <div className="w-5 h-5 rounded-full bg-[#141714] text-[#D4F138] flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-3">
          <button
            onClick={onOpenContact}
            className="sm:hidden flex items-center gap-1 px-4 py-2 rounded-full bg-[#D4F138] text-[#141714] font-bold text-xs"
          >
            <span>Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-2xl bg-white border border-gray-200 text-[#141714] hover:bg-gray-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-6 bg-white rounded-3xl shadow-xl border border-gray-200 flex flex-col gap-4">
          <nav className="flex flex-col gap-2">
            {websiteData.navLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 text-base font-semibold text-[#141714] hover:bg-[#F6F5F0] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
            <a 
              href={`tel:${phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-2 text-sm font-semibold text-[#141714]/80 py-1 px-4"
            >
              <Phone className="w-4 h-4 text-[#141714]" />
              <span>{phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#D4F138] text-[#141714] font-bold text-sm shadow-sm"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
