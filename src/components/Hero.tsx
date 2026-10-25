import React from 'react';
import { ArrowLeft, ArrowRight, Play, Sparkles, CheckCircle2, ShieldCheck, Briefcase } from 'lucide-react';
import { ContentTab, Language } from '../types';
import { translations } from '../i18n/translations';

interface HeroProps {
  language: Language;
  onNavigateTab: (tab: ContentTab) => void;
  onOpenAiStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ language, onNavigateTab, onOpenAiStudio }) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-slate-200/80 dark:border-slate-800 bg-gradient-to-b from-blue-50/40 via-slate-50 to-indigo-50/30 dark:from-slate-900 dark:via-slate-900/95 dark:to-indigo-950/25">
      {/* Radiant colorful decorative orbs */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-indigo-500/15 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-emerald-400/15 via-teal-500/15 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Split Hero: 2-column balance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Editorial Headline & Actions (7 cols) */}
          <div className={`lg:col-span-7 space-y-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Quiet kicker text with typographic separator (No pill box) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-blue-600 dark:text-blue-400">
              <span className="font-bold">{t.heroBadge}</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 dark:text-slate-400">{t.heroTagline}</span>
            </div>

            {/* Display Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white leading-[1.2] tracking-tight [text-wrap:balance]">
              {t.heroTitle}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
              {t.heroDescription}
            </p>

            {/* Commercial & Personal Value propositions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.val1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{t.val2}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{t.val3}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{t.val4}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onNavigateTab('videos')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{t.heroCtaVideos}</span>
              </button>

              <button
                onClick={() => onNavigateTab('services')}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 rounded-lg shadow-2xs transition-all whitespace-nowrap"
              >
                <span>{t.heroCtaServices}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <button
                onClick={() => onNavigateTab('books')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/70 dark:hover:bg-emerald-900/80 border border-emerald-300/80 dark:border-emerald-750 rounded-lg shadow-2xs transition-all whitespace-nowrap"
              >
                <span>📚</span>
                <span>{t.navBooks}</span>
              </button>

              <button
                onClick={() => onNavigateTab('products')}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
              >
                <span>{t.heroCtaProducts}</span>
              </button>

              <button
                onClick={onOpenAiStudio}
                className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-50/70 dark:hover:bg-blue-950/40 rounded-lg transition-colors whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.heroCtaAi}</span>
              </button>
            </div>

          </div>

          {/* Column 2: Creator & Business Visual Anchor (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Subtle background framing */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-blue-500/10 via-amber-500/5 to-transparent rounded-2xl blur-lg -z-10" />

              {/* Card Container with Hairline Border */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                
                {/* Fallback & Image Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/11] bg-slate-100 dark:bg-slate-800">
                  <img
                    src="/src/assets/images/hero_creator_portrait_1792905396397.jpg"
                    alt="Mustafa Al-Hashemi - Technical Creator and Enterprise Consultant"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  {/* Subtle scrim at bottom */}
                  <div className={`absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/85 via-slate-950/45 to-transparent flex items-end p-4 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <div className="text-white">
                      <div className="text-sm font-bold flex items-center gap-2">
                        <span>{t.brandName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-blue-600/80 rounded text-white font-semibold">
                          {t.brandBadge}
                        </span>
                      </div>
                      <div className="text-xs text-slate-300 mt-0.5">
                        {t.brandSubtitle}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Meta footer */}
                <div className="p-4 bg-slate-50/80 dark:bg-slate-850/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono tabular-nums">{t.locationInfo}</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {language === 'ar' ? 'متاح للاستشارات والتعاقد التجاري' : 'Open for B2B & Advisory Retainers'}
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4-column KPI Proof Row below the hero split (Full width) */}
        <div className={`mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 lg:grid-cols-4 gap-6 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              120,000+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.kpiFollowers}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              45+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.kpiVideos}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              1,500+
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.kpiProductsSold}
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
              98.4%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {t.kpiSatisfaction}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
