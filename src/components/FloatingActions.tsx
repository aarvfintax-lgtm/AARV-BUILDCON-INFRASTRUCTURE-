import React, { useState } from 'react';
import { Phone, PhoneCall, MessageCircle, ChevronUp, ChevronDown } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const [showNumbers, setShowNumbers] = useState<boolean>(false);

  const prefilledWhatsappUrl = `https://wa.me/918926718000?text=${encodeURIComponent(
    'नमस्ते AARV Buildcon, मुझे थोक क्रशर मैटेरियल्स (गिट्टी/डस्ट/एम-सैंड) के ताजा भाव और साइट डिलीवरी ट्रांसपोर्टेशन की पूछताछ करनी है। कृपया विस्तृत कोटेशन साझा करें।'
  )}`;

  return (
    <>
      {/* 1. Dedicated 'WhatsApp Us' Floating Button for Mobile View */}
      <aside aria-label="Quick WhatsApp Contact" className="fixed bottom-4 left-4 z-50 flex sm:hidden items-center print:hidden">
        <a
          href={prefilledWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] active:scale-95 text-white py-2.5 px-3.5 rounded-full shadow-2xl border border-emerald-300/40 transition-all duration-200 group"
          title="WhatsApp Us - त्वरित सामग्री पूछताछ"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-200 rounded-full animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full"></span>
          </div>
          <div className="flex flex-col text-left leading-tight">
            <span className="text-[11px] font-black tracking-wide">WhatsApp Us</span>
            <span className="text-[9px] text-emerald-100 font-medium">त्वरित पूछताछ</span>
          </div>
        </a>
      </aside>

      {/* 2. Primary Floating Dial & Quick Actions Dock */}
      <aside aria-label="Floating Contact Hotline" className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 print:hidden">
        
        {/* Secondary Quick Dial Numbers Panel (when expanded) */}
        {showNumbers && (
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-2xl p-3 shadow-2xl mb-1 flex flex-col gap-2 min-w-[240px] text-xs text-slate-800 dark:text-slate-200 animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
              <span className="font-extrabold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
                <PhoneCall className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>AARV डायरेक्ट हेल्पलाइन</span>
              </span>
              <button
                onClick={() => setShowNumbers(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 text-xs px-1"
              >
                ✕
              </button>
            </div>

            <a
              href="tel:+918926718000"
              className="flex items-center justify-between p-2 rounded-xl bg-blue-50/80 dark:bg-blue-950/60 hover:bg-blue-100/90 dark:hover:bg-blue-900/50 text-blue-950 dark:text-blue-200 font-bold transition group"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 block leading-tight font-semibold">प्राथमिक हेल्पलाइन</span>
                  <span className="font-mono text-xs">8926718000</span>
                </div>
              </div>
              <span className="text-[10px] text-blue-700 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform font-semibold">
                कॉल करें →
              </span>
            </a>

            <a
              href="tel:+917357707308"
              className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-200 font-bold transition group"
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-slate-800 dark:bg-slate-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Phone className="w-3.5 h-3.5" />
                </span>
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block leading-tight font-semibold">द्वितीय हेल्पलाइन</span>
                  <span className="font-mono text-xs">7357707308</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-400 group-hover:translate-x-0.5 transition-transform font-semibold">
                कॉल करें →
              </span>
            </a>

            <div className="text-[10px] text-slate-500 dark:text-slate-400 text-center pt-0.5">
              न्यूनतम थोक आर्डर: 40 मीट्रिक टन
            </div>
          </div>
        )}

        {/* Desktop / Global WhatsApp Button */}
        <a
          href={prefilledWhatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.03] group border border-emerald-400/40"
          title="WhatsApp Us - तुरंत थोक कोटेशन प्राप्त करें"
        >
          <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
          <span className="text-xs font-bold tracking-wide pr-1">
            WhatsApp Us
          </span>
        </a>

        {/* Sticky 'Call Us Now' Primary Button */}
        <div className="flex items-center shadow-2xl rounded-full relative group">
          
          {/* Animated Radar Pulse Ring */}
          <span className="absolute -inset-1 rounded-full bg-blue-600/35 animate-ping opacity-75 pointer-events-none"></span>

          {/* Direct Phone Dial Button */}
          <a
            href="tel:+918926718000"
            className="relative flex items-center gap-2.5 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600 hover:from-blue-800 hover:to-indigo-700 text-white py-3 px-4 sm:px-5 rounded-full font-black text-xs sm:text-sm tracking-wide shadow-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 border-2 border-white/20"
            title="तुरंत कॉल करें: 8926718000"
          >
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
              <PhoneCall className="w-4 h-4 text-white" />
            </span>

            <div className="flex flex-col text-left leading-tight">
              <span className="text-[10px] text-blue-100 font-extrabold uppercase tracking-wider">
                Call Us Now
              </span>
              <span className="font-mono font-black text-xs sm:text-sm text-white flex items-center gap-1">
                <span>8926718000</span>
              </span>
            </div>
          </a>

          {/* Number Options Dropdown Toggle */}
          <button
            type="button"
            onClick={() => setShowNumbers(!showNumbers)}
            className="relative ml-[-12px] bg-blue-800 hover:bg-blue-900 text-white p-2.5 rounded-r-full border-2 border-l-0 border-white/20 transition-colors shadow-md cursor-pointer"
            title="अन्य फोन नंबर देखें"
          >
            {showNumbers ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>

      </aside>
    </>
  );
};
