import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export default function CtaSection({ onOpenContact }) {
  return (
    <section className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[36px] md:rounded-[48px] bg-[#141714] text-white p-10 md:p-16 lg:p-20 overflow-hidden shadow-xl flex flex-col items-center text-center gpu-layer">
          
          {/* Hardware-Accelerated Ambient Glow (Zero render lag) */}
          <div 
            className="absolute top-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.14) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.10) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-[#D4F138] text-xs font-bold uppercase tracking-wider mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Initiate Your Development</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
              Ready to construct your next landmark project?
            </h2>

            <p className="text-stone-300 text-sm md:text-lg mb-10 max-w-xl mx-auto font-normal">
              Partner with our award-winning architects, engineers, and financial advisers to realize high-value spaces that redefine skylines.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onOpenContact}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4F138] hover:bg-[#c6e52c] text-[#141714] font-extrabold text-sm md:text-base tracking-wide flex items-center justify-center gap-3 shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <span>Get In Touch With Us</span>
                <div className="w-6 h-6 rounded-full bg-[#141714] text-[#D4F138] flex items-center justify-center">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </button>

              <a
                href="#luxury-living"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-sm md:text-base tracking-wide transition-all duration-200 text-center"
              >
                Browse Portfolio
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
