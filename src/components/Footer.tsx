import React from 'react';
import { Sparkles, Youtube, Linkedin, Github, Mail, RefreshCw, DollarSign, Globe } from 'lucide-react';
import { ContentTab, Language } from '../types';
import { translations } from '../i18n/translations';
import { WhatsAppIcon } from './WhatsAppWidget';

interface FooterProps {
  language: Language;
  onNavigateTab: (tab: ContentTab) => void;
  onOpenAiStudio: () => void;
  onResetData: () => void;
  onOpenAdSense?: () => void;
  onOpenCustomDomain?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  language,
  onNavigateTab,
  onOpenAiStudio,
  onResetData,
  onOpenAdSense,
  onOpenCustomDomain,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <footer className={`bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 ${isRtl ? 'text-right' : 'text-left'} transition-colors`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-100 dark:border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className={`flex items-center gap-2 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                {t.brandName}
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded">
                {t.brandBadge}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              {t.footerBio}
            </p>
            <div className={`flex items-center gap-3 pt-2 text-slate-400 dark:text-slate-500 ${isRtl ? 'justify-end' : 'justify-start'}`}>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-red-500 transition-colors p-1"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-600 transition-colors p-1"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-slate-900 dark:hover:text-white transition-colors p-1"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="mailto:iraqlead03@gmail.com"
                className="hover:text-blue-500 transition-colors p-1"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/9647700000000?text=${encodeURIComponent(
                  language === 'ar'
                    ? 'مرحباً، أود التواصل مع إدارة منصة السلام.'
                    : 'Hello, contacting Al-Salam platform.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-500 transition-colors p-1 flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium"
                aria-label="WhatsApp Support"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                <span className="text-[11px] font-mono font-bold">+964 770 000 0000</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {t.footerSections}
            </div>
            <ul className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateTab('books')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navBooks}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('dashboard')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-semibold flex items-center gap-1"
                >
                  <span>{t.navDashboard}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('experience')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navExperience}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('videos')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navVideos}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('discussions')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navDiscussions}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('products')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateTab('services')}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {t.navServices}
                </button>
              </li>
            </ul>
          </div>

          {/* AI Creator & Controls */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-900 dark:text-white">
              {t.footerTech}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {t.footerTechDesc}
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={onOpenAiStudio}
                className={`flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline ${isRtl ? 'justify-end' : 'justify-start'}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.aiStudioBtn}</span>
              </button>

              {onOpenAdSense && (
                <button
                  onClick={onOpenAdSense}
                  className={`flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline ${isRtl ? 'justify-end' : 'justify-start'}`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'إدارة ربط Google AdSense' : 'Manage Google AdSense'}</span>
                </button>
              )}

              {onOpenCustomDomain && (
                <button
                  onClick={onOpenCustomDomain}
                  className={`flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline ${isRtl ? 'justify-end' : 'justify-start'}`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{isRtl ? 'إعداد وربط النطاق الخاص (Custom Domain)' : 'Connect Custom Domain'}</span>
                </button>
              )}

              <button
                onClick={onResetData}
                className={`flex items-center gap-1.5 text-[11px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors pt-2 ${isRtl ? 'justify-end' : 'justify-start'}`}
                title="Reset local sample data to initial state"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{t.footerReset}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 dark:text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {t.brandName}. {t.footerRights}
          </div>
          <div className="flex items-center gap-4 text-slate-500 text-[11px]">
            <span>{t.locationInfo}</span>
            <span>Google Gemini 3.8 Flash Full-Stack · Google AdSense Verified</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
