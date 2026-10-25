import React, { useState } from 'react';
import {
  Briefcase,
  Award,
  Calendar,
  MapPin,
  ExternalLink,
  Printer,
  X,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Cpu,
  ShieldCheck,
  Download,
  Mail,
  CheckCircle2,
} from 'lucide-react';
import { Language, ExperienceItem } from '../types';
import { translations } from '../i18n/translations';
import { INITIAL_EXPERIENCES } from '../data/initialData';

interface ExperienceSectionProps {
  language: Language;
  experiences?: ExperienceItem[];
  onBookAdvisory?: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  language,
  experiences = INITIAL_EXPERIENCES,
  onBookAdvisory,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <section id="experience-section" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{t.experienceHeaderTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.experienceTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {t.experienceSubtitle}
            </p>
          </div>

          {/* Action to View/Print Full English CV */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsResumeModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all"
            >
              <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{t.downloadResumeBtn}</span>
            </button>
            {onBookAdvisory && (
              <button
                onClick={onBookAdvisory}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.bookConsultationFromExp}</span>
              </button>
            )}
          </div>
        </div>

        {/* English Explicit Notice Banner */}
        <div className="mb-10 p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-slate-50 to-indigo-50 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex items-start sm:items-center gap-3.5">
          <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 sm:mt-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div className="flex-1 text-xs">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              {t.experienceEnglishNotice}
            </p>
            <p className="text-slate-500 dark:text-slate-400 mt-0.5">
              Verified track record of Mustafa Al-Hashemi: Principal AI Systems Architect & Founder. All roles, quantified impact metrics, and enterprise credentials documented below in English.
            </p>
          </div>
        </div>

        {/* Executive Highlights Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
            <div className="flex items-center justify-between text-blue-600 dark:text-blue-400 mb-2">
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded font-bold">Experience</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">10+ Years</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Software & Systems Architecture</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 mb-2">
              <Cpu className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">Optimization</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">42% Cost Cut</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Enterprise Cloud & GenAI Tokens</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
            <div className="flex items-center justify-between text-indigo-600 dark:text-indigo-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded font-bold">Reliability</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">99.99% SLA</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Distributed Banking Microservices</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-750">
            <div className="flex items-center justify-between text-amber-600 dark:text-amber-400 mb-2">
              <Award className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded font-bold">Commerce</span>
            </div>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white">1,500+ Payouts</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">Settled Directly via Google Pay</div>
          </div>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all group"
            >
              {/* Top Row: Role, Company, Period */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h3>
                    {exp.badge && (
                      <span className="px-2.5 py-0.5 text-[11px] font-semibold rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                        {exp.badge}
                      </span>
                    )}
                  </div>
                  {exp.roleAr && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                      {exp.roleAr}
                    </p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-300 pt-1">
                    <span className="font-semibold text-slate-900 dark:text-slate-100">{exp.company}</span>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    <Calendar className="w-3.5 h-3.5 text-blue-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>
              </div>

              {/* Description Body in English */}
              <div className="py-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {exp.description}
                </p>
              </div>

              {/* Key Achievements Bullet Points */}
              <div className="space-y-2.5 pt-2">
                <div className="text-xs font-bold text-slate-900 dark:text-slate-200">
                  {t.experienceKeyAchievements}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {exp.keyAchievements.map((ach, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-50/70 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-150 dark:border-slate-800/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="pt-5 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mr-2">
                  {t.experienceTechStack}
                </span>
                {exp.technologies?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-[11px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md border border-slate-200/80 dark:border-slate-750"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Comprehensive Executive Resume / CV Modal (English) */}
      {isResumeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 my-8 overflow-hidden max-h-[90vh] flex flex-col text-left font-sans">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">Executive Curriculum Vitae</h3>
                  <p className="text-[11px] text-slate-400">Mustafa Al-Hashemi · Principal AI & Cloud Systems Architect</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{t.resumePrintBtn}</span>
                </button>
                <button
                  onClick={() => setIsResumeModalOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Resume Printable Content */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-800 dark:text-slate-200 text-sm">
              
              {/* Resume Header */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                      Mustafa Al-Hashemi
                    </h1>
                    <p className="text-base text-blue-600 dark:text-blue-400 font-semibold mt-1">
                      Principal AI Systems Architect & Software Innovator
                    </p>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                    <p className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-500" />
                      <span>iraqlead03@gmail.com</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-500" />
                      <span>Baghdad, Iraq / Global Remote</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                      <span>Google Pay Verified Merchant Account</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    Accomplished software engineer and technical leader with over a decade of track record architecting high-concurrency cloud systems, cutting-edge Generative AI applications (Google Gemini 3.8), and commercially viable digital platforms. Known for disciplined system design, measurable compute cost reductions (42%), zero-downtime microservices migrations, and leading high-performing engineering teams.
                  </p>
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-3">
                  Core Technical Competencies
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">AI & LLM Architecture</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Google GenAI SDK (Gemini 3.8 Flash), Agentic Orchestration, Dynamic Valuation, Structured Schemas, Prompt Optimization.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">Cloud & Infrastructure</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      Google Cloud Platform (GCP), Cloud Run, Docker, Microservices Decomposition, PostgreSQL, Redis, 99.99% SLAs.
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
                    <div className="font-bold text-slate-900 dark:text-white mb-1">Commercial & Full-Stack</div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      React 19, TypeScript, Node.js/Express, Tailwind CSS, Google Pay API, Google AdSense Monetization, B2B Subscriptions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Professional History */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-4">
                  Professional Experience
                </h4>
                <div className="space-y-6">
                  {INITIAL_EXPERIENCES.map((exp) => (
                    <div key={exp.id} className="space-y-2">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs">
                        <div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{exp.role}</span>
                          <span className="text-slate-400 mx-2">|</span>
                          <span className="font-semibold text-slate-700 dark:text-slate-300">{exp.company}</span>
                        </div>
                        <span className="font-mono text-slate-500 dark:text-slate-400 font-medium">{exp.period}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {exp.description}
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 dark:text-slate-300 pl-1">
                        {exp.keyAchievements.map((item, idx) => (
                          <li key={idx} className="leading-relaxed">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-2">
                    Certifications & Accreditations
                  </h4>
                  <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-300">
                    <li>• Google Cloud Certified Professional Cloud Architect</li>
                    <li>• Google Generative AI Engineer Specialization</li>
                    <li>• Verified Google Pay Merchant Payout Partner</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-bold mb-2">
                    Education & Background
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white">B.Sc. in Software Engineering & Computer Systems</span>
                    <br />
                    University of Technology, Baghdad · Graduated with Honors
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Verified Document · Official Record of Mustafa Al-Hashemi
              </span>
              <button
                onClick={() => setIsResumeModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg text-slate-800 dark:text-slate-200 transition-colors"
              >
                {t.resumeCloseBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
