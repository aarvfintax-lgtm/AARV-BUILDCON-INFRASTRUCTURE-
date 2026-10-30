import React, { useState } from 'react';
import { DispatchPost, Language } from '../types';
import { Truck, MapPin, Clock, ShieldCheck, Eye, X, ZoomIn } from 'lucide-react';

interface LiveDispatchWallProps {
  posts: DispatchPost[];
  lang: Language;
}

export const LiveDispatchWall: React.FC<LiveDispatchWallProps> = ({ posts, lang }) => {
  const [activeModalPost, setActiveModalPost] = useState<DispatchPost | null>(null);
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="dispatch" className="max-w-7xl mx-auto py-14 px-4 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-end mb-8 gap-4">
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider block mb-1">
            {lang === 'hi' ? 'ऑन-साइट लाइव कवरेज' : 'On-Site Live Dispatch Feed'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            {lang === 'hi' ? 'AARV लाइव बल्क डिस्पैच गैलरी' : 'AARV Live Bulk Dispatch & Logistics Gallery'}
          </h2>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
          {lang === 'hi'
            ? 'थोक सामग्री लोडिंग, कंप्यूटराइज्ड धर्मकांटा पर्ची और विभिन्न हाईवे व एक्सप्रेसवे साइटों पर समयबद्ध डिलीवरी का ऑन-साइट रिकॉर्ड।'
            : 'Live log of bulk aggregates loading, computerized weighment, and on-site deliveries across Haryana, Delhi-NCR, Rajasthan, and Punjab.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const hasError = imageErrorMap[post.id];
          return (
            <div
              key={post.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-800 shadow-sm group hover:border-blue-500 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative overflow-hidden cursor-pointer bg-slate-100 dark:bg-slate-800 h-52" onClick={() => setActiveModalPost(post)}>
                {!hasError ? (
                  <img
                    src={post.imgUrl}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(post.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 text-slate-500 dark:text-slate-400">
                    <Truck className="w-10 h-10 text-blue-700 dark:text-blue-400 mb-2" />
                    <span className="text-xs font-bold text-center text-slate-700 dark:text-slate-300">{post.tag}</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                  <span className="text-[11px] text-white font-bold flex items-center gap-1">
                    <ZoomIn className="w-3.5 h-3.5" /> फोटो देखें
                  </span>
                </div>

                <div className="absolute top-3 left-3">
                  <span className="bg-blue-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full shadow">
                    {post.tag}
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                      <span>{post.time}</span>
                    </span>
                    {post.tons && (
                      <span className="font-bold text-blue-800 dark:text-blue-300 tabular-nums">
                        {post.tons} MT
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  {post.destination && (
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 mb-3">
                      <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span className="truncate">{post.destination}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center text-[10px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ई-रवाना अधिकृत</span>
                  </span>
                  <button
                    onClick={() => setActiveModalPost(post)}
                    className="text-blue-700 dark:text-blue-400 hover:underline font-bold cursor-pointer"
                  >
                    विस्तार →
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Post Details Modal */}
      {activeModalPost && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative h-64 bg-slate-900">
              <img
                src={activeModalPost.imgUrl}
                alt={activeModalPost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setActiveModalPost(null)}
                className="absolute top-3 right-3 bg-black/70 hover:bg-black text-white p-1.5 rounded-full cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-blue-700 text-white text-xs font-black px-2.5 py-0.5 rounded-full">
                {activeModalPost.tag}
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-slate-400">{activeModalPost.time}</span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {activeModalPost.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">सुविधा:</span>
                  <strong className="text-slate-900 dark:text-white">{activeModalPost.truckType || 'थोक ट्रांसपोर्ट'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">कुल लोड / मात्रा:</span>
                  <strong className="text-blue-900 dark:text-blue-300 tabular-nums">{activeModalPost.tons ? `${activeModalPost.tons} MT` : 'बल्क लोड (40+ MT)'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">गंतव्य (Destination):</span>
                  <strong className="text-slate-900 dark:text-white">{activeModalPost.destination || 'हरियाणा / दिल्ली-NCR'}</strong>
                </div>
                <div>
                  <span className="text-slate-500 dark:text-slate-400 block">वैधता प्रमाण:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">100% ई-रवाना व कांटा पर्ची</strong>
                </div>
              </div>

              <div className="flex gap-3">
                <a
                  href={`https://wa.me/918926718000?text=नमस्ते%20AARV%20Buildcon,%20मैंने%20लाइव%20डिस्पैच%20देखा%20"${encodeURIComponent(activeModalPost.title)}"%20और%20मुझे%20समान%20बल्क%20सप्लाई%20चाहिए।%20100%%20एडवांस%20पेमेंट%20स्वीकार्य%20है।`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full brand-gradient hover:brightness-110 text-white font-bold py-2.5 rounded-xl text-xs text-center shadow"
                >
                  इस लोड जैसी इंक्वायरी करें
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
