import React, { useState } from 'react';
import { MaterialItem, Language } from '../types';
import {
  Boxes,
  Box,
  Layers,
  Shapes,
  Footprints,
  Mountain,
  Gem,
  AlignJustify,
  Wind,
  Factory,
  Waves,
  Scale,
  ArrowRight,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';

interface MaterialsCatalogProps {
  materials: MaterialItem[];
  lang: Language;
  onSelectForCalc: (item: MaterialItem) => void;
}

export const MaterialsCatalog: React.FC<MaterialsCatalogProps> = ({
  materials,
  lang,
  onSelectForCalc
}) => {
  const [filter, setFilter] = useState<'all' | 'gitti' | 'dust_sand' | 'base_metal'>('all');

  const filteredMaterials = filter === 'all'
    ? materials
    : materials.filter((m) => m.category === filter);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Shapes': return <Shapes className="w-5 h-5 text-blue-600" />;
      case 'Box': return <Box className="w-5 h-5 text-blue-600" />;
      case 'Layers': return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-blue-600" />;
      case 'Footprints': return <Footprints className="w-5 h-5 text-blue-600" />;
      case 'Mountain': return <Mountain className="w-5 h-5 text-blue-600" />;
      case 'Gem': return <Gem className="w-5 h-5 text-blue-600" />;
      case 'AlignJustify': return <AlignJustify className="w-5 h-5 text-blue-600" />;
      case 'Wind': return <Wind className="w-5 h-5 text-blue-600" />;
      case 'Factory': return <Factory className="w-5 h-5 text-blue-600" />;
      case 'Waves': return <Waves className="w-5 h-5 text-blue-600" />;
      default: return <Boxes className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="materials" className="bg-slate-100/60 dark:bg-slate-950 py-16 px-4 border-t border-slate-200 dark:border-slate-800 scroll-mt-20 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider block mb-1">
              {lang === 'hi' ? 'थोक क्रशर उत्पाद सूची (वर्तमान भाव)' : 'Crusher Materials Catalog'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              {lang === 'hi' ? 'सर्टिफाइड क्रशर सामग्रियां (न्यूनतम 40 MT)' : 'Certified Aggregates (MOQ: 40 MT)'}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 font-bold px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800">
              <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>100% अग्रिम भुगतान अथवा सीधे कॉल करें</span>
            </span>
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 shadow-xs">
              <Scale className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span>{lang === 'hi' ? 'धर्मकांटा व ई-रवाना सहित' : 'Weighbridge & E-Rawaana Included'}</span>
            </div>
          </div>
        </div>

        {/* Filter Tabs in Modern Blue & Slate */}
        <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 w-fit shadow-xs">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'सभी सामग्री (11)' : 'All Materials (11)'}
          </button>
          <button
            onClick={() => setFilter('gitti')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'gitti' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'गिट्टी / एग्रीगेट्स (6-40mm)' : 'Aggregates (6-40mm)'}
          </button>
          <button
            onClick={() => setFilter('dust_sand')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'dust_sand' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'स्टोन डस्ट व सैंड' : 'Dust & Sand'}
          </button>
          <button
            onClick={() => setFilter('base_metal')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              filter === 'base_metal' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {lang === 'hi' ? 'रोड मेटल, GSB व सोलिंग' : 'GSB, WBM & Soling'}
          </button>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {filteredMaterials.map((m) => (
            <div
              key={m.id}
              className="bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl flex flex-col justify-between transition-all duration-200 group shadow-xs hover:shadow-md"
            >
              <div>
                <div className="flex justify-between items-start mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition">
                    {getIcon(m.iconName)}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/80 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 font-bold block">
                      न्यूनतम 40T
                    </span>
                    <span className="text-[9px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 block">
                      100% एडवांस
                    </span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {lang === 'hi' ? m.nameHi : m.nameEn}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5 mb-2">
                  {m.sizeSpecs}
                </p>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2 mb-2">
                  {lang === 'hi' ? m.descriptionHi : m.descriptionEn}
                </p>

                <div className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-2.5 rounded-xl border border-slate-200 dark:border-slate-750 mb-3">
                  <strong className="text-slate-900 dark:text-white font-bold block text-[10px] uppercase mb-0.5">
                    {lang === 'hi' ? 'अनुशंसित उपयोग:' : 'Application:'}
                  </strong>
                  <span className="line-clamp-2">
                    {lang === 'hi' ? m.recommendedHi : m.recommendedEn}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">एक्स-क्रशर भाव:</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white tabular-nums">
                    ₹{m.rate} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">/ टन</span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-[10px] text-blue-700 dark:text-blue-400 font-semibold mb-3">
                  <span>HSN: {m.hsnCode}</span>
                  <span className="bg-blue-50 dark:bg-blue-950/80 px-1.5 py-0.2 rounded border border-blue-200 dark:border-blue-800">+ 5% GST अतिरिक्त</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      onSelectForCalc(m);
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 py-2 px-2 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1 transition cursor-pointer"
                  >
                    <span>कैलकुलेटर</span>
                    <ArrowRight className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                  </button>

                  <a
                    href={`https://wa.me/918926718000?text=नमस्ते%20AARV%20Buildcon,%20मुझे%20${encodeURIComponent(m.nameHi)}%20(दर%20₹${m.rate}/टन)%20का%2040+%20टन%20बल्क%20कोटेशन%20चाहिए।%20100%%20एडवांस%20पेमेंट%20स्वीकार्य%20है।`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>ऑर्डर करें</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
