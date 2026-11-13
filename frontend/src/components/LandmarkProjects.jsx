import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function LandmarkProjects({ onOpenContact }) {
  const { sectionNumber, title, cards } = websiteData.landmarkSection;

  return (
    <section id="landmark" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
            {sectionNumber}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight whitespace-pre-line leading-tight">
            {title}
          </h2>
        </div>

        {/* 3 Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 items-stretch">
          
          {/* Card 1: What we do (Dark Card) */}
          <div className="bg-[#151915] text-white rounded-[32px] md:rounded-[38px] p-8 md:p-10 flex flex-col justify-between min-h-[440px] md:min-h-[500px] relative group overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="relative z-10">
              <div className="w-10 h-1 bg-[#D4F138] rounded-full mb-8" />
              <h3 className="text-3xl font-extrabold text-white mb-5 tracking-tight">
                {cards[0].title}
              </h3>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                {cards[0].description}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-8 border-t border-white/10 mt-auto">
              <button 
                onClick={onOpenContact}
                className="text-sm font-bold text-white hover:text-[#D4F138] transition-colors cursor-pointer"
              >
                {cards[0].linkText}
              </button>

              <button
                onClick={onOpenContact}
                className="w-12 h-12 rounded-full bg-[#D4F138] text-[#141714] flex items-center justify-center font-bold shadow-md transition-transform duration-300 group-hover:scale-110 active:scale-95 cursor-pointer"
                aria-label={cards[0].title}
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 2: Our impact (Lime Accent Card with Building Image at Bottom) */}
          <div className="bg-[#D4F138] text-[#141714] rounded-[32px] md:rounded-[38px] p-8 md:p-10 flex flex-col justify-between min-h-[440px] md:min-h-[500px] relative group overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold text-[#141714] mb-4 tracking-tight">
                {cards[1].title}
              </h3>
              <p className="text-[#141714]/85 text-sm md:text-base leading-relaxed font-medium">
                {cards[1].description}
              </p>
            </div>

            {/* Architectural Building Image Integrated at the bottom */}
            <div className="w-full h-44 md:h-48 rounded-2xl overflow-hidden mt-6 relative shadow-inner">
              <img
                src={cards[1].image}
                alt={cards[1].imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            <div className="relative z-10 flex items-center justify-between pt-4">
              <button 
                onClick={onOpenContact}
                className="text-sm font-bold text-[#141714] hover:underline cursor-pointer"
              >
                {cards[1].linkText}
              </button>

              <button
                onClick={onOpenContact}
                className="w-12 h-12 rounded-full bg-[#141714] text-[#D4F138] flex items-center justify-center font-bold shadow-md transition-transform duration-300 group-hover:scale-110 active:scale-95 cursor-pointer"
                aria-label={cards[1].title}
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

          {/* Card 3: Core values (Dark Card with Modern House Image at Top) */}
          <div className="bg-[#151915] text-white rounded-[32px] md:rounded-[38px] p-8 md:p-10 flex flex-col justify-between min-h-[440px] md:min-h-[500px] relative group overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1">
            {/* House Photo at Top */}
            <div className="w-full h-40 md:h-44 rounded-2xl overflow-hidden mb-6 relative">
              <img
                src={cards[2].image}
                alt={cards[2].imageAlt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>

            <div className="relative z-10 flex-grow">
              <h3 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
                {cards[2].title}
              </h3>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                {cards[2].description}
              </p>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
              <button 
                onClick={onOpenContact}
                className="text-sm font-bold text-white hover:text-[#D4F138] transition-colors cursor-pointer"
              >
                {cards[2].linkText}
              </button>

              <button
                onClick={onOpenContact}
                className="w-12 h-12 rounded-full bg-[#D4F138] text-[#141714] flex items-center justify-center font-bold shadow-md transition-transform duration-300 group-hover:scale-110 active:scale-95 cursor-pointer"
                aria-label={cards[2].title}
              >
                <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

