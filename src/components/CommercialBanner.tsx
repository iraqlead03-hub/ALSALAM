import React from 'react';
import { ShieldCheck, FileText, Briefcase, Award, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../i18n/translations';
import { WhatsAppIcon } from './WhatsAppWidget';

interface CommercialBannerProps {
  language: Language;
  onExploreServices: () => void;
  onExploreProducts: () => void;
}

export const CommercialBanner: React.FC<CommercialBannerProps> = ({
  language,
  onExploreServices,
  onExploreProducts,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  return (
    <section className="py-14 bg-gradient-to-b from-white to-slate-50 dark:from-slate-900 dark:to-slate-850 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Container with Hairline Border */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 sm:p-10 shadow-sm relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Right Text Content (7 cols) */}
            <div className={`lg:col-span-7 space-y-4 ${isRtl ? 'text-right' : 'text-left'}`}>
              
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <Briefcase className="w-4 h-4 shrink-0" />
                <span>{language === 'ar' ? 'القطاع التجاري والمؤسسي' : 'B2B & Enterprise Solutions'}</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-500">{language === 'ar' ? 'فواتير ضريبية معتمدة' : 'Official VAT Invoices'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight [text-wrap:balance]">
                {t.commercialBannerTitle}
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                {language === 'ar'
                  ? 'جميع الكتب الإلكترونية والمنتجات المعروضة والخدمات الاستشارية (سواء منتجات وكتب الذكاء الاصطناعي أو منتجاتي المعروضة الخاصة) متاحة للشراء الفوري ببطاقات فيزا وماستر كارد من قبل المشاهد والزبون مع تحويل المبلغ مباشرة إلى حسابي بـ Google Pay / Google Play: iraqlead03@gmail.com.'
                  : 'All e-books, curated goods, and consulting services (both AI solutions and personal curated books & products) are available for direct purchase by viewers via Visa, Mastercard, and Google Pay with payouts transferred directly to my Google Play account: iraqlead03@gmail.com.'}
              </p>

              {/* Commercial 4 Key Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.commercialFeature1}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <Award className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.commercialFeature2}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.commercialFeature3}</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{t.commercialFeature4}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={onExploreServices}
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-sm transition-all whitespace-nowrap"
                >
                  <span>{language === 'ar' ? 'طلب عرض سعر تجاري B2B' : 'Request Commercial B2B Proposal'}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={onExploreProducts}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>{language === 'ar' ? 'تصفح التراخيص الجماعية للمنتجات' : 'View Commercial Team Licenses'}</span>
                </button>

                <a
                  href={`https://wa.me/9647700000000?text=${encodeURIComponent(
                    language === 'ar'
                      ? 'مرحباً أ. مصطفى، نود مناقشة تعاقد تجاري B2B واستشارات برمجية للشركات عبر منصة السلام.'
                      : 'Hello Mustafa, we would like to discuss a B2B enterprise advisory contract via Al-Salam platform.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2.5 text-xs font-semibold text-emerald-800 dark:text-emerald-200 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>{language === 'ar' ? 'محادثة فورية واتساب B2B' : 'WhatsApp B2B Chat'}</span>
                </a>
              </div>

            </div>

            {/* Right/Left Commercial Badges & Trust Summary (5 cols) */}
            <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-850 p-6 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-200 dark:border-slate-700">
                {language === 'ar' ? 'المعايير التجارية المعتمدة للتعاقد:' : 'Verified Commercial Standards:'}
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">
                      {language === 'ar' ? 'التعاقد مع الشركات العالمية والمحلية' : 'Global & Regional Enterprise Contracts'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {language === 'ar' ? 'إمكانية التعاقد عبر فواتير الشركات وتحويلات SWIFT وStripe وGoogle Pay' : 'Support for SWIFT wire transfers, Stripe, and corporate card billing'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">
                      {language === 'ar' ? 'حماية الملكية الفكرية وسرية الشفرة' : 'IP Protection & Code Confidentiality'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {language === 'ar' ? 'توقيع اتفاقيات عدم الإفصاح المسبقة قبل بدء أية مراجعة معمارية' : 'Strict bilateral NDAs executed prior to any architectural review'}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">
                      {language === 'ar' ? 'ضمان الرضا واسترداد القيمة 100%' : '100% Satisfaction & Value Guarantee'}
                    </strong>
                    <span className="text-slate-500 text-[11px]">
                      {language === 'ar' ? 'في حال عدم تحقيق المخرجات الاستشارية المتفق عليها يُسترد كامل المبلغ' : 'Full refund if agreed advisory deliverables are not met'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
