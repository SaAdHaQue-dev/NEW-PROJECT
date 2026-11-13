import React, { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LinkedinIcon, TwitterIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import { websiteData } from '../data/websiteData';

export default function Footer({ onOpenContact, customBrand }) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const brand = customBrand || websiteData.brand;
  const phone = brand?.phone || websiteData.brand.phone;
  const brandEmail = brand?.email || websiteData.brand.email;
  const address = brand?.address || websiteData.brand.address;
  const brandName = brand?.name || websiteData.brand.name;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer id="contact" className="bg-[#121512] text-white pt-16 md:pt-24 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-[#D4F138] flex items-center justify-center p-1.5">
                <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
                  <path d="M4 18L12 4L20 18H4Z" fill="#141714" />
                  <circle cx="16" cy="18" r="3" fill="#141714" />
                </svg>
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-['Plus_Jakarta_Sans']">
                {brandName}
              </span>
            </div>

            <p className="text-stone-400 text-sm leading-relaxed mb-6 max-w-sm">
              The world's premier architecture and real estate development group, sculpting sustainable, high-yield landmarks across global metropolitan capitals.
            </p>

            <div className="text-stone-400 text-xs space-y-1 mb-8">
              <p><strong className="text-white">Headquarters:</strong> {address}</p>
              <p><strong className="text-white">Direct Line:</strong> {phone}</p>
              <p><strong className="text-white">General Inquiries:</strong> {brandEmail}</p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {[
                { component: TwitterIcon, label: "Twitter" },
                { component: LinkedinIcon, label: "LinkedIn" },
                { component: InstagramIcon, label: "Instagram" },
                { component: YoutubeIcon, label: "YouTube" },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href="#"
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full bg-stone-900 hover:bg-[#D4F138] text-stone-300 hover:text-black flex items-center justify-center transition-colors border border-stone-800"
                >
                  <item.component className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4F138] mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#hero" className="hover:text-white transition-colors">Home Demos</a></li>
              <li><a href="#landmark" className="hover:text-white transition-colors">About Firm</a></li>
              <li><a href="#luxury-living" className="hover:text-white transition-colors">Our Portfolio</a></li>
              <li><a href="#leadership" className="hover:text-white transition-colors">Leadership Team</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Capabilities</a></li>
              <li><a href="#news" className="hover:text-white transition-colors">News & Trends</a></li>
            </ul>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4F138] mb-5">
              Specialties
            </h4>
            <ul className="space-y-3 text-sm text-stone-400">
              <li><a href="#expertise" className="hover:text-white transition-colors">Master Planning</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Commercial Towers</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Biophilic Residences</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Eco-Township Design</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Asset Management</a></li>
              <li><a href="#expertise" className="hover:text-white transition-colors">Interior Staging</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#D4F138] mb-5">
              Architectural Dispatch
            </h4>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">
              Subscribe to receive private investment allocations, quarterly market reports, and design previews.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter corporate email..."
                  required
                  className="w-full bg-stone-900 border border-stone-800 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#D4F138] transition-colors pr-12"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-2 top-2 bottom-2 px-3 bg-[#D4F138] hover:bg-[#c6e52c] text-black rounded-xl flex items-center justify-center transition-colors cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-2 text-xs text-[#D4F138] font-medium pt-1 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you! You are now subscribed to the Spaciaz Dispatch.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} Spaciaz Architecture & Real Estate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Engagement</a>
            <a href="#admin" className="text-stone-400 hover:text-[#D4F138] transition-colors font-semibold flex items-center gap-1">
              <span>Admin Console</span>
              <span>🔒</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
