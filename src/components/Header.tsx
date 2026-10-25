import React from 'react';
import { Sparkles, ShoppingBag, Moon, Sun, Globe, DollarSign } from 'lucide-react';
import { ContentTab, Language } from '../types';
import { translations } from '../i18n/translations';
import { WhatsAppIcon } from './WhatsAppWidget';

interface HeaderProps {
  activeTab: ContentTab;
  onTabChange: (tab: ContentTab) => void;
  onOpenAiStudio: (presetType?: 'video' | 'discussion' | 'product' | 'service') => void;
  cartCount: number;
  onOpenCart: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onOpenAdSense: () => void;
  adsenseConnected?: boolean;
  onOpenShareLink?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onTabChange,
  onOpenAiStudio,
  cartCount,
  onOpenCart,
  darkMode,
  onToggleDarkMode,
  language,
  onToggleLanguage,
  onOpenAdSense,
  adsenseConnected = true,
  onOpenShareLink,
}) => {
  const t = translations[language];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 sm:gap-6 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => onTabChange('all')}
            className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:opacity-85 transition-opacity flex items-center gap-2"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400"></span>
            <div className="flex flex-col text-right rtl:text-right ltr:text-left leading-none">
              <span className="font-extrabold text-base sm:text-lg">{t.brandName}</span>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-medium tracking-tight mt-0.5 hidden sm:inline">
                {t.brandSubtitle} · <span className="font-mono font-extrabold tracking-tight">alsalam</span>
              </span>
            </div>
          </button>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            <button
              onClick={() => onTabChange('all')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'all'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navHome}
            </button>
            <button
              onClick={() => onTabChange('books')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'books'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navBooks}
            </button>
            <button
              onClick={() => onTabChange('dashboard')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              <span>{t.navDashboard}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>
            <button
              onClick={() => onTabChange('experience')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'experience'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navExperience}
            </button>
            <button
              onClick={() => onTabChange('videos')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'videos'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navVideos}
            </button>
            <button
              onClick={() => onTabChange('discussions')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'discussions'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navDiscussions}
            </button>
            <button
              onClick={() => onTabChange('products')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'products'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navProducts}
            </button>
            <button
              onClick={() => onTabChange('services')}
              className={`hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap shrink-0 pb-1 ${
                activeTab === 'services'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 font-semibold'
                  : ''
              }`}
            >
              {t.navServices}
            </button>
          </nav>

          {/* Zone 3: 1 primary action + compact utilities */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Branded Link & Custom Domain Trigger: alsalam */}
            <button
              onClick={onOpenShareLink}
              title={language === 'ar' ? 'ربط وإدارة نطاقك الخاص ومشاركة رابط alsalam' : 'Connect custom domain and share alsalam link'}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-blue-700 dark:text-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 dark:from-blue-950/80 dark:to-indigo-950/80 dark:hover:from-blue-900/90 dark:hover:to-indigo-900/90 border border-blue-300 dark:border-blue-700 rounded-xl transition-all shrink-0 shadow-2xs hover:shadow-xs"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-semibold text-[11px] sm:text-xs">
                {language === 'ar' ? 'النطاق الخاص' : 'Custom Domain'}
              </span>
              <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                al-salam.net
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* Google AdSense Hub Trigger */}
            <button
              onClick={onOpenAdSense}
              title={language === 'ar' ? 'ربط وإدارة إعلانات Google AdSense' : 'Google AdSense Monetization'}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200/80 dark:border-emerald-800 rounded-lg transition-colors"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline font-sans">AdSense</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </button>

            {/* WhatsApp Direct Support Button */}
            <a
              href={`https://wa.me/9647700000000?text=${encodeURIComponent(
                language === 'ar'
                  ? 'مرحباً أ. مصطفى، أود التواصل معك عبر الموقع الرسمي.'
                  : 'Hello Mustafa, contacting you via your official platform.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              title={language === 'ar' ? 'تواصل ودعم عبر واتساب' : 'WhatsApp Support'}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 border border-emerald-300 dark:border-emerald-750 rounded-lg transition-colors shrink-0"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span className="hidden md:inline">{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
            </a>

            {/* Language Switcher */}
            <button
              onClick={onToggleLanguage}
              title={language === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
              className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="font-mono uppercase">{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Dark mode switch */}
            <button
              onClick={onToggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="p-1.5 sm:p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              aria-label={t.cartTitle}
              className="relative p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={() => onOpenAiStudio()}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-100" />
              <span className="hidden sm:inline">{t.aiStudioBtn}</span>
              <span className="sm:hidden">Studio</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 text-xs font-medium text-slate-600 dark:text-slate-300 overflow-x-auto gap-2">
          <button
            onClick={() => onTabChange('all')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'all' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navHome}
          </button>
          <button
            onClick={() => onTabChange('books')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'books' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navBooks}
          </button>
          <button
            onClick={() => onTabChange('dashboard')}
            className={`px-2 py-1 rounded whitespace-nowrap flex items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            <span>{t.navDashboard}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          </button>
          <button
            onClick={() => onTabChange('experience')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'experience' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navExperience}
          </button>
          <button
            onClick={() => onTabChange('videos')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'videos' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navVideos}
          </button>
          <button
            onClick={() => onTabChange('discussions')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'discussions' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navDiscussions}
          </button>
          <button
            onClick={() => onTabChange('products')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'products' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navProducts}
          </button>
          <button
            onClick={() => onTabChange('services')}
            className={`px-2 py-1 rounded whitespace-nowrap ${activeTab === 'services' ? 'text-blue-600 dark:text-blue-400 font-bold' : ''}`}
          >
            {t.navServices}
          </button>
        </div>
      </div>
    </header>
  );
};
