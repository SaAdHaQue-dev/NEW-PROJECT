import React from 'react';
import { Mail } from 'lucide-react';
import { LinkedinIcon, TwitterIcon } from './SocialIcons';
import { websiteData } from '../data/websiteData';

export default function Leadership() {
  const { tag, title, subtitle, members } = websiteData.leadership;

  return (
    <section id="leadership" className="px-4 md:px-8 py-16 md:py-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
            {tag}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight mb-4">
            {title}
          </h2>
          <p className="text-stone-600 text-sm md:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[28px] overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              {/* Member Portrait */}
              <div className="h-64 sm:h-72 w-full overflow-hidden bg-stone-100 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                
                {/* Social hover pills */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-[#D4F138] transition-colors cursor-pointer">
                    <LinkedinIcon className="w-4 h-4" />
                  </span>
                  <span className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-[#D4F138] transition-colors cursor-pointer">
                    <TwitterIcon className="w-4 h-4" />
                  </span>
                  <span className="p-2 rounded-full bg-white/90 backdrop-blur-md text-black hover:bg-[#D4F138] transition-colors cursor-pointer">
                    <Mail className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[#141714] group-hover:text-black mb-1">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {member.bio}
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
