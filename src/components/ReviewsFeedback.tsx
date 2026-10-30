import React, { useState } from 'react';
import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, Truck, Scale, ThumbsUp, Send, Filter, Sparkles, Building2 } from 'lucide-react';
import { Language, ReviewFeedbackItem } from '../types';

interface ReviewsFeedbackProps {
  lang: Language;
}

const DEFAULT_REVIEWS: ReviewFeedbackItem[] = [
  {
    id: 'rev-1',
    author: 'सुरेश जांगड़ा',
    company: 'NHAI हाईवे सब-कॉन्ट्रैक्टर (रोहतक-हिसार एक्सप्रेसवे)',
    location: 'रोहतक, हरियाणा',
    rating: 5,
    category: 'both',
    targetItem: '20mm रोड़ी + ऑन-साइट ट्रांसपोर्ट डिलीवरी',
    comment: 'खनक प्लांट से सीधे 40-40 टन की 18 गाड़ियां समय पर हमारे साइट पर खाली हुईं। माल की क्रशिंग स्ट्रेंथ लैब टेस्ट में बिल्कुल खरी उतरी और धर्मकांटा पर्ची का वजन 100% सही मिला। बिना किसी मिलावट के शुद्ध ब्लू स्टोन मैटेरियल मिला।',
    date: '28 अक्टूबर 2026',
    verified: true
  },
  {
    id: 'rev-2',
    author: 'राजेश तंवर',
    company: 'डायरेक्टर - मॉडर्न RMC कंक्रीट प्लांट',
    location: 'गुरुग्राम / मानेसर (दिल्ली-एनसीआर)',
    rating: 5,
    category: 'material',
    targetItem: '10mm रोड़ी व वॉश एम-सैंड (M-Sand)',
    comment: 'हम अपने RMC बैचिंग प्लांट में M35/M40 ग्रेड कंक्रीट के लिए केवल AARV बिल्डकॉन की रोड़ी और एम-सैंड मंगाते हैं। फ्लैकीनेस और एलॉन्गेशन इंडेक्स मानक के अनुसार है, स्लंप टेस्ट में कभी कोई शिकायत नहीं आई। उच्च गुणवत्ता वाला पदार्थ है।',
    date: '25 अक्टूबर 2026',
    verified: true
  },
  {
    id: 'rev-3',
    author: 'अशोक चौधरी',
    company: 'सीनियर प्रोजेक्ट मैनेजर - एलिवेटेड कॉरिडोर',
    location: 'दिल्ली-एनसीआर',
    rating: 5,
    category: 'service',
    targetItem: 'समय पर डिलीवरी व वैध ई-रवाना पर्ची',
    comment: 'सरकारी इन्फ्रा टेंडर में ई-रवाना बिल और कंप्यूटराइज्ड धर्मकांटा पर्ची सबसे जरूरी होती है। AARV की टीम गाड़ी निकलने से पहले ही व्हाट्सएप्प पर लीगल पोर्टल ई-रवाना रसीद शेयर कर देती है। रास्ते में या साइट पर कोई झंझट नहीं होता।',
    date: '21 अक्टूबर 2026',
    verified: true
  },
  {
    id: 'rev-4',
    author: 'विकास बिश्नोई',
    company: 'इन्फ्रास्ट्रक्चर बिल्डर्स प्राइवेट लिमिटेड',
    location: 'हिसार, हरियाणा',
    rating: 5,
    category: 'material',
    targetItem: 'जीएसबी (Granular Sub-Base) व 40mm रोड़ी',
    comment: 'सड़क की बेस लेयर के लिए 600 टन GSB मंगवाया था। प्रॉपर ग्रेडेशन और कॉम्पेक्शन दोनों अव्वल दर्जे के रहे। एनजीटी बंद के दौर में भी जो रेट तय हुआ था उसी कमिटेड भाव पर समय से आपूर्ति की। बहुत ईमानदार सप्लायर हैं।',
    date: '18 अक्टूबर 2026',
    verified: true
  },
  {
    id: 'rev-5',
    author: 'कुलदीप सिंह ढिल्लों',
    company: 'ढिल्लों कंस्ट्रक्शन & डेवलपर्स',
    location: 'पटियाला / संगरूर, पंजाब',
    rating: 5,
    category: 'service',
    targetItem: 'डोरस्टेप ट्रांसपोर्टेशन सुविधा (साइट डिलीवरी)',
    comment: 'हरियाणा बॉर्डर से पंजाब हमारे कमर्शियल प्रोजेक्ट तक बिना किसी रुकावट के गाड़ियां डिलीवर हुईं। ड्राइवर और लॉजिस्टिक्स कोऑर्डिनेशन बहुत प्रोफेशनल है। साइट पर अनलोडिंग में भी कोई दिक्कत नहीं आई।',
    date: '14 अक्टूबर 2026',
    verified: true
  },
  {
    id: 'rev-6',
    author: 'मनोज कुमार शर्मा',
    company: 'श्री श्याम सिविल कॉन्ट्रैक्टर्स',
    location: 'तोशाम-भिवानी क्षेत्र',
    rating: 5,
    category: 'material',
    targetItem: 'सुपर फाइन क्रशर स्टोन डस्ट',
    comment: 'चिनाई और प्लास्टर वर्क के लिए जो स्टोन डस्ट मिली उसमें मिट्टी या कचरे की मिलावट 0% थी। खनक की ब्लैक/ब्लू स्टोन डस्ट की बॉन्डिंग सबसे मजबूत साबित हुई।',
    date: '10 अक्टूबर 2026',
    verified: true
  }
];

export const ReviewsFeedback: React.FC<ReviewsFeedbackProps> = ({ lang }) => {
  const [reviews, setReviews] = useState<ReviewFeedbackItem[]>(() => {
    try {
      const saved = localStorage.getItem('aarv_client_reviews_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load reviews', e);
    }
    return DEFAULT_REVIEWS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'material' | 'service'>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    author: '',
    company: '',
    location: '',
    rating: 5,
    category: 'both' as 'material' | 'service' | 'both',
    targetItem: '20mm रोड़ी व ऑन-साइट डिलीवरी',
    comment: ''
  });

  const filteredReviews = reviews.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'material') return r.category === 'material' || r.category === 'both';
    if (activeFilter === 'service') return r.category === 'service' || r.category === 'both';
    return true;
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.author.trim() || !formData.comment.trim()) return;

    const newReview: ReviewFeedbackItem = {
      id: `rev-${Date.now()}`,
      author: formData.author.trim(),
      company: formData.company.trim() || (lang === 'hi' ? 'सत्यापित क्लाइंट / ठेकेदार' : 'Verified Contractor'),
      location: formData.location.trim() || (lang === 'hi' ? 'हरियाणा / एनसीआर' : 'Haryana / NCR'),
      rating: formData.rating,
      category: formData.category,
      targetItem: formData.targetItem.trim() || (formData.category === 'service' ? 'ट्रांसपोर्टेशन सेवा' : 'क्रशर सामग्री'),
      comment: formData.comment.trim(),
      date: new Date().toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }),
      verified: true
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('aarv_client_reviews_v1', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save review', err);
    }

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsFormOpen(false);
      setFormData({
        author: '',
        company: '',
        location: '',
        rating: 5,
        category: 'both',
        targetItem: '20mm रोड़ी व ऑन-साइट डिलीवरी',
        comment: ''
      });
    }, 1500);
  };

  const handleSendViaWhatsApp = (r: ReviewFeedbackItem) => {
    const text = encodeURIComponent(
      `*AARV BUILDCON INFRASTRUCTURE - ग्राहक समीक्षा / फीडबैक*\n\n` +
      `👤 *समीक्षक:* ${r.author} (${r.company})\n` +
      `📍 *स्थान:* ${r.location}\n` +
      `⭐ *रेटिंग:* ${r.rating}/5 सितारे\n` +
      `📦 *पदार्थ/सेवा:* ${r.targetItem}\n` +
      `💬 *फीडबैक:* "${r.comment}"\n\n` +
      `AARV बिल्डकॉन खनक, तोशाम (भिवानी)`
    );
    window.open(`https://wa.me/918926718000?text=${text}`, '_blank');
  };

  return (
    <section id="reviews" className="py-16 px-4 bg-slate-100/70 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 dark:border dark:border-blue-800/60 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{lang === 'hi' ? 'ग्राहक समीक्षा एवं सेवा फीडबैक' : 'Client Reviews & Service Feedback'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {lang === 'hi' ? (
                <>
                  हमारे <span className="text-blue-600 dark:text-blue-400">पदार्थों की गुणवत्ता</span> और <span className="text-blue-600 dark:text-blue-400">सेवाओं</span> का प्रत्यक्ष फीडबैक
                </>
              ) : (
                <>
                  Verified Client Reviews on <span className="text-blue-600 dark:text-blue-400">Material Quality</span> & <span className="text-blue-600 dark:text-blue-400">Services</span>
                </>
              )}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-2xl">
              {lang === 'hi'
                ? 'हाईवे कॉन्ट्रैक्टर्स, RMC प्लांट्स, बिल्डर्स और डेवलपर्स का वास्तविक अनुभव। हमारे 100% सही धर्मकांटा वजन, ई-रवाना रसीद और समय पर साइट डिलीवरी का प्रमाण।'
                : 'Real feedback from highway contractors, RMC batching plants, and developers regarding our aggregate strength, computerized weighbridge accuracy, and direct transport delivery.'}
            </p>
          </div>

          {/* Action to open feedback form */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className="brand-gradient hover:brightness-110 text-white font-extrabold px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>{isFormOpen ? (lang === 'hi' ? 'फॉर्म बंद करें' : 'Close Form') : (lang === 'hi' ? 'अपना फीडबैक / रिव्यू दें' : 'Write a Review')}</span>
            </button>
          </div>
        </div>

        {/* 4 Trust Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">4.9 / 5.0</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? '420+ थोक आर्डर रेटिंग' : '420+ Bulk Order Ratings'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">100% सटीक</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? 'धर्मकांटा कंप्यूटराइज्ड वजन' : 'Weighbridge Weight Accuracy'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">100% अधिकृत</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? 'ई-रवाना माइनिंग चालान' : 'Government E-Rawaana Pass'}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900 dark:text-white">99.4% समय पर</div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? 'ऑन-साइट डिलीवरी रिकॉर्ड' : 'On-Time Site Delivery'}
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Submit Feedback Form */}
        {isFormOpen && (
          <div className="mb-10 bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-blue-500/40 dark:border-blue-500/30 shadow-lg">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <MessageSquarePlus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {lang === 'hi' ? 'अपना फीडबैक / समीक्षा दर्ज करें' : 'Submit Your Feedback / Review'}
                </h3>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {lang === 'hi' ? 'पदार्थ एवं सेवाओं के लिए' : 'For Materials & Logistics'}
              </span>
            </div>

            {submitSuccess ? (
              <div className="bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 p-6 rounded-xl text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto mb-2" />
                <h4 className="font-bold text-emerald-900 dark:text-emerald-200 text-sm">
                  {lang === 'hi' ? 'धन्यवाद! आपका रिव्यू सफलतापूर्वक दर्ज कर लिया गया है।' : 'Thank you! Your feedback has been recorded successfully.'}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">
                  {lang === 'hi' ? 'यह समीक्षा अब नीचे सूची में दिखाई दे रही है।' : 'Your review is now displayed in the list below.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'आपका नाम *' : 'Your Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'hi' ? 'उदा. राजेश कुमार' : 'e.g. Rajesh Kumar'}
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Company/Project */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'कंपनी / फर्म / प्रोजेक्ट' : 'Firm / Project Name'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'hi' ? 'उदा. आरएमसी प्लांट / हाईवे प्रोजेक्ट' : 'e.g. RMC Plant / Highway'}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'शहर / जिला *' : 'City / Location *'}
                    </label>
                    <input
                      type="text"
                      required
                      placeholder={lang === 'hi' ? 'उदा. रोहतक, गुरुग्राम, हिसार' : 'e.g. Rohtak, Gurugram, Hisar'}
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Category */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'फीडबैक का मुख्य विषय' : 'Feedback Category'}
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-semibold"
                    >
                      <option value="both">{lang === 'hi' ? 'पदार्थ एवं सेवाएं दोनों (Both)' : 'Both Materials & Services'}</option>
                      <option value="material">{lang === 'hi' ? 'पदार्थ की गुणवत्ता (Material Quality)' : 'Material Quality'}</option>
                      <option value="service">{lang === 'hi' ? 'सेवाएं (Transport, Weighment, E-Rawana)' : 'Services & Logistics'}</option>
                    </select>
                  </div>

                  {/* Target Item */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'सप्लाई किया गया पदार्थ / सेवा' : 'Material or Service Provided'}
                    </label>
                    <input
                      type="text"
                      placeholder={lang === 'hi' ? 'उदा. 20mm रोड़ी, डस्ट, साइट डिलीवरी' : 'e.g. 20mm Rodi, Dust, Delivery'}
                      value={formData.targetItem}
                      onChange={(e) => setFormData({ ...formData, targetItem: e.target.value })}
                      className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Rating Selector */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      {lang === 'hi' ? 'रेटिंग (सितारे)' : 'Rating (Stars)'}
                    </label>
                    <div className="flex items-center gap-1.5 py-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData({ ...formData, rating: star })}
                          className="p-1 hover:scale-110 transition cursor-pointer"
                        >
                          <Star
                            className={`w-5 h-5 ${
                              star <= formData.rating
                                ? 'text-amber-500 fill-amber-500'
                                : 'text-slate-300 dark:text-slate-600'
                            }`}
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-2">
                        {formData.rating} / 5
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    {lang === 'hi' ? 'आपकी विस्तृत समीक्षा व अनुभव *' : 'Your Detailed Feedback & Experience *'}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder={lang === 'hi' ? 'पदार्थ की मजबूती, वजन की शुद्धता, ड्राइवर का व्यवहार, ई-रवाना रसीद या डिलीवरी समय के बारे में बताएं...' : 'Describe material grade, weight accuracy, dispatch timing, or e-rawana billing experience...'}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Submit & Cancel */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition cursor-pointer"
                  >
                    {lang === 'hi' ? 'रद्द करें' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="brand-gradient hover:brightness-110 text-white font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-2 shadow-sm transition cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'फीडबैक सबमिट करें' : 'Submit Feedback'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'hi' ? `सभी समीक्षाएं (${reviews.length})` : `All Reviews (${reviews.length})`}
            </button>
            <button
              onClick={() => setActiveFilter('material')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'material'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'hi' ? 'पदार्थ / मैटेरियल्स फीडबैक' : 'Material Quality'}
            </button>
            <button
              onClick={() => setActiveFilter('service')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeFilter === 'service'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {lang === 'hi' ? 'सेवाएं / ट्रांसपोर्ट व वजन' : 'Services & Delivery'}
            </button>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>
              {lang === 'hi'
                ? `प्रदर्शित: ${filteredReviews.length} समीक्षाएं`
                : `Showing: ${filteredReviews.length} reviews`}
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredReviews.map((r) => {
            const isService = r.category === 'service';
            const isMaterial = r.category === 'material';

            return (
              <div
                key={r.id}
                className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-blue-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Category Badge & Rating */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${
                        isMaterial
                          ? 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                          : isService
                          ? 'bg-indigo-50 text-indigo-800 border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800'
                          : 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800'
                      }`}
                    >
                      {isMaterial
                        ? (lang === 'hi' ? 'पदार्थ गुणवत्ता' : 'Material')
                        : isService
                        ? (lang === 'hi' ? 'सेवा व ट्रांसपोर्ट' : 'Service')
                        : (lang === 'hi' ? 'पदार्थ व सेवा दोनों' : 'Material + Service')}
                    </span>

                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < r.rating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-slate-200 dark:text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Target item highlighted */}
                  <div className="text-xs font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{r.targetItem}</span>
                  </div>

                  {/* Comment */}
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-4 italic">
                    "{r.comment}"
                  </p>
                </div>

                {/* Footer of Card: Author Info & Actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1">
                        <span>{r.author}</span>
                        {r.verified && (
                          <span title="सत्यापित खरीदार">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        {r.company}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                        📍 {r.location} • {r.date}
                      </div>
                    </div>

                    <button
                      onClick={() => handleSendViaWhatsApp(r)}
                      title="WhatsApp पर शेयर करें"
                      className="text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 cursor-pointer"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-10 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white">
                {lang === 'hi' ? 'AARV बिल्डकॉन गुणवत्ता व शुद्धता वादा' : 'AARV Buildcon Quality & Integrity Pledge'}
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                {lang === 'hi'
                  ? 'हर गाड़ी के साथ वास्तविक धर्मकांटा वजन रसीद + हरियाणा माइनिंग ई-रवाना चालान अनिवार्य रूप से संलग्न होता है।'
                  : 'Every single dispatch includes verified digital weighbridge ticket + Haryana Mining e-Rawana portal challan.'}
              </p>
            </div>
          </div>

          <a
            href="tel:+918926718000"
            className="brand-gradient text-white font-extrabold px-4 py-2 rounded-xl text-xs whitespace-nowrap shadow-xs hover:brightness-110 transition"
          >
            {lang === 'hi' ? 'थोक सप्लाई पूछताछ करें' : 'Enquire Bulk Supply'}
          </a>
        </div>
      </div>
    </section>
  );
};
