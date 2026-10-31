import React from 'react';
import { MaterialItem, Language, ThemeMode } from '../types';
import { Mail, Phone, Lock, Building2, AlertTriangle, Globe, Sun, Moon } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  materials: MaterialItem[];
  lang: Language;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onToggleLang: () => void;
  onOpenAdmin: () => void;
  onOpenPayment: () => void;
  onSelectMaterialForCalc: (mat: MaterialItem) => void;
}

export const Header: React.FC<HeaderProps> = ({
  materials,
  lang,
  theme,
  onToggleTheme,
  onToggleLang,
  onOpenAdmin,
  onOpenPayment,
  onSelectMaterialForCalc
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
      {/* 1. Top Sub-Bar: Clean Corporate Contact & Wholesale Terms */}
      <div className="bg-slate-50 dark:bg-slate-950 px-4 py-1.5 border-b border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-semibold flex items-center gap-1.5">
              <span className="text-slate-900 dark:text-white font-bold">AARV BUILDCON INFRASTRUCTURE</span>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <span className="text-slate-500 dark:text-slate-400 font-normal">बिल्डिंग मैटेरियल्स एवं क्रशर उत्पाद के थोक निर्माता (ट्रांसपोर्टेशन सुविधा सहित)</span>
            </span>
            <span className="hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
              <a href="mailto:aarvfintax@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                aarvfintax@gmail.com
              </a>
            </span>
          </div>

          <div className="flex items-center gap-3 font-semibold text-slate-800 dark:text-slate-200">
            {/* 100% Advance Payment Rule Notice */}
            <span className="flex items-center gap-1 text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800 text-[10px] font-bold">
              <AlertTriangle className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>100% अग्रिम भुगतान अनिवार्य अथवा सीधे कॉल करें</span>
            </span>

            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold">
              <a href="tel:+918926718000" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>8926718000</span>
              </a>
              <span className="text-slate-300 dark:text-slate-700">|</span>
              <a href="tel:+917357707308" className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                <Phone className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span>7357707308</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Modern Live Wholesale Material Rate Ticker */}
      <div className="bg-slate-900 dark:bg-black text-white py-1.5 px-3 text-xs font-semibold tracking-wide flex items-center overflow-hidden border-b border-slate-800 dark:border-slate-850">
        <div className="bg-blue-600 text-white px-2.5 py-0.5 rounded-md mr-3 uppercase flex items-center gap-1.5 shrink-0 text-[11px] font-bold tracking-wider shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{lang === 'hi' ? 'लाइव थोक सामग्री भाव' : 'Live Wholesale Rates'}</span>
        </div>

        <div className="overflow-hidden relative w-full">
          <div className="animate-marquee flex items-center gap-8 text-[12px] whitespace-nowrap text-slate-200 font-medium">
            {materials.map((m) => (
              <button
                key={m.id}
                onClick={() => onSelectMaterialForCalc(m)}
                className="hover:underline flex items-center gap-1.5 text-slate-200 hover:text-white cursor-pointer transition"
                title={`${m.nameHi} - ₹${m.rate}/टन (क्लिक करके कैलकुलेटर में लोड करें)`}
              >
                <span className="text-slate-300 font-medium">{lang === 'hi' ? m.nameHi : m.nameEn}:</span>
                <span className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-bold tabular-nums border border-slate-700">
                  ₹{m.rate}/टन
                </span>
              </button>
            ))}
            {/* Seamless repeat */}
            {materials.map((m) => (
              <button
                key={`repeat-${m.id}`}
                onClick={() => onSelectMaterialForCalc(m)}
                className="hover:underline flex items-center gap-1.5 text-slate-200 hover:text-white cursor-pointer transition"
                title={`${m.nameHi} - ₹${m.rate}/टन (क्लिक करके कैलकुलेटर में लोड करें)`}
              >
                <span className="text-slate-300 font-medium">{lang === 'hi' ? m.nameHi : m.nameEn}:</span>
                <span className="bg-slate-800 text-blue-300 px-2 py-0.5 rounded font-bold tabular-nums border border-slate-700">
                  ₹{m.rate}/टन
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center gap-8">
        {/* Zone 1: Pure Brand Logo & Wordmark */}
        <a href="#" className="flex items-center shrink-0">
          <BrandLogo size="md" />
        </a>

        {/* Zone 2: Clean single-line text links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs font-bold text-slate-600 dark:text-slate-300">
          <a href="#calculator" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'बल्क कैलकुलेटर' : 'Bulk Calculator'}
          </a>
          <a href="#materials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'सामग्री उत्पाद' : 'Crusher Materials'}
          </a>
          <a href="#dispatch" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'लाइव डिस्पैच' : 'Live Dispatch'}
          </a>
          <a href="#reviews" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'रिव्यू व फीडबैक' : 'Reviews & Feedback'}
          </a>
          <a href="#machinery" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'हैवी मशीनरी' : 'Machinery & Tenders'}
          </a>
          <a href="#erawaana" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0">
            {lang === 'hi' ? 'प्रमाण व नियम' : 'Compliance'}
          </a>
          <a href="#contact" className="text-amber-500 dark:text-amber-400 hover:text-amber-600 dark:hover:text-amber-300 font-extrabold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 bg-amber-500/10 dark:bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{lang === 'hi' ? 'संपर्क व बुकिंग' : 'Quarry Contact'}</span>
          </a>
        </div>

        {/* Zone 3: Primary Action & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Global Theme Switcher (Persistent Light / Dark Toggle) */}
          <button
            onClick={onToggleTheme}
            className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-500 text-slate-700 dark:text-slate-200 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            title={theme === 'dark' ? 'लाइट थीम सक्रिय करें / Switch to Light Theme' : 'डार्क थीम सक्रिय करें / Switch to Dark Theme'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-bold hidden sm:inline">{lang === 'hi' ? 'लाइट' : 'Light'}</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-[11px] font-bold hidden sm:inline">{lang === 'hi' ? 'डार्क' : 'Dark'}</span>
              </>
            )}
          </button>

          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-slate-400 text-slate-700 dark:text-slate-200 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs cursor-pointer"
            title="भाषा बदलें / Change Language"
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="uppercase text-[11px] font-bold">{lang === 'hi' ? 'EN' : 'हिन्दी'}</span>
          </button>

          {/* RTGS / QR Code Button */}
          <button
            onClick={onOpenPayment}
            className="hidden md:flex items-center gap-1.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:border-blue-600 text-slate-800 dark:text-slate-200 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{lang === 'hi' ? 'QR / RTGS' : 'QR / RTGS'}</span>
          </button>

          {/* Admin Button */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 sm:px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-slate-300 dark:border-slate-700 transition-colors shadow-xs cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'एडमिन' : 'Admin'}</span>
          </button>

          {/* Direct Call Button */}
          <a
            href="tel:+918926718000"
            className="brand-gradient text-white font-extrabold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1.5 shadow-sm hover:brightness-110 transition-all whitespace-nowrap shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{lang === 'hi' ? 'कॉल 8926718000' : 'Call 8926718000'}</span>
            <span className="sm:hidden">कॉल</span>
          </a>
        </div>
      </nav>
    </header>
  );
};
