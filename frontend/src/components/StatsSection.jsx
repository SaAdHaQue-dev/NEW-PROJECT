import React from 'react';
import { websiteData } from '../data/websiteData';

export default function StatsSection({ customStats }) {
  const statistics = customStats && customStats.length > 0 ? customStats : websiteData.statistics;

  return (
    <section className="px-4 md:px-8 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="relative rounded-[36px] md:rounded-[48px] bg-[#121612] text-white p-10 md:p-16 lg:p-20 overflow-hidden shadow-xl gpu-layer">
          
          {/* Subtle architectural background texture */}
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=75')`
            }}
          />
          
          {/* Hardware-Accelerated Ambient Light (No costly Gaussian blur filter) */}
          <div 
            className="absolute -top-20 -left-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.15) 0%, transparent 70%)' }}
          />
          <div 
            className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(212,241,56,0.12) 0%, transparent 70%)' }}
          />

          {/* 4 Stats Grid */}
          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {statistics.map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-center border-l-2 border-stone-800 pl-6 md:pl-8 first:border-l-0 lg:first:border-l-0"
              >
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-2 flex items-baseline">
                  <span>{stat.value}</span>
                </div>
                <div className="text-stone-400 font-semibold text-xs sm:text-sm md:text-base leading-snug whitespace-pre-line uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Subtle branding watermark */}
          <div className="absolute bottom-4 right-8 text-stone-700/60 text-xs uppercase tracking-widest font-mono hidden md:block">
            SPACIAZ / GLOBAL METRICS 2026
          </div>
        </div>
      </div>
    </section>
  );
}
