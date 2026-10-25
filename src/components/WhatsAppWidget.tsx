import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  Phone,
  Edit2,
  Check,
  Sparkles,
} from 'lucide-react';
import { Language } from '../types';

interface WhatsAppWidgetProps {
  language: Language;
}

// Authentic WhatsApp SVG icon
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="0"
    fill="currentColor"
    className={className}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.167 8.167 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.05-1.07l-.29-.17-3.12.82.83-3.04-.19-.31a8.214 8.214 0 0 1-1.26-4.47c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.58c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8 1-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.12-.14.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.87-.21-.5-.42-.43-.57-.44l-.49-.01c-.17 0-.45.06-.68.32-.23.25-.89.87-.89 2.12s.91 2.46 1.04 2.63c.13.17 1.79 2.74 4.34 3.84.61.26 1.08.42 1.45.54.61.19 1.17.17 1.61.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.19-.48-.31z" />
  </svg>
);

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({ language }) => {
  const isRtl = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState(() => {
    return localStorage.getItem('creator_whatsapp_phone') || '9647700000000';
  });
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [tempPhone, setTempPhone] = useState(phone);

  useEffect(() => {
    localStorage.setItem('creator_whatsapp_phone', phone);
  }, [phone]);

  const quickPrompts = isRtl
    ? [
        {
          label: 'استفسار حول المنتجات والمعروضات',
          text: 'مرحباً أ. مصطفى، أود الاستفسار حول المنتجات المعروضة وطريقة الشراء والدفع عبر Google Pay.',
        },
        {
          label: 'طلب استشارة معمارية في الـ AI',
          text: 'مرحباً أ. مصطفى، أود الاستفسار عن تفاصيل وحجز الجلسة الاستشارية في هندسة الذكاء الاصطناعي.',
        },
        {
          label: 'استفسار تجاري للشركات B2B',
          text: 'مرحباً، نمثل شركة ونرغب في التعاقد التجاري وتدقيق المعمارية البرمجية مع ترخيص الفرق.',
        },
        {
          label: 'دعم فني وتأكيد عملية دفع',
          text: 'مرحباً، قمت بعملية شراء عبر Google Pay وأود المتابعة بخصوص استلام الملفات والفاتورة.',
        },
      ]
    : [
        {
          label: 'Curated Products & Google Pay Inquiry',
          text: 'Hello Mustafa, I have an inquiry regarding your curated products and Google Pay checkout.',
        },
        {
          label: 'AI Architecture Advisory Inquiry',
          text: 'Hello Mustafa, I would like to inquire about booking an AI systems architectural advisory session.',
        },
        {
          label: 'Enterprise & B2B Solutions',
          text: 'Hello, our company is interested in enterprise architecture consulting and team licenses.',
        },
        {
          label: 'Customer Support & Order Fulfillment',
          text: 'Hello, I completed a purchase via Google Pay and would like to confirm my receipt & access link.',
        },
      ];

  const handleSendMessage = (textToSend?: string) => {
    const finalMsg = textToSend || message.trim() || (isRtl ? 'مرحباً أ. مصطفى، أود التواصل معك.' : 'Hello Mustafa, I would like to connect.');
    const encoded = encodeURIComponent(finalMsg);
    const cleanNumber = phone.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSavePhone = () => {
    const clean = tempPhone.replace(/[^0-9]/g, '');
    if (clean.length >= 8) {
      setPhone(clean);
    }
    setIsEditingPhone(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <div
        className={`fixed bottom-6 ${
          isRtl ? 'left-6' : 'right-6'
        } z-40 flex flex-col items-end gap-2 print:hidden`}
      >
        {/* Quick tooltip pill when closed */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-slate-900 shadow-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-100 hover:scale-102 transition-transform"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{isRtl ? 'تواصل عبر واتساب' : 'Chat on WhatsApp'}</span>
          </div>
        )}

        {/* Floating Green Circle Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isRtl ? 'فتح محادثة واتساب' : 'Open WhatsApp Chat'}
          className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white shadow-xl hover:shadow-2xl flex items-center justify-center transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-900"
        >
          {isOpen ? (
            <X className="w-6 h-6 stroke-[2.5]" />
          ) : (
            <>
              <WhatsAppIcon className="w-7 h-7" />
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white dark:border-slate-900 rounded-full animate-ping"></span>
              <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Chat Popover Card */}
      {isOpen && (
        <div
          className={`fixed bottom-24 ${
            isRtl ? 'left-4 sm:left-6' : 'right-4 sm:right-6'
          } z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col font-sans transition-all animate-in fade-in slide-in-from-bottom-4 duration-200 print:hidden ${
            isRtl ? 'text-right' : 'text-left'
          }`}
          dir={isRtl ? 'rtl' : 'ltr'}
        >
          {/* Header */}
          <div className="p-4 bg-[#075E54] text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/src/assets/images/hero_creator_portrait_1792905396397.jpg"
                  alt="Mustafa Al-Hashemi"
                  className="w-11 h-11 rounded-full object-cover border-2 border-white/80"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#075E54] rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight">
                  <span>{isRtl ? 'مصطفى الهاشمي' : 'Mustafa Al-Hashemi'}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                </div>
                <p className="text-[11px] text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{isRtl ? 'متاح الآن · يرد خلال دقائق' : 'Online · Fast response'}</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-4 bg-slate-50 dark:bg-slate-850/80 max-h-[60vh] overflow-y-auto space-y-3.5 text-xs text-slate-700 dark:text-slate-300">
            
            {/* Welcome Bubble */}
            <div className="p-3 rounded-2xl rounded-tr-none bg-white dark:bg-slate-800 shadow-xs border border-slate-200/80 dark:border-slate-750 space-y-1">
              <p className="font-semibold text-slate-900 dark:text-white text-xs">
                {isRtl ? 'أهلاً بك! 👋 كيف يمكنني مساعدتك اليوم؟' : 'Welcome! 👋 How can I assist you today?'}
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                {isRtl
                  ? 'يسعدني تواصلك المباشر لمناقشة المنتجات المعروضة، حجز الاستشارات، أو دعم الدفع بـ Google Pay.'
                  : 'Feel free to reach out directly regarding curated products, AI consultations, or Google Pay checkout.'}
              </p>
            </div>

            {/* Quick Prompt Presets */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                <span>{isRtl ? 'اختر موضوع المحادثة السريع:' : 'Quick Conversation Starters:'}</span>
              </div>
              <div className="space-y-1.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessage(item.text);
                      handleSendMessage(item.text);
                    }}
                    className="w-full text-right rtl:text-right ltr:text-left p-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-750 hover:border-emerald-300 dark:hover:border-emerald-700 text-[11px] text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-300 transition-all font-medium flex items-center justify-between gap-2 group"
                  >
                    <span>{item.label}</span>
                    <Send className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* WhatsApp Phone Number Configuration Strip */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-750 text-[11px]">
              <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1 font-medium">
                  <Phone className="w-3 h-3 text-emerald-600" />
                  <span>{isRtl ? 'رقم الواتساب المسجل:' : 'WhatsApp Business Number:'}</span>
                </span>
                {!isEditingPhone ? (
                  <button
                    onClick={() => {
                      setTempPhone(phone);
                      setIsEditingPhone(true);
                    }}
                    className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    <Edit2 className="w-2.5 h-2.5" />
                    <span>{isRtl ? 'تعديل' : 'Edit'}</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSavePhone}
                    className="text-emerald-600 font-bold hover:underline flex items-center gap-0.5 text-[10px]"
                  >
                    <Check className="w-3 h-3" />
                    <span>{isRtl ? 'حفظ' : 'Save'}</span>
                  </button>
                )}
              </div>

              {isEditingPhone ? (
                <div className="flex gap-1.5 mt-1">
                  <input
                    type="text"
                    value={tempPhone}
                    onChange={(e) => setTempPhone(e.target.value)}
                    placeholder="9647700000000"
                    className="flex-1 px-2 py-1 text-xs rounded border border-emerald-400 dark:border-emerald-700 font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                  />
                  <button
                    onClick={handleSavePhone}
                    className="px-2.5 py-1 text-[10px] font-bold bg-[#25D366] text-white rounded"
                  >
                    {isRtl ? 'حفظ' : 'OK'}
                  </button>
                </div>
              ) : (
                <div className="font-mono text-slate-800 dark:text-slate-200 font-bold text-xs" dir="ltr">
                  +{phone}
                </div>
              )}
            </div>

          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <div className="relative">
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={isRtl ? 'اكتب رسالتك المباشرة هنا...' : 'Type your message here...'}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
              />
            </div>

            <button
              onClick={() => handleSendMessage()}
              className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>{isRtl ? 'إرسال ومتابعة في واتساب' : 'Open in WhatsApp'}</span>
            </button>
          </div>

        </div>
      )}
    </>
  );
};
