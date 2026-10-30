import React from 'react';
import { QuoteCalculation, Language } from '../types';
import { X, Printer, Share2, Building, ShieldCheck, CheckCircle2, Phone, AlertTriangle, Receipt } from 'lucide-react';
import { Corporate3DStructureMark } from './BrandLogo';

interface QuotationModalProps {
  quote: QuoteCalculation | null;
  lang: Language;
  onClose: () => void;
  onOpenPayment?: (amount: number, orderRef: string) => void;
}

export const QuotationModal: React.FC<QuotationModalProps> = ({ quote, lang, onClose, onOpenPayment }) => {
  if (!quote) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsApp = () => {
    const gstBreakdown = quote.gstRate === 0
      ? '0% छूट (Exempted / Nil Tax)'
      : quote.gstType === 'intra'
        ? `CGST (${(quote.gstRate / 2).toFixed(1)}%): ₹${quote.cgstAmount.toLocaleString('en-IN')} + SGST (${(quote.gstRate / 2).toFixed(1)}%): ₹${quote.sgstAmount.toLocaleString('en-IN')}`
        : `IGST (${quote.gstRate}%): ₹${quote.igstAmount.toLocaleString('en-IN')}`;

    const text = `*AARV BUILDCON INFRASTRUCTURE*%0A` +
      `*आधिकारिक थोक जीएसटी कोटेशन पर्ची: ${quote.quoteId}*%0A%0A` +
      `⚠️ *भुगतान नियम:* 100% अग्रिम भुगतान अनिवार्य अथवा डायरेक्ट कॉल।%0A%0A` +
      `👤 *पार्टी / कंपनी:* ${quote.customerName || 'माननीय ठेकेदार'}%0A` +
      `📞 *मोबाइल:* ${quote.customerPhone || 'उपलब्ध नहीं'}%0A` +
      (quote.customerGstin ? `🏛️ *पार्टी GSTIN:* ${quote.customerGstin}%0A` : '') +
      `🪨 *सामग्री:* ${quote.material.nameHi} (HSN Code: ${quote.material.hsnCode})%0A` +
      `⚖️ *मात्रा:* ${quote.tons} मीट्रिक टन (MT)%0A` +
      `🚛 *लॉजिस्टिक्स:* ${quote.truckType}%0A` +
      `📍 *लीड दूरी:* ${quote.distanceKm} KM%0A` +
      `💵 *एक्स-क्रशर दर:* ₹${quote.material.rate}/MT%0A` +
      `📦 *टैक्सेबल मूल्य (Subtotal):* ₹${quote.subtotal.toLocaleString('en-IN')}%0A` +
      `🧾 *जीएसटी (${quote.gstRate}% GST):* ₹${quote.gstAmount.toLocaleString('en-IN')} (${gstBreakdown})%0A` +
      `💰 *कुल देय राशि (GST सहित):* ₹${quote.grandTotal.toLocaleString('en-IN')}%0A%0A` +
      `*नोट:* 100% वैध ई-रवाना (E-Rawaana) व कंप्यूटराइज्ड धर्मकांटा पर्ची सहित पक्का जीएसटी इनवॉयस।`;

    window.open(`https://wa.me/918926718000?text=${text}`, '_blank');
  };

  const handlePayAdvance = () => {
    if (onOpenPayment) {
      onOpenPayment(quote.grandTotal, quote.quoteId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8 text-slate-900">
        {/* Modal Action Bar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center print:hidden flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-blue-900 font-extrabold text-sm flex items-center gap-1.5">
              <Receipt className="w-4 h-4 text-blue-600" />
              <span>{lang === 'hi' ? 'आधिकारिक थोक जीएसटी प्रोफ़ॉर्मा पर्ची' : 'Official GST Proforma Invoice'}</span>
            </span>
            <span className="text-xs text-slate-500 font-mono">({quote.quoteId})</span>
          </div>

          <div className="flex items-center gap-2">
            {onOpenPayment && (
              <button
                onClick={handlePayAdvance}
                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs"
              >
                <span>₹ ऑनलाइन QR भुगतान</span>
              </button>
            )}
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-300 transition"
            >
              <Printer className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'hi' ? 'प्रिंट PDF' : 'Print PDF'}</span>
            </button>
            <button
              onClick={handleSendWhatsApp}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Quotation Content */}
        <div id="printable-quotation" className="p-6 sm:p-8 bg-white text-slate-900">
          {/* Letterhead */}
          <div className="border-b-2 border-blue-600 pb-5 mb-6">
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-3.5">
                <Corporate3DStructureMark sizePx={56} className="shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase text-blue-900 tracking-wider leading-tight">
                    AARV BUILDCON INFRASTRUCTURE
                  </h2>
                  <p className="text-xs text-slate-700 font-bold mt-1">
                    बिल्डिंग मैटेरियल्स एवं क्रशर उत्पाद के थोक निर्माता व सप्लायर • ट्रांसपोर्टेशन सुविधा उपलब्ध
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    शॉप नं. 1, 2, विश्वकर्मा मंदिर मार्केट, निकट Govt Sr Sec School, खनक (तोशाम), भिवानी (हरियाणा)
                  </p>
                </div>
              </div>

              <div className="text-right text-xs shrink-0">
                <div className="font-bold text-slate-900">
                  हेल्पलाइन: 8926718000, 7357707308
                </div>
                <div className="text-[11px] text-slate-500">
                  Email: aarvfintax@gmail.com
                </div>
                <div className="mt-2 inline-block px-2.5 py-0.5 bg-blue-50 text-blue-800 rounded text-[10px] font-black border border-blue-200">
                  {quote.gstRate === 0 ? 'कर मुक्त (0% GST)' : `${quote.gstRate}% GST अधिकृत इनवॉयस`}
                </div>
              </div>
            </div>
          </div>

          {/* Quotation Meta with GSTIN */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <div>
              <p className="text-slate-500">कोटेशन / इनवॉयस संदर्भ:</p>
              <p className="font-mono font-bold text-blue-900">{quote.quoteId}</p>
              <p className="text-slate-500 mt-2">दिनांक व समय:</p>
              <p className="font-medium text-slate-800">{quote.timestamp}</p>
              <p className="text-slate-500 mt-2">जीएसटी कर प्रकार:</p>
              <p className="font-bold text-blue-900">
                {quote.gstRate === 0
                  ? '0% (कर मुक्त / छूट)'
                  : quote.gstType === 'intra'
                    ? `इंट्रा-स्टेट (CGST ${(quote.gstRate / 2).toFixed(1)}% + SGST ${(quote.gstRate / 2).toFixed(1)}%)`
                    : `इंटर-स्टेट (IGST ${quote.gstRate}%)`}
              </p>
            </div>
            <div>
              <p className="text-slate-500">पार्टी / कंपनी का नाम:</p>
              <p className="font-bold text-slate-900">{quote.customerName || 'M/S ठेकेदार / बिल्डर'}</p>
              <p className="text-slate-500 mt-2">संपर्क मोबाइल:</p>
              <p className="font-medium text-slate-800">{quote.customerPhone || 'N/A'}</p>
              {quote.customerGstin && (
                <>
                  <p className="text-slate-500 mt-2">पार्टी GSTIN (ITC क्लेम हेतु):</p>
                  <p className="font-mono font-bold text-emerald-700">{quote.customerGstin}</p>
                </>
              )}
            </div>
          </div>

          {/* Quotation Items Table with HSN Code & GST Details */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-300 text-slate-700 bg-slate-100">
                  <th className="py-2.5 px-3">सामग्री विवरण (Description)</th>
                  <th className="py-2.5 px-3">HSN कोड</th>
                  <th className="py-2.5 px-3 text-right">मात्रा (MT)</th>
                  <th className="py-2.5 px-3 text-right">दर (₹/MT)</th>
                  <th className="py-2.5 px-3 text-right">कर योग्य मूल्य</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    {quote.material.nameHi}
                    <span className="block text-[11px] text-slate-500 font-normal">
                      {quote.material.sizeSpecs}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-blue-800">
                    {quote.material.hsnCode}
                  </td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-slate-900">
                    {quote.tons} टन
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 font-semibold">
                    ₹{quote.material.rate}
                  </td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-slate-900">
                    ₹{quote.materialCost.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="py-3 px-3 text-slate-700">
                    <span className="font-bold text-blue-900">लॉजिस्टिक्स व भाड़ा (Lead Freight Charges)</span>
                    <span className="block text-[11px] text-slate-500">
                      दूरी: {quote.distanceKm} KM | लॉजिस्टिक्स: {quote.truckType}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-slate-900">
                    {quote.tons} टन
                  </td>
                  <td className="py-3 px-3 text-right tabular-nums text-slate-700 font-semibold">
                    ₹{(quote.distanceKm * 4.5).toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right font-bold tabular-nums text-slate-900">
                    ₹{quote.freightCost.toLocaleString('en-IN')}
                  </td>
                </tr>

                {/* Subtotal row */}
                <tr className="bg-slate-50 font-bold text-slate-800">
                  <td colSpan={4} className="py-2.5 px-3 text-right">
                    कुल कर योग्य मूल्य (Taxable Subtotal):
                  </td>
                  <td className="py-2.5 px-3 text-right tabular-nums">
                    ₹{quote.subtotal.toLocaleString('en-IN')}
                  </td>
                </tr>

                {/* Dynamic GST Rows */}
                {quote.gstRate === 0 ? (
                  <tr className="text-slate-700">
                    <td colSpan={4} className="py-2 px-3 text-right">
                      जीएसटी कर (0% - छूट / Exempted):
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums font-semibold">
                      ₹0
                    </td>
                  </tr>
                ) : quote.gstType === 'intra' ? (
                  <>
                    <tr className="text-slate-700">
                      <td colSpan={4} className="py-2 px-3 text-right">
                        केन्द्रीय जीएसटी (CGST @ {(quote.gstRate / 2).toFixed(1)}%):
                      </td>
                      <td className="py-2 px-3 text-right tabular-nums font-semibold">
                        ₹{quote.cgstAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                    <tr className="text-slate-700">
                      <td colSpan={4} className="py-2 px-3 text-right">
                        राज्य जीएसटी (SGST @ {(quote.gstRate / 2).toFixed(1)}%):
                      </td>
                      <td className="py-2 px-3 text-right tabular-nums font-semibold">
                        ₹{quote.sgstAmount.toLocaleString('en-IN')}
                      </td>
                    </tr>
                  </>
                ) : (
                  <tr className="text-slate-700">
                    <td colSpan={4} className="py-2 px-3 text-right">
                      एकीकृत जीएसटी (IGST @ {quote.gstRate}% - HSN {quote.material.hsnCode}):
                    </td>
                    <td className="py-2 px-3 text-right tabular-nums font-semibold">
                      ₹{quote.igstAmount.toLocaleString('en-IN')}
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-slate-300 font-black text-sm bg-blue-50">
                  <td colSpan={4} className="py-3 px-3 text-right text-blue-900">
                    कुल देय राशि (Grand Total with {quote.gstRate}% GST):
                  </td>
                  <td className="py-3 px-3 text-right text-blue-950 tabular-nums">
                    ₹{quote.grandTotal.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Compliance & Mandatory Payment Terms */}
          <div className="space-y-2 text-[11px] text-slate-600 border-t border-slate-200 pt-4">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>जीएसटी इनवॉयस, ई-रवाना एवं तौल गारंटी (Statutory Compliance):</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong className="text-slate-900">जीएसटी अनुपालन:</strong> बिल्डिंग मैटेरियल्स (HSN 2517/2505) अथवा सिविल वर्क्स पर लागू {quote.gstRate}% जीएसटी नियमानुसार गणना की गई है। पक्का टैक्स इनवॉयस प्रेषित किया जाएगा।</li>
              <li><strong className="text-slate-900">100% अग्रिम भुगतान:</strong> वाहन लोड होकर रवाना होने से पूर्व पूर्ण भुगतान प्राप्त होना अनिवार्य है।</li>
              <li>सामग्री 100% खान एवं भूविज्ञान विभाग के वैध ई-रवाना (E-Rawaana / Transit Pass) के साथ प्रेषित की जाएगी।</li>
              <li>वजन कंप्यूटराइज्ड धर्मकांटा (Electronic Weighbridge) से पर्ची सहित मान्य होगा।</li>
            </ul>
          </div>

          {/* Signature & Seal */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex justify-between items-end">
            <div className="text-[10px] text-slate-500">
              यह एक अधिकृत कंप्यूटर जनरेटेड जीएसटी प्रोफ़ॉर्मा इनवॉयस है।
            </div>
            <div className="text-right">
              <div className="font-bold text-xs text-slate-900">
                कृते: AARV BUILDCON INFRASTRUCTURE
              </div>
              <div className="text-[10px] text-blue-600 font-semibold mt-1">
                अधिकृत हस्ताक्षरकर्ता (जीएसटी बिलिंग विभाग)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
