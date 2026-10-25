import React, { useState } from 'react';
import { Calendar, Clock, Check, Sparkles, Plus, X, ShieldCheck, RefreshCw, ShoppingBag, Zap, CreditCard } from 'lucide-react';
import { ServiceItem, BookingSubmission, Language } from '../types';
import { translations } from '../i18n/translations';
import { WhatsAppIcon } from './WhatsAppWidget';

interface ServicesSectionProps {
  language: Language;
  services: ServiceItem[];
  onBookService: (submission: BookingSubmission) => void;
  onAddToCartService: (service: ServiceItem) => void;
  onInstantBuyServiceGPay: (service: ServiceItem) => void;
  onOpenAiStudio: (presetType?: 'service') => void;
  onAddService: (item: ServiceItem) => void;
  onUpdateServicePrice?: (serviceId: string, newPrice: number, rationale?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  language,
  services,
  onBookService,
  onAddToCartService,
  onInstantBuyServiceGPay,
  onOpenAiStudio,
  onAddService,
  onUpdateServicePrice,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);
  const [recalculatingId, setRecalculatingId] = useState<string | null>(null);

  // Booking Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientDate, setClientDate] = useState('2026-10-28');
  const [selectedSlot, setSelectedSlot] = useState(language === 'ar' ? '11:00 صباحاً' : '11:00 AM');
  const [clientNotes, setClientNotes] = useState('');
  const [taxId, setTaxId] = useState('');

  // Add Service Form State
  const [newTitle, setNewTitle] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('290');
  const [newDuration, setNewDuration] = useState('60 min');
  const [isAiPriced, setIsAiPriced] = useState(true);
  const [newAudience, setNewAudience] = useState(language === 'ar' ? 'المؤسسون والشركات' : 'Enterprises & Founders');
  const [newDeliverables, setNewDeliverables] = useState(
    language === 'ar' ? 'جلسة تشخيصية، خارطة طريق، متابعة بريدية' : 'Diagnostic session, Architecture roadmap, Follow-up'
  );

  const timeSlots = language === 'ar'
    ? ['10:00 صباحاً', '11:30 صباحاً', '02:00 ظهراً', '04:30 عصراً', '07:00 مساءً']
    : ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '07:00 PM'];

  // Live Recalculate AI Price with Gemini API
  const handleRecalculateAiPrice = async (service: ServiceItem) => {
    setRecalculatingId(service.id);
    try {
      const res = await fetch('/api/ai/dynamic-pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceTitle: service.title,
          scopeComplexity: 'high',
          duration: service.duration,
          deliverables: service.deliverables,
        }),
      });

      const data = await res.json();
      if (data.price && onUpdateServicePrice) {
        onUpdateServicePrice(
          service.id,
          data.price,
          language === 'ar' ? data.rationale : data.rationaleEn
        );
      }
    } catch (err) {
      console.error('Failed to recalculate AI price:', err);
    } finally {
      setRecalculatingId(null);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !clientName.trim() || !clientEmail.trim()) return;

    const submission: BookingSubmission = {
      serviceId: selectedService.id,
      serviceTitle: language === 'en' && selectedService.titleEn ? selectedService.titleEn : selectedService.title,
      name: clientName.trim(),
      company: companyName.trim(),
      email: clientEmail.trim(),
      date: clientDate,
      timeSlot: selectedSlot,
      notes: clientNotes.trim(),
      commercialTaxId: taxId.trim(),
      paidViaGooglePay: true,
      amountPaid: selectedService.price,
    };

    onBookService(submission);
    setBookingSuccess(
      language === 'ar'
        ? `تم شراء وحجز "${selectedService.title}" بنجاح! تم تحويل الدفعة ($${selectedService.price}) عبر Google Pay لحساب المنشئ (iraqlead03@gmail.com)، وأُرسل رابط اللقاء إلى ${clientEmail}.`
        : `Service "${submission.serviceTitle}" purchased and booked! Payment ($${selectedService.price}) disbursed via Google Pay to creator (iraqlead03@gmail.com).`
    );
    
    setTimeout(() => {
      setSelectedService(null);
      setBookingSuccess(null);
      setClientName('');
      setCompanyName('');
      setClientEmail('');
      setClientNotes('');
      setTaxId('');
    }, 4000);
  };

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: ServiceItem = {
      id: `serv-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitle.trim(),
      tagline: newTagline.trim() || 'Service with dynamic AI pricing and direct Google Pay purchase',
      taglineEn: newTagline.trim(),
      description: newDesc.trim() || 'Consulting session directly purchasable by viewers.',
      descriptionEn: newDesc.trim(),
      price: parseFloat(newPrice) || 300,
      pricingType: 'per_session',
      duration: newDuration || '60 min',
      durationEn: newDuration || '60 min',
      image: '/src/assets/images/service_ai_neural_engine_1792906859665.jpg',
      targetAudience: newAudience || 'Enterprises & Startups',
      targetAudienceEn: newAudience || 'Enterprises & Startups',
      deliverables: newDeliverables.split(/[,،]/).map((d) => d.trim()).filter(Boolean),
      deliverablesEn: newDeliverables.split(/[,،]/).map((d) => d.trim()).filter(Boolean),
      ndaIncluded: true,
      isAiPriced: isAiPriced,
      aiPricingRationale: isAiPriced ? 'تم تقدير السعر بواسطة نموذج Gemini استناداً إلى تعقيد المعمارية المطلوبة.' : undefined,
    };

    onAddService(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewTagline('');
    setNewDesc('');
  };

  return (
    <section id="services" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.servicesHeaderTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.servicesTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              {t.servicesSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAiStudio('service')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.servicesAiDraft}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.servicesAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Creator Services Direct Payout Guarantee */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-blue-50/60 to-slate-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-slate-850 border border-emerald-200/80 dark:border-emerald-900/60 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">
                {language === 'ar'
                  ? 'الدفع المباشر لخدمات الذكاء الاصطناعي والاستشارات عبر Google Pay / Google Play'
                  : 'Direct Payouts for AI Services & Consultations via Google Pay / Google Play'}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {language === 'ar'
                  ? 'سواء كانت خدمات الذكاء الاصطناعي المسعرة ديناميكياً بـ Gemini أو الجلسات الاستشارية، جميع المبالغ تُدفع من قبل الزبون والمشاهد مباشرة لحسابي في Google Pay / Google Play (iraqlead03@gmail.com).'
                  : 'Whether AI services priced dynamically by Gemini or 1:1 advisory, all payments are credited directly to my Google Pay / Google Play account (iraqlead03@gmail.com).'}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
            <span>iraqlead03@gmail.com</span>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service) => {
            const displayTitle = language === 'en' && service.titleEn ? service.titleEn : service.title;
            const displayTagline = language === 'en' && service.taglineEn ? service.taglineEn : service.tagline;
            const displayDesc = language === 'en' && service.descriptionEn ? service.descriptionEn : service.description;
            const displayDuration = language === 'en' && service.durationEn ? service.durationEn : service.duration;
            const displayAudience = language === 'en' && service.targetAudienceEn ? service.targetAudienceEn : service.targetAudience;
            const deliverables = language === 'en' && service.deliverablesEn ? service.deliverablesEn : service.deliverables;
            const aiRationale = language === 'en' && service.aiPricingRationaleEn ? service.aiPricingRationaleEn : service.aiPricingRationale;

            return (
              <div
                key={service.id}
                className={`rounded-2xl border bg-white dark:bg-slate-850 p-6 flex flex-col justify-between transition-all shadow-2xs relative overflow-hidden ${isRtl ? 'text-right' : 'text-left'} ${
                  service.isFeatured
                    ? 'border-blue-500/80 ring-1 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                {/* Lustrous Image Header on Card */}
                {service.image && (
                  <div className="relative aspect-video -mx-6 -mt-6 mb-5 overflow-hidden bg-slate-900">
                    <img
                      src={service.image}
                      alt={displayTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex items-end p-4">
                      {service.isAiPriced ? (
                        <div className="flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 bg-blue-600/90 text-white rounded shadow-sm backdrop-blur-xs">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'مسعّر بالذكاء الاصطناعي (Gemini)' : 'AI Dynamically Priced (Gemini)'}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] font-bold px-2.5 py-1 bg-slate-800/90 text-slate-200 rounded backdrop-blur-xs">
                          {language === 'ar' ? 'سعر محدد للاستشارة' : 'Fixed Advisory Price'}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  
                  {/* Meta details */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{displayDuration}</span>
                    </div>
                    <span className="text-slate-400">{displayAudience}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {displayTitle}
                  </h3>

                  <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {displayTagline}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {displayDesc}
                  </p>

                  {/* AI Pricing Rationale Box */}
                  {service.isAiPriced && aiRationale && (
                    <div className="p-3 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-xl space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1 text-[11px]">
                          <Zap className="w-3 h-3 text-amber-500" />
                          <span>{language === 'ar' ? 'معايير تسعير الـ AI:' : 'AI Pricing Rationale:'}</span>
                        </span>
                        
                        {/* Live Recalculate button */}
                        <button
                          type="button"
                          onClick={() => handleRecalculateAiPrice(service)}
                          disabled={recalculatingId === service.id}
                          className="text-[10px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                        >
                          <RefreshCw className={`w-3 h-3 ${recalculatingId === service.id ? 'animate-spin' : ''}`} />
                          <span>{recalculatingId === service.id ? t.recalculating : t.recalculateAiPrice}</span>
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "{aiRationale}"
                      </p>
                    </div>
                  )}

                  {/* Deliverables */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center justify-between">
                      <span>{t.deliverablesTitle}</span>
                      {service.ndaIncluded && (
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          <span>NDA Guaranteed</span>
                        </span>
                      )}
                    </div>
                    {deliverables.map((deliv, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Price & Direct Purchase via Google Pay */}
                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-400">
                        {service.isAiPriced ? (language === 'ar' ? 'السعر المحسوب بـ Gemini:' : 'Gemini AI Price:') : (language === 'ar' ? 'سعر الخدمة:' : 'Price:')}
                      </span>
                      <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                        ${service.price}
                        <span className="text-xs font-normal text-slate-500 mr-1">
                          {service.pricingType === 'per_session' ? (language === 'ar' ? '/جلسة' : '/session') : (language === 'ar' ? '/مشروع' : '/project')}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded font-semibold border border-emerald-200/80 dark:border-emerald-800">
                      Google Pay / Play: iraqlead03@gmail.com
                    </div>
                  </div>

                  {/* Action buttons: Book & Pay with Google Pay OR Add to Cart */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onAddToCartService(service)}
                      className="py-2.5 px-3 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-all flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'إضافة للسلة' : 'Add to Cart'}</span>
                    </button>

                    <button
                      onClick={() => setSelectedService(service)}
                      className="py-2.5 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{t.bookConsultation}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Booking & Google Pay Purchase Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'شراء وحجز الخدمة والدفع عبر Google Pay' : 'Purchase Service via Google Pay'}
                </h3>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                  ${selectedService.price} · {language === 'en' && selectedService.durationEn ? selectedService.durationEn : selectedService.duration}
                </span>
              </div>
            </div>

            {bookingSuccess ? (
              <div className="p-6 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
                  {language === 'ar' ? 'تم الشراء وتحويل الدفعة بنجاح إلى حساب مصطفى الهاشمي!' : 'Payment Disbursed to Creator Mustafa via Google Pay!'}
                </h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  {bookingSuccess}
                </p>
                <div className="text-[11px] font-mono p-2 bg-emerald-100 dark:bg-emerald-900/40 rounded text-emerald-800 dark:text-emerald-200">
                  Beneficiary Payout: iraqlead03@gmail.com
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                
                {/* Notice of Google Pay Payout */}
                <div className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
                  <div>
                    <span className="font-bold">{language === 'ar' ? 'المستفيد المستلم عبر Google Pay:' : 'Google Pay Receiver:'}</span>
                    <span className="font-mono text-blue-700 dark:text-blue-300 mr-1 ml-1">iraqlead03@gmail.com</span>
                  </div>
                  <div className="font-mono font-bold text-sm text-blue-600">
                    ${selectedService.price}
                  </div>
                </div>

                {/* Date and Slot selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      {language === 'ar' ? 'اختر التاريخ المطلوب *' : 'Target Schedule Date *'}
                    </label>
                    <input
                      type="date"
                      required
                      value={clientDate}
                      onChange={(e) => setClientDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      {language === 'ar' ? 'الوقت المقترح *' : 'Preferred Time Slot *'}
                    </label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                    >
                      {timeSlots.map((slot, i) => (
                        <option key={i} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Client info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      {language === 'ar' ? 'الاسم الكامل أو اسم المؤسسة *' : 'Full Name or Company *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder={language === 'ar' ? 'مثال: م. علي الكرخي' : 'e.g. Alex Morgan'}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                      {language === 'ar' ? 'البريد الإلكتروني للتواصل ودعوة Meet *' : 'Contact Email for Google Meet *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white font-mono text-left dir-ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    {language === 'ar' ? 'نبذة عن التحديات أو متطلبات الجلسة' : 'Brief Session Requirements'}
                  </label>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder={language === 'ar' ? 'المعمارية أو الاستشارة المطلوبة...' : 'Tech stack or consulting scope...'}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{language === 'ar' ? 'ضمان الدفع الآمن واتفاقية الـ NDA' : 'Google Pay Verified Merchant'}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href={`https://wa.me/9647700000000?text=${encodeURIComponent(
                        language === 'ar'
                          ? `مرحباً أ. مصطفى، أود الاستفسار عبر واتساب بخصوص خدمة: ${selectedService.title} ($${selectedService.price}).`
                          : `Hello Mustafa, inquiring via WhatsApp regarding: ${selectedService.titleEn || selectedService.title} ($${selectedService.price}).`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-emerald-300 dark:border-emerald-700 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:text-emerald-300 text-xs font-semibold transition-colors"
                    >
                      <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                      <span>{language === 'ar' ? 'استفسار واتساب' : 'WhatsApp'}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setSelectedService(null)}
                      className="px-3 py-2 font-medium text-slate-500 hover:text-slate-900"
                    >
                      {language === 'ar' ? 'إلغاء' : 'Cancel'}
                    </button>
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-5 py-2.5 font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>{language === 'ar' ? 'الدفع والتحويل لحسابي بـ Google Pay / Play' : 'Pay via Google Pay / Google Play'}</span>
                    </button>
                  </div>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

      {/* Add New Service Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 ${isRtl ? 'text-right' : 'text-left'}`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service Tier'}
              </h3>
            </div>

            <form onSubmit={handleCreateService} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'اسم الخدمة *' : 'Service Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: استشارات هندسة وتدريب وكلاء الذكاء الاصطناعي' : 'e.g. Autonomous AI Agent Architecture'}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    {language === 'ar' ? 'السعر ($) *' : 'Price ($) *'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    {language === 'ar' ? 'آلية التسعير' : 'Pricing Method'}
                  </label>
                  <select
                    value={isAiPriced ? 'ai' : 'fixed'}
                    onChange={(e) => setIsAiPriced(e.target.value === 'ai')}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
                  >
                    <option value="ai">{language === 'ar' ? 'تسعير ديناميكي بـ Gemini' : 'Gemini AI Dynamic Pricing'}</option>
                    <option value="fixed">{language === 'ar' ? 'سعر استشاري ثابت' : 'Fixed Price'}</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  {language === 'ar' ? 'إلغاء' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                >
                  {language === 'ar' ? 'إضافة الخدمة للمنصة' : 'Publish Service'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
