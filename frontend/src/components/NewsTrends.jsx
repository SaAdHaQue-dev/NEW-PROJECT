import React from 'react';
import { ArrowUpRight, Calendar, Clock } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function NewsTrends() {
  const { news } = websiteData;

  return (
    <section id="news" className="px-4 md:px-8 py-16 md:py-24 bg-white/50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
              JOURNAL & INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight leading-tight">
              News, inspiration<br />and trends
            </h2>
          </div>
          <p className="text-stone-600 max-w-sm text-sm md:text-base">
            Exploring the intersection of avant-garde architecture, sustainable city development, and investment strategy.
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-[32px] overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Featured Image */}
              <div className="h-56 sm:h-64 w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#141714]/85 backdrop-blur-md text-[#D4F138] text-xs font-bold uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-xs font-semibold text-stone-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#141714] group-hover:text-black mb-3 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read Link */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#141714] group-hover:text-black flex items-center gap-1.5">
                    Read Article
                    <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}

