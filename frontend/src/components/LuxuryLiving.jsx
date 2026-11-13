import React, { useState } from 'react';
import { ArrowUpRight, MapPin, Maximize2, Building, Bed } from 'lucide-react';
import { websiteData } from '../data/websiteData';

export default function LuxuryLiving({ onOpenProject, customProjects }) {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const { tag, title, description, categories, projects: defaultProjects } = websiteData.luxuryLiving;
  const projectList = customProjects && customProjects.length > 0 ? customProjects : defaultProjects;

  const filteredProjects = activeCategory === "All Projects"
    ? projectList
    : projectList.filter(p => p.category === activeCategory);

  return (
    <section id="luxury-living" className="px-4 md:px-8 py-16 md:py-24 bg-white/50 border-t border-stone-200/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#141714]/60 uppercase mb-3 inline-block">
              {tag}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#141714] tracking-tight whitespace-pre-line leading-tight">
              {title}
            </h2>
          </div>
          <p className="text-stone-600 max-w-md text-sm md:text-base">
            {description}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10 pb-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#141714] text-white shadow-md'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onOpenProject(project)}
              className="bg-white rounded-[32px] overflow-hidden border border-stone-200/80 shadow-xs hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-stone-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#141714]/80 backdrop-blur-md text-[#D4F138] text-xs font-bold uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Tag Pill */}
                <div className="absolute top-4 right-4">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#D4F138] text-black text-xs font-bold">
                    {project.tag}
                  </span>
                </div>

                {/* Hover Quick Action */}
                <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white text-[#141714] flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#D4F138]">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>

              {/* Info Body */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-1.5 text-stone-500 text-xs sm:text-sm font-medium mb-2">
                    <MapPin className="w-4 h-4 text-[#141714]" />
                    <span>{project.location}</span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-[#141714] group-hover:text-black mb-3 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-stone-600 text-sm line-clamp-2 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Specs Row */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm text-stone-600">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1 font-semibold text-[#141714]">
                      <Maximize2 className="w-4 h-4 text-stone-400" />
                      {project.area}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-[#141714]">
                      <Bed className="w-4 h-4 text-stone-400" />
                      {project.beds}
                    </span>
                  </div>

                  <span className="text-base sm:text-lg font-black text-[#141714]">
                    {project.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

