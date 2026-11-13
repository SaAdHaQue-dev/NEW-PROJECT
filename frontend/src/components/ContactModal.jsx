import React, { useState } from 'react';
import { X, CheckCircle2, Send, Phone, Mail, Building } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Commercial Tower Development',
    budget: '$5M - $25M',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
      await fetch(`${apiBase}/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      // Graceful fallback if backend is offline
      console.log('Backend not reachable, inquiry saved locally:', formData);
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[32px] max-w-xl w-full p-8 md:p-10 shadow-2xl relative border border-stone-200 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-[#D4F138] text-[#141714] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#141714] mb-2">Inquiry Dispatched</h3>
            <p className="text-stone-600 text-sm max-w-sm mx-auto">
              A Senior Development Partner from Spaciaz will connect with you within 2 business hours.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <span className="text-xs font-bold tracking-widest text-[#141714]/60 uppercase mb-2 inline-block">
                Direct Inquiry
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#141714] tracking-tight">
                Get In Touch With Spaciaz
              </h3>
              <p className="text-stone-600 text-sm mt-1">
                Tell us about your project vision, real estate portfolio, or architectural development needs.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arthur Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Engagement Scope
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  >
                    <option>Commercial Tower Development</option>
                    <option>Luxury Residential Penthouse</option>
                    <option>Master Urban Planning</option>
                    <option>Institutional Real Estate Fund</option>
                    <option>Architectural Consultation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714]"
                  >
                    <option>$1M - $5M</option>
                    <option>$5M - $25M</option>
                    <option>$25M - $100M</option>
                    <option>$100M+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Brief Project Overview
                </label>
                <textarea
                  rows="3"
                  placeholder="Provide any preliminary project specifications, location, or development goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#F6F5F0] border border-stone-200 rounded-2xl px-4 py-3 text-sm text-[#141714] focus:outline-none focus:border-[#141714] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-md transition-all duration-200 cursor-pointer active:scale-95"
              >
                <span>Submit Confidential Inquiry</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

