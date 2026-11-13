import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { websiteData } from '../data/websiteData';
import HeroServices from '../services/HeroServices';

export default function Hero({ onOpenContact, onOpenProject, customHero }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const hero = customHero || websiteData.hero;

  const heroSlides = [
    {
      image: hero.towerImage || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      title: "Landmark Vertical Garden Tower",
      location: "New York, NY",
    },
    {
      image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1200&q=80",
      title: "Solstice Geometric Pavilion",
      location: "Seattle, WA",
    },
    {
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      title: "Metropolis High-Rise Center",
      location: "Chicago, IL",
    },
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      title: "Vanguard Coastal Residences",
      location: "Malibu, CA",
    }
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <section id="hero" className="px-4 md:px-8 pt-4 pb-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-stretch">
        
        {/* Left Column: Architectural Skyscraper Tower Card */}
        <div className="lg:col-span-5 relative group overflow-hidden rounded-[32px] md:rounded-[42px] min-h-[460px] md:min-h-[620px] bg-stone-900 shadow-sm">
          <img
            src={heroSlides[activeSlide].image}
            alt={heroSlides[activeSlide].title}
            className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10 pointer-events-none" />

          {/* Floating bottom tag on image */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/95 backdrop-blur-md bg-black/30 p-4 rounded-2xl border border-white/10">
            <div>
              <p className="text-xs uppercase tracking-wider text-[#D4F138] font-bold">Featured Development</p>
              <h4 className="text-sm md:text-base font-bold text-white">{heroSlides[activeSlide].title}</h4>
            </div>
            <button 
              onClick={() => onOpenProject(websiteData.luxuryLiving.projects[0])}
              className="w-10 h-10 rounded-full bg-[#D4F138] text-black flex items-center justify-center hover:scale-110 transition-transform active:scale-95 cursor-pointer"
              title="View Project"
            >
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Editorial Headline Card & Stats / Slider Bento */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-5 md:gap-6">
          
          {/* Top Big Rounded Box (Beige / Cream card) */}
          <div className="bg-[#EBE8DC] rounded-[32px] md:rounded-[42px] p-8 md:p-14 flex flex-col justify-between flex-grow min-h-[380px] md:min-h-[480px]">
            <div>
              {/* Dynamic Headline configured by Admin */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-extrabold tracking-tight text-[#141714] leading-[1.05] mb-6">
                {hero.titleLine1 || "A new"}<br />
                {hero.titleLine2 || "standard of"}<br />
                {hero.titleLine3 || "excellence"}
              </h1>

              {/* Subtext description */}
              <p className="text-base sm:text-lg md:text-xl text-[#141714]/75 max-w-lg leading-relaxed font-normal">
                {hero.description || websiteData.hero.description}
              </p>
            </div>

            {/* View All Services pill button & Modular Hero Services */}
            <div className="pt-8">
              <a
                href="#expertise"
                className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#F6F5F0] hover:bg-white text-[#141714] font-bold text-sm tracking-wide shadow-sm hover:shadow transition-all duration-200 border border-black/5 group"
              >
                <span>{hero.ctaButton || websiteData.hero.ctaButton}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              {/* Customizable Hero Services List */}
              <HeroServices onOpenContact={onOpenContact} />
            </div>
          </div>

          {/* Bottom Bento Row: 40 Years of Experience & Interactive Slider Pill */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 md:gap-6 items-center">
            
            {/* Left Box: 40 Years of Experiences */}
            <div className="sm:col-span-5 bg-white/70 backdrop-blur-sm rounded-[28px] p-6 flex items-center gap-4 border border-black/5">
              <span className="text-5xl md:text-6xl font-black text-[#141714] tracking-tight">
                {hero.yearsExperience || "40"}
              </span>
              <div className="text-xs sm:text-sm font-semibold text-[#141714]/80 uppercase leading-snug">
                years of<br />experiences
              </div>
            </div>

            {/* Right Box: Dark Charcoal Interactive Pill Widget */}
            <div className="sm:col-span-7 bg-[#161A16] text-white rounded-[28px] px-6 py-4 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3">
                <button 
                  onClick={nextSlide}
                  className="w-10 h-10 rounded-full bg-[#262C26] hover:bg-[#D4F138] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Next Project Preview"
                >
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </button>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#D4F138]">
                    Virtual Preview
                  </div>
                  <div className="text-xs font-medium text-white/80">
                    Project 0{activeSlide + 1} / 04
                  </div>
                </div>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Previous Project"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
                  aria-label="Next Project"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
