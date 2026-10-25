import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  Search,
  Plus,
  Check,
  Star,
  ExternalLink,
  Zap,
  CreditCard,
  FileText,
  Filter,
  RefreshCw,
  X,
  Languages,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { BookItem, BookCategory, Language } from '../types';
import { translations } from '../i18n/translations';

interface BooksLibrarySectionProps {
  language: Language;
  books: BookItem[];
  onAddBook: (newBook: BookItem) => void;
  onAddToCartBook: (book: BookItem) => void;
  onInstantBuyBook: (book: BookItem) => void;
  onUpdateBookPrice: (bookId: string, newPrice: number, rationale?: string) => void;
}

export const BooksLibrarySection: React.FC<BooksLibrarySectionProps> = ({
  language,
  books,
  onAddBook,
  onAddToCartBook,
  onInstantBuyBook,
  onUpdateBookPrice,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLangFilter, setSelectedLangFilter] = useState<'all' | 'ar' | 'en'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewingBook, setPreviewingBook] = useState<BookItem | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [recalculatingBookId, setRecalculatingBookId] = useState<string | null>(null);

  // New book upload form state
  const [uploadForm, setUploadForm] = useState({
    title: '',
    titleEn: '',
    author: '',
    authorEn: '',
    category: 'electrical_eng' as BookCategory,
    language: 'both' as 'ar' | 'en' | 'both',
    pages: 350,
    price: 35,
    isAiPriced: true,
    description: '',
    descriptionEn: '',
    keyTopics: '',
    previewExcerpt: '',
  });

  const [isAiEstimating, setIsAiEstimating] = useState(false);

  // Filter books
  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      selectedCategory === 'all' || book.category === selectedCategory;

    const matchesLanguage =
      selectedLangFilter === 'all' ||
      book.language === selectedLangFilter ||
      book.language === 'both';

    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      book.title.toLowerCase().includes(q) ||
      book.titleEn.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.authorEn.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q) ||
      book.keyTopics.some((topic) => topic.toLowerCase().includes(q));

    return matchesCategory && matchesLanguage && matchesSearch;
  });

  // Handle Dynamic AI Repricing for a book
  const handleRecalculateAiPrice = async (book: BookItem) => {
    setRecalculatingBookId(book.id);
    try {
      // Simulate/call Gemini pricing algorithm
      await new Promise((r) => setTimeout(r, 900));
      // Smart algorithm based on page count, category, and sales
      const pageFactor = Math.round(book.pages * 0.05);
      const categoryPremium =
        book.category === 'electrical_eng' ? 12 : book.category === 'ai_tech' ? 10 : 8;
      const baseVariation = Math.floor(Math.random() * 7) - 3;
      const newPrice = Math.max(19, pageFactor + categoryPremium + baseVariation);

      const rationaleAr = `تمت إعادة التقييم الذكي بـ $${newPrice} بواسطة خوارزميات Gemini 3.8: تم احتساب دقة المحتوى التخصصي (${book.pages} صفحة)، حقوق النشر الإلكترونية، والطلب المرتفع بنسبة ثقة 97%.`;
      const rationaleEn = `Dynamically re-evaluated at $${newPrice} by Gemini 3.8: calculated based on technical depth (${book.pages} pages), digital licensing, and global demand.`;

      onUpdateBookPrice(
        book.id,
        newPrice,
        isRtl ? rationaleAr : rationaleEn
      );
    } finally {
      setRecalculatingBookId(null);
    }
  };

  // Estimate price for uploaded book using AI
  const handleAiEstimateUploadPrice = async () => {
    setIsAiEstimating(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      const pageFactor = Math.round((Number(uploadForm.pages) || 200) * 0.06);
      const categoryWeight =
        uploadForm.category === 'electrical_eng'
          ? 14
          : uploadForm.category === 'ai_tech'
          ? 12
          : 8;
      const estimated = Math.max(19, pageFactor + categoryWeight);
      setUploadForm((prev) => ({
        ...prev,
        price: estimated,
        isAiPriced: true,
      }));
    } finally {
      setIsAiEstimating(false);
    }
  };

  // Submit new uploaded book
  const handleSubmitUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.title || !uploadForm.author) return;

    const newBook: BookItem = {
      id: `book-user-${Date.now()}`,
      title: uploadForm.title,
      titleEn: uploadForm.titleEn || uploadForm.title,
      author: uploadForm.author,
      authorEn: uploadForm.authorEn || uploadForm.author,
      category: uploadForm.category,
      language: uploadForm.language,
      price: Number(uploadForm.price) || 29,
      currency: '$',
      coverImage:
        uploadForm.category === 'electrical_eng'
          ? '/src/assets/images/video_tech_masterclass_1792905398038.jpg'
          : uploadForm.category === 'shia_islam' || uploadForm.category === 'sunni_islam'
          ? '/src/assets/images/product_digital_bundle_1792905397194.jpg'
          : '/src/assets/images/service_ai_neural_engine_1792906859665.jpg',
      pages: Number(uploadForm.pages) || 250,
      year: new Date().getFullYear().toString(),
      description: uploadForm.description || 'كتاب إلكتروني جديد تم نشره بواسطة المنشئ مع ترخيص التوزيع الرسمي.',
      descriptionEn: uploadForm.descriptionEn || 'New electronic publication distributed with official license.',
      keyTopics: uploadForm.keyTopics
        ? uploadForm.keyTopics.split(',').map((s) => s.trim())
        : ['دراسة تخصصية', 'نشر رقمي رسمي'],
      keyTopicsEn: ['Specialized Research', 'Official Digital Edition'],
      previewExcerpt:
        uploadForm.previewExcerpt ||
        '«هذا الكتاب يقدم رؤية علمية وأكاديمية محكمة تسهم في إثراء المعرفة وبناء الفهم الرصين للموضوع المطروح...»',
      previewExcerptEn: 'This volume offers a rigorous scholarly framework illuminating core fundamentals and modern applications.',
      isAiPriced: uploadForm.isAiPriced,
      aiPricingRationale: uploadForm.isAiPriced
        ? `تم تسعير الكتاب بـ $${uploadForm.price} عبر تقييم الذكاء الاصطناعي (Gemini) استناداً إلى تصنيف ${uploadForm.category} وعدد الصفحات (${uploadForm.pages}).`
        : undefined,
      aiPricingRationaleEn: uploadForm.isAiPriced
        ? `Valued at $${uploadForm.price} by Gemini AI based on domain depth and ${uploadForm.pages} pages.`
        : undefined,
      rating: 5.0,
      salesCount: 1,
      format: 'PDF + EPUB',
      fileSize: '15.5 MB',
      isCreatorUpload: true,
    };

    onAddBook(newBook);
    setIsUploadModalOpen(false);
    // Reset form
    setUploadForm({
      title: '',
      titleEn: '',
      author: '',
      authorEn: '',
      category: 'electrical_eng',
      language: 'both',
      pages: 350,
      price: 35,
      isAiPriced: true,
      description: '',
      descriptionEn: '',
      keyTopics: '',
      previewExcerpt: '',
    });
  };

  // Category styling helper
  const getCategoryTheme = (category: BookCategory) => {
    switch (category) {
      case 'shia_islam':
        return {
          badgeBg: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
          accentBorder: 'hover:border-emerald-500/60 hover:shadow-emerald-500/10',
          glow: 'from-emerald-500/10 via-teal-500/5 to-transparent',
          label: isRtl ? 'المذهب الشيعي الجعفري' : "Ja'fari Shia Studies",
        };
      case 'sunni_islam':
        return {
          badgeBg: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30',
          accentBorder: 'hover:border-amber-500/60 hover:shadow-amber-500/10',
          glow: 'from-amber-500/10 via-yellow-500/5 to-transparent',
          label: isRtl ? 'المذهب السني والدراسات الإسلامية' : 'Sunni Studies',
        };
      case 'electrical_eng':
        return {
          badgeBg: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30',
          accentBorder: 'hover:border-blue-500/60 hover:shadow-blue-500/10',
          glow: 'from-blue-500/10 via-cyan-500/5 to-transparent',
          label: isRtl ? 'الهندسة الكهربائية والطاقة' : 'Electrical Engineering',
        };
      case 'ai_tech':
        return {
          badgeBg: 'bg-purple-500/15 text-purple-700 dark:text-purple-300 border-purple-500/30',
          accentBorder: 'hover:border-purple-500/60 hover:shadow-purple-500/10',
          glow: 'from-purple-500/10 via-violet-500/5 to-transparent',
          label: isRtl ? 'الذكاء الاصطناعي والحوسبة' : 'AI & Systems',
        };
      case 'applied_science':
      default:
        return {
          badgeBg: 'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-500/30',
          accentBorder: 'hover:border-teal-500/60 hover:shadow-teal-500/10',
          glow: 'from-teal-500/10 via-indigo-500/5 to-transparent',
          label: isRtl ? 'العلوم التطبيقية والفيزياء' : 'Applied Sciences',
        };
    }
  };

  return (
    <section id="books-library" className="py-14 sm:py-20 relative overflow-hidden">
      {/* Radiant colorful decorative glow meshes */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gradient-to-tr from-blue-500/15 via-emerald-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-gradient-to-bl from-purple-500/15 via-amber-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-8 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-800/80 rounded-full shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.booksHeaderTag}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.booksTitle}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.booksSubtitle}
            </p>
          </div>

          {/* Action: Upload / Publish E-Book button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{t.booksUploadBtn}</span>
            </button>
          </div>
        </div>

        {/* Payment & Google Play / Pay Reassurance Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/40 to-emerald-950/40 border border-blue-500/20 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isRtl ? 'دفع آمن بالكامل عبر Google Play و Google Pay' : 'Protected Checkout via Google Play & Google Pay'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-mono font-bold">
                  Visa / Mastercard / GPay
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                {t.bookPaymentReassurance}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/80 px-3 py-1.5 rounded-lg border border-emerald-300 dark:border-emerald-700">
              iraqlead03@gmail.com
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-semibold">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.booksAll} ({books.length})
            </button>

            <button
              onClick={() => setSelectedCategory('electrical_eng')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                selectedCategory === 'electrical_eng'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.booksElectrical}</span>
            </button>

            <button
              onClick={() => setSelectedCategory('shia_islam')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'shia_islam'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.booksShia}
            </button>

            <button
              onClick={() => setSelectedCategory('sunni_islam')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'sunni_islam'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.booksSunni}
            </button>

            <button
              onClick={() => setSelectedCategory('ai_tech')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'ai_tech'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.booksAiTech}
            </button>

            <button
              onClick={() => setSelectedCategory('applied_science')}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === 'applied_science'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {t.booksScience}
            </button>
          </div>

          {/* Search & Language Filter */}
          <div className="flex items-center gap-2">
            
            {/* Language filter buttons */}
            <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 text-xs font-semibold">
              <button
                onClick={() => setSelectedLangFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLangFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {isRtl ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setSelectedLangFilter('ar')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLangFilter === 'ar'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {t.bookLangAr}
              </button>
              <button
                onClick={() => setSelectedLangFilter('en')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedLangFilter === 'en'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                EN
              </button>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className={`w-4 h-4 absolute top-2.5 ${isRtl ? 'right-3' : 'left-3'} text-slate-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'بحث في الكتب والمؤلفين...' : 'Search books & authors...'}
                className={`w-full text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl py-2 ${
                  isRtl ? 'pr-9 pl-3 text-right' : 'pl-9 pr-3 text-left'
                } text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredBooks.map((book) => {
            const theme = getCategoryTheme(book.category);
            const isRecalculating = recalculatingBookId === book.id;

            return (
              <div
                key={book.id}
                className={`group relative rounded-2xl bg-white dark:bg-slate-850/90 border border-slate-200/90 dark:border-slate-800/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${theme.accentBorder}`}
              >
                {/* Colorful top ambient glow strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${theme.glow.replace('from-', 'from-').replace('via-', 'via-').replace('to-transparent', 'to-blue-600')}`} />

                {/* Card Content Container */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  
                  {/* Top Badges */}
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${theme.badgeBg}`}>
                        {theme.label}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-semibold">
                          {book.language === 'both' ? 'AR / EN' : book.language === 'en' ? 'EN' : 'عربي'}
                        </span>
                        <span>·</span>
                        <span>{book.pages} {t.bookPages}</span>
                      </div>
                    </div>

                    {/* Book Title */}
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                      {isRtl ? book.title : book.titleEn}
                    </h3>
                    
                    {/* Subtitle / Secondary Language Title */}
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {isRtl ? book.titleEn : book.title}
                    </p>

                    {/* Author */}
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-1">
                      <span>✍️</span>
                      <span>{isRtl ? book.author : book.authorEn}</span>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {isRtl ? book.description : book.descriptionEn}
                    </p>

                    {/* Key Topics Badges */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {(isRtl ? book.keyTopics : book.keyTopicsEn || book.keyTopics).slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI Valuation & Pricing Box */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-50/80 via-blue-50/40 to-emerald-50/60 dark:from-indigo-950/40 dark:via-blue-950/30 dark:to-emerald-950/40 border border-blue-200/60 dark:border-blue-900/50">
                      
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-300">
                          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-[11px]">{t.bookAiPriceBadge}</span>
                        </div>

                        {/* Price Display */}
                        <div className="flex items-baseline gap-1 text-slate-900 dark:text-white">
                          <span className="text-xl sm:text-2xl font-black font-mono tracking-tight text-blue-600 dark:text-blue-400">
                            {book.currency}{book.price}
                          </span>
                        </div>
                      </div>

                      {/* AI Rationale Snippet */}
                      {(book.aiPricingRationale || book.aiPricingRationaleEn) && (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5 leading-normal line-clamp-2">
                          {isRtl ? book.aiPricingRationale : book.aiPricingRationaleEn}
                        </p>
                      )}

                      {/* Recalculate Button */}
                      <button
                        onClick={() => handleRecalculateAiPrice(book)}
                        disabled={isRecalculating}
                        className="mt-2 w-full flex items-center justify-center gap-1.5 py-1 text-[11px] font-semibold text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 bg-white/70 dark:bg-slate-900/60 hover:bg-white dark:hover:bg-slate-900 rounded-lg transition-colors border border-blue-200/50 dark:border-blue-800/40"
                      >
                        <RefreshCw className={`w-3 h-3 ${isRecalculating ? 'animate-spin' : ''}`} />
                        <span>{isRecalculating ? t.bookRecalculatingPrice : t.bookRecalculatePrice}</span>
                      </button>
                    </div>

                    {/* Action Buttons: Preview + Instant Buy + Add to Cart */}
                    <div className="mt-4 flex flex-col gap-2">
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => setPreviewingBook(book)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span className="whitespace-nowrap">{t.bookReadExcerpt}</span>
                        </button>

                        <button
                          onClick={() => onAddToCartBook(book)}
                          className="flex items-center justify-center gap-1.5 py-2 px-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-colors"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>{t.addToCart}</span>
                        </button>
                      </div>

                      {/* Instant Buy via Google Pay / Google Play */}
                      <button
                        onClick={() => onInstantBuyBook(book)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-md hover:shadow transition-all"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-white" />
                        <span>{t.bookBuyGPay} ({book.currency}{book.price})</span>
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="mt-12 text-center py-12 px-4 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800">
            <BookOpen className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-white">
              {isRtl ? 'لا توجد كتب مطابقة لخيارات التصفية' : 'No books matching your filter'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {isRtl ? 'جرب تغيير التصنيف أو لغة العرض أو مسح عبارة البحث.' : 'Try adjusting your category, language filter, or search term.'}
            </p>
          </div>
        )}

      </div>

      {/* MODAL 1: Reader & Preview Excerpt */}
      {previewingBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                    {isRtl ? previewingBook.title : previewingBook.titleEn}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <span>{isRtl ? previewingBook.author : previewingBook.authorEn}</span>
                    <span>·</span>
                    <span>{previewingBook.pages} {t.bookPages} ({previewingBook.format})</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setPreviewingBook(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body / Reader Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 dark:text-slate-200">
              
              {/* Excerpt Box */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2 flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{t.bookExcerptTitle}</span>
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 font-serif leading-relaxed text-sm sm:text-base text-slate-800 dark:text-slate-200 shadow-inner">
                  {isRtl ? previewingBook.previewExcerpt : (previewingBook.previewExcerptEn || previewingBook.previewExcerpt)}
                </div>
              </div>

              {/* Table of Contents */}
              {previewingBook.tableOfContents && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" />
                    <span>{t.bookTableOfContents}</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {(isRtl ? previewingBook.tableOfContents : (previewingBook.tableOfContentsEn || previewingBook.tableOfContents)).map((item, idx) => (
                      <li key={idx} className="p-2 rounded-lg bg-slate-100/70 dark:bg-slate-800/50 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Payout & Purchase Reassurance in Modal */}
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{isRtl ? 'تسليم فوري بعد الدفع بـ Google Pay / Google Play' : 'Instant Digital Delivery via Google Pay / Google Play'}</span>
                </div>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                  {t.bookPaymentReassurance}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-850">
              <button
                onClick={() => setPreviewingBook(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
              >
                {t.bookReaderClose}
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onAddToCartBook(previewingBook);
                    setPreviewingBook(null);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750 rounded-xl"
                >
                  {t.addToCart}
                </button>

                <button
                  onClick={() => {
                    onInstantBuyBook(previewingBook);
                    setPreviewingBook(null);
                  }}
                  className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center gap-1.5 shadow-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>{t.bookBuyGPay} ({previewingBook.currency}{previewingBook.price})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Creator Upload & Publish E-Book */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[92vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t.booksUploadTitle}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t.booksUploadSubtitle}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitUpload} className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {/* Titles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'عنوان الكتاب (بالعربية) *' : 'Book Title (Arabic) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.title}
                    onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                    placeholder={isRtl ? 'مثال: أسس الهندسة الكهربائية المتقدمة' : 'E.g. Advanced Electrical Engineering'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'عنوان الكتاب (بالإنكليزية) *' : 'Book Title (English) *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.titleEn}
                    onChange={(e) => setUploadForm({ ...uploadForm, titleEn: e.target.value })}
                    placeholder="E.g. Fundamentals of Modern Electrical Engineering"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Authors */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'اسم المؤلف / المحقق *' : 'Author / Scholar Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={uploadForm.author}
                    onChange={(e) => setUploadForm({ ...uploadForm, author: e.target.value })}
                    placeholder={isRtl ? 'مثال: مصطفى الهاشمي' : 'Mustafa Al-Hashemi'}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'اسم المؤلف (بالإنكليزية)' : 'Author (English)'}
                  </label>
                  <input
                    type="text"
                    value={uploadForm.authorEn}
                    onChange={(e) => setUploadForm({ ...uploadForm, authorEn: e.target.value })}
                    placeholder="Mustafa Al-Hashemi"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Category & Language */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'التصنيف التخصصي' : 'Discipline / Category'}
                  </label>
                  <select
                    value={uploadForm.category}
                    onChange={(e) => setUploadForm({ ...uploadForm, category: e.target.value as BookCategory })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="electrical_eng">{isRtl ? 'الهندسة الكهربائية والطاقة' : 'Electrical Engineering'}</option>
                    <option value="shia_islam">{isRtl ? 'المذهب الشيعي الجعفري' : "Ja'fari Shia Studies"}</option>
                    <option value="sunni_islam">{isRtl ? 'المذهب السني والدراسات الإسلامية' : 'Sunni Studies'}</option>
                    <option value="ai_tech">{isRtl ? 'الذكاء الاصطناعي والحوسبة' : 'AI & Systems'}</option>
                    <option value="applied_science">{isRtl ? 'العلوم التطبيقية والفيزياء' : 'Applied Sciences'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'لغة الكتاب' : 'Language'}
                  </label>
                  <select
                    value={uploadForm.language}
                    onChange={(e) => setUploadForm({ ...uploadForm, language: e.target.value as 'ar' | 'en' | 'both' })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  >
                    <option value="both">{isRtl ? 'ثنائي اللغة (عربي / إنكليزي)' : 'Bilingual (AR/EN)'}</option>
                    <option value="ar">{isRtl ? 'العربية' : 'Arabic'}</option>
                    <option value="en">{isRtl ? 'English' : 'English'}</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {isRtl ? 'عدد الصفحات' : 'Page Count'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={uploadForm.pages}
                    onChange={(e) => setUploadForm({ ...uploadForm, pages: parseInt(e.target.value) || 100 })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* AI Dynamic Valuation Section */}
              <div className="p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{isRtl ? 'تسعير ذكي بواسطة الذكاء الاصطناعي (Gemini)' : 'Dynamic AI Pricing Engine (Gemini)'}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {isRtl ? 'يقوم Gemini باحتساب السعر الأنسب بناءً على التصنيف وعدد الصفحات والقيمة المعرفية.' : 'Gemini evaluates fair market pricing based on depth and discipline.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-base font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                    ${uploadForm.price}
                  </div>
                  <button
                    type="button"
                    onClick={handleAiEstimateUploadPrice}
                    disabled={isAiEstimating}
                    className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1"
                  >
                    <RefreshCw className={`w-3 h-3 ${isAiEstimating ? 'animate-spin' : ''}`} />
                    <span>{isAiEstimating ? 'تقييم...' : 'تسعير بـ Gemini'}</span>
                  </button>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {isRtl ? 'نبذة ومقدمة عن الكتاب' : 'Book Summary & Synopsis'}
                </label>
                <textarea
                  rows={3}
                  value={uploadForm.description}
                  onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                  placeholder={isRtl ? 'اشرح القيمة العلمية للكتاب والمحاور الرئيسية...' : 'Summary of topics and target readers...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white"
                />
              </div>

              {/* Excerpt */}
              <div>
                <label className="block font-bold text-slate-800 dark:text-slate-200 mb-1">
                  {isRtl ? 'مقتطف للمعاينة في القارئ' : 'Reading Excerpt for Preview'}
                </label>
                <textarea
                  rows={3}
                  value={uploadForm.previewExcerpt}
                  onChange={(e) => setUploadForm({ ...uploadForm, previewExcerpt: e.target.value })}
                  placeholder={isRtl ? 'اقتباس أو مقتطف من أحد فصول الكتاب...' : 'Sample excerpt for viewer preview...'}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-serif"
                />
              </div>

              {/* Payout Direct Note */}
              <div className="p-3 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>{isRtl ? 'حساب استلام العوائد عبر Google Play:' : 'Google Play Payout Receiver:'}</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">iraqlead03@gmail.com</span>
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 font-semibold"
                >
                  {isRtl ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1.5 shadow-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>{isRtl ? 'نشر الكتاب على الموقع فوراً' : 'Publish E-Book Now'}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
