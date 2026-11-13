import React from 'react';
import { X, MapPin, Maximize2, Bed, Check, Calendar, ArrowRight } from 'lucide-react';

export default function ProjectModal({ project, onClose, onOpenContact }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-[36px] max-w-3xl w-full overflow-hidden shadow-2xl relative border border-stone-200 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/80 hover:bg-white text-stone-900 shadow-md backdrop-blur-md transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Scroll Container */}
        <div className="overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-72 sm:h-96 w-full bg-stone-900">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#D4F138] text-black text-xs font-bold uppercase">
                  {project.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-semibold">
                  {project.tag}
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white">
                {project.title}
              </h2>
              <div className="flex items-center gap-1.5 text-stone-300 text-sm mt-1">
                <MapPin className="w-4 h-4 text-[#D4F138]" />
                <span>{project.location}</span>
              </div>
            </div>
          </div>

          {/* Modal Details Content */}
          <div className="p-6 sm:p-10">
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#F6F5F0] border border-stone-200/80 mb-8">
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold block">Starting Price</span>
                <span className="text-lg font-black text-[#141714]">{project.price}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold block">Floor Area</span>
                <span className="text-lg font-black text-[#141714]">{project.area}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold block">Configuration</span>
                <span className="text-lg font-black text-[#141714]">{project.beds}</span>
              </div>
              <div>
                <span className="text-xs text-stone-500 uppercase font-bold block">Year Delivered</span>
                <span className="text-lg font-black text-[#141714]">{project.completion}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-extrabold text-[#141714] mb-3">
                Architectural Concept & Vision
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Signature Features */}
            <div className="mb-8">
              <h3 className="text-lg font-extrabold text-[#141714] mb-4">
                Signature Amenities & Engineering
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features && project.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-stone-50 border border-stone-100 text-sm font-semibold text-stone-800">
                    <div className="w-5 h-5 rounded-full bg-[#D4F138] flex items-center justify-center flex-shrink-0 text-black">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA action inside modal */}
            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-stone-500 text-center sm:text-left">
                Direct portfolio allocation inquiry via Spaciaz Private Client Desk.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#141714] hover:bg-black text-[#D4F138] font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Request Project Prospectus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

