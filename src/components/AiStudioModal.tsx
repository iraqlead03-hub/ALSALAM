import React, { useState } from 'react';
import { Sparkles, Video, MessageSquare, Package, Briefcase, Copy, Check, X, Loader2, Globe, Send } from 'lucide-react';
import { VideoItem, DiscussionItem, ProductItem, ServiceItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface AiStudioModalProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  presetType?: 'video' | 'discussion' | 'product' | 'service';
  onPublishVideo: (item: VideoItem) => void;
  onPublishDiscussion: (item: DiscussionItem) => void;
  onPublishProduct: (item: ProductItem) => void;
  onPublishService: (item: ServiceItem) => void;
}

export const AiStudioModal: React.FC<AiStudioModalProps> = ({
  language,
  isOpen,
  onClose,
  presetType = 'video',
  onPublishVideo,
  onPublishDiscussion,
  onPublishProduct,
  onPublishService,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [activeType, setActiveType] = useState<'video' | 'discussion' | 'product' | 'service'>(presetType);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState(language === 'ar' ? 'احترافي وهندسي رصين' : 'Rigorous Technical & Engineering');
  const [genLanguage, setGenLanguage] = useState<'ar' | 'en'>(language);
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  // Quick prompt inspirations by type
  const inspirations: Record<'video' | 'discussion' | 'product' | 'service', string[]> = {
    video: language === 'ar' ? [
      'كيف تبني تطبيق ذكاء اصطناعي إنتاجي باستخدام نماذج Gemini الحديثة؟',
      'دليل المطور المستقل: من أول سطر برمجي إلى أول عميل يدفع',
      'مقارنة حية: أفضل معماريات الـ Cloud للأنظمة السريعة',
    ] : [
      'Building Enterprise Generative AI with Google Gemini 3.8 SDK',
      'The Solopreneur Playbook: From First Line of Code to $10k MRR',
      'Microservices vs Modular Monolith: Real Latency Benchmarks',
    ],
    discussion: language === 'ar' ? [
      'هل يحتاج المبرمج في 2026 إلى حفظ قواعد اللغة أم التفكير المعماري؟',
      'أخلاقيات وقوانين ملكية الأكواد المنتجة بالذكاء الاصطناعي',
      'الـ Micro-SaaS مقابل التمويل الجريء: أيهما أفضل للتقنيين العرب؟',
    ] : [
      'Does the 2026 Engineer Need Syntax Recall or Architectural Rigor?',
      'Legal & IP Implications of Synthetic Code Generation in Enterprise',
      'Bootstrapped Micro-SaaS vs Venture Capital in Emerging Tech Markets',
    ],
    product: language === 'ar' ? [
      'حزمة قوالب Next.js وExpress مهيأة للذكاء الاصطناعي مع ترخيص تجاري',
      'كتاب إرشادي: استراتيجيات تحسين تكلفة السحابة بنسبة 40%',
      'قالب Notion متكامل لإدارة منتجات الـ SaaS وخارطة الطريق',
    ] : [
      'Enterprise Next.js & Express GenAI Starter Kit with Commercial License',
      'Handbook: Cloud Infrastructure Cost Optimization Strategies (Save 40%)',
      'Notion Sprint & Architectural Decision Record (ADR) Vault',
    ],
    service: language === 'ar' ? [
      'جلسة استشارية لتشخيص البنية البرمجية وتسريع الأداء للشركات',
      'برنامج تدريب عملي لفرق الشركات على أدوات Gemini المتطورة',
      'عقد استشاري شهري كمسؤول تقني خارجي (Fractional CTO)',
    ] : [
      'Enterprise Software Architecture & Database Bottleneck Audit',
      '2-Day Corporate Generative AI Bootcamp with Gemini SDK',
      'Fractional CTO & Strategic Cloud Advisory Monthly Retainer',
    ],
  };

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى إدخال فكرة أو عنوان المحتوى أولاً.' : 'Please enter a topic or concept first.');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setPublishedSuccess(false);

    try {
      const response = await fetch('/api/ai/studio-assist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: activeType,
          topic: topic.trim(),
          prompt: topic.trim(),
          tone,
          outputLanguage: genLanguage,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate content');
      }

      setGeneratedText(data.result || '');
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error communicating with AI service');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePublishDirectly = () => {
    if (!generatedText) return;

    if (activeType === 'video') {
      const newVid: VideoItem = {
        id: `vid-ai-${Date.now()}`,
        title: topic.trim() || 'فيديو جديد مدعوم بالذكاء الاصطناعي',
        titleEn: topic.trim() || 'New AI-Assisted Technical Video',
        description: generatedText.slice(0, 150) + '...',
        descriptionEn: generatedText.slice(0, 150) + '...',
        category: 'ai',
        duration: '18:30',
        views: 1,
        likes: 1,
        thumbnail: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        publishDate: language === 'ar' ? 'الآن' : 'Just now',
        publishDateEn: 'Just now',
        commentsCount: 0,
        transcript: generatedText,
        keyTopics: ['AI', 'Gemini', 'Systems'],
      };
      onPublishVideo(newVid);
    } else if (activeType === 'discussion') {
      const newDisc: DiscussionItem = {
        id: `disc-ai-${Date.now()}`,
        title: topic.trim() || 'موضوع نقاش جديد أعده Gemini',
        titleEn: topic.trim() || 'New Architectural Insight by Gemini',
        summary: generatedText.slice(0, 140) + '...',
        summaryEn: generatedText.slice(0, 140) + '...',
        content: generatedText,
        contentEn: generatedText,
        category: 'الذكاء الاصطناعي',
        categoryEn: 'Artificial Intelligence',
        publishDate: language === 'ar' ? 'اليوم' : 'Today',
        publishDateEn: 'Today',
        readTime: language === 'ar' ? '5 دقائق قراءة' : '5 min read',
        readTimeEn: '5 min read',
        upvotes: 1,
        views: 1,
        commentsCount: 0,
      };
      onPublishDiscussion(newDisc);
    } else if (activeType === 'product') {
      const newProd: ProductItem = {
        id: `prod-ai-${Date.now()}`,
        name: topic.trim() || 'منتج تجاري جديد',
        nameEn: topic.trim() || 'New Commercial Digital Asset',
        tagline: 'حزمة أدوات مرخصة تجارياً ومصاغة بـ Gemini',
        taglineEn: 'Commercial toolkit engineered and optimized with Gemini',
        description: generatedText,
        descriptionEn: generatedText,
        price: 49,
        commercialPrice: 149,
        currency: '$',
        category: 'bundle',
        image: '/src/assets/images/product_digital_bundle_1792905397194.jpg',
        features: [
          'تم إعداده وتدقيقه بمساعدة Gemini 3.8 Flash',
          'دليل تنفيذي مع أكواد ومصادر عملية',
          'يشمل ترخيص استخدام تجاري كامل',
        ],
        featuresEn: [
          'Engineered and verified with Gemini 3.8 Flash',
          'Production code with actionable guidance',
          'Full commercial enterprise license included',
        ],
        rating: 5.0,
        reviewsCount: 1,
        salesCount: 1,
        commercialLicenseIncluded: true,
      };
      onPublishProduct(newProd);
    } else if (activeType === 'service') {
      const newServ: ServiceItem = {
        id: `serv-ai-${Date.now()}`,
        title: topic.trim() || 'خدمة استشارية تجارية',
        titleEn: topic.trim() || 'New Enterprise Advisory Retainer',
        tagline: 'باقة استشارية B2B لحل المعضلات وتسريع الإنجاز',
        taglineEn: 'B2B strategic advisory to solve architectural bottlenecks',
        description: generatedText,
        descriptionEn: generatedText,
        price: 290,
        pricingType: 'per_session',
        duration: '60 min',
        durationEn: '60 min',
        image: '/src/assets/images/service_consulting_session_1792905397372.jpg',
        targetAudience: 'Enterprises & Startups',
        targetAudienceEn: 'Enterprises & Startups',
        deliverables: [
          'جلسة استشارية تشخيصية مباشرة',
          'تقرير مكتوب بالتوصيات وخارطة الطريق',
          'اتفاقية سرية متبادلة (NDA)',
        ],
        deliverablesEn: [
          'Direct diagnostic strategic advisory session',
          'Written architectural recommendations report',
          'Mutual NDA execution',
        ],
        ndaIncluded: true,
      };
      onPublishService(newServ);
    }

    setPublishedSuccess(true);
    setTimeout(() => {
      onClose();
      setPublishedSuccess(false);
      setGeneratedText('');
      setTopic('');
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className={`relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 flex flex-col max-h-[92vh] ${isRtl ? 'text-right' : 'text-left'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>{t.aiStudioTitle}</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {t.aiStudioSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Content Type Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 shrink-0">
          <button
            onClick={() => setActiveType('video')}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeType === 'video'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>{t.aiTabVideo}</span>
          </button>

          <button
            onClick={() => setActiveType('discussion')}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeType === 'discussion'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.aiTabDiscussion}</span>
          </button>

          <button
            onClick={() => setActiveType('product')}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeType === 'product'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>{t.aiTabProduct}</span>
          </button>

          <button
            onClick={() => setActiveType('service')}
            className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeType === 'service'
                ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs'
                : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>{t.aiTabService}</span>
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto flex-1 py-4 space-y-4">
          
          {/* Quick inspiration chips */}
          <div>
            <label className="block text-slate-600 dark:text-slate-400 text-[11px] mb-1.5 font-medium">
              {t.aiQuickPrompts}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {inspirations[activeType].map((insp, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setTopic(insp)}
                  className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 rounded-md transition-colors"
                >
                  {insp}
                </button>
              ))}
            </div>
          </div>

          {/* Topic / Idea Input */}
          <div>
            <label className="block text-slate-800 dark:text-slate-200 text-xs font-semibold mb-1">
              {t.aiTopicLabel}
            </label>
            <textarea
              rows={2}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder={t.aiTopicPlaceholder}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Tone & Output Language Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {t.aiToneLabel}
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value={t.aiTone1}>{t.aiTone1}</option>
                <option value={t.aiTone2}>{t.aiTone2}</option>
                <option value={t.aiTone3}>{t.aiTone3}</option>
                <option value={t.aiTone4}>{t.aiTone4}</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                {language === 'ar' ? 'لغة المخرجات المطلوبة' : 'Target Generation Language'}
              </label>
              <select
                value={genLanguage}
                onChange={(e) => setGenLanguage(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
              >
                <option value="ar">العربية (Arabic)</option>
                <option value="en">English (الإنجليزية)</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.aiGenerating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.aiGenerateBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-lg text-xs text-red-600 dark:text-red-300">
              {errorMsg}
            </div>
          )}

          {/* Generated Result Display */}
          {generatedText && (
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 rounded-md text-xs text-slate-700 dark:text-slate-300 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? (language === 'ar' ? 'تم النسخ!' : 'Copied!') : (language === 'ar' ? 'نسخ النص' : 'Copy Text')}</span>
                </button>

                <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {language === 'ar' ? 'المحتوى المولد بنجاح:' : 'Generated Content:'}
                </div>
              </div>

              {/* Text content card */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {generatedText}
              </div>

              {/* Direct Publish Action */}
              <div className="p-4 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-blue-900 dark:text-blue-200">
                    {language === 'ar' ? 'جاهز للنشر على موقعك الشخصي والتجاري فوراً؟' : 'Ready to publish directly to your platform?'}
                  </div>
                  <div className="text-[11px] text-blue-700 dark:text-blue-300">
                    {language === 'ar' ? 'ضغطة واحدة تضيف المحتوى وتحدث المنصة مباشرة.' : 'One click adds the asset and updates your live platform state.'}
                  </div>
                </div>

                <button
                  onClick={handlePublishDirectly}
                  disabled={publishedSuccess}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all shrink-0"
                >
                  {publishedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>{t.aiPublished}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t.aiPublishDirect}</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
