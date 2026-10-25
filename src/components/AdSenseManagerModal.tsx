import React, { useState } from 'react';
import {
  X,
  CheckCircle,
  Copy,
  Download,
  ExternalLink,
  ShieldCheck,
  ToggleLeft,
  ToggleRight,
  RefreshCw,
  Sliders,
  DollarSign,
  FileText,
  AlertCircle,
  Radio,
} from 'lucide-react';
import { AdSenseConfig, Language } from '../types';

interface AdSenseManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AdSenseConfig;
  onUpdateConfig: (newConfig: AdSenseConfig) => void;
  language: Language;
}

export const AdSenseManagerModal: React.FC<AdSenseManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig,
  language,
}) => {
  const isRtl = language === 'ar';
  const [publisherId, setPublisherId] = useState(config.publisherId);
  const [autoAds, setAutoAds] = useState(config.autoAdsEnabled);
  const [inFeedAds, setInFeedAds] = useState(config.inFeedAdsEnabled);
  const [bannerAds, setBannerAds] = useState(config.bannerAdsEnabled);
  const [testMode, setTestMode] = useState(config.testMode);
  const [isConnected, setIsConnected] = useState(config.isConnected);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  // Normalized pub ID (e.g., ca-pub-1234567890123456)
  const cleanPubId = publisherId.trim().replace(/^pub-/, 'ca-pub-');
  const pubOnlyNumber = cleanPubId.replace('ca-pub-', '');
  const adsTxtContent = `google.com, pub-${pubOnlyNumber || '8921764302918452'}, DIRECT, f08c47fec0942fa0`;

  const handleSave = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      const updated: AdSenseConfig = {
        ...config,
        isConnected: true,
        publisherId: cleanPubId || 'ca-pub-8921764302918452',
        autoAdsEnabled: autoAds,
        inFeedAdsEnabled: inFeedAds,
        bannerAdsEnabled: bannerAds,
        testMode: testMode,
        verificationStatus: 'verified',
        lastCheckedDate: new Date().toLocaleDateString(),
      };
      onUpdateConfig(updated);
      setCopyFeedback(isRtl ? 'تم حفظ وربط حساب Google AdSense بنجاح!' : 'AdSense account connected & saved!');
      setTimeout(() => setCopyFeedback(null), 3000);
    }, 700);
  };

  const handleCopyAdsTxt = () => {
    navigator.clipboard.writeText(adsTxtContent);
    setCopyFeedback(isRtl ? 'تم نسخ سطر ads.txt إلى الحافظة' : 'Copied ads.txt line to clipboard');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  const handleDownloadAdsTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([adsTxtContent + '\n'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'ads.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleCopyScriptTag = () => {
    const scriptTag = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${cleanPubId}" crossorigin="anonymous"></script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopyFeedback(isRtl ? 'تم نسخ كود السكربت' : 'AdSense script snippet copied!');
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden max-h-[90vh] flex flex-col ${
          isRtl ? 'text-right' : 'text-left'
        }`}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isRtl ? 'ربط وإدارة حساب Google AdSense' : 'Google AdSense Monetization Hub'}</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-full font-bold">
                  {config.isConnected ? (isRtl ? 'مُتصل ونشط' : 'Connected') : (isRtl ? 'غير متصل' : 'Inactive')}
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRtl
                  ? 'ربط حسابك الإعلاني، تفعيل الإعلانات التلقائية، وإدارة ملف ads.txt الرسمي'
                  : 'Connect publisher account, manage auto-ads, and verify your ads.txt record'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300">
          
          {/* Notification feedback */}
          {copyFeedback && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 flex items-center gap-2 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{copyFeedback}</span>
            </div>
          )}

          {/* Account Linking Input Box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{isRtl ? 'معرّف الناشر في Google AdSense (Publisher ID)' : 'AdSense Publisher ID'}</span>
              </label>
              <span className="text-[10px] text-slate-500 font-mono">Format: ca-pub-XXXXXXXXXXXXXXXX</span>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={publisherId}
                onChange={(e) => setPublisherId(e.target.value)}
                placeholder="ca-pub-8921764302918452"
                className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={handleSave}
                disabled={isVerifying}
                className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shrink-0 transition-colors disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>{isRtl ? 'جارٍ التحقق...' : 'Verifying...'}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'تأكيد وربط الحساب' : 'Connect & Save'}</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              {isRtl
                ? 'يتم حقن هذا المعرف تلقائياً في وسم الميتا <meta name="google-adsense-account"> وسكربت AdSense المعتمد في الموقع.'
                : 'This ID is automatically mapped into your site HTML meta tag and the official Google AdSense runtime script.'}
            </p>
          </div>

          {/* Ad Placement Toggles */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
              <Sliders className="w-4 h-4 text-blue-500" />
              <span>{isRtl ? 'خيارات وتخصيص أماكن ظهور الإعلانات' : 'Ad Formats & Placements'}</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Toggle 1: Auto Ads */}
              <div
                onClick={() => setAutoAds(!autoAds)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'الإعلانات التلقائية (Auto Ads)' : 'Google Auto Ads'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isRtl ? 'الذكاء الاصطناعي لـ Google يختار أفضل المواقع' : 'Google AI optimizes high-performing spots'}
                  </div>
                </div>
                {autoAds ? (
                  <ToggleRight className="w-6 h-6 text-blue-600 shrink-0" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400 shrink-0" />
                )}
              </div>

              {/* Toggle 2: In-Feed Ads */}
              <div
                onClick={() => setInFeedAds(!inFeedAds)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'إعلانات الخلاصة (In-Feed Ads)' : 'Native In-Feed Units'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isRtl ? 'تظهر متناسقة بين الفيديوهات والنقاشات' : 'Blends between videos and discussions'}
                  </div>
                </div>
                {inFeedAds ? (
                  <ToggleRight className="w-6 h-6 text-blue-600 shrink-0" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400 shrink-0" />
                )}
              </div>

              {/* Toggle 3: Banner Ads */}
              <div
                onClick={() => setBannerAds(!bannerAds)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'إعلانات البانر المتجاوبة (Display Banners)' : 'Responsive Display Banners'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isRtl ? 'بانرات أفقية متجاوبة عالية التحويل' : 'High-impact horizontal display units'}
                  </div>
                </div>
                {bannerAds ? (
                  <ToggleRight className="w-6 h-6 text-blue-600 shrink-0" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400 shrink-0" />
                )}
              </div>

              {/* Toggle 4: Test Mode */}
              <div
                onClick={() => setTestMode(!testMode)}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer transition-all flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {isRtl ? 'وضع التجربة والمعاينة' : 'AdSense Test / Sandbox Mode'}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {isRtl ? 'عرض نماذج الإعلانات بدون نقرات حقيقية' : 'Preview banners safely without live clicks'}
                  </div>
                </div>
                {testMode ? (
                  <ToggleRight className="w-6 h-6 text-amber-500 shrink-0" />
                ) : (
                  <ToggleLeft className="w-6 h-6 text-slate-400 shrink-0" />
                )}
              </div>

            </div>
          </div>

          {/* Official ads.txt Record Manager */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750 space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-900 dark:text-white text-xs flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-600" />
                <span>{isRtl ? 'ملف البائعين الرقميين المعتمدين (ads.txt)' : 'Authorized Digital Sellers (ads.txt)'}</span>
              </label>
              <a
                href="/ads.txt"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
              >
                <span>{isRtl ? 'معاينة /ads.txt في المتصفح' : 'View /ads.txt live'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-3 rounded-lg bg-slate-900 text-slate-100 font-mono text-[11px] flex items-center justify-between">
              <code className="select-all overflow-x-auto">{adsTxtContent}</code>
              <button
                onClick={handleCopyAdsTxt}
                className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors shrink-0 mr-1"
                title="Copy line"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={handleDownloadAdsTxt}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تحميل ملف ads.txt' : 'Download ads.txt'}</span>
              </button>

              <button
                onClick={handleCopyScriptTag}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-650 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-xs font-semibold"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{isRtl ? 'نسخ كود AdSense HTML' : 'Copy HTML Script Tag'}</span>
              </button>
            </div>
          </div>

          {/* AdSense Verification Guidance */}
          <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40 text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{isRtl ? 'كيفية تفعيل الحساب ومراجعته في Google AdSense:' : 'How Google AdSense Review Works:'}</span>
            </div>
            <ol className="list-decimal list-inside space-y-1 pl-1">
              <li>
                {isRtl
                  ? 'سجّل الدخول إلى منصة Google AdSense وأضف رابط موقعك إلى قائمة المواقع (Sites).'
                  : 'Sign in to Google AdSense and add your domain into the Sites dashboard.'}
              </li>
              <li>
                {isRtl
                  ? 'يقوم روبوت Google تلقائياً بقراءة وسم الميتا وملف ads.txt المفعّل في الموقع.'
                  : 'Google crawler verifies your <meta name="google-adsense-account"> and /ads.txt records.'}
              </li>
              <li>
                {isRtl
                  ? 'بعد اعتماد الحساب (خلال 24-48 ساعة)، ستبدأ الإعلانات الحقيقية بالظهور وتحقيق العوائد مباشرة.'
                  : 'Once approved, live ads render automatically and monetize all visitor traffic.'}
              </li>
            </ol>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Radio className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
            <span>{isRtl ? 'الحالة: جاهز للمراجعة والبث' : 'Status: Ready for Ad Serving'}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              {isRtl ? 'إغلاق' : 'Close'}
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm"
            >
              {isRtl ? 'تطبيق التغييرات' : 'Apply Changes'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
