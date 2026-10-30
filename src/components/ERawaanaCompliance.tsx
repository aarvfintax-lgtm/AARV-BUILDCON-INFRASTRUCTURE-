import React from 'react';
import { Language } from '../types';
import { ShieldCheck, Scale, FileText, CheckCircle, Truck, AlertTriangle } from 'lucide-react';

interface ERawaanaComplianceProps {
  lang: Language;
}

export const ERawaanaCompliance: React.FC<ERawaanaComplianceProps> = ({ lang }) => {
  return (
    <section id="erawaana" className="bg-[#F5F0E8] py-14 px-4 border-t border-amber-900/10 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-blue-700 font-extrabold text-xs uppercase tracking-wider block mb-1">
            {lang === 'hi' ? '100% कानूनी एवं प्रमाणित सप्लाई' : '100% Legal & Compliant Transit'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {lang === 'hi' ? 'ई-रवाना (E-Rawaana) व कंप्यूटराइज्ड धर्मकांटा गारंटी' : 'E-Rawaana Pass & Computerized Weighment Guarantee'}
          </h2>
          <p className="text-xs text-slate-600 mt-2">
            {lang === 'hi'
              ? 'हरियाणा खान एवं भूविज्ञान विभाग के सख्त नियमों के तहत प्रत्येक 22 टायरी ट्रेलर के साथ डिजिटल ई-रवाना और इलेक्ट्रॉनिक कांटा पर्ची जारी की जाती है।'
              : 'Zero dispute policy: Every bulk order leaves Khanak with government e-transit pass and calibrated dual-axle weighbridge records.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Step 1: Digital E-Rawaana */}
          <div className="bg-white p-6 rounded-2xl border border-slate-300 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              1. सरकारी डिजिटल ई-रवाना (Transit Pass)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              हरियाणा माइनिंग पोर्टल द्वारा अधिकृत क्यूआर-कोड युक्त ई-रवाना जनरेट होता है। इसमें वाहन नंबर, खनिज का नाम, मात्रा (MT) और गंतव्य स्थल दर्ज रहता है।
            </p>
            <div className="mt-4 pt-3 border-t border-slate-200 text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>रास्ते में चेकिंग या नाके पर 100% वैध</span>
            </div>
          </div>

          {/* Step 2: Computerized Weighbridge */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              2. कंप्यूटराइज्ड धर्मकांटा (Electronic Weighment)
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              प्लांट पर खाली वाहन का वजन (Tare Weight) और सामग्री भरने के बाद (Gross Weight) का कंप्यूटराइज्ड इलेक्ट्रॉनिक तौल होता है। शुद्ध वजन की पर्ची मिलती है।
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>वजन में 1 किलो की भी हेराफेरी संभव नहीं</span>
            </div>
          </div>

          {/* Step 3: Fast 22-Tyre Fleet Transit */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              3. 22 टायरी हैवी फ्लीट एक्सप्रेस डिलीवरी
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              45 से 50 टन क्षमता वाले 22 टायरी ट्रेलर सीधे आपकी निर्माण साइट पर बिना किसी मध्यस्थ के सीधे सुरक्षित समय पर अनलोड होते हैं।
            </p>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-700 font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>ड्राइवर मोबाइल ट्रैकिंग व समयबद्ध डिलीवरी</span>
            </div>
          </div>
        </div>

        {/* Mandatory Advance Payment Notice Box */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm flex flex-wrap justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-slate-900 text-sm">भुगतान नियम (Payment Policy):</h4>
              <p className="text-slate-600 mt-0.5">
                वाहन लोड व रवाना होने से पूर्व <strong>100% भुगतान (Full Advance)</strong> प्राप्त होना अनिवार्य है। किसी भी विशेष व्यवस्था हेतु सीधे मालिक को फोन करें।
              </p>
            </div>
          </div>

          <a
            href="tel:+918926718000"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition shrink-0"
          >
            <span>मालिक से सीधे बात करें: 8926718000</span>
          </a>
        </div>
      </div>
    </section>
  );
};
