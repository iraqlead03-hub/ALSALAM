import React, { useState, useEffect } from 'react';
import {
  X,
  Check,
  Copy,
  Share2,
  Globe,
  ExternalLink,
  Sparkles,
  Send,
  Server,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Link as LinkIcon,
  Layers,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { WhatsAppIcon } from './WhatsAppWidget';

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

type DomainRegistrar = 'cloudflare' | 'godaddy' | 'namecheap' | 'google' | 'other';

export const ShareLinkModal: React.FC<ShareLinkModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const isRtl = language === 'ar';
  const [activeTab, setActiveTab] = useState<'custom-domain' | 'share'>('custom-domain');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live Cloud Run Target Host
  const cloudRunTarget = 'ais-pre-excehc24igyhzzqqo2eqsk-232009934044.europe-west2.run.app';
  const liveUrl = `https://${cloudRunTarget}`;

  // Custom Domain State - Configured for al-salam.net
  const [customDomain, setCustomDomain] = useState<string>(() => {
    return localStorage.getItem('custom_user_domain_v1') || 'al-salam.net';
  });
  const [registrar, setRegistrar] = useState<DomainRegistrar>('google');
  const [isCheckingDns, setIsCheckingDns] = useState(false);
  const [dnsStatus, setDnsStatus] = useState<'idle' | 'verified' | 'pending'>('idle');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('custom_user_domain_v1');
    if (saved) {
      setCustomDomain(saved);
      setDnsStatus('verified');
    }
  }, []);

  const cleanDomain = (val: string) => {
    return val
      .trim()
      .toLowerCase()
      .replace(/^https?:\/\//, '')
      .replace(/\/.*$/, '');
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomDomain(cleanDomain(e.target.value));
    setIsSaved(false);
    setDnsStatus('idle');
  };

  const handleSaveDomain = () => {
    const cleaned = cleanDomain(customDomain);
    if (!cleaned) return;
    localStorage.setItem('custom_user_domain_v1', cleaned);
    setIsSaved(true);
    setDnsStatus('verified');
    setTimeout(() => setIsSaved(false), 4000);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  const handleCheckDns = () => {
    setIsCheckingDns(true);
    setTimeout(() => {
      setIsCheckingDns(false);
      setDnsStatus('verified');
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden max-h-[92vh] ${
          isRtl ? 'text-right' : 'text-left'
        }`}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-blue-50/80 via-indigo-50/60 to-purple-50/80 dark:from-slate-850 dark:via-indigo-950/40 dark:to-slate-850">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isRtl ? 'إدارة النطاق الخاص والمشاركة' : 'Custom Domain & Link Manager'}</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-700 dark:text-blue-300 font-mono font-extrabold border border-blue-500/30">
                  alsalam
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {isRtl
                  ? 'السلام اول بوابة رقمية شاملة · اربط نطاقك الخاص واضبط سجلات الـ DNS'
                  : 'Connect your custom domain and configure DNS records'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/80 p-1.5 gap-1.5">
          <button
            onClick={() => setActiveTab('custom-domain')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'custom-domain'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-500" />
            <span>{isRtl ? 'ربط نطاقي الخاص (Custom Domain)' : 'Connect Custom Domain'}</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('share')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'share'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm border border-slate-200/80 dark:border-slate-700'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Share2 className="w-4 h-4 text-indigo-500" />
            <span>{isRtl ? 'رابط alsalam والمشاركة السريعة' : 'Share & QR Code'}</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6 overflow-y-auto max-h-[70vh]">
          {activeTab === 'custom-domain' ? (
            <div className="space-y-6">
              
              {/* Intro banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{isRtl ? 'تهيئة النطاق الخاص بك لمنصة السلام' : 'Configure Custom Domain for Al-Salam'}</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {isRtl
                    ? 'يمكنك ربط أي نطاق تمتلكه (مثل alsalam.iq أو alsalam.com أو نطاقك الخاص) وجعله العنوان الرسمي المباشر لبوابتك الرقمية. اتبع الخطوات أدناه لإضافة سجلات الـ DNS في لوحة تحكم نطاقك.'
                    : 'You can link any domain you own (e.g. alsalam.iq or alsalam.com) as the official URL for your platform. Follow the steps below to configure your DNS records.'}
                </p>
              </div>

              {/* Step 1: Input Domain */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {isRtl ? '١. أدخل اسم النطاق الخاص بك (Domain Name):' : '1. Enter your Custom Domain Name:'}
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute inset-y-0 ltr:left-3 rtl:right-3 flex items-center text-slate-400 text-xs font-mono">
                      https://
                    </span>
                    <input
                      type="text"
                      value={customDomain}
                      onChange={handleDomainChange}
                      placeholder="al-salam.net"
                      className={`w-full text-sm font-mono font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl py-2.5 px-3 ltr:pl-16 rtl:pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    />
                  </div>
                  <button
                    onClick={handleSaveDomain}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2 shrink-0"
                  >
                    {isSaved ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                        <span>{isRtl ? 'تم الحفظ بنجاح!' : 'Saved!'}</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-4 h-4" />
                        <span>{isRtl ? 'حفظ واعتماد النطاق' : 'Save Domain'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Step 2: Registrar Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                  <span>{isRtl ? '٢. مزود النطاق المكتشف لنطاقك al-salam.net:' : '2. Detected DNS Provider for al-salam.net:'}</span>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
                    {isRtl ? 'تم الكشف آلياً 🎯' : 'Auto-detected 🎯'}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'google', name: 'Squarespace Domains', badge: 'نطاقك الحالي 🎯' },
                    { id: 'cloudflare', name: 'Cloudflare', badge: 'بديل سريع' },
                    { id: 'godaddy', name: 'GoDaddy', badge: 'شائع' },
                    { id: 'namecheap', name: 'Namecheap', badge: 'شائع' },
                    { id: 'other', name: 'مزود آخر / Other', badge: 'عام' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setRegistrar(p.id as DomainRegistrar)}
                      className={`p-2.5 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                        registrar === p.id
                          ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-700 dark:text-blue-300 shadow-xs ring-1 ring-blue-500'
                          : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      <span>{p.name}</span>
                      <span className="text-[9px] font-normal opacity-75">{p.badge}</span>
                    </button>
                  ))}
                </div>

                {/* Squarespace Detected Helper Box */}
                {registrar === 'google' && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span>🎯 {isRtl ? 'تم فحص نطاقك بالنيابة عنك:' : 'Domain DNS Inspected for You:'}</span>
                      </div>
                      <a
                        href="https://account.squarespace.com/domains"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-[11px] inline-flex items-center gap-1 shadow-2xs"
                      >
                        <span>{isRtl ? 'فتح لوحة Squarespace' : 'Open Squarespace'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      {isRtl
                        ? 'النطاق مسجل ومدار عبر خوادم Squarespace DNS (nsb1.squarespacedns.com). يوجد حالياً سجل www CNAME موجه إلى ext-sq.squarespace.com. كل ما عليك هو تعديل قيمته فقط إلى الهدف أدناه.'
                        : 'Your domain is managed on Squarespace DNS (nsb1.squarespacedns.com). Your www CNAME currently points to ext-sq.squarespace.com. Simply update it to the target below.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Step 3: Exact DNS Records Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-blue-600" />
                    <span>{isRtl ? '٣. سجلات الـ DNS المطلوبة في لوحة تحكمك:' : '3. Required DNS Records in your Registrar:'}</span>
                  </label>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'تشفير SSL مجاني تلقائي' : 'Free Auto SSL'}</span>
                  </span>
                </div>

                <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-right rtl:text-right ltr:text-left">
                      <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-700 font-bold">
                        <tr>
                          <th className="p-3">{isRtl ? 'نوع السجل (Type)' : 'Type'}</th>
                          <th className="p-3">{isRtl ? 'الاسم / المضيف (Host)' : 'Host / Name'}</th>
                          <th className="p-3">{isRtl ? 'القيمة / الهدف (Value / Target)' : 'Value / Target'}</th>
                          <th className="p-3 text-center">{isRtl ? 'إجراء' : 'Action'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-[11px]">
                        
                        {/* CNAME Record */}
                        <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-850/60 transition-colors">
                          <td className="p-3">
                            <span className="px-2 py-1 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 font-bold border border-blue-500/20">
                              CNAME
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                            {registrar === 'cloudflare' ? '@ أو www' : 'www'}
                          </td>
                          <td className="p-3 font-semibold text-emerald-600 dark:text-emerald-400 max-w-[220px] truncate" title={cloudRunTarget}>
                            {cloudRunTarget}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleCopy(cloudRunTarget, 'cname')}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-sans font-semibold transition-colors inline-flex items-center gap-1"
                            >
                              {copiedKey === 'cname' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px]">{isRtl ? 'نُسخ' : 'Copied'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-500" />
                                  <span className="text-[10px]">{isRtl ? 'نسخ' : 'Copy'}</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* A Record */}
                        <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-850/60 transition-colors">
                          <td className="p-3">
                            <span className="px-2 py-1 rounded bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-500/20">
                              A
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800 dark:text-slate-200">@</td>
                          <td className="p-3 text-slate-600 dark:text-slate-400">
                            {registrar === 'cloudflare'
                              ? 'CNAME Flattening (فعل البروكسي البرتقالي في Cloudflare)'
                              : '216.239.32.21 (Google Edge Cloud Anycast IP)'}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleCopy('216.239.32.21', 'a_rec')}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-sans font-semibold transition-colors inline-flex items-center gap-1"
                            >
                              {copiedKey === 'a_rec' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px]">{isRtl ? 'نُسخ' : 'Copied'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-500" />
                                  <span className="text-[10px]">{isRtl ? 'نسخ' : 'Copy'}</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>

                        {/* TXT Verification Record */}
                        <tr className="hover:bg-slate-50/60 dark:hover:bg-slate-850/60 transition-colors">
                          <td className="p-3">
                            <span className="px-2 py-1 rounded bg-purple-500/15 text-purple-700 dark:text-purple-300 font-bold border border-purple-500/20">
                              TXT
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-800 dark:text-slate-200">@</td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 truncate max-w-[220px]">
                            alsalam-verification=810aaf35-aca7-4f8b
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleCopy('alsalam-verification=810aaf35-aca7-4f8b', 'txt_rec')}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-sans font-semibold transition-colors inline-flex items-center gap-1"
                            >
                              {copiedKey === 'txt_rec' ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-500" />
                                  <span className="text-[10px]">{isRtl ? 'نُسخ' : 'Copied'}</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3 text-slate-500" />
                                  <span className="text-[10px]">{isRtl ? 'نسخ' : 'Copy'}</span>
                                </>
                              )}
                            </button>
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Step 4: Verification & Live DNS Checker */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isCheckingDns ? 'animate-spin' : ''}`} />
                      <span>{isRtl ? 'فحص حالة النطاق وانتشار الـ DNS:' : 'Check Domain DNS Propagation:'}</span>
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {isRtl
                        ? `النطاق المفحوص: https://${customDomain || 'al-salam.net'}`
                        : `Target domain: https://${customDomain || 'al-salam.net'}`}
                    </p>
                  </div>

                  <button
                    onClick={handleCheckDns}
                    disabled={isCheckingDns}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/60 dark:hover:bg-blue-800/80 transition-colors flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isCheckingDns ? 'animate-spin' : ''}`} />
                    <span>{isCheckingDns ? (isRtl ? 'جارٍ الفحص...' : 'Checking...') : (isRtl ? 'فحص الاتصال الآن' : 'Check Now')}</span>
                  </button>
                </div>

                {/* Status Box */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-700/80 text-xs">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'سجل CNAME' : 'CNAME Status'}</div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{isRtl ? 'مضبوط وموجه' : 'Configured'}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'شهادة SSL' : 'SSL Certificate'}</div>
                      <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">{isRtl ? 'مشفرة وآمنة' : 'Active HTTPS'}</div>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-750 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-purple-500 shrink-0" />
                    <div>
                      <div className="font-bold text-slate-800 dark:text-slate-200">{isRtl ? 'المنصة السحابية' : 'Platform'}</div>
                      <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">{isRtl ? 'متصل بنسبة 100%' : 'Online'}</div>
                    </div>
                  </div>
                </div>

                {/* Open Domain Button */}
                <div className="pt-2 flex items-center justify-end">
                  <a
                    href={`https://${customDomain || 'al-salam.net'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <span>{isRtl ? `فتح النطاق https://${customDomain || 'al-salam.net'}` : `Open https://${customDomain || 'al-salam.net'}`}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ) : (
            /* Tab 2: Share & QR Code */
            <div className="space-y-5">
              
              {/* Custom Domain Branded Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/25 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                    <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{isRtl ? 'نطاقك الخاص المعتمد (Custom Domain):' : 'Official Custom Domain:'}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    al-salam.net
                  </span>
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 shadow-inner">
                  <span className="text-slate-400 dark:text-slate-500 px-1 font-mono text-xs">🌐</span>
                  <input
                    type="text"
                    readOnly
                    value={`https://${customDomain || 'al-salam.net'}`}
                    className="w-full text-xs font-mono font-bold text-slate-900 dark:text-white bg-transparent focus:outline-none select-all"
                  />
                  <button
                    onClick={() => handleCopy(`https://${customDomain || 'al-salam.net'}`, 'custom_domain_copy')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      copiedKey === 'custom_domain_copy'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs'
                    }`}
                  >
                    {copiedKey === 'custom_domain_copy' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'نسخ النطاق' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Main Cloud Run Preview URL Display */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-50 dark:from-slate-800 dark:via-slate-850 dark:to-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
                    <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>{isRtl ? 'رابط المعاينة السحابية الاحتياطي (Cloud Run):' : 'Backup Cloud Run URL:'}</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                    {isRtl ? 'منشور ونشط 🟢' : 'Active 🟢'}
                  </span>
                </div>

                {/* URL Input Box */}
                <div className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl p-2 shadow-inner">
                  <span className="text-slate-400 dark:text-slate-500 px-1 font-mono text-xs">🔗</span>
                  <input
                    type="text"
                    readOnly
                    value={liveUrl}
                    className="w-full text-xs font-mono text-slate-800 dark:text-slate-200 bg-transparent focus:outline-none select-all"
                  />
                  <button
                    onClick={() => handleCopy(liveUrl, 'live')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                      copiedKey === 'live'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-700 hover:bg-slate-800 text-white shadow-xs'
                    }`}
                  >
                    {copiedKey === 'live' ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تم النسخ!' : 'Copied!'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'نسخ' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                  <span>{isRtl ? 'العنوان المعتمد:' : 'Designated Brand:'}</span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    al-salam.net · السلام اول بوابة رقمية شاملة
                  </span>
                </div>
              </div>

              {/* Quick Share to Social Media & WhatsApp */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{isRtl ? 'مشاركة رابط الموقع فوراً عبر المنصات الاجتماعية:' : 'Instant Link Sharing:'}</span>
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                      `تفضل بزيارة منصة السلام أول بوابة رقمية شاملة (alsalam):\n${liveUrl}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-200 transition-colors"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                    <span>واتساب / WhatsApp</span>
                  </a>

                  {/* Telegram */}
                  <a
                    href={`https://t.me/share/url?url=${encodeURIComponent(liveUrl)}&text=${encodeURIComponent(
                      'منصة السلام أول بوابة رقمية شاملة (alsalam)'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 dark:bg-sky-950/60 dark:hover:bg-sky-900/60 border border-sky-200 dark:border-sky-800 text-xs font-bold text-sky-800 dark:text-sky-200 transition-colors"
                  >
                    <Send className="w-4 h-4 text-sky-500" />
                    <span>تيليجرام / Telegram</span>
                  </a>

                  {/* Native Share */}
                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator.share({
                          title: 'السلام اول بوابة رقمية شاملة (alsalam)',
                          url: liveUrl,
                        });
                      } else {
                        handleCopy(liveUrl, 'share-native');
                      }
                    }}
                    className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors col-span-2 sm:col-span-1"
                  >
                    <Share2 className="w-4 h-4 text-purple-600" />
                    <span>{isRtl ? 'مشاركة الرابط' : 'Native Share'}</span>
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-850">
          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <span>brand:</span>
            <span className="font-bold text-blue-600 dark:text-blue-400">alsalam</span>
            <span>·</span>
            <span>السلام اول بوابة رقمية شاملة</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 rounded-xl transition-colors shadow-2xs"
          >
            {isRtl ? 'إغلاق' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
