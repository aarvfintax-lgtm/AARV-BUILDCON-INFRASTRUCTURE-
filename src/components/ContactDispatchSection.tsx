import React, { useState } from 'react';
import { Language, MaterialItem } from '../types';
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  Clock,
  ShieldCheck,
  Send,
  Truck,
  CheckCircle2,
  Copy,
  ExternalLink,
  Building2,
  Scale
} from 'lucide-react';

interface ContactDispatchSectionProps {
  materials: MaterialItem[];
  lang: Language;
}

export const ContactDispatchSection: React.FC<ContactDispatchSectionProps> = ({ materials, lang }) => {
  const [selectedMatId, setSelectedMatId] = useState<number>(materials[0]?.id || 1);
  const [tons, setTons] = useState<number>(45);
  const [destination, setDestination] = useState<string>('गुरुग्राम / NCR (एक्सप्रेसवे साइट)');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [copiedAddress, setCopiedAddress] = useState<boolean>(false);
  const [formSent, setFormSent] = useState<boolean>(false);

  const activeMaterial = materials.find((m) => m.id === selectedMatId) || materials[0];
  const isMoqValid = tons >= 40;

  const handleCopyAddress = () => {
    const fullAddress = 'AARV BUILDCON INFRASTRUCTURE, शॉप नं. 1, 2, विश्वकर्मा मंदिर मार्केट, निकट राजकीय वरिष्ठ माध्यमिक विद्यालय (Govt Sr Sec School), ग्राम व डाकघर: खनक, तहसील: तोशाम, जिला: भिवानी (हरियाणा) - 127040';
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleSendWhatsAppDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isMoqValid) {
      alert(lang === 'hi' ? 'न्यूनतम आर्डर 40 टन होना अनिवार्य है।' : 'Minimum order quantity is 40 MT.');
      return;
    }

    const text = encodeURIComponent(
      `*AARV BUILDCON INFRASTRUCTURE - डायरेक्ट साइट डिस्पैच बुकिंग अनुरोध*\n\n` +
      `📦 *सामग्री:* ${activeMaterial.nameHi} (HSN ${activeMaterial.hsnCode})\n` +
      `⚖️ *मात्रा:* ${tons} मीट्रिक टन (MOQ 40 MT स्वीकृत)\n` +
      `📍 *डिलीवरी साइट / गंतव्य:* ${destination}\n` +
      `👤 *पार्टी / ठेकेदार:* ${clientName || 'सम्मानित क्लाइंट'}\n` +
      `📞 *संपर्क नंबर:* ${clientPhone || 'N/A'}\n\n` +
      `✅ *नियम स्वीकृति:* 100% अग्रिम भुगतान व कंप्यूटराइज्ड धर्मकांटा तौल मान्य।\n` +
      `कृपया तुरंत गाड़ी रवानगी का कन्फर्मेशन व बैंक डिटेल्स साझा करें।`
    );

    window.open(`https://wa.me/918926718000?text=${text}`, '_blank');
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 bg-[#070B14] text-slate-100 overflow-hidden border-t border-slate-800/80">
      {/* High-Tech Glowing Ambient Background Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-cyan-500/10 to-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-blue-500/10 rounded-full blur-[100px]" />
        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Header Block: High-Tech Executive Typography */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-blue-400 text-xs font-black tracking-widest uppercase shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{lang === 'hi' ? 'डायरेक्ट डिस्पैच हॉटलाइन व प्लांट बुकिंग' : 'DIRECT QUARRY DISPATCH & HOTLINE'}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-400 leading-tight">
            {lang === 'hi' ? 'सीधे प्लांट से संपर्क व माल बुकिंग' : 'Direct Factory Booking & Quarry Contact'}
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            {lang === 'hi' ? (
              <>
                खनक (तोशाम), भिवानी स्टोन क्रशर प्लांट से सीधे थोक सामग्री व 22 टायरी ट्रेलर ऑन-साइट डिलीवरी हेतु तुरंत संपर्क करें। <span className="text-amber-400 font-semibold">न्यूनतम आर्डर 40 टन</span>।
              </>
            ) : (
              <>
                Connect directly with our Khanak Tosham quarry dispatch desk for wholesale bulk supply and 22-tyre trailer site logistics. Strict MOQ 40 Metric Tons.
              </>
            )}
          </p>
        </div>

        {/* Main Grid: Left Hotlines + Right Interactive Booking Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Hotlines & Plant Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Primary Hotline 1 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-blue-500/50 transition-all duration-300 shadow-xl group">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-blue-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span>{lang === 'hi' ? 'मुख्य डिस्पैच एवं बुकिंग हॉटलाइन' : 'Primary Dispatch Desk'}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight group-hover:text-blue-300 transition-colors">
                    +91 89267 18000
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi' ? 'त्वरित रेट, गाड़ी रवानगी व WhatsApp कोटेशन' : 'Fast rates, vehicle dispatch & WhatsApp quote'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-[0_0_20px_rgba(37,99,235,0.25)]">
                  <Phone className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <a
                  href="tel:+918926718000"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{lang === 'hi' ? 'सीधे कॉल करें' : 'Call Directly'}</span>
                </a>
                <a
                  href="https://wa.me/918926718000?text=नमस्ते%20AARV%20BUILDCON%20मुझे%20थोक%20क्रशर%20सामग्री%20की%20आवश्यकता%20है।"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 border border-emerald-500/30 text-emerald-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Secondary Hotline 2 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/90 hover:border-amber-500/50 transition-all duration-300 shadow-xl group">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span>{lang === 'hi' ? 'बिलिंग व अकाउंट्स सहायता' : 'Billing & Accounts Desk'}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight group-hover:text-amber-300 transition-colors">
                    +91 73577 07308
                  </div>
                  <p className="text-xs text-slate-400">
                    {lang === 'hi' ? 'GST इनवॉयस, RTGS/NEFT अग्रिम पुष्टि व धर्मकांटा' : 'GST Invoice, RTGS confirmation & weighment'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <Phone className="w-6 h-6" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2">
                <a
                  href="tel:+917357707308"
                  className="w-full text-center py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'hi' ? 'कॉल करें: 7357707308' : 'Call: 7357707308'}</span>
                </a>
              </div>
            </div>

            {/* Official Registered Quarry Office */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                <span className="flex items-center gap-2 text-blue-400">
                  <MapPin className="w-4 h-4" />
                  <span>{lang === 'hi' ? 'आधिकारिक ऑफिस व प्लांट पता' : 'Registered Plant Office'}</span>
                </span>
                <button
                  onClick={handleCopyAddress}
                  className="text-slate-400 hover:text-white flex items-center gap-1 text-[11px] transition-colors"
                  title="पता कॉपी करें"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedAddress ? (lang === 'hi' ? 'कॉपी हुआ!' : 'Copied!') : (lang === 'hi' ? 'कॉपी करें' : 'Copy')}</span>
                </button>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed font-medium space-y-1">
                <p className="text-white font-bold">AARV BUILDCON INFRASTRUCTURE</p>
                <p>शॉप नं. 1, 2, विश्वकर्मा मंदिर मार्केट,</p>
                <p>निकट राजकीय वरिष्ठ माध्यमिक विद्यालय (Govt Sr Sec School),</p>
                <p>
                  ग्राम व डाकघर: <strong className="text-white">खनक (KHANAK)</strong>, तहसील: <strong className="text-white">तोशाम (TOSHAM)</strong>,
                </p>
                <p>
                  जिला: <strong className="text-blue-400">भिवानी, हरियाणा - 127040</strong>
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:aarvfintax@gmail.com" className="hover:text-blue-400 transition-colors">
                    aarvfintax@gmail.com
                  </a>
                </span>
                <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                  <Clock className="w-3 h-3" />
                  <span>धर्मकांटा: 24 घंटे लाइव</span>
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Tech Direct Booking Terminal (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900/95 via-[#0B132B]/95 to-slate-950/95 border border-blue-500/30 shadow-2xl relative overflow-hidden backdrop-blur-xl">
              
              {/* Luminous Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-amber-500" />

              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Truck className="w-5 h-5 text-blue-400" />
                    <span>{lang === 'hi' ? 'डायरेक्ट थोक डिस्पैच बुकिंग' : 'Direct Wholesale Dispatch Booking'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {lang === 'hi'
                      ? 'अपनी सामग्री व मात्रा चुनें — 15 मिनट में ऑन-साइट रेट व गाड़ी रवानगी स्टेटस पाएं'
                      : 'Select material & volume — Get instant on-site landed rates & trailer allocation'}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-black text-[11px] uppercase tracking-wider">
                    MOQ 40 MT
                  </span>
                </div>
              </div>

              <form onSubmit={handleSendWhatsAppDispatch} className="space-y-4">
                
                {/* 1. Material Selection */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {lang === 'hi' ? 'सामग्री का चयन करें (Material Selection)' : 'Select Aggregates / Material'}
                  </label>
                  <select
                    value={selectedMatId}
                    onChange={(e) => setSelectedMatId(Number(e.target.value))}
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    {materials.map((m) => (
                      <option key={m.id} value={m.id} className="bg-slate-950 text-white">
                        {m.nameHi} ({m.nameEn}) • ₹{m.rate}/टन (HSN {m.hsnCode})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Volume Stepper & MOQ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                        {lang === 'hi' ? 'आर्डर मात्रा (मीट्रिक टन)' : 'Volume (Metric Tons)'}
                      </label>
                      <span className={`text-[11px] font-extrabold ${isMoqValid ? 'text-emerald-400' : 'text-red-400 animate-pulse'}`}>
                        {isMoqValid ? '✓ वैध थोक मात्रा' : '⚠️ न्यूनतम 40 टन आवश्यक'}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        min="40"
                        step="5"
                        value={tons}
                        onChange={(e) => setTons(Number(e.target.value) || 0)}
                        className={`w-full bg-slate-950/80 border ${isMoqValid ? 'border-slate-700' : 'border-red-500'} rounded-xl px-3.5 py-2.5 text-sm font-bold font-mono text-white focus:outline-none focus:border-blue-500`}
                        placeholder="45"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-500 font-bold">MT (टन)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {lang === 'hi' ? 'डिलीवरी गंतव्य (Destination Site)' : 'Destination Site'}
                    </label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-blue-500"
                      placeholder="उदा. रोहतक, गुरुग्राम एक्सप्रेसवे, हिसार"
                    />
                  </div>
                </div>

                {/* 3. Contractor Name & Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {lang === 'hi' ? 'पार्टी / ठेकेदार नाम' : 'Party / Contractor Name'}
                    </label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-blue-500"
                      placeholder="उदा. शर्मा कंस्ट्रक्शन"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {lang === 'hi' ? 'मोबाइल नंबर (कॉल व WhatsApp)' : 'Mobile Number'}
                    </label>
                    <input
                      type="tel"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-blue-500"
                      placeholder="उदा. 98120XXXXX"
                      required
                    />
                  </div>
                </div>

                {/* Live Summary Bar */}
                <div className="p-3.5 rounded-xl bg-blue-950/50 border border-blue-500/20 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400">अनुमानित सामग्री: </span>
                    <span className="text-white font-bold">{activeMaterial.nameHi} ({tons} MT)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400">एक्स-प्लांट: </span>
                    <span className="text-blue-300 font-bold font-mono">₹{Math.round(activeMaterial.rate * tons).toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Action Submit Buttons */}
                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="submit"
                    disabled={!isMoqValid}
                    className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{formSent ? (lang === 'hi' ? 'डॉक्युमेंट भेजा गया!' : 'Docket Sent!') : (lang === 'hi' ? 'WhatsApp पर डिस्पैच भेजें' : 'Send WhatsApp Booking')}</span>
                  </button>

                  <a
                    href="tel:+918926718000"
                    className="w-full py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{lang === 'hi' ? 'सीधे कॉल पर बात करें' : 'Call Dispatch Desk'}</span>
                  </a>
                </div>

                {/* Terms Guarantee Pill */}
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-400 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>100% अग्रिम भुगतान अनिवार्य</span>
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Scale className="w-3.5 h-3.5 text-blue-400" />
                    <span>कंप्यूटराइज्ड धर्मकांटा पर्ची</span>
                  </span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
