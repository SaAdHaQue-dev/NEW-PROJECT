import React, { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, DollarSign, Building, RefreshCw, CheckCircle2 } from 'lucide-react';
import { adminService } from '../adminService';

export default function InquiriesTab() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await adminService.getInquiries();
      if (res.success && res.data) {
        setInquiries(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-[28px] border border-stone-200">
        <div>
          <h3 className="text-xl font-black text-[#141714]">
            Customer Inquiries & Consultation Leads
          </h3>
          <p className="text-xs text-stone-500">
            {inquiries.length} submissions saved in MongoDB database.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      {/* Inquiries List */}
      {loading ? (
        <div className="p-12 text-center text-stone-500">Loading inquiries from MongoDB...</div>
      ) : inquiries.length === 0 ? (
        <div className="bg-white p-12 rounded-[32px] border border-stone-200 text-center text-stone-500">
          No inquiries received yet. When visitors submit the "Get In Touch" modal, they will show up here.
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-white p-6 sm:p-8 rounded-[28px] border border-stone-200 shadow-xs flex flex-col justify-between"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4 mb-4">
                <div>
                  <h4 className="text-lg font-bold text-[#141714]">
                    {item.name}
                  </h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 mt-1">
                    <a href={`mailto:${item.email}`} className="flex items-center gap-1 hover:text-black font-semibold text-[#141714]">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{item.email}</span>
                    </a>
                    {item.phone && (
                      <a href={`tel:${item.phone}`} className="flex items-center gap-1 hover:text-black">
                        <Phone className="w-3.5 h-3.5" />
                        <span>{item.phone}</span>
                      </a>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                    {item.status || 'new'}
                  </span>
                </div>
              </div>

              {/* Scope & Budget badges */}
              <div className="flex flex-wrap gap-2.5 mb-4">
                <span className="px-3 py-1 rounded-xl bg-[#F6F5F0] border border-stone-200 text-xs font-bold text-[#141714]">
                  Scope: {item.projectType}
                </span>
                <span className="px-3 py-1 rounded-xl bg-[#D4F138]/20 border border-[#D4F138]/40 text-xs font-bold text-[#141714]">
                  Budget: {item.budget}
                </span>
              </div>

              {/* Message text */}
              {item.message ? (
                <div className="p-4 rounded-2xl bg-[#F6F5F0] text-xs text-stone-700 leading-relaxed">
                  "{item.message}"
                </div>
              ) : (
                <p className="text-xs text-stone-400 italic">No additional note provided.</p>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

