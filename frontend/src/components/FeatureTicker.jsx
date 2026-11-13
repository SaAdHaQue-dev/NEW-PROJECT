import React from 'react';
import { websiteData } from '../data/websiteData';

export default function FeatureTicker() {
  const items = websiteData.tickerItems;
  // Duplicate for seamless infinite loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section className="py-8 overflow-hidden bg-[#F6F5F0] border-y border-stone-200/60 select-none">
      <div className="flex animate-marquee gap-6 items-center">
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3.5 bg-white/80 hover:bg-white backdrop-blur-sm px-5 py-3 rounded-full border border-stone-200/80 shadow-xs transition-transform duration-200 hover:scale-105 cursor-default flex-shrink-0"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 border border-stone-300">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-bold text-[#141714] whitespace-nowrap">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

