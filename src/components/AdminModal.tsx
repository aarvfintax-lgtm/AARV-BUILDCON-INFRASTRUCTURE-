import React, { useState } from 'react';
import { MaterialItem, DispatchPost, Language } from '../types';
import { ShieldAlert, X, Save, PlusCircle, RotateCcw, Check, KeyRound, Upload, Image, Trash2, Camera, Layers, CheckCircle2 } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  materials: MaterialItem[];
  posts: DispatchPost[];
  lang: Language;
  onClose: () => void;
  onUpdateRates: (updated: MaterialItem[]) => void;
  onResetRates: () => void;
  onAddPost: (post: DispatchPost) => void;
  onDeletePost: (id: string) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  materials,
  posts,
  lang,
  onClose,
  onUpdateRates,
  onResetRates,
  onAddPost,
  onDeletePost
}) => {
  const [pin, setPin] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'rates' | 'gallery'>('gallery');
  
  // Rate inputs state
  const [tempRates, setTempRates] = useState<Record<number, number>>({});
  
  // New Post state (Owner's custom photo upload)
  const [postTitle, setPostTitle] = useState<string>('');
  const [postTag, setPostTag] = useState<string>('क्रेशर प्लांट');
  const [postTime, setPostTime] = useState<string>('आज (Today)');
  const [postImg, setPostImg] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [postMaterialName, setPostMaterialName] = useState<string>('20mm गिट्टी');
  const [postTons, setPostTons] = useState<string>('');
  const [postDest, setPostDest] = useState<string>('');
  const [postTruckType, setPostTruckType] = useState<string>('22 टायरी ट्रेलर');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Authentic preset images for instant fallback if owner wants
  const PRESET_QUARRY_IMAGES = [
    { label: 'क्रेशर प्लांट (हमारा प्लांट)', url: '/assets/aistudio/stone_crusher_plant_1792507891797_04e1b531.jpg' },
    { label: '20mm स्टॉक व लोडर', url: '/assets/aistudio/crusher_materials_fleet_1792508033360_750b51bb.jpg' },
    { label: '22 टायरी / टिपर अनलोडिंग', url: '/assets/aistudio/tipper_truck_rodi_1792507234326_79e051c1.jpg' },
    { label: 'क्वेरी माइनिंग कटिंग', url: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=800&q=80' }
  ];

  if (!isOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234') {
      setIsAuthenticated(true);
      setErrorMsg('');
      const map: Record<number, number> = {};
      materials.forEach((m) => {
        map[m.id] = m.rate;
      });
      setTempRates(map);
    } else {
      setErrorMsg(lang === 'hi' ? 'गलत पिन! केवल AARV ओनर ही लॉगिन कर सकते हैं।' : 'Incorrect PIN. Default: 1234');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('फ़ाइल का साइज़ 8MB से कम होना चाहिए');
        return;
      }
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setPostImg(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveRates = () => {
    const updated = materials.map((m) => {
      if (tempRates[m.id] !== undefined && tempRates[m.id] > 0) {
        return { ...m, rate: tempRates[m.id] };
      }
      return m;
    });

    onUpdateRates(updated);
    setSaveSuccessMsg('खनक मंडी के सभी नए थोक भाव तुरंत लाइव अपडेट हो गए हैं!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      alert('कृपया फोटो का शीर्षक या विवरण दर्ज करें');
      return;
    }

    const finalImage = postImg.trim() || PRESET_QUARRY_IMAGES[0].url;

    const newPost: DispatchPost = {
      id: `owner-post-${Date.now()}`,
      title: postTitle.trim(),
      tag: postTag,
      time: postTime.trim() || 'आज (Today)',
      imgUrl: finalImage,
      materialName: postMaterialName.trim() || undefined,
      tons: postTons ? parseFloat(postTons) : undefined,
      destination: postDest.trim() || undefined,
      truckType: postTruckType.trim() || '22 टायरी ट्रेलर'
    };

    onAddPost(newPost);
    setPostTitle('');
    setPostImg('');
    setUploadedFileName('');
    setPostTons('');
    setPostDest('');
    setSaveSuccessMsg('आपकी फोटो व बिजनेस अपडेट मार्केटिंग वॉल पर सफलतापूर्वक लाइव हो गया है!');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`क्या आप इस पोस्ट को गैलरी से हटाना चाहते हैं?\n"${title}"`)) {
      onDeletePost(id);
      setSaveSuccessMsg('पोस्ट को गैलरी से हटा दिया गया है!');
      setTimeout(() => setSaveSuccessMsg(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-300 w-full max-w-2xl rounded-2xl shadow-2xl max-h-[92vh] flex flex-col text-slate-900 overflow-hidden">
        
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-blue-900 text-base">
                {lang === 'hi' ? 'AARV ओनर एडमिन व मार्केटिंग कंसोल' : 'AARV Owner Admin & Media Console'}
              </h3>
              <p className="text-[11px] text-slate-500">
                {lang === 'hi' ? 'क्रशर फोटो अपलोड, मंडी भाव एवं गैलरी प्रबंधन' : 'Quarry photo upload, rates & gallery control'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-800 p-1.5 rounded-lg hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8">
            <form onSubmit={handleVerifyPin} className="max-w-sm mx-auto space-y-4">
              <div className="text-center space-y-1 mb-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 border border-blue-200">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">मालिक सुरक्षा पिन दर्ज करें</h4>
                <p className="text-xs text-slate-500">केवल अधिकृत स्वामी के लिए (डिफ़ॉल्ट पिन: 1234)</p>
              </div>

              <div>
                <input
                  type="password"
                  placeholder="• • • •"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  autoFocus
                  maxLength={6}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-lg text-slate-900 focus:outline-none focus:border-blue-600 font-mono tracking-widest text-center shadow-inner"
                />
              </div>

              {errorMsg && (
                <p className="text-red-600 text-xs font-semibold text-center">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs shadow transition-all hover:scale-[1.01]"
              >
                एडमिन कंसोल में प्रवेश करें
              </button>
            </form>
          </div>
        ) : (
          /* Admin Dashboard Screen */
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Top Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-2 pb-1">
              <button
                type="button"
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
                  activeTab === 'gallery'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>फोटो अपलोड व मार्केटिंग वॉल ({posts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('rates')}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl text-xs font-bold transition ${
                  activeTab === 'rates'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>आज के थोक भाव अपडेट</span>
              </button>
            </div>

            {saveSuccessMsg && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-3 rounded-xl text-xs flex items-center gap-2 font-bold shadow-xs">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            {/* TAB 1: Photo Upload & Gallery Management */}
            {activeTab === 'gallery' && (
              <div className="space-y-6">
                
                {/* Upload Form Box */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-2">
                      <Upload className="w-4 h-4 text-blue-600" />
                      <span>अपनी मर्जी से क्रशर, मशीनरी या स्टॉक की फोटो अपलोड करें:</span>
                    </h4>
                    <span className="text-[10px] text-blue-600 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      मोबाइल / कंप्यूटर से सीधी अपलोड
                    </span>
                  </div>

                  <form onSubmit={handlePublishPost} className="space-y-4">
                    
                    {/* Device File Picker */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        फोटो चुनें (फ़ोन की गैलरी/कैमरा या पीसी से):
                      </label>
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 hover:border-blue-500 font-bold py-2.5 px-4 rounded-xl text-xs flex items-center gap-2 transition shadow-xs">
                          <Camera className="w-4 h-4" />
                          <span>{uploadedFileName ? 'फोटो बदलें' : 'फ़ोन / कंप्यूटर से फोटो अपलोड करें'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                          />
                        </label>
                        {uploadedFileName && (
                          <span className="text-xs text-slate-600 truncate max-w-xs font-mono">
                            {uploadedFileName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Image Preview Box */}
                    {postImg && (
                      <div className="relative rounded-xl overflow-hidden border border-slate-300 h-44 bg-slate-900 group">
                        <img
                          src={postImg}
                          alt="अपलोड पूर्वावलोकन"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 bg-slate-950/80 text-white text-[10px] px-2 py-0.5 rounded">
                          ✓ फोटो अपलोड तैयार
                        </div>
                        <button
                          type="button"
                          onClick={() => { setPostImg(''); setUploadedFileName(''); }}
                          className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1 rounded-lg text-xs"
                          title="फोटो हटाएं"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Presets if owner doesn't have an instant photo */}
                    {!postImg && (
                      <div className="pt-1">
                        <span className="text-[11px] text-slate-500 block mb-1.5 font-medium">
                          अथवा इन असली क्रशर / माइनिंग फोटो में से चुनें:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {PRESET_QUARRY_IMAGES.map((preset, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setPostImg(preset.url);
                                setUploadedFileName(preset.label);
                              }}
                              className="p-1.5 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-left transition flex items-center gap-2 group"
                            >
                              <img
                                src={preset.url}
                                alt={preset.label}
                                className="w-8 h-8 rounded-lg object-cover"
                              />
                              <span className="text-[10px] font-bold text-slate-700 group-hover:text-blue-600 truncate">
                                {preset.label}
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Title / Description */}
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        शीर्षक / विवरण (Title & Description): *
                      </label>
                      <input
                        type="text"
                        placeholder="उदा. हमारे खनक क्रशर प्लांट पर 20mm गिट्टी का 5,000 टन फ्रेश स्टॉक NHAI एक्सप्रेसवे हेतु तैयार"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        required
                        className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600 font-medium"
                      />
                    </div>

                    {/* Tag / Category & Time */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          श्रेणी / टैग (Category Tag):
                        </label>
                        <select
                          value={postTag}
                          onChange={(e) => setPostTag(e.target.value)}
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-600"
                        >
                          <option value="क्रशर प्लांट">क्रशर प्लांट (Crusher Plant)</option>
                          <option value="स्टॉकयार्ड">स्टॉकयार्ड (Stockyard)</option>
                          <option value="22 टायरी फ्लीट">22 टायरी ट्रेलर फ्लीट</option>
                          <option value="खदान / माइनिंग">खदान व माइनिंग (Quarry)</option>
                          <option value="धर्मकांटा व ई-रवाना">धर्मकांटा व ई-रवाना</option>
                          <option value="ऑन-साइट डिलीवरी">ऑन-साइट डिलीवरी</option>
                          <option value="बिज़नेस अपडेट">बिज़नेस अपडेट</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          समय / दिनांक (Time/Date Label):
                        </label>
                        <input
                          type="text"
                          value={postTime}
                          onChange={(e) => setPostTime(e.target.value)}
                          placeholder="आज (Today), अभी-अभी, कल"
                          className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                        />
                      </div>
                    </div>

                    {/* Optional Details: Material, Tonnage, Destination */}
                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          सामग्री (वैकल्पिक):
                        </label>
                        <input
                          type="text"
                          value={postMaterialName}
                          onChange={(e) => setPostMaterialName(e.target.value)}
                          placeholder="20mm गिट्टी / डस्ट"
                          className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          मात्रा (टन, वैकल्पिक):
                        </label>
                        <input
                          type="number"
                          value={postTons}
                          onChange={(e) => setPostTons(e.target.value)}
                          placeholder="उदा. 45"
                          className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                          स्थान / गंतव्य (वैकल्पिक):
                        </label>
                        <input
                          type="text"
                          value={postDest}
                          onChange={(e) => setPostDest(e.target.value)}
                          placeholder="खनक प्लांट / एक्सप्रेसवे"
                          className="w-full bg-white border border-slate-300 rounded-xl p-2 text-xs text-slate-900"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 shadow transition-all hover:scale-[1.01]"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>मार्केटिंग वॉल पर फोटो लाइव पब्लिश करें</span>
                    </button>
                  </form>
                </div>

                {/* Section: Existing Posts Management */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-extrabold text-slate-900 text-xs flex items-center gap-1.5">
                      <Image className="w-4 h-4 text-blue-600" />
                      <span>गैलरी में लाइव पोस्ट्स ({posts.length}):</span>
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      आवश्यकतानुसार किसी भी पोस्ट को तुरंत हटा सकते हैं
                    </span>
                  </div>

                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {posts.map((post) => (
                      <div
                        key={post.id}
                        className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-xs hover:border-slate-300 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={post.imgUrl}
                            alt={post.title}
                            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2 py-0.5 rounded border border-blue-200">
                                {post.tag}
                              </span>
                              <span className="text-[10px] text-slate-400">{post.time}</span>
                            </div>
                            <h5 className="font-bold text-xs text-slate-900 truncate">
                              {post.title}
                            </h5>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDelete(post.id, post.title)}
                          className="shrink-0 p-2 text-red-600 hover:bg-red-50 rounded-lg transition border border-transparent hover:border-red-200"
                          title="इस पोस्ट को डिलीट करें"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Rates Updating */}
            {activeTab === 'rates' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-xs">
                      खनक मंडी आज के थोक भाव अपडेट करें (₹ प्रति मीट्रिक टन)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      एनजीटी पीक सीजन रेट: ₹600 - ₹1200 / टन
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={onResetRates}
                    className="text-[11px] text-slate-500 hover:text-blue-700 flex items-center gap-1 transition font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>डिफ़ॉल्ट दरें रीसेट</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
                  {materials.map((m) => (
                    <div key={m.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center gap-2">
                      <div className="min-w-0">
                        <label className="text-xs text-slate-900 font-bold block truncate">
                          {m.nameHi}
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          HSN: {m.hsnCode} | GST: {m.gstRate}%
                        </span>
                      </div>
                      <div className="flex items-center gap-1 shrink-0 w-28">
                        <span className="text-slate-500 font-bold text-xs">₹</span>
                        <input
                          type="number"
                          value={tempRates[m.id] ?? m.rate}
                          onChange={(e) =>
                            setTempRates({
                              ...tempRates,
                              [m.id]: Number(e.target.value)
                            })
                          }
                          className="w-full bg-slate-50 text-slate-900 font-bold text-xs p-1.5 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-600 text-right tabular-nums"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleSaveRates}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>नए भाव तुरंत पूरी वेबसाइट पर लाइव करें</span>
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
