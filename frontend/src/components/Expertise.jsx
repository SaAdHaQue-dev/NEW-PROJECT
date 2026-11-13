import React, { useState } from 'react';
import { Plus, Minus, CheckCircle2 } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function Expertise() {
  const [openIndex, setOpenIndex] = useState(0);
  const { tag, title, description, services } = websiteData.expertise;

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section id="expertise" className="px-4 md:px-8 py-16 md:py-24 bg-[#ECEAE0]/60 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
            {tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {services.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[28px] transition-all duration-300 border ${
                  isOpen
                    ? 'bg-white border-stone-300 shadow-md'
                    : 'bg-white/60 hover:bg-white border-stone-200/80 shadow-xs'
                }`}
              >
                {/* Header button */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 md:px-10 py-6 md:py-8 flex items-center justify-between text-left cursor-pointer"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                    <span className="text-sm md:text-base font-mono font-bold text-[#141714]/40">
                      {item.number}
                    </span>
                    <h3 className="text-lg md:text-2xl font-extrabold text-[#141714] tracking-tight">
                      {item.title}
                    </h3>
                  </div>

                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ml-4 ${
                    isOpen ? 'bg-[#D4F138] text-black' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {isOpen ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>

                {/* Collapsible Content */}
                {isOpen && (
                  <div className="px-6 md:px-10 pb-8 pt-2 grid grid-cols-1 md:grid-cols-12 gap-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="md:col-span-8">
                      <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-6 font-normal">
                        {item.desc}
                      </p>
                      
                      {/* Key Deliverables points */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {item.points.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-[#141714]">
                            <CheckCircle2 className="w-4 h-4 text-[#D4F138] fill-[#141714]" />
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-4 flex items-center justify-end">
                      <div className="bg-[#141714] text-white p-5 rounded-2xl w-full text-center">
                        <span className="text-xs uppercase tracking-wider text-[#D4F138] font-bold block mb-1">
                          Advisory Consultation
                        </span>
                        <p className="text-xs text-stone-300">
                          Direct engagement with our Senior Engineering & Design Partners.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

