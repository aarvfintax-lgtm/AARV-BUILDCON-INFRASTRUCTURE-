import React from 'react';
import { MACHINERY_DATA } from '../data/machineryData';
import { Language } from '../types';
import { Hammer, Wrench, Truck, FileCheck, Phone, CheckCircle2 } from 'lucide-react';

interface HeavyMachineryProps {
  lang: Language;
}

export const HeavyMachinery: React.FC<HeavyMachineryProps> = ({ lang }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Hammer': return <Hammer className="w-6 h-6 text-blue-700" />;
      case 'Wrench': return <Wrench className="w-6 h-6 text-blue-700" />;
      case 'Truck': return <Truck className="w-6 h-6 text-blue-700" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-blue-700" />;
      default: return <Hammer className="w-6 h-6 text-blue-700" />;
    }
  };

  return (
    <section id="machinery" className="max-w-7xl mx-auto py-14 px-4 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
        <div>
          <span className="text-blue-700 dark:text-blue-400 font-extrabold text-xs uppercase tracking-wider block mb-1">
            {lang === 'hi' ? 'हैवी इक्विपमेंट व कॉन्ट्रैक्ट्स' : 'Heavy Equipment & Tender Contracts'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'hi' ? 'भारी मशीनरी रेंटल एवं सिविल टेंडर्स' : 'Heavy Mining Machinery & Govt Tenders'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
          {lang === 'hi'
            ? 'खनक व तोशाम बेल्ट में माइंस कटिंग, हाईवे लेइंग, अर्थवर्क और PWD/NHAI टेंडर प्रोजेक्ट्स हेतु आधुनिक मशीनों की फ्लीट।'
            : 'Heavy duty excavators, drilling compressors, vibratory rollers and comprehensive tender supply logistics.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {MACHINERY_DATA.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-300 dark:border-slate-800 hover:border-blue-500 transition flex flex-col justify-between group shadow-sm hover:shadow-md"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-1.5 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
                {lang === 'hi' ? item.titleHi : item.titleEn}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                {lang === 'hi' ? item.descHi : item.descEn}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-600 dark:text-slate-400 mb-2">
                <span className="text-blue-800 dark:text-blue-400 font-bold block text-[10px] uppercase">
                  {lang === 'hi' ? 'विशेषता / क्षमता:' : 'Specifications:'}
                </span>
                <span>{lang === 'hi' ? item.specsHi : item.specsEn}</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-600 dark:text-slate-400 font-medium">{item.availableFor}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> उपलब्ध
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Machinery Contact Banner in Royal Blue Gradient */}
      <div className="blue-gradient-dark p-6 sm:p-7 rounded-2xl border border-blue-900 flex flex-wrap justify-between items-center gap-4 text-white shadow-md">
        <div>
          <h4 className="text-base font-bold text-white mb-1">
            {lang === 'hi' ? 'क्या आपकी साइट को पोकलेन या हाईवे रोलर की आवश्यकता है?' : 'Need Heavy Excavators or Road Compactors on Site?'}
          </h4>
          <p className="text-xs text-blue-100">
            {lang === 'hi'
              ? 'दैनिक या मासिक कॉन्ट्रैक्ट, कुशल ऑपरेटर एवं ऑन-साइट सर्विस सहायता के लिए सीधे बात करें।'
              : 'Direct leasing with skilled operators and 24/7 technical on-site maintenance support.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="tel:+918926718000"
            className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-2 px-4 rounded-xl text-xs flex items-center gap-2 transition shadow"
          >
            <Phone className="w-4 h-4" />
            <span>{lang === 'hi' ? 'मशीनरी हेल्पलाइन 8926718000' : 'Machinery Desk 8926718000'}</span>
          </a>
          <a
            href="https://wa.me/917357707308?text=नमस्ते%20AARV%20Buildcon,%20मुझे%20हैवी%20मशीनरी%20रेंटल%20/%20टेंडर%20अनुबंध%20की%20जानकारी%20चाहिए।"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-xl text-xs border border-white/20 transition"
          >
            <span>WhatsApp पर चर्चा करें</span>
          </a>
        </div>
      </div>
    </section>
  );
};
