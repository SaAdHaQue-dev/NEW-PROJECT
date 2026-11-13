import React from 'react';
import { Star, Quote } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function Testimonials() {
  const { testimonials } = websiteData;

  return (
    <section id="testimonials" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
            TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight mb-4">
            Happy client review
          </h2>
          <p className="text-stone-600 text-sm md:text-base">
            Feedback from institutional funds, commercial partners, and luxury residential owners worldwide.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[32px] p-8 md:p-10 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#141714]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4F138] text-[#141714]" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-stone-200 fill-stone-100" />
                </div>

                {/* Quote Text */}
                <p className="text-[#141714] text-sm md:text-base leading-relaxed font-medium mb-8">
                  "{item.quote}"
                </p>
              </div>

              {/* Author Details */}
              <div className="flex items-center gap-3.5 pt-6 border-t border-stone-100">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover border border-stone-200"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-[#141714]">
                    {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 font-medium">
                    {item.role}
                  </p>
                  <p className="text-[11px] text-[#141714]/60 font-semibold">
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

