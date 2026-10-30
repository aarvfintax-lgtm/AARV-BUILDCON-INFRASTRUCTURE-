import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Truck, ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-14 px-4 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
        {/* Col 1: Brand & Profile */}
        <div>
          <div className="mb-3.5">
            <BrandLogo size="md" />
          </div>

          <p className="leading-relaxed mb-4 text-slate-300">
            {lang === 'hi' ? (
              <>
                थोक क्रशर मैटेरियल्स एवं 22 टायरी ट्रेलर लॉजिस्टिक्स का विश्वसनीय ब्रांड। <strong className="text-white">केवल थोक व बल्क सप्लायर (न्यूनतम आर्डर 40 टन)</strong>। हरियाणा, दिल्ली-एनसीआर, पंजाब और राजस्थान में त्वरित आपूर्ति।
              </>
            ) : (
              <>
                Premier bulk aggregates and 22-tyre trailer logistics fleet. <strong className="text-white">Wholesale orders only (MOQ 40 MT)</strong>. Dedicated fleet servicing Haryana, NCR, Punjab & Rajasthan.
              </>
            )}
          </p>

          <div className="flex items-center gap-2 text-[11px] text-blue-300 font-bold bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 w-fit">
            <Truck className="w-3.5 h-3.5 text-blue-400" />
            <span>थोक सामग्री डोरस्टेप ट्रांसपोर्ट व साइट डिलीवरी सुविधा</span>
          </div>

          <p className="text-slate-500 text-[11px] mt-4">
            © 2026 AARV BUILDCON INFRASTRUCTURE. All Rights Reserved.
          </p>
        </div>

        {/* Col 2: Official Registered Office Address */}
        <div>
          <h4 className="font-black text-white text-sm uppercase mb-3 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span>{lang === 'hi' ? 'आधिकारिक ऑफिस पता' : 'Registered Office Address'}</span>
          </h4>

          <div className="leading-relaxed text-slate-300 space-y-1.5 bg-slate-800/50 p-4 rounded-xl border border-slate-700/80">
            <p>शॉप नं. 1, 2, विश्वकर्मा मंदिर मार्केट,</p>
            <p>निकट राजकीय वरिष्ठ माध्यमिक विद्यालय (Govt Sr Sec School),</p>
            <p>
              ग्राम व डाकघर: <strong className="text-white">खनक (KHANAK)</strong>, तहसील: <strong className="text-white">तोशाम (TOSHAM)</strong>,
            </p>
            <p>
              जिला: <strong className="text-blue-400">भिवानी, हरियाणा (127040)</strong>
            </p>
          </div>

          <div className="mt-3 text-[11px] text-slate-400 font-medium">
            100% वैध ई-रवाना व कंप्यूटराइज्ड कांटा पर्ची अधिकृत
          </div>
        </div>

        {/* Col 3: Helpline & Quick Contact */}
        <div>
          <h4 className="font-black text-white text-sm uppercase mb-3 flex items-center gap-1.5">
            <Phone className="w-4 h-4 text-blue-400" />
            <span>{lang === 'hi' ? 'थोक कोटेशन हेल्पलाइन' : 'Bulk Quotation Helpline'}</span>
          </h4>

          <div className="space-y-2 mb-4">
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <a href="tel:+918926718000" className="text-white hover:text-blue-400 font-bold transition text-sm">
                8926718000
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                <Phone className="w-3.5 h-3.5" />
              </span>
              <a href="tel:+917357707308" className="text-white hover:text-blue-400 font-bold transition text-sm">
                7357707308
              </a>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400">
                <Mail className="w-3.5 h-3.5" />
              </span>
              <a href="mailto:aarvfintax@gmail.com" className="text-slate-300 hover:text-blue-400 transition">
                aarvfintax@gmail.com
              </a>
            </p>
          </div>

          <div className="inline-block px-3 py-1.5 bg-slate-800 border border-blue-500/30 rounded-lg text-blue-400 text-[11px] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
            100% अग्रिम भुगतान | न्यूनतम 40 टन
          </div>
        </div>
      </div>

      {/* Bottom bar with Scroll to Top */}
      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-slate-800 flex justify-between items-center text-[11px] text-slate-500">
        <div>
          AARV BUILDCON INFRASTRUCTURE • थोक क्रशर सामग्री एवं ट्रांसपोर्ट सुविधा • हरियाणा माइनिंग पंजीकृत
        </div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-slate-400 hover:text-white font-bold transition"
        >
          <span>ऊपर जाएं</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
