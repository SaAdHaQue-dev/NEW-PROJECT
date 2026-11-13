import React, { useState } from 'react';
import { 
  Compass, 
  Building2, 
  Leaf, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Sparkles, 
  ArrowUpRight,
  ChevronRight
} from 'lucide-react';
import { heroServicesList } from './heroServicesData';

// Dynamic Icon Mapper
const iconMap = {
  Compass,
  Building: Building2,
  Building2,
  Leaf,
  Layers,
  ShieldCheck,
  TrendingUp,
  Sparkles
};

export default function HeroServices({ onSelectService, onOpenContact }) {
  const [activeService, setActiveService] = useState(heroServicesList[0]?.id);

  const getIcon = (name) => {
    const Component = iconMap[name] || Sparkles;
    return <Component className="w-4 h-4" />;
  };

  return (
    <div className="w-full pt-6 border-t border-black/5 mt-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#141714]/60">
          Core Capabilities / Quick Services
        </span>
        <span className="text-[11px] font-semibold text-[#141714]/40">
          {heroServicesList.length} Available
        </span>
      </div>

      {/* Services Grid/Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {heroServicesList.map((service) => {
          const isSelected = activeService === service.id;
          return (
            <div
              key={service.id}
              onClick={() => {
                setActiveService(service.id);
                if (onSelectService) onSelectService(service);
              }}
              className={`p-3.5 rounded-2xl transition-all duration-200 cursor-pointer border flex flex-col justify-between group ${
                isSelected 
                  ? 'bg-white border-[#141714]/15 shadow-sm' 
                  : 'bg-white/40 hover:bg-white border-black/5'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#D4F138] text-[#141714]' : 'bg-stone-100 text-stone-700 group-hover:bg-[#D4F138]'
                  }`}>
                    {getIcon(service.iconName)}
                  </div>
                  <span className="text-xs font-bold text-[#141714]">
                    {service.title}
                  </span>
                </div>

                {service.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600">
                    {service.badge}
                  </span>
                )}
              </div>

              <p className="text-[11px] text-stone-500 line-clamp-1 mb-2">
                {service.shortDesc}
              </p>

              <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-[#141714]">
                <span className="text-[10px] uppercase font-bold text-[#141714]/40">
                  {service.tag}
                </span>
                <span className="inline-flex items-center gap-1 group-hover:text-black group-hover:translate-x-0.5 transition-transform">
                  Explore
                  <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

