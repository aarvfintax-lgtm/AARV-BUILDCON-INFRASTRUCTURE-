import React, { useState, useEffect } from 'react';
import { MaterialItem, QuoteCalculation, Language } from '../types';
import {
  Calculator,
  Truck,
  Phone,
  FileText,
  AlertCircle,
  ShieldCheck,
  Sparkles,
  Receipt,
  Building2,
  Navigation,
  MapPin,
  Route,
  ArrowRight
} from 'lucide-react';
import { Corporate3DStructureMark } from './BrandLogo';

interface HeroProps {
  materials: MaterialItem[];
  selectedMaterial: MaterialItem | null;
  lang: Language;
  onGenerateQuote: (quote: QuoteCalculation) => void;
  onOpenPayment?: (amount: number, orderRef?: string) => void;
}

interface DestinationPreset {
  nameHi: string;
  nameEn: string;
  km: number;
}

const DESTINATION_PRESETS: DestinationPreset[] = [
  { nameHi: 'भिवानी', nameEn: 'Bhiwani', km: 28 },
  { nameHi: 'हिसार', nameEn: 'Hisar', km: 55 },
  { nameHi: 'रोहतक', nameEn: 'Rohtak', km: 65 },
  { nameHi: 'रेवाड़ी', nameEn: 'Rewari', km: 110 },
  { nameHi: 'गुरुग्राम / NCR', nameEn: 'Gurugram / NCR', km: 125 },
  { nameHi: 'पानीपत', nameEn: 'Panipat', km: 145 },
  { nameHi: 'जयपुर', nameEn: 'Jaipur', km: 210 }
];

export const Hero: React.FC<HeroProps> = ({
  materials,
  selectedMaterial,
  lang,
  onGenerateQuote,
  onOpenPayment
}) => {
  const [calcTab, setCalcTab] = useState<'quote' | 'transport'>('quote');
  const [materialId, setMaterialId] = useState<number>(materials[0]?.id || 1);
  const [tons, setTons] = useState<number>(45);
  const [truckType] = useState<string>('सप्लायर ट्रांसपोर्टेशन (सुरक्षित साइट डिलीवरी)');
  const [km, setKm] = useState<number>(50);
  const [destinationName, setDestinationName] = useState<string>('दिल्ली-एनसीआर एक्सप्रेसवे साइट');
  const [gstType, setGstType] = useState<'intra' | 'inter'>('inter'); // Default inter-state
  const [custName, setCustName] = useState<string>('');
  const [custPhone, setCustPhone] = useState<string>('');
  const [custGstin, setCustGstin] = useState<string>('');
  const [freightRatePerTonKm] = useState<number>(4.5);
  const [copiedState, setCopiedState] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMaterial) {
      setMaterialId(selectedMaterial.id);
    }
  }, [selectedMaterial]);

  const activeMaterial = materials.find((m) => m.id === materialId) || materials[0];

  // GST State
  const [selectedGstRate, setSelectedGstRate] = useState<number>(5);
  const [isCustomGst, setIsCustomGst] = useState<boolean>(false);
  const [customGstInput, setCustomGstInput] = useState<string>('5');

  const isMoqViolated = tons < 40;
  const materialCost = activeMaterial ? activeMaterial.rate * tons : 0;
  const freightPerTon = Math.round(km * freightRatePerTonKm);
  const freightCost = freightPerTon * tons;
  const subtotal = materialCost + freightCost;

  // Landing Rate Per Ton (Ex-Quarry Material + Freight)
  const landingRatePerTon = (activeMaterial?.rate || 0) + freightPerTon;

  // Calculate GST dynamically
  const effectiveGstRate = isCustomGst ? (parseFloat(customGstInput) || 0) : selectedGstRate;
  const gstAmount = isMoqViolated ? 0 : Math.round(subtotal * (effectiveGstRate / 100));
  const cgstAmount = gstType === 'intra' ? Math.round(gstAmount / 2) : 0;
  const sgstAmount = gstType === 'intra' ? (gstAmount - cgstAmount) : 0;
  const igstAmount = gstType === 'inter' ? gstAmount : 0;
  const grandTotal = isMoqViolated ? 0 : subtotal + gstAmount;

  const handleSelectGstRate = (rate: number) => {
    setIsCustomGst(false);
    setSelectedGstRate(rate);
  };

  const handleEnableCustomGst = () => {
    setIsCustomGst(true);
  };

  const handleCreateQuote = (showModal: boolean = false) => {
    if (isMoqViolated) {
      alert(lang === 'hi'
        ? 'हम 40 टन से कम का आर्डर स्वीकार नहीं करते हैं। कृपया 40 या उससे अधिक टन दर्ज करें।'
        : 'Minimum Order Quantity is 40 Metric Tons. Please enter 40 MT or more.');
      return;
    }

    const now = new Date();
    const quoteData: QuoteCalculation = {
      material: activeMaterial,
      tons,
      truckType,
      distanceKm: km,
      materialCost,
      freightCost,
      subtotal,
      gstRate: effectiveGstRate,
      gstType,
      gstAmount,
      cgstAmount,
      sgstAmount,
      igstAmount,
      grandTotal,
      customerName: custName.trim() || (lang === 'hi' ? 'माननीय ठेकेदार / बिल्डर' : 'Valued Contractor'),
      customerPhone: custPhone.trim() || 'N/A',
      customerGstin: custGstin.trim().toUpperCase() || undefined,
      timestamp: now.toLocaleDateString('hi-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      quoteId: `AARV-${Math.floor(100000 + Math.random() * 900000)}`
    };

    if (showModal) {
      onGenerateQuote(quoteData);
    } else {
      // WhatsApp Direct Quote
      const message = encodeURIComponent(
        `*AARV BUILDCON INFRASTRUCTURE - थोक कोटेशन अनुरोध*\n\n` +
        `📦 *सामग्री:* ${activeMaterial.nameHi} (HSN ${activeMaterial.hsnCode})\n` +
        `⚖️ *मात्रा:* ${tons} मीट्रिक टन (MOQ 40 MT)\n` +
        `📍 *साइट दूरी:* ${km} KM (खनक प्लांट से ${destinationName})\n` +
        `💰 *एक्स-क्रशर सामग्री:* ₹${materialCost.toLocaleString('en-IN')}\n` +
        `🚚 *ट्रांसपोर्टेशन भाड़ा:* ₹${freightCost.toLocaleString('en-IN')} (₹${freightPerTon}/टन)\n` +
        `🏗️ *कुल लैंडिंग रेट:* ₹${landingRatePerTon}/टन\n` +
        `📑 *GST (${effectiveGstRate}%):* ₹${gstAmount.toLocaleString('en-IN')}\n` +
        `💵 *कुल लैंडिंग राशि:* ₹${grandTotal.toLocaleString('en-IN')}\n\n` +
        `👤 *क्लाइंट:* ${custName || 'ठेकेदार'}\n` +
        `📱 *फोन:* ${custPhone || 'N/A'}\n` +
        `नोट: 100% अग्रिम भुगतान अनिवार्य अथवा सीधे कॉल करें।`
      );
      window.open(`https://wa.me/918926718000?text=${message}`, '_blank');
    }
  };

  const handleCopySummary = () => {
    if (isMoqViolated) return;
    const text = `AARV BUILDCON: ${activeMaterial.nameHi} | ${tons} टन | गंतव्य: ${km} KM (${destinationName}) | एक्स-प्लांट: ₹${activeMaterial.rate}/टन | भाड़ा: ₹${freightPerTon}/टन | कुल लैंडिंग: ₹${landingRatePerTon}/टन | कुल मूल्य: ₹${grandTotal.toLocaleString('en-IN')} (GST सहित)`;
    navigator.clipboard.writeText(text);
    setCopiedState(true);
    setTimeout(() => setCopiedState(false), 2000);
  };

  const handleApplyPreset = (preset: DestinationPreset) => {
    setKm(preset.km);
    setDestinationName(lang === 'hi' ? preset.nameHi : preset.nameEn);
  };

  return (
    <section className="relative py-12 sm:py-18 px-4 bg-[#070B14] text-slate-100 border-b border-slate-800/80 overflow-hidden transition-colors">
      {/* High-Tech Stone Crusher Quarry Background with Radiant Cyber Grids */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/assets/aistudio/stone_crusher_plant_1792507891797_04e1b531.jpg"
          alt="AARV स्टोन क्रशर प्लांट व माइनिंग"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125 saturate-120"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070B14]/98 via-[#070B14]/92 to-blue-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070B14] via-transparent to-[#070B14]/70" />
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b20_1px,transparent_1px),linear-gradient(to_bottom,#1e293b20_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Pure Business Brand Identity */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* 1. Super-Prominent Firm Name Lockup (Big, Attractive, Monumental) */}
          <div className="space-y-3">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="shrink-0 transition-transform duration-300 hover:scale-105 filter drop-shadow-[0_0_20px_rgba(59,130,246,0.4)]">
                <Corporate3DStructureMark sizePx={64} interactive={true} />
              </div>
              <div>
                <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] leading-none">
                  <span className="bg-gradient-to-r from-white via-slate-100 to-slate-200 bg-clip-text text-transparent">
                    AARV BUILDCON
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs sm:text-sm font-black tracking-[0.2em] uppercase">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300">
                    INFRASTRUCTURE
                  </span>
                  <span className="text-slate-600 dark:text-slate-500">•</span>
                  <span className="text-amber-400 font-extrabold tracking-widest text-[11px] sm:text-xs">
                    खनक तोशाम (भिवानी) माइनिंग
                  </span>
                </div>
              </div>
            </div>

            {/* Wholesale Manufacturer Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/80 border border-blue-500/40 rounded-full text-blue-300 text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>{lang === 'hi' ? 'सीधे थोक निर्माता | ऑन-साइट ट्रांसपोर्टेशन सुविधा | न्यूनतम 40 मीट्रिक टन' : 'Direct Manufacturer & Bulk Supplier | Site Transport Included | MOQ 40 MT'}</span>
            </div>
          </div>

          {/* 2. Big & Attractive Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-white">
            {lang === 'hi' ? 'बिल्डिंग मैटेरियल्स एवं ' : 'Building Materials & '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-amber-300 block sm:inline sm:ml-2">
              {lang === 'hi' ? 'क्रशर उत्पाद के थोक निर्माता' : 'Crusher Wholesale Manufacturer'}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
            {lang === 'hi' ? (
              <>
                हाईवे, एक्सप्रेसवे, कमर्शियल प्रोजेक्ट्स और इन्फ्रास्ट्रक्चर निर्माण हेतु गिट्टी (6mm से 90mm), चक्की डस्ट, M-Sand, GSB और सैंड के सीधे थोक निर्माता व सप्लायर। हमारे पास साइट तक सीधी <strong className="text-white font-extrabold underline decoration-blue-500 decoration-2">ट्रांसपोर्टेशन सुविधा</strong> उपलब्ध है। <span className="text-amber-300 font-bold block sm:inline sm:ml-1">(न्यूनतम थोक ऑर्डर: 40 मीट्रिक टन)</span>
              </>
            ) : (
              <>
                Direct quarry manufacturers and bulk wholesale suppliers of graded aggregates (6mm to 90mm), crusher dust, M-Sand, and GSB with integrated door-delivery transport facility across Haryana, Delhi-NCR, Rajasthan & Punjab. (Strict MOQ: 40 MT).
              </>
            )}
          </p>

          {/* 3 Modern Metric Cards */}
          <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 bg-gradient-to-b from-slate-900/90 to-slate-950/90 rounded-2xl border border-slate-800/90 shadow-xl backdrop-blur-xl">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white tabular-nums font-mono">40 टन</div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-bold mt-0.5">
                {lang === 'hi' ? 'न्यूनतम आर्डर (MOQ)' : 'Minimum Order (MOQ)'}
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">थोक निर्माता</div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-bold mt-0.5">
                {lang === 'hi' ? 'क्रशर प्लांट व स्टॉकयार्ड' : 'Quarry & Plant Stock'}
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-black text-amber-400">ट्रांसपोर्ट सुविधा</div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-bold mt-0.5">
                {lang === 'hi' ? 'ऑन-साइट डिलीवरी उपलब्ध' : 'Door Delivery Available'}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href="tel:+918926718000"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 shadow-sm transition-all hover:scale-[1.02]"
            >
              <Phone className="w-4 h-4" />
              <span>{lang === 'hi' ? 'कॉल करें 8926718000' : 'Call 8926718000'}</span>
            </a>
            <a
              href="tel:+917357707308"
              className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center gap-2 border border-slate-300 dark:border-slate-700 transition-all hover:scale-[1.02] shadow-xs"
            >
              <Phone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'hi' ? 'कॉल करें 7357707308' : 'Call 7357707308'}</span>
            </a>
            <a
              href="#materials"
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2.5 px-4 rounded-xl text-xs border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5"
            >
              <span>{lang === 'hi' ? 'सभी 11 उत्पाद दरें देखें' : 'View All 11 Materials'}</span>
              <span>→</span>
            </a>
          </div>

          {/* Authentic On-Site Quarry & Transport Ground Reality Preview with Real User Images */}
          <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{lang === 'hi' ? 'हमारा क्रशर प्लांट, स्टॉकयार्ड व ऑन-साइट ट्रांसपोर्टेशन' : 'Our Crusher Plant, Stockyard & On-Site Transport'}</span>
              </span>
              <a href="#dispatch" className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-[11px]">
                {lang === 'hi' ? 'लाइव डिस्पैच वॉल देखें →' : 'View Live Wall →'}
              </a>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="relative rounded-xl overflow-hidden group h-24 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <img
                  src="/assets/aistudio/stone_crusher_plant_1792507891797_04e1b531.jpg"
                  alt="AARV स्टोन क्रशर प्लांट व माइनिंग"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] text-white font-bold">क्रशर प्लांट प्रोसेस</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden group h-24 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <img
                  src="/assets/aistudio/crusher_materials_fleet_1792508033360_750b51bb.jpg"
                  alt="20mm गिट्टी स्टॉकयार्ड व लोडर"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] text-white font-bold">20mm स्टॉक व लोडिंग</span>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden group h-24 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800">
                <img
                  src="/assets/aistudio/tipper_truck_rodi_1792507234326_79e051c1.jpg"
                  alt="ऑन-साइट ट्रांसपोर्टेशन डिलीवरी"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-1.5">
                  <span className="text-[10px] text-white font-bold">ऑन-साइट सुरक्षित डिलीवरी</span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust points */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% पक्का जीएसटी बिल व ई-रवाना</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>कंप्यूटराइज्ड धर्मकांटा तौल</span>
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>हरियाणा, दिल्ली-NCR, पंजाब, राजस्थान</span>
            </span>
          </div>
        </div>

        {/* Right Column: Dynamic Dual-Mode Bulk & Transport Cost Calculator */}
        <div id="calculator" className="lg:col-span-5 bg-gradient-to-b from-slate-900/95 via-[#0C1224]/95 to-slate-950/98 p-5 sm:p-7 rounded-3xl border border-blue-500/30 shadow-2xl relative scroll-mt-28 backdrop-blur-2xl text-slate-100">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-500 rounded-t-3xl" />
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{lang === 'hi' ? 'न्यूनतम 40 टन बल्क' : 'MOQ 40 MT'}</span>
          </div>

          {/* Calculator Mode Switcher Tabs */}
          <div className="flex items-center p-1 bg-slate-950/80 rounded-xl mb-4 border border-slate-800">
            <button
              type="button"
              onClick={() => setCalcTab('quote')}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                calcTab === 'quote'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{lang === 'hi' ? 'थोक माल + GST कोट' : 'Order & GST Quote'}</span>
            </button>
            <button
              type="button"
              onClick={() => setCalcTab('transport')}
              className={`flex-1 py-2 px-2.5 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                calcTab === 'transport'
                  ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'hi' ? 'दूरी व लैंडिंग भाड़ा' : 'Transport & Freight'}</span>
            </button>
          </div>

          {/* Title Header */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
            {calcTab === 'transport' ? (
              <>
                <Truck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{lang === 'hi' ? 'ट्रांसपोर्ट व साइट लैंडिंग कॉस्ट कैलकुलेटर' : 'Transport & Landing Cost Calculator'}</span>
              </>
            ) : (
              <>
                <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>{lang === 'hi' ? 'थोक माल, भाड़ा व 5% GST कैलकुलेटर' : 'Material, Freight & 5% GST Calculator'}</span>
              </>
            )}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
            {calcTab === 'transport'
              ? (lang === 'hi'
                ? 'खनक (तोशाम) क्रशर प्लांट से अपने गंतव्य की दूरी दर्ज करें और प्रति टन व कुल साइट लैंडिंग लागत जानें।'
                : 'Input your destination distance from Khanak to estimate direct door-delivery landing cost.')
              : (lang === 'hi'
                ? 'सामग्री का प्रकार, मात्रा एवं टैक्स प्रकार चुनकर त्वरित डिलीवरी कोटेशन निकालें।'
                : 'Calculate bulk material order cost with verified GST and transport.')}
          </p>

          <div className="space-y-4">
            
            {/* If in Transport Mode: Highlighted Origin & Destination Hub Presets */}
            {calcTab === 'transport' && (
              <div className="bg-blue-50/70 dark:bg-blue-950/40 p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-blue-900 dark:text-blue-300 font-bold">
                    <Navigation className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>सप्लाई स्रोत (Origin):</span>
                    <span className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 font-extrabold">
                      खनक (तोशाम, भिवानी)
                    </span>
                  </div>
                  <span className="text-[10px] text-blue-700 dark:text-blue-400 font-bold">₹4.50/टन-KM</span>
                </div>

                {/* Quick Destination Presets */}
                <div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                    त्वरित प्रमुख गंतव्य चुनें (Quick Destination Hubs):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {DESTINATION_PRESETS.map((p) => (
                      <button
                        key={p.nameEn}
                        type="button"
                        onClick={() => handleApplyPreset(p)}
                        className={`text-[10px] px-2 py-1 rounded-md font-semibold transition cursor-pointer border ${
                          km === p.km
                            ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        {lang === 'hi' ? p.nameHi : p.nameEn} ({p.km} KM)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Destination Name & KM Input */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      साइट / प्रोजेक्ट का नाम:
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. रोहतक हाईवे पैकेज"
                      value={destinationName}
                      onChange={(e) => setDestinationName(e.target.value)}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      गंतव्य दूरी (KM Lead) *:
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min={1}
                        value={km}
                        onChange={(e) => setKm(Number(e.target.value))}
                        className="w-full bg-white dark:bg-slate-800 border border-blue-500 rounded-lg p-2 text-xs text-slate-900 dark:text-white font-black tabular-nums focus:outline-none pr-8"
                      />
                      <span className="absolute right-2.5 top-2 text-xs font-bold text-slate-500 dark:text-slate-400">KM</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Material Selector with HSN */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {lang === 'hi' ? 'मैटेरियल का प्रकार व साइज' : 'Material Type & Size'}
                </label>
                <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded font-mono font-bold">
                  HSN: {activeMaterial.hsnCode} | GST: 5%
                </span>
              </div>
              <select
                value={materialId}
                onChange={(e) => setMaterialId(Number(e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-blue-600 transition-colors"
              >
                {materials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {lang === 'hi' ? m.nameHi : m.nameEn} — ₹{m.rate}/टन (HSN {m.hsnCode})
                  </option>
                ))}
              </select>
            </div>

            {/* Tons & Transport Mode */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {lang === 'hi' ? 'मात्रा (टन में)' : 'Tonnage (MT)'}
                  </label>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">
                    {lang === 'hi' ? 'न्यूनतम 40T' : 'Min 40T'}
                  </span>
                </div>
                <input
                  type="number"
                  value={tons}
                  min={1}
                  step={5}
                  onChange={(e) => setTons(Number(e.target.value))}
                  className={`w-full bg-slate-50 dark:bg-slate-800 border ${
                    isMoqViolated ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 dark:border-slate-700 focus:border-blue-600'
                  } rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-bold focus:outline-none transition-colors tabular-nums`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'hi' ? 'ट्रांसपोर्टेशन डिलीवरी' : 'Transport & Delivery'}
                </label>
                <div className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white font-bold flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-blue-900 dark:text-blue-300 truncate">
                    <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <span>{lang === 'hi' ? 'डोरस्टेप ट्रांसपोर्ट' : 'Transport'}</span>
                  </span>
                  <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold px-2 py-0.5 rounded-full shrink-0">
                    साइट डिलीवरी
                  </span>
                </div>
              </div>
            </div>

            {/* 40-Ton MOQ Warning Alert */}
            {isMoqViolated && (
              <div className="bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-800 dark:text-red-300 text-[11px] p-2.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                <span>
                  <strong>अमान्य मात्रा:</strong> हम 40 टन से कम का आर्डर नहीं लेते। कृपया 40 या उससे अधिक टन दर्ज करें।
                </span>
              </div>
            )}

            {/* Distance & Tax inputs if in Quote mode */}
            {calcTab === 'quote' && (
              <div className="bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Receipt className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{lang === 'hi' ? 'जीएसटी दर चुनें (GST Rate):' : 'Select GST Rate:'}</span>
                  </label>
                  <span className="text-[10px] text-blue-700 dark:text-blue-300 font-bold bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded-full">
                    लागू दर: {effectiveGstRate}%
                  </span>
                </div>

                {/* GST Rate Buttons */}
                <div className="grid grid-cols-4 gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleSelectGstRate(5)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border cursor-pointer ${
                      !isCustomGst && selectedGstRate === 5
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>5% GST</span>
                    <span className="text-[9px] font-normal opacity-90">स्टोन व सैंड</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGstRate(18)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border cursor-pointer ${
                      !isCustomGst && selectedGstRate === 18
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>18% GST</span>
                    <span className="text-[9px] font-normal opacity-90">टेंडर/सर्विस</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectGstRate(0)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border cursor-pointer ${
                      !isCustomGst && selectedGstRate === 0
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>0% GST</span>
                    <span className="text-[9px] font-normal opacity-90">कर मुक्त</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleEnableCustomGst}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center border cursor-pointer ${
                      isCustomGst
                        ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>कस्टम %</span>
                    <span className="text-[9px] font-normal opacity-90">अन्य दर</span>
                  </button>
                </div>

                {isCustomGst && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">कस्टम जीएसटी प्रतिशत:</span>
                    <div className="flex items-center gap-1 w-28">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        value={customGstInput}
                        onChange={(e) => setCustomGstInput(e.target.value)}
                        className="w-full bg-white dark:bg-slate-800 border border-blue-500 rounded-lg p-1.5 text-xs text-slate-900 dark:text-white font-bold text-center focus:outline-none"
                      />
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">%</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {lang === 'hi' ? 'दूरी (KM Lead)' : 'Lead Distance (KM)'}
                      </label>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                        ₹4.50/टन-KM
                      </span>
                    </div>
                    <input
                      type="number"
                      value={km}
                      min={1}
                      onChange={(e) => setKm(Number(e.target.value))}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-blue-600 transition-colors tabular-nums"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'कर प्रकार' : 'Tax Scheme'}
                    </label>
                    <select
                      value={gstType}
                      onChange={(e) => setGstType(e.target.value as 'intra' | 'inter')}
                      className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2 text-xs text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-600 transition-colors"
                    >
                      <option value="inter">इंटर-स्टेट IGST (NCR/पंजाब/राजस्थान)</option>
                      <option value="intra">इंट्रा-स्टेट (CGST + SGST आधा-आधा)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Customer Contact Quick Inputs */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder={lang === 'hi' ? 'कंपनी / पार्टी का नाम' : 'Company / Contractor'}
                value={custName}
                onChange={(e) => setCustName(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
              />
              <input
                type="tel"
                placeholder={lang === 'hi' ? 'मोबाइल नंबर' : 'Phone Number'}
                value={custPhone}
                onChange={(e) => setCustPhone(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* GSTIN Field */}
            <div>
              <input
                type="text"
                placeholder={lang === 'hi' ? 'पार्टी GSTIN नंबर (इनपुट टैक्स क्रेडिट हेतु, वैकल्पिक)' : 'Client GSTIN (for B2B Tax Credit, Optional)'}
                value={custGstin}
                onChange={(e) => setCustGstin(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-2.5 text-xs text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:border-blue-600 transition-colors"
              />
            </div>

            {/* Full Price, Freight & Landing Cost Breakdown Box */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[11px] space-y-1.5">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>एक्स-क्रशर सामग्री भाव:</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  ₹{activeMaterial.rate} / टन
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ट्रांसपोर्टेशन भाड़ा लीड ({km} KM):</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  + ₹{freightPerTon} / टन <span className="text-[10px] text-slate-400">(₹4.50/टन-KM)</span>
                </span>
              </div>
              
              {/* Highlighted Per-Ton Landing Rate */}
              <div className="flex justify-between items-center text-blue-900 dark:text-blue-300 font-extrabold bg-blue-100/60 dark:bg-blue-950/60 px-2 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800">
                <span className="flex items-center gap-1">
                  <Route className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>प्रति टन कुल लैंडिंग दर (Landing Rate/MT):</span>
                </span>
                <span className="text-xs font-black tabular-nums">
                  ₹{landingRatePerTon} / टन
                </span>
              </div>

              <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1">
                <span>सामग्री कुल लागत ({tons} टन):</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {isMoqViolated ? '—' : `₹${materialCost.toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>ट्रांसपोर्टेशन कुल भाड़ा ({tons} टन × ₹{freightPerTon}):</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                  {isMoqViolated ? '—' : `₹${freightCost.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex justify-between text-slate-700 dark:text-slate-300 font-bold border-t border-slate-200 dark:border-slate-700 pt-1">
                <span>कर योग्य मूल्य (Taxable Subtotal):</span>
                <span className="tabular-nums">
                  {isMoqViolated ? '—' : `₹${subtotal.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex justify-between text-blue-700 dark:text-blue-300 font-bold bg-blue-50/70 dark:bg-blue-950/70 p-1.5 rounded-lg border border-blue-200/60 dark:border-blue-900/60">
                <span className="flex items-center gap-1">
                  <Receipt className="w-3.5 h-3.5" />
                  <span>
                    {effectiveGstRate === 0
                      ? '0% GST (छूट / Exempted):'
                      : gstType === 'intra'
                        ? `${effectiveGstRate}% GST (CGST ${(effectiveGstRate / 2).toFixed(1)}% + SGST ${(effectiveGstRate / 2).toFixed(1)}%):`
                        : `${effectiveGstRate}% GST (IGST ${effectiveGstRate}% - HSN ${activeMaterial.hsnCode}):`}
                  </span>
                </span>
                <span className="tabular-nums text-blue-900 dark:text-blue-200">
                  {isMoqViolated ? '—' : `+ ₹${gstAmount.toLocaleString('en-IN')}`}
                </span>
              </div>
            </div>

            {/* Total Grand Calculation & Action Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-3">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">
                  {lang === 'hi' ? `कुल साइट लैंडिंग राशि (${effectiveGstRate}% GST सहित):` : `Total Landing Cost (with ${effectiveGstRate}% GST):`}
                </span>
                <span className={`text-2xl font-black tabular-nums ${isMoqViolated ? 'text-red-600 text-sm' : 'text-blue-900 dark:text-blue-300'}`}>
                  {isMoqViolated ? (lang === 'hi' ? 'अमान्य (न्यूनतम 40 टन)' : 'Invalid (Min 40 MT)') : `₹${grandTotal.toLocaleString('en-IN')}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onOpenPayment && !isMoqViolated && (
                  <button
                    type="button"
                    onClick={() => {
                      onOpenPayment(grandTotal, `${activeMaterial.nameHi} (${tons}T Delivery ${km}KM)`);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl transition text-xs font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    title={lang === 'hi' ? '100% अग्रिम भुगतान हेतु QR स्कैन करें' : 'Scan QR for Payment'}
                  >
                    <span>₹ QR भुगतान</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleCreateQuote(true)}
                  disabled={isMoqViolated}
                  className={`bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 transition text-xs flex items-center gap-1.5 cursor-pointer ${
                    isMoqViolated ? 'opacity-40 cursor-not-allowed' : ''
                  }`}
                  title={lang === 'hi' ? 'प्रारूप जीएसटी कोटेशन पर्ची देखें' : 'View GST Quote Slip'}
                >
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="hidden sm:inline">{lang === 'hi' ? 'जीएसटी पर्ची' : 'GST Slip'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCreateQuote(false)}
                  disabled={isMoqViolated}
                  className={`bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3.5 rounded-xl flex items-center gap-1.5 text-xs shadow-sm transition-all cursor-pointer ${
                    isMoqViolated ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02]'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'WhatsApp कोट' : 'WhatsApp'}</span>
                </button>
              </div>
            </div>

            {/* Direct Call & Copy summary button */}
            {!isMoqViolated && (
              <div className="flex justify-between items-center pt-1 text-[11px]">
                <a href="tel:+918926718000" className="text-blue-600 dark:text-blue-400 hover:underline font-bold flex items-center gap-1">
                  <Phone className="w-3 h-3" /> सीधे बात करें (8926718000)
                </a>
                <button
                  onClick={handleCopySummary}
                  className="text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 underline transition cursor-pointer"
                >
                  {copiedState ? '✓ कॉपी हुआ' : 'लैंडिंग समरी कॉपी करें'}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
