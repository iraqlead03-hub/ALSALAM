import React, { useEffect } from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { AdSenseConfig, Language } from '../types';

interface AdSenseUnitProps {
  config: AdSenseConfig;
  format?: 'banner' | 'in-feed' | 'sidebar' | 'fluid';
  slot?: string;
  language: Language;
  className?: string;
}

export const AdSenseUnit: React.FC<AdSenseUnitProps> = ({
  config,
  format = 'banner',
  slot = '1234567890',
  language,
  className = '',
}) => {
  const isRtl = language === 'ar';

  useEffect(() => {
    if (config.isConnected && !config.testMode) {
      try {
        // Trigger AdSense render if script is loaded
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // adsbygoogle can throw if already populated or in dev iframe
      }
    }
  }, [config.isConnected, config.testMode, slot]);

  // If user disabled banners or in-feed ads in settings
  if (!config.isConnected) {
    return null;
  }

  if (format === 'banner' && !config.bannerAdsEnabled) {
    return null;
  }

  if (format === 'in-feed' && !config.inFeedAdsEnabled) {
    return null;
  }

  // Live Google AdSense container with elegant preview fallback
  return (
    <div
      className={`my-6 mx-auto w-full max-w-5xl overflow-hidden rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-850/60 shadow-xs backdrop-blur-xs transition-all ${className}`}
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Google AdSense Meta Label */}
      <div className="flex items-center justify-between px-3 py-1 bg-slate-100/70 dark:bg-slate-800/80 border-b border-slate-200/60 dark:border-slate-750 text-[10px] text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-1.5 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{isRtl ? 'إعلان ممول من Google AdSense' : 'Sponsored by Google AdSense'}</span>
          <span className="hidden sm:inline font-mono opacity-60">({config.publisherId})</span>
        </div>
        <div className="flex items-center gap-1.5 hover:text-blue-500 transition-colors cursor-pointer">
          <Info className="w-3 h-3 text-slate-400" />
          <span>{isRtl ? 'خيارات الإعلانات AdChoices' : 'AdChoices'}</span>
        </div>
      </div>

      {/* Ad Body Area */}
      <div className="p-4 sm:p-5 flex flex-col items-center justify-center text-center">
        {/* Real AdSense Ins Element */}
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client={config.publisherId}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        {/* Realistic AdSense Visual Simulation Banner */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-3 rounded-lg bg-gradient-to-r from-blue-50/50 via-slate-50/50 to-indigo-50/50 dark:from-slate-800/40 dark:via-slate-800/20 dark:to-blue-950/20 border border-dashed border-blue-200/60 dark:border-blue-900/40">
          <div className="flex items-center gap-3 text-left rtl:text-right">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 font-bold text-sm">
              Ad
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>Google Cloud & AI Platform Enterprise Acceleration</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 font-normal">Sponsored</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {isRtl
                  ? 'تسريع نشر تطبيقات الذكاء الاصطناعي مع رصيد مجاني وحلول سحابية موثوقة للشركات الناشئة'
                  : 'Scale AI workloads effortlessly with enterprise Google Cloud infrastructure and developer grants'}
              </p>
            </div>
          </div>

          <a
            href="https://cloud.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 rounded-lg shadow-xs hover:shadow transition-all"
          >
            <span>{isRtl ? 'معرفة المزيد' : 'Learn More'}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
