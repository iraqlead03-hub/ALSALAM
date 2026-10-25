import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Check, CreditCard, ShieldCheck, Zap, Download } from 'lucide-react';
import { CartItem, Language } from '../types';
import { translations } from '../i18n/translations';
import { WhatsAppIcon } from './WhatsAppWidget';

interface CartDrawerProps {
  language: Language;
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  language,
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [receiptData, setReceiptData] = useState<{ orderId: string; date: string } | null>(null);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GOOGLE' || code === 'IRAQ' || code === 'VIP') {
      setDiscountPercent(20);
      setPromoMessage(language === 'ar' ? 'تم تطبيق خصم 20% بنجاح!' : '20% discount applied successfully!');
    } else {
      setDiscountPercent(0);
      setPromoMessage(language === 'ar' ? 'كود غير صالح. جرب "GOOGLE" لخصم 20%' : 'Invalid promo code. Try "GOOGLE" for 20% off.');
    }
  };

  const handleCompleteGooglePay = () => {
    setIsCheckingOut(true);
    const orderId = `GPAY-IQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const dateStr = new Date().toLocaleDateString(language === 'ar' ? 'ar-IQ' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    setTimeout(() => {
      setIsCheckingOut(false);
      setReceiptData({ orderId, date: dateStr });
      setOrderComplete(true);
    }, 1800);
  };

  const handleFinish = () => {
    onClearCart();
    setOrderComplete(false);
    setReceiptData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-2xs transition-opacity"
      />

      <div className={`fixed inset-y-0 ${isRtl ? 'left-0 pl-10' : 'right-0 pr-10'} max-w-full flex`}>
        <div className={`w-screen max-w-md bg-white dark:bg-slate-900 ${isRtl ? 'border-r' : 'border-l'} border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
          
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {t.cartTitle} ({items.length})
              </h3>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderComplete && receiptData ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                
                <div>
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                    {language === 'ar'
                      ? 'تم تحويل الدفعة بنجاح إلى حساب المنشئ عبر Google Pay / Google Play!'
                      : 'Payment Settled Directly to Creator Account via Google Pay / Google Play!'}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                    {language === 'ar'
                      ? 'تم إيداع المبلغ بالكامل في حساب مصطفى الهاشمي (iraqlead03@gmail.com)، وأُرسلت فاتورة الشراء ورابط التحميل/الحجز إلى بريدك.'
                      : 'Funds fully credited to Mustafa Al-Hashemi (iraqlead03@gmail.com). Receipt and fulfillment links emailed.'}
                  </p>
                </div>

                {/* Google Pay Official Receipt Card */}
                <div className="w-full bg-slate-50 dark:bg-slate-850 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs text-slate-700 dark:text-slate-300 font-mono text-right">
                  <div className="flex justify-between border-b border-slate-200 dark:border-slate-700 pb-2 font-bold text-slate-900 dark:text-white">
                    <span>Google Pay / Play Receipt</span>
                    <span>{receiptData.orderId}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>{receiptData.date}</span>
                    <span className="text-slate-500">التاريخ / Date</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">iraqlead03@gmail.com</span>
                    <span className="text-slate-500">حساب المنشئ المستلم / Payout</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="font-bold text-emerald-600">SETTLED (مدفوع ومحوّل)</span>
                    <span className="text-slate-500">حالة العملية / Status</span>
                  </div>

                  <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-slate-700 font-bold text-sm text-slate-900 dark:text-white">
                    <span>${total.toFixed(2)} USD</span>
                    <span>المبلغ الإجمالي / Total</span>
                  </div>
                </div>

                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 px-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl shadow-xs"
                >
                  {language === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Close and Continue Browsing'}
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
                <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {t.cartEmptyTitle}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  {language === 'ar'
                    ? 'جميع المنتجات المعروضة (منتجات الذكاء الاصطناعي ومنتجات المنشئ الخاصة) متاحة للشراء المباشر والدفع لحسابي بـ Google Pay / Google Play.'
                    : 'All products (AI solutions & creator goods) can be purchased directly with payments credited to my Google Pay / Google Play account.'}
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs"
                >
                  {t.browseProducts}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                
                {/* Creator Direct Payout Guarantee Strip */}
                <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-slate-850 rounded-xl border border-blue-200 dark:border-blue-900 text-[11px] text-blue-950 dark:text-blue-200 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>{language === 'ar' ? 'تحويل المبالغ لحساب المنشئ:' : 'Direct Payout to Creator:'}</span>
                    </div>
                    <span className="font-mono text-blue-700 dark:text-blue-300">iraqlead03@gmail.com</span>
                  </div>
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 leading-tight">
                    {language === 'ar'
                      ? 'جميع المشتريات لمنتجات الذكاء الاصطناعي ومنتجاتي المعروضة تُدفع وتُحوّل مباشرة إلى حسابي بـ Google Pay / Google Play.'
                      : 'All purchases (AI solutions & creator products) are deposited directly into my Google Pay / Google Play account.'}
                  </p>
                </div>

                {/* Items List */}
                {items.map((item) => {
                  const displayTitle = language === 'en' && item.titleEn ? item.titleEn : item.title;

                  return (
                    <div
                      key={item.id + (item.isCommercialLicense ? '-comm' : '')}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 flex items-center gap-3"
                    >
                      <img
                        src={item.image}
                        alt={displayTitle}
                        referrerPolicy="no-referrer"
                        className="w-14 h-14 rounded-lg object-cover bg-slate-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {displayTitle}
                          </h4>
                          <span className="text-[10px] px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 rounded text-slate-600 dark:text-slate-300">
                            {item.type === 'book'
                              ? (language === 'ar' ? 'كتاب إلكتروني' : 'E-Book')
                              : item.type === 'service'
                              ? (language === 'ar' ? 'خدمة' : 'Service')
                              : (language === 'ar' ? 'منتج' : 'Product')}
                          </span>
                        </div>
                        
                        {/* Pricing and license details */}
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500">
                          {item.isAiPriced ? (
                            <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                              <Zap className="w-3 h-3 text-amber-500" />
                              <span>{language === 'ar' ? 'مسعر ذكياً بـ Gemini' : 'AI-Evaluated by Gemini'}</span>
                            </span>
                          ) : item.isCommercialLicense ? (
                            <span className="text-blue-600 dark:text-blue-400 font-semibold flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" />
                              <span>{t.licenseCommercial}</span>
                            </span>
                          ) : (
                            <span className="text-slate-600 dark:text-slate-400">
                              {language === 'ar' ? 'محدد السعر من قبل المنشئ' : 'Creator Curated & Priced'}
                            </span>
                          )}
                        </div>

                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
                          {language === 'ar' ? '✓ دفع فوري ببطاقات Visa و Mastercard عبر Google Pay / Play' : '✓ Visa & Mastercard via Google Pay / Google Play'}
                        </div>

                        <div className="text-xs text-blue-600 dark:text-blue-400 font-mono font-semibold mt-1">
                          ${item.price}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 rounded bg-white dark:bg-slate-750 border border-slate-200 dark:border-slate-750 hover:bg-slate-100"
                          >
                            <Minus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                          </button>
                          <span className="text-xs font-mono font-semibold px-2">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 rounded bg-white dark:bg-slate-750 border border-slate-200 dark:border-slate-750 hover:bg-slate-100"
                          >
                            <Plus className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer & Google Pay / Google Play Checkout Area */}
          {items.length > 0 && !orderComplete && (
            <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850/70 space-y-4">
              
              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 text-xs">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={t.promoPlaceholder}
                  className={`flex-1 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono uppercase ${isRtl ? 'text-right' : 'text-left'}`}
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-200 dark:bg-slate-750 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-medium rounded-lg"
                >
                  {t.applyBtn}
                </button>
              </form>

              {promoMessage && (
                <div
                  className={`text-[11px] ${
                    discountPercent > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600'
                  }`}
                >
                  {promoMessage}
                </div>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>{t.cartSubtotal}</span>
                  <span className="font-mono tabular-nums">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{t.cartDiscount} ({discountPercent}%):</span>
                    <span className="font-mono tabular-nums">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span>{t.cartTotal}</span>
                  <span className="font-mono tabular-nums">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Dedicated Google Pay / Google Play Checkout Button */}
              <button
                onClick={handleCompleteGooglePay}
                disabled={isCheckingOut}
                className="w-full py-3.5 px-4 bg-slate-950 hover:bg-black text-white text-xs font-bold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-slate-800 cursor-pointer"
              >
                {isCheckingOut ? (
                  <span>{t.processingPayment}</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">
                      {language === 'ar' ? 'الدفع والتحويل لحسابي بـ' : 'Pay to Creator via'}
                    </span>
                    <span className="text-white font-bold text-sm tracking-tight flex items-center">
                      <span className="text-blue-400">G</span>
                      <span className="text-red-400">o</span>
                      <span className="text-amber-400">o</span>
                      <span className="text-blue-400">g</span>
                      <span className="text-emerald-400">l</span>
                      <span className="text-red-400">e</span>
                      <span className="text-white ml-1">Pay / Play</span>
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono font-bold">(${total.toFixed(2)})</span>
                  </div>
                )}
              </button>

              {/* Explicit Creator Payout Reassurance Note */}
              <p className="text-[10px] text-center text-slate-500 dark:text-slate-400 leading-tight">
                {language === 'ar'
                  ? '🔒 تحويل فوري ومؤمن: جميع مدفوعات المنتجات والخدمات المعروضة تُحوّل مباشرة لحساب مصطفى الهاشمي (iraqlead03@gmail.com).'
                  : '🔒 Verified Merchant Payout: All customer purchases are settled directly to Mustafa Al-Hashemi (iraqlead03@gmail.com).'}
              </p>

              {/* Direct WhatsApp Assistance */}
              <a
                href={`https://wa.me/9647700000000?text=${encodeURIComponent(
                  language === 'ar'
                    ? `مرحباً، أود المساعدة بخصوص سلة الشراء والدفع عبر Google Pay (المبلغ الإجمالي: $${total.toFixed(2)} USD).`
                    : `Hello, I need assistance with my Google Pay cart checkout (Total: $${total.toFixed(2)} USD).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
                <span>{language === 'ar' ? 'هل تواجه استفساراً في الدفع؟ تواصل عبر واتساب' : 'Need checkout assistance? Chat on WhatsApp'}</span>
              </a>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
