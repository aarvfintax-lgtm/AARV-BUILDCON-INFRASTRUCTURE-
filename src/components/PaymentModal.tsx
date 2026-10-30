import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import {
  X,
  Building2,
  Copy,
  Check,
  ShieldCheck,
  Mail,
  Phone,
  QrCode,
  Download,
  Share2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { Language } from '../types';

interface PaymentModalProps {
  isOpen: boolean;
  lang: Language;
  initialAmount?: number;
  orderReference?: string;
  onClose: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  lang,
  initialAmount,
  orderReference,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'qr' | 'bank'>('qr');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(initialAmount && initialAmount > 0 ? initialAmount : 25000);
  const [customAmount, setCustomAmount] = useState<string>(
    initialAmount && initialAmount > 0 ? String(initialAmount) : '25000'
  );
  const [paymentNote, setPaymentNote] = useState<string>(
    orderReference ? `AARV 100% Advance - ${orderReference}` : 'AARV Buildcon Full Order Advance'
  );
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // VPA & Merchant Details
  const merchantName = 'AARV BUILDCON INFRASTRUCTURE';
  const upiId = '8926718000@upi';

  // Preset token / full advance amounts
  const presetAmounts = [
    { label: '₹10,000', value: 10000, desc: 'टोकन बुकिंग' },
    { label: '₹25,000', value: 25000, desc: 'ट्रेलर एडवांस' },
    { label: '₹50,000', value: 50000, desc: 'बल्क लोड' },
    { label: '₹1,00,000', value: 100000, desc: 'फुल एडवांस' }
  ];

  useEffect(() => {
    if (initialAmount && initialAmount > 0) {
      setAmount(initialAmount);
      setCustomAmount(String(initialAmount));
    }
    if (orderReference) {
      setPaymentNote(`AARV Advance - ${orderReference}`);
    }
  }, [initialAmount, orderReference]);

  useEffect(() => {
    if (!isOpen) return;

    const generateQr = async () => {
      try {
        setIsGenerating(true);
        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
          merchantName
        )}&am=${amount}&cu=INR&tn=${encodeURIComponent(paymentNote || 'AARV Bulk Material Advance')}`;

        const dataUrl = await QRCode.toDataURL(upiUrl, {
          width: 320,
          margin: 2,
          color: {
            dark: '#1e3a8a', // Deep royal blue QR dots
            light: '#ffffff'
          },
          errorCorrectionLevel: 'M'
        });
        setQrDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate UPI QR code', err);
      } finally {
        setIsGenerating(false);
      }
    };

    generateQr();
  }, [amount, paymentNote, isOpen, upiId]);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleAmountSelect = (val: number) => {
    setAmount(val);
    setCustomAmount(String(val));
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleDownloadQr = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `AARV-Buildcon-QR-${amount}INR.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNotifyOnWhatsApp = () => {
    const msg = `*AARV BUILDCON INFRASTRUCTURE (खनक)*%0A` +
      `*100% अग्रिम / टोकन पेमेंट सूचना*%0A%0A` +
      `💰 *भुगतान राशि:* ₹${amount.toLocaleString('en-IN')}%0A` +
      `📝 *विवरण:* ${paymentNote}%0A` +
      `🏦 *माध्यम:* UPI QR (VPA: ${upiId})%0A%0A` +
      `मैंने अग्रिम भुगतान कर दिया है, कृपया 22 टायरी ट्रेलर रवानगी एवं ई-रवाना पर्ची जारी करें।`;

    window.open(`https://wa.me/918926718000?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-slate-300 w-full max-w-lg rounded-2xl p-5 sm:p-6 shadow-2xl relative my-6 max-h-[92vh] overflow-y-auto text-slate-900">
        {/* Modal Top Header */}
        <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl blue-gradient flex items-center justify-center text-white font-black text-lg shadow-sm">
              ₹
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-base leading-tight">
                {lang === 'hi' ? 'कंपनी भुगतान व UPI QR कोड' : 'Company Payment & UPI QR'}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">
                AARV BUILDCON INFRASTRUCTURE • खनक (तोशाम)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 100% Advance Payment Policy Notice */}
        <div className="bg-red-50 border border-red-300 p-3 rounded-xl mb-4 text-xs text-red-950 flex items-start gap-2.5">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <strong className="font-extrabold text-red-900 block text-xs">
              पेमेंट नीति (100% अग्रिम भुगतान):
            </strong>
            <span className="text-[11px] text-red-800 leading-relaxed block mt-0.5">
              एनजीटी अवधि में क्रशर से 22 टायरी ट्रेलर रवाना होने से पूर्व 100% अग्रिम भुगतान अनिवार्य है। किसी भी विशेष कन्फर्मेशन हेतु सीधे मालिक को कॉल करें: <strong>8926718000</strong>.
            </span>
          </div>
        </div>

        {/* Tab Switcher: QR Code vs Bank Details */}
        <div className="flex items-center gap-1.5 p-1 bg-[#FAF7F2] rounded-xl border border-slate-300 mb-5">
          <button
            onClick={() => setActiveTab('qr')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'qr'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>{lang === 'hi' ? 'UPI QR कोड स्कैन करें' : 'Scan UPI QR'}</span>
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === 'bank'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'text-slate-700 hover:text-blue-700'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>{lang === 'hi' ? 'RTGS / बैंक विवरण' : 'RTGS / Bank Wire'}</span>
          </button>
        </div>

        {/* TAB 1: DYNAMIC UPI QR CODE */}
        {activeTab === 'qr' && (
          <div className="space-y-4">
            {/* Amount Selection Pills */}
            <div>
              <label className="text-[11px] font-bold text-slate-800 block mb-1.5 flex justify-between items-center">
                <span>{lang === 'hi' ? 'भुगतान राशि चुनें:' : 'Select Advance Token Amount:'}</span>
                <span className="text-[10px] text-blue-700 font-semibold">NPCI / Bharat QR Compliant</span>
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2.5">
                {presetAmounts.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => handleAmountSelect(p.value)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold text-center border transition flex flex-col items-center ${
                      amount === p.value
                        ? 'bg-blue-50 border-blue-600 text-blue-900 ring-1 ring-blue-600'
                        : 'bg-[#FAF7F2] border-slate-300 text-slate-700 hover:border-slate-400'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="text-[9px] font-normal text-slate-500">{p.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom Amount Input & Note */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-600 font-bold block mb-1">
                    {lang === 'hi' ? 'कुल राशि (₹):' : 'Amount (₹):'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-2.5 top-2.5 text-xs text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      min={100}
                      step={500}
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl pl-6 pr-2.5 py-2 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600 tabular-nums"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-600 font-bold block mb-1">
                    {lang === 'hi' ? 'पेमेंट संदर्भ / नोट:' : 'Payment Note:'}
                  </label>
                  <input
                    type="text"
                    value={paymentNote}
                    onChange={(e) => setPaymentNote(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-slate-300 rounded-xl px-2.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>
            </div>

            {/* QR Code Presentation Box */}
            <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-slate-300 flex flex-col items-center text-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[11px] font-black uppercase text-blue-900 tracking-wider">
                  AARV BUILDCON आधिकारिक UPI QR
                </span>
              </div>

              {/* White background frame for QR code */}
              <div className="bg-white p-3 rounded-2xl shadow-md border border-slate-200 relative mb-3">
                {isGenerating ? (
                  <div className="w-52 h-52 flex items-center justify-center text-slate-500 text-xs">
                    QR जनरेट हो रहा है...
                  </div>
                ) : qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt={`UPI QR Code for INR ${amount}`}
                    className="w-52 h-52 object-contain"
                  />
                ) : (
                  <div className="w-52 h-52 flex items-center justify-center text-slate-500 text-xs">
                    QR लोड हो रहा है...
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-1 flex justify-center pointer-events-none">
                  <span className="bg-blue-900 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Supported payment apps badges */}
              <div className="text-[10px] text-slate-600 flex flex-wrap items-center justify-center gap-2 mb-3">
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">PhonePe</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">Google Pay</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">Paytm</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">BHIM</span>
                <span className="bg-white border border-slate-200 px-2 py-0.5 rounded font-bold">Any UPI</span>
              </div>

              {/* UPI ID copy strip */}
              <div className="w-full max-w-xs bg-white p-2.5 rounded-xl border border-slate-300 flex justify-between items-center text-xs mb-3 shadow-xs">
                <div className="truncate mr-2 text-left">
                  <span className="text-[10px] text-slate-500 block">UPI ID / VPA:</span>
                  <span className="font-mono font-bold text-blue-900 select-all">{upiId}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(upiId, 'upiId')}
                  className="px-2.5 py-1 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-lg text-[11px] font-bold flex items-center gap-1 transition"
                >
                  {copiedKey === 'upiId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'upiId' ? 'कॉपी हुआ' : 'कॉपी'}</span>
                </button>
              </div>

              {/* Quick Actions: Download QR & WhatsApp Confirm */}
              <div className="flex w-full gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="flex-1 bg-white hover:bg-slate-100 text-slate-800 py-2 px-3 rounded-xl text-xs font-bold border border-slate-300 flex items-center justify-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5 text-blue-700" />
                  <span>QR डाउनलोड करें</span>
                </button>

                <button
                  type="button"
                  onClick={handleNotifyOnWhatsApp}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>रसीद भेजें (WhatsApp)</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: RTGS / DIRECT BANK WIRE */}
        {activeTab === 'bank' && (
          <div className="space-y-3 text-xs">
            {/* Account Beneficiary */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-slate-300 flex justify-between items-center">
              <div>
                <span className="text-[11px] text-slate-500 block">खाता धारक (Account Beneficiary):</span>
                <strong className="text-sm text-slate-900 font-mono font-bold">AARV BUILDCON INFRASTRUCTURE</strong>
              </div>
              <button
                onClick={() => handleCopy('AARV BUILDCON INFRASTRUCTURE', 'accName')}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
                title="कॉपी करें"
              >
                {copiedKey === 'accName' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Official Email */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-slate-300 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 block">आधिकारिक ईमेल:</span>
                  <strong className="text-slate-900">aarvfintax@gmail.com</strong>
                </div>
              </div>
              <button
                onClick={() => handleCopy('aarvfintax@gmail.com', 'email')}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
                title="कॉपी करें"
              >
                {copiedKey === 'email' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Helplines */}
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-slate-300 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <div>
                  <span className="text-[11px] text-slate-500 block">थोक बुकिंग एवं पुष्टि हेल्पलाइन:</span>
                  <strong className="text-blue-900 font-bold">8926718000 / 7357707308</strong>
                </div>
              </div>
              <button
                onClick={() => handleCopy('8926718000', 'phone')}
                className="p-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 transition"
                title="कॉपी करें"
              >
                {copiedKey === 'phone' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Direct Call Recommendation */}
            <div className="bg-blue-50 border border-blue-300 p-3.5 rounded-xl text-[11px] text-blue-950 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-blue-900">
                <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                <span>सीधे मालिक को कॉल करने का निर्देश:</span>
              </div>
              <p className="leading-relaxed">
                बड़ी मात्रा (100+ टन) की आपूर्ति व चालू खाता (Current Account RTGS/NEFT) विवरण हेतु सीधे फोन <strong>8926718000</strong> पर बात करके रवानगी सुनिश्चित करें।
              </p>
            </div>
          </div>
        )}

        {/* Modal Bottom Close */}
        <div className="mt-5 pt-3 border-t border-slate-200 flex justify-between items-center text-xs">
          <a
            href="tel:+918926718000"
            className="text-blue-700 font-bold hover:underline flex items-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>डायरेक्ट कॉल 8926718000</span>
          </a>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold border border-slate-300 transition"
          >
            {lang === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
