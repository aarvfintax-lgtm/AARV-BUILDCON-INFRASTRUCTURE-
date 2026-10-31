import React, { useState, useEffect } from 'react';
import { MaterialItem, DispatchPost, QuoteCalculation, Language, ThemeMode } from './types';
import { INITIAL_MATERIALS } from './data/materialsData';
import { INITIAL_POSTS } from './data/initialPosts';
import { INITIAL_ANALYTICS_QUOTES } from './data/initialAnalyticsData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { MaterialsCatalog } from './components/MaterialsCatalog';
import { LiveDispatchWall } from './components/LiveDispatchWall';
import { ReviewsFeedback } from './components/ReviewsFeedback';
import { HeavyMachinery } from './components/HeavyMachinery';
import { ERawaanaCompliance } from './components/ERawaanaCompliance';
import { ContactDispatchSection } from './components/ContactDispatchSection';
import { PaymentModal } from './components/PaymentModal';
import { AdminModal } from './components/AdminModal';
import { QuotationModal } from './components/QuotationModal';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';

export default function App() {
  const [lang, setLang] = useState<Language>('hi');
  const [theme, setTheme] = useState<ThemeMode>(() => {
    try {
      const saved = localStorage.getItem('aarv_theme_mode_v2');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      console.error('Failed to load theme preference', e);
    }
    return 'dark'; // High-tech dark corporate theme by default
  });

  // Apply dark mode class to html element whenever theme state changes
  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('aarv_theme_mode_v2', theme);
    } catch (e) {
      console.error('Failed to persist theme mode', e);
    }
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };
  const [materials, setMaterials] = useState<MaterialItem[]>(() => {
    try {
      const saved = localStorage.getItem('aarv_materials_rates_ngt_v2');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved rates', e);
    }
    return INITIAL_MATERIALS;
  });

  const [posts, setPosts] = useState<DispatchPost[]>(() => {
    try {
      const saved = localStorage.getItem('aarv_dispatch_posts_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved posts', e);
    }
    return INITIAL_POSTS;
  });

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialItem | null>(null);
  const [activeQuote, setActiveQuote] = useState<QuoteCalculation | null>(null);
  const [quoteHistory, setQuoteHistory] = useState<QuoteCalculation[]>(() => {
    try {
      const saved = localStorage.getItem('aarv_quote_history_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved quote history', e);
    }
    return INITIAL_ANALYTICS_QUOTES;
  });
  const [isPaymentOpen, setIsPaymentOpen] = useState<boolean>(false);
  const [paymentAmount, setPaymentAmount] = useState<number>(25000);
  const [paymentOrderRef, setPaymentOrderRef] = useState<string>('AARV Bulk Material Advance');
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const handleRecordQuote = (q: QuoteCalculation) => {
    setActiveQuote(q);
    setQuoteHistory((prev) => {
      const updated = [q, ...prev.filter((item) => item.quoteId !== q.quoteId)];
      try {
        localStorage.setItem('aarv_quote_history_v1', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save quote history', e);
      }
      return updated;
    });
  };

  const handleOpenPaymentWithAmount = (amount?: number, orderRef?: string) => {
    if (amount && amount > 0) {
      setPaymentAmount(amount);
    }
    if (orderRef) {
      setPaymentOrderRef(orderRef);
    }
    setIsPaymentOpen(true);
  };

  // Save rates when updated
  const handleUpdateRates = (updated: MaterialItem[]) => {
    setMaterials(updated);
    try {
      localStorage.setItem('aarv_materials_rates_ngt_v2', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist rates', e);
    }
  };

  const handleResetRates = () => {
    setMaterials(INITIAL_MATERIALS);
    try {
      localStorage.removeItem('aarv_materials_rates_ngt_v2');
    } catch (e) {
      console.error('Failed to clear rates', e);
    }
  };

  // Add post to marketing wall
  const handleAddPost = (newPost: DispatchPost) => {
    const updated = [newPost, ...posts];
    setPosts(updated);
    try {
      localStorage.setItem('aarv_dispatch_posts_v3', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist posts', e);
    }
  };

  // Delete post from marketing wall
  const handleDeletePost = (id: string) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    try {
      localStorage.setItem('aarv_dispatch_posts_v3', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist posts', e);
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-blue-600 selection:text-white flex flex-col justify-between transition-colors">
      <div>
        {/* Header & Sticky Top Bar with Theme Toggle */}
        <Header
          materials={materials}
          lang={lang}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onToggleLang={handleToggleLang}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenPayment={() => setIsPaymentOpen(true)}
          onSelectMaterialForCalc={(m) => {
            setSelectedMaterial(m);
            const el = document.getElementById('calculator');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        <main>
          {/* Hero Section & Bulk Calculator */}
          <Hero
            materials={materials}
            selectedMaterial={selectedMaterial}
            lang={lang}
            onGenerateQuote={(q) => handleRecordQuote(q)}
            onOpenPayment={(amt, ref) => handleOpenPaymentWithAmount(amt, ref)}
          />

          {/* Full Materials & Aggregates Catalog */}
          <MaterialsCatalog
            materials={materials}
            lang={lang}
            onSelectForCalc={(m) => setSelectedMaterial(m)}
          />

          {/* Live Dispatch Wall & On-site Photos */}
          <LiveDispatchWall
            posts={posts}
            lang={lang}
          />

          {/* Client Reviews & Service/Material Feedback */}
          <ReviewsFeedback
            lang={lang}
          />

          {/* Heavy Machinery & Civil Tenders */}
          <HeavyMachinery
            lang={lang}
          />

          {/* E-Rawaana & Computerized Dharam Kanta Weighment Compliance */}
          <ERawaanaCompliance
            lang={lang}
          />

          {/* High-Tech Dedicated Contact & Quarry Dispatch Section */}
          <ContactDispatchSection
            materials={materials}
            lang={lang}
          />
        </main>
      </div>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Action Buttons */}
      <FloatingActions />

      {/* Modal: RTGS & Bank Details with UPI QR Code Generator */}
      <PaymentModal
        isOpen={isPaymentOpen}
        lang={lang}
        initialAmount={paymentAmount}
        orderReference={paymentOrderRef}
        onClose={() => setIsPaymentOpen(false)}
      />

      {/* Modal: Confidential Admin Panel */}
      <AdminModal
        isOpen={isAdminOpen}
        materials={materials}
        posts={posts}
        quotes={quoteHistory}
        lang={lang}
        onClose={() => setIsAdminOpen(false)}
        onUpdateRates={handleUpdateRates}
        onResetRates={handleResetRates}
        onAddPost={handleAddPost}
        onDeletePost={handleDeletePost}
      />

      {/* Modal: Official Proforma Quotation Slip */}
      <QuotationModal
        quote={activeQuote}
        lang={lang}
        onOpenPayment={(amt, ref) => {
          setActiveQuote(null);
          handleOpenPaymentWithAmount(amt, ref);
        }}
        onClose={() => setActiveQuote(null)}
      />
    </div>
  );
}
