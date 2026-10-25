/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CommercialBanner } from './components/CommercialBanner';
import { ExperienceSection } from './components/ExperienceSection';
import { VideosSection } from './components/VideosSection';
import { DiscussionsSection } from './components/DiscussionsSection';
import { ProductsSection } from './components/ProductsSection';
import { ServicesSection } from './components/ServicesSection';
import { BooksLibrarySection } from './components/BooksLibrarySection';
import { AiStudioModal } from './components/AiStudioModal';
import { CartDrawer } from './components/CartDrawer';
import { AdSenseManagerModal } from './components/AdSenseManagerModal';
import { AdSenseUnit } from './components/AdSenseUnit';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ShareLinkModal } from './components/ShareLinkModal';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { Footer } from './components/Footer';

import {
  INITIAL_VIDEOS,
  INITIAL_DISCUSSIONS,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_EXPERIENCES,
  INITIAL_BOOKS,
} from './data/initialData';

import {
  ContentTab,
  Language,
  VideoItem,
  DiscussionItem,
  ProductItem,
  ServiceItem,
  BookItem,
  CartItem,
  BookingSubmission,
  AdSenseConfig,
} from './types';

export default function App() {
  // Language state: 'ar' | 'en'
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('creator_hub_lang') as Language) || 'ar';
  });

  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme_mode') === 'dark';
  });

  // Navigation tab
  const [activeTab, setActiveTab] = useState<ContentTab>('all');

  // Modals state
  const [isAiStudioOpen, setIsAiStudioOpen] = useState(false);
  const [aiPreset, setAiPreset] = useState<'video' | 'discussion' | 'product' | 'service' | undefined>('video');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAdSenseModalOpen, setIsAdSenseModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Google AdSense Configuration State
  const [adsenseConfig, setAdsenseConfig] = useState<AdSenseConfig>(() => {
    const saved = localStorage.getItem('creator_hub_adsense_config_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // fallback to default
      }
    }
    return {
      isConnected: true,
      publisherId: 'ca-pub-8921764302918452',
      autoAdsEnabled: true,
      inFeedAdsEnabled: true,
      bannerAdsEnabled: true,
      testMode: false,
      verificationStatus: 'verified',
      adSlotBannerId: '1029384756',
      adSlotInFeedId: '5647382910',
      lastCheckedDate: new Date().toLocaleDateString(),
    };
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // State with LocalStorage persistence
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_videos_v3');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [discussions, setDiscussions] = useState<DiscussionItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_discussions_v3');
    return saved ? JSON.parse(saved) : INITIAL_DISCUSSIONS;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_products_v3');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_services_v3');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [books, setBooks] = useState<BookItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_books_v1');
    return saved ? JSON.parse(saved) : INITIAL_BOOKS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('creator_hub_cart_v3');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('creator_hub_videos_v3', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('creator_hub_discussions_v3', JSON.stringify(discussions));
  }, [discussions]);

  useEffect(() => {
    localStorage.setItem('creator_hub_products_v3', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('creator_hub_services_v3', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('creator_hub_books_v1', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('creator_hub_cart_v3', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('creator_hub_adsense_config_v1', JSON.stringify(adsenseConfig));
  }, [adsenseConfig]);

  // Language & RTL/LTR dynamic updates
  useEffect(() => {
    localStorage.setItem('creator_hub_lang', language);
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    if (language === 'ar') {
      document.documentElement.style.fontFamily = "'Cairo', system-ui, sans-serif";
    } else {
      document.documentElement.style.fontFamily = "'Plus Jakarta Sans', system-ui, sans-serif";
    }
  }, [language]);

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme_mode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme_mode', 'light');
    }
  }, [darkMode]);

  // Toggle handlers
  const handleToggleLanguage = () => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleOpenAiStudio = (preset?: 'video' | 'discussion' | 'product' | 'service') => {
    setAiPreset(preset || 'video');
    setIsAiStudioOpen(true);
  };

  const handleUpdateAdSenseConfig = (newConfig: AdSenseConfig) => {
    setAdsenseConfig(newConfig);
    showToast(
      language === 'ar'
        ? `تم تحديث وربط Google AdSense (${newConfig.publisherId}) بنجاح!`
        : `Google AdSense connected successfully (${newConfig.publisherId})!`
    );
  };

  // Content Additions
  const handleAddVideo = (newVideo: VideoItem) => {
    setVideos((prev) => [newVideo, ...prev]);
    showToast(
      language === 'ar'
        ? `تم نشر الفيديو "${newVideo.title}" بنجاح!`
        : `Video "${newVideo.titleEn || newVideo.title}" published successfully!`
    );
  };

  const handleLikeVideo = (videoId: string) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === videoId ? { ...v, likes: v.likes + 1 } : v))
    );
  };

  const handleAddDiscussion = (newDiscussion: DiscussionItem) => {
    setDiscussions((prev) => [newDiscussion, ...prev]);
    showToast(
      language === 'ar'
        ? `تم نشر النقاش "${newDiscussion.title}" بنجاح!`
        : `Discussion "${newDiscussion.titleEn || newDiscussion.title}" published successfully!`
    );
  };

  const handleUpvoteDiscussion = (discussionId: string) => {
    setDiscussions((prev) =>
      prev.map((d) => (d.id === discussionId ? { ...d, upvotes: d.upvotes + 1 } : d))
    );
  };

  // Product additions & Creator direct price updates
  const handleAddProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [newProduct, ...prev]);
    showToast(
      language === 'ar'
        ? `تمت إضافة المنتج "${newProduct.name}" بسعر محدد من قبلك: $${newProduct.price}!`
        : `Product "${newProduct.nameEn || newProduct.name}" added with creator price: $${newProduct.price}!`
    );
  };

  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, price: newPrice, isCustomCreatorPriced: true } : p))
    );
    showToast(
      language === 'ar'
        ? `تم تحديث سعر المنتج بنجاح إلى $${newPrice}!`
        : `Creator price updated to $${newPrice}!`
    );
  };

  // Service additions & AI Dynamic pricing update
  const handleAddService = (newService: ServiceItem) => {
    setServices((prev) => [newService, ...prev]);
    showToast(
      language === 'ar'
        ? `تمت إضافة الخدمة "${newService.title}" (${newService.isAiPriced ? 'مسعرة بالذكاء الاصطناعي' : 'سعر محدد'})!`
        : `Service "${newService.titleEn || newService.title}" added!`
    );
  };

  const handleUpdateServicePrice = (serviceId: string, newPrice: number, rationale?: string) => {
    setServices((prev) =>
      prev.map((s) =>
        s.id === serviceId
          ? {
              ...s,
              price: newPrice,
              aiPricingRationale: rationale || s.aiPricingRationale,
              aiPricingRationaleEn: rationale || s.aiPricingRationaleEn,
            }
          : s
      )
    );
    showToast(
      language === 'ar'
        ? `تم احتساب وتقييم سعر الخدمة بالذكاء الاصطناعي: $${newPrice}!`
        : `Service dynamically repriced by Gemini AI: $${newPrice}!`
    );
  };

  // Cart operations (handles BOTH products and services)
  const handleAddToCart = (product: ProductItem, isCommercial: boolean = false) => {
    const finalPrice = isCommercial && product.commercialPrice ? product.commercialPrice : product.price;
    const cartItemId = `prod-${product.id}-${isCommercial ? 'comm' : 'pers'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          type: 'product',
          title: product.name,
          titleEn: product.nameEn,
          price: finalPrice,
          quantity: 1,
          image: product.image,
          category: product.category,
          isCommercialLicense: isCommercial,
          isAiPriced: false,
        },
      ];
    });

    showToast(
      language === 'ar'
        ? `تمت إضافة "${product.name}" إلى السلة والدفع عبر Google Pay لحسابي!`
        : `Added "${product.nameEn || product.name}" to cart with Google Pay payout!`
    );
  };

  const handleInstantBuyGPay = (product: ProductItem, isCommercial: boolean = false) => {
    handleAddToCart(product, isCommercial);
    setIsCartOpen(true);
  };

  const handleAddToCartService = (service: ServiceItem) => {
    const cartItemId = `serv-${service.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          type: 'service',
          title: service.title,
          titleEn: service.titleEn,
          price: service.price,
          quantity: 1,
          image: service.image,
          category: 'advisory',
          isCommercialLicense: true,
          isAiPriced: service.isAiPriced,
        },
      ];
    });

    showToast(
      language === 'ar'
        ? `تمت إضافة الخدمة "${service.title}" للسلة ($${service.price})!`
        : `Service "${service.titleEn || service.title}" added to cart ($${service.price})!`
    );
    setIsCartOpen(true);
  };

  const handleInstantBuyServiceGPay = (service: ServiceItem) => {
    handleAddToCartService(service);
    setIsCartOpen(true);
  };

  const handleUpdateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleBookService = (submission: BookingSubmission) => {
    showToast(
      language === 'ar'
        ? `تم شراء وتأكيد حجز خدمة "${submission.serviceTitle}" بنجاح عبر Google Pay!`
        : `Consultation "${submission.serviceTitle}" purchased & scheduled via Google Pay!`
    );
  };

  // Book handlers
  const handleAddBook = (newBook: BookItem) => {
    setBooks((prev) => [newBook, ...prev]);
    showToast(
      language === 'ar'
        ? `تم نشر الكتاب الإلكتروني "${newBook.title}" بنجاح للبيع عبر Google Play!`
        : `E-Book "${newBook.titleEn || newBook.title}" published successfully for sale via Google Play!`
    );
  };

  const handleUpdateBookPrice = (bookId: string, newPrice: number, rationale?: string) => {
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? {
              ...b,
              price: newPrice,
              isAiPriced: true,
              aiPricingRationale: rationale || b.aiPricingRationale,
              aiPricingRationaleEn: rationale || b.aiPricingRationaleEn,
            }
          : b
      )
    );
    showToast(
      language === 'ar'
        ? `تم إعادة تقييم وتسعير الكتاب بالذكاء الاصطناعي: $${newPrice}!`
        : `Book dynamically repriced by Gemini AI: $${newPrice}!`
    );
  };

  const handleAddToCartBook = (book: BookItem) => {
    const cartItemId = `book-${book.id}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          type: 'book',
          title: book.title,
          titleEn: book.titleEn,
          price: book.price,
          quantity: 1,
          image: book.coverImage,
          category: book.category,
          isCommercialLicense: false,
          isAiPriced: book.isAiPriced,
        },
      ];
    });

    showToast(
      language === 'ar'
        ? `تمت إضافة الكتاب "${book.title}" إلى السلة (دفع بـ Visa/Mastercard عبر Google Play)!`
        : `Added "${book.titleEn || book.title}" to cart (Visa/Mastercard via Google Play)!`
    );
  };

  const handleInstantBuyBook = (book: BookItem) => {
    handleAddToCartBook(book);
    setIsCartOpen(true);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        language === 'ar'
          ? 'هل تريد استعادة البيانات الافتراضية الأولية للموقع؟'
          : 'Do you want to reset demo data back to default state?'
      )
    ) {
      setVideos(INITIAL_VIDEOS);
      setDiscussions(INITIAL_DISCUSSIONS);
      setProducts(INITIAL_PRODUCTS);
      setServices(INITIAL_SERVICES);
      setBooks(INITIAL_BOOKS);
      setCart([]);
      localStorage.clear();
      showToast(language === 'ar' ? 'تمت استعادة البيانات الافتراضية!' : 'Default demo data restored!');
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/20 text-slate-900 dark:text-slate-100 transition-colors relative overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Colorful Global Ambient Background Light Gradients ("اجعل الخلفيات ملونة") */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-40 w-[550px] h-[550px] bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-2/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/10 via-amber-500/5 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className={`fixed bottom-5 ${language === 'ar' ? 'right-5' : 'left-5'} z-50 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-5 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2.5 animate-bounce border border-slate-700`}>
          <span>✨</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiStudio={handleOpenAiStudio}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        language={language}
        onToggleLanguage={handleToggleLanguage}
        onOpenAdSense={() => setIsAdSenseModalOpen(true)}
        adsenseConnected={adsenseConfig.isConnected}
        onOpenShareLink={() => setIsShareModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10">
        
        {/* Render Hero and Commercial Banner only on 'all' tab */}
        {activeTab === 'all' && (
          <>
            <Hero
              language={language}
              onNavigateTab={(tab) => setActiveTab(tab)}
              onOpenAiStudio={() => handleOpenAiStudio('video')}
            />

            {/* Commercial & Google Pay Direct Payouts Banner */}
            <CommercialBanner
              language={language}
              onExploreServices={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onExploreProducts={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Comprehensive E-Book Publishing & Digital Library Page */}
            <BooksLibrarySection
              language={language}
              books={books}
              onAddBook={handleAddBook}
              onAddToCartBook={handleAddToCartBook}
              onInstantBuyBook={handleInstantBuyBook}
              onUpdateBookPrice={handleUpdateBookPrice}
            />

            {/* English Professional Experience Profile Showcase */}
            <ExperienceSection
              language={language}
              experiences={INITIAL_EXPERIENCES}
              onBookAdvisory={() => {
                setActiveTab('services');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Google AdSense Responsive Display Banner */}
            {adsenseConfig.bannerAdsEnabled && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
                <AdSenseUnit
                  config={adsenseConfig}
                  language={language}
                  format="banner"
                  slot="1029384756"
                />
              </div>
            )}
          </>
        )}

        {/* Focused Tab Views */}
        {activeTab === 'books' && (
          <BooksLibrarySection
            language={language}
            books={books}
            onAddBook={handleAddBook}
            onAddToCartBook={handleAddToCartBook}
            onInstantBuyBook={handleInstantBuyBook}
            onUpdateBookPrice={handleUpdateBookPrice}
          />
        )}

        {activeTab === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AnalyticsDashboard language={language} onNavigateTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'experience' && (
          <ExperienceSection
            language={language}
            experiences={INITIAL_EXPERIENCES}
            onBookAdvisory={() => {
              setActiveTab('services');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {(activeTab === 'all' || activeTab === 'videos') && (
          <VideosSection
            language={language}
            videos={videos}
            onAddVideo={handleAddVideo}
            onOpenAiStudio={() => handleOpenAiStudio('video')}
            onLikeVideo={handleLikeVideo}
          />
        )}

        {/* Native In-Feed AdSense between Videos and Discussions */}
        {activeTab === 'all' && adsenseConfig.inFeedAdsEnabled && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1">
            <AdSenseUnit
              config={adsenseConfig}
              language={language}
              format="in-feed"
              slot="5647382910"
            />
          </div>
        )}

        {(activeTab === 'all' || activeTab === 'discussions') && (
          <DiscussionsSection
            language={language}
            discussions={discussions}
            onAddDiscussion={handleAddDiscussion}
            onOpenAiStudio={() => handleOpenAiStudio('discussion')}
            onUpvoteDiscussion={handleUpvoteDiscussion}
          />
        )}

        {(activeTab === 'all' || activeTab === 'products') && (
          <ProductsSection
            language={language}
            products={products}
            onAddToCart={handleAddToCart}
            onInstantBuyGPay={handleInstantBuyGPay}
            onOpenAiStudio={() => handleOpenAiStudio('product')}
            onAddProduct={handleAddProduct}
            onUpdateProductPrice={handleUpdateProductPrice}
          />
        )}

        {(activeTab === 'all' || activeTab === 'services') && (
          <ServicesSection
            language={language}
            services={services}
            onBookService={handleBookService}
            onAddToCartService={handleAddToCartService}
            onInstantBuyServiceGPay={handleInstantBuyServiceGPay}
            onOpenAiStudio={() => handleOpenAiStudio('service')}
            onAddService={handleAddService}
            onUpdateServicePrice={handleUpdateServicePrice}
          />
        )}

        {/* Global Interactive Analytics Dashboard Section */}
        {activeTab === 'all' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
            <AnalyticsDashboard
              language={language}
              onNavigateTab={(tab) => {
                setActiveTab(tab as ContentTab);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}

      </main>

      {/* AI Creator Studio Modal */}
      <AiStudioModal
        language={language}
        isOpen={isAiStudioOpen}
        onClose={() => setIsAiStudioOpen(false)}
        presetType={aiPreset}
        onPublishVideo={(item) => {
          handleAddVideo(item);
          setActiveTab('videos');
        }}
        onPublishDiscussion={(item) => {
          handleAddDiscussion(item);
          setActiveTab('discussions');
        }}
        onPublishProduct={(item) => {
          handleAddProduct(item);
          setActiveTab('products');
        }}
        onPublishService={(item) => {
          handleAddService(item);
          setActiveTab('services');
        }}
      />

      {/* Google AdSense Manager & Linking Modal */}
      <AdSenseManagerModal
        isOpen={isAdSenseModalOpen}
        onClose={() => setIsAdSenseModalOpen(false)}
        config={adsenseConfig}
        onUpdateConfig={handleUpdateAdSenseConfig}
        language={language}
      />

      {/* Cart & Google Pay Checkout Drawer */}
      <CartDrawer
        language={language}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Footer */}
      <Footer
        language={language}
        onNavigateTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAiStudio={() => handleOpenAiStudio('video')}
        onResetData={handleResetData}
        onOpenAdSense={() => setIsAdSenseModalOpen(true)}
        onOpenCustomDomain={() => setIsShareModalOpen(true)}
      />

      {/* Branded Link & Domain Modal (alsalam) */}
      <ShareLinkModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        language={language}
      />

      {/* Floating Interactive WhatsApp Support Hub */}
      <WhatsAppWidget language={language} />

    </div>
  );
}
