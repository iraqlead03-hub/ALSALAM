import { VideoItem, DiscussionItem, ProductItem, ServiceItem, BookItem, ExperienceItem } from '../types';

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'ماستر كلاس الذكاء الاصطناعي وهندسة الأنظمة التوليدية 2026',
    titleEn: 'Generative AI & Enterprise Systems Masterclass 2026',
    description: 'دليل عملي شامل لبناء تطبيقات المؤسسات باستخدام نماذج Gemini الحديثة، تصميم خطوط الإنتاج والبيانات الموزعة من الصفر.',
    descriptionEn: 'A comprehensive engineering guide to building enterprise applications with modern Gemini models, distributed data pipelines, and function calling.',
    category: 'ai',
    duration: '42:15',
    views: 24850,
    likes: 1940,
    thumbnail: '/src/assets/images/video_ai_showcase_cinema_1792906861222.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishDate: 'قبل يومين',
    publishDateEn: '2 days ago',
    commentsCount: 98,
    keyTopics: ['Gemini 3.8 Flash', 'أنظمة الاستدعاء الموزعة', 'Evals Benchmarking', 'هندسة الأداء'],
    transcript: `مرحباً بكم جميعاً في هذه الجلسة المتقدمة. اليوم نستعرض كيف ننتقل من مجرد استهلاك نماذج الذكاء الاصطناعي إلى بناء معماريات برمجية مرنة وموثوقة مع توفير حماية كاملة للمفاتيح وحوكمة البيانات.`
  },
  {
    id: 'vid-2',
    title: 'كيف تبني منتجاً تقنياً وتبيعه بـ Google Pay من أول شهر؟',
    titleEn: 'How to Build and Monetize Software with Google Pay in Month One',
    description: 'رحلة واقعية من فكرة أولية في مفكرة الهاتف إلى إطلاق برمجية SaaS ناجحة، مع دراسة أخطاء التسعير والتحقق من السوق واستقبال المدفوعات.',
    descriptionEn: 'A hands-on journey from a notepad idea to a profitable SaaS launch, analyzing pricing structures and rapid customer validation with Google Pay.',
    category: 'startup',
    duration: '28:40',
    views: 31200,
    likes: 2890,
    thumbnail: '/src/assets/images/hero_creator_portrait_1792905396397.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishDate: 'قبل 5 أيام',
    publishDateEn: '5 days ago',
    commentsCount: 162,
    keyTopics: ['ريادة الأعمال الذاتية', 'Google Pay Direct Payouts', 'تسعير المنتجات', 'التسويق بالمحتوى'],
    transcript: `الخطأ الأكبر الذي يقع فيه المبرمجون هو قضاء 6 أشهر في كتابة الكود قبل التحدث مع عميل واحد. في هذا المقطع سأشارككم الإطار الخماسي الذي اعتمدته للتحقق من الجدوى واستقبال الدفع المباشر.`
  },
  {
    id: 'vid-3',
    title: 'مقارنة معمارية: متى يجب تفكيك الـ Monolith إلى Microservices؟',
    titleEn: 'Architectural Blueprint: When to Break the Monolith into Microservices',
    description: 'تحليل هندسي عميق للتكاليف الخفية ومشاكل الشبكات والتوافقية عند اختيار النمط المعماري لمشروعك البرمجي.',
    descriptionEn: 'A rigorous cost and latency analysis of distributed architectures vs modular monoliths for production engineering teams.',
    category: 'tech',
    duration: '35:10',
    views: 16800,
    likes: 1120,
    thumbnail: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishDate: 'قبل أسبوعين',
    publishDateEn: '2 weeks ago',
    commentsCount: 78,
    keyTopics: ['هندسة البرمجيات', 'Microservices', 'Distributed Systems', 'Observability'],
    transcript: `لا تبدأ أبداً ببنية Microservices إذا كان فريقك أقل من 10 مهندسين. هذا الفيديو يشرح بالأرقام والمعايير الفنية متى يكون الانتقال مبرراً هندسياً واقتصادياً.`
  },
  {
    id: 'vid-4',
    title: 'بودكاست الابتكار: مستقبل المطورين في عصر الذكاء الاصطناعي التوليدي',
    titleEn: 'Innovation Podcast: The Future of Engineers in the Era of Generative AI',
    description: 'نقاش مفتوح حول المهارات الجوهرية التي ستميز المهندس المحترف عن المبرمج التقليدي خلال السنوات الخمس القادمة.',
    descriptionEn: 'An open dialogue exploring essential competencies differentiating elite architects from legacy code writers over the next 5 years.',
    category: 'podcast',
    duration: '54:30',
    views: 42300,
    likes: 3450,
    thumbnail: '/src/assets/images/hero_creator_portrait_1792905396397.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    publishDate: 'قبل 3 أسابيع',
    publishDateEn: '3 weeks ago',
    commentsCount: 235,
    keyTopics: ['مستقبل العمل', 'التفكير المعماري', 'تطور هندسة الأوامر', 'الأتمتة'],
    transcript: `الكود لم يعد هو العائق أو الميزة التنافسية الوحيدة؛ التحدي الحقيقي انتقل إلى فهم النطاق التجاري، دقة هندسة المتطلبات، وجودة اختبارات التحقق الشاملة.`
  }
];

export const INITIAL_DISCUSSIONS: DiscussionItem[] = [
  {
    id: 'disc-1',
    title: 'لماذا يفشل 80% من مشاريع الذكاء الاصطناعي في الوصول إلى الإنتاج (Production)؟',
    titleEn: 'Why 80% of Enterprise AI Initiatives Fail to Reach Production',
    summary: 'تحليل ميداني للأسباب الجذرية: من وهم النماذج الأولية في Jupyter Notebooks إلى غياب حوكمة البيانات واستقرار واجهات الاستدعاء.',
    summaryEn: 'An empirical diagnosis: moving from toy Jupyter notebook demos to reliable data governance, rigorous eval suites, and bounded latency.',
    publishDate: '22 أكتوبر 2026',
    publishDateEn: 'Oct 22, 2026',
    readTime: '6 دقائق قراءة',
    readTimeEn: '6 min read',
    category: 'الذكاء الاصطناعي',
    categoryEn: 'Artificial Intelligence',
    upvotes: 365,
    views: 5240,
    commentsCount: 46,
    content: `خلال العامين الأخيرين، استثمرت الشركات مئات الآلاف في استكشاف الذكاء الاصطناعي التوليدي، لكن الحقيقة الصادمة أن معظم هذه المشاريع تظل حبيسة مرحلة الـ Proof of Concept (PoC).

### 1. وهم البيئة المعزولة (The Playground Illusion)
النموذج يعمل بكفاءة 95% على 20 عينة اختبارية مختارة بعناية. لكن عندما يواجه 10,000 مستخدم مع لغات عامية، مدخلات غير متوقعة، وهجمات حقن الأوامر (Prompt Injection)، ينهار النموذج.

### 2. غياب معايير الرصد والتقييم (Evals)
في هندسة البرمجيات الكلاسيكية لدينا اختبارات الوحدة (Unit Tests). في أنظمة الذكاء الاصطناعي، نادر ما نجد فرقاً تبني خطوط تقييم مؤتمتة تقيس الدقة، الهلوسة، وزمن الاستجابة مع كل إصدار جديد.

### 3. أسئلة للنقاش معكم:
- ما هو أكبر تحدٍ واجهتموه شخصياً لنقل تطبيق ذكاء اصطناعي إلى بيئة الإنتاج الفعلية؟
- كيف تتعاملون مع تكلفة استدعاء النماذج عند تزايد أعداد الزوار؟`,
    contentEn: `Over the past two years, organizations poured substantial capital into Generative AI experiments. Yet empirical benchmarks reveal that over 80% of these prototypes remain stalled in the PoC phase.

### 1. The Playground Illusion
A model may achieve 95% satisfaction on 20 hand-crafted test prompts. When confronted with real production inputs, dialect variance, and injection attacks, naive pipelines crumble.

### 2. Missing Automated Evaluation Pipelines (Evals)
Classical software engineering relies on continuous integration tests. In AI systems, automated regression evaluations for latency, toxicity, and hallucination rates are rarely integrated into deployment gates.`,
    comments: [
      {
        id: 'c-1',
        author: 'م. أحمد السامرائي',
        avatar: 'أح',
        date: 'أمس الساعة 4:20 م',
        content: 'نقطة تقييم الـ Evals بالغة الأهمية. معظم الفرق تبدأ بدون Benchmark واضح ثم تتفاجأ بتراجع جودة المخرجات عند تعديل الـ System Prompt.',
        likes: 18
      },
      {
        id: 'c-2',
        author: 'Sarah Al-Tamimi',
        avatar: 'ST',
        date: 'Today 10:15 AM',
        content: 'Beyond evals, latency management is pivotal. Enterprise users won\'t tolerate 5-second round trips for operational workflows.',
        likes: 12
      }
    ]
  },
  {
    id: 'disc-2',
    title: 'فلسفة التطوير الفردي (Solopreneurship): بناء إمبراطورية برمجية بفريق من شخص واحد',
    titleEn: 'The Solopreneurship Paradigm: Scaling High-Yield Software as a Solo Engineer',
    summary: 'كيف تتيح أدوات الذكاء الاصطناعي والمنصات السحابية الحديثة لمهندس واحد إنتاج ما كان يحتاج في السابق إلى شركة كاملة.',
    summaryEn: 'How managed cloud infrastructures and LLM accelerators empower single founders to achieve velocity previously requiring whole dev teams.',
    publishDate: '18 أكتوبر 2026',
    publishDateEn: 'Oct 18, 2026',
    readTime: '8 دقائق قراءة',
    readTimeEn: '8 min read',
    category: 'ريادة الأعمال',
    categoryEn: 'Entrepreneurship',
    upvotes: 528,
    views: 7850,
    commentsCount: 64,
    content: `نحن نعيش العصر الذهبي للمبتكر الفردي. ما كان يتطلب 5 مبرمجين ومصمم ومسؤول تسويق ومدير عمليات، يمكن لمؤسس تقني واحد إدارته اليوم بأتمتة ذكية ومحكمة.`
  }
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'حزمة المبتكر التقني الفاخرة (Primus Luxury Creator Toolkit)',
    nameEn: 'Primus Luxury Tech & AI Creator Hardware/Software Toolkit',
    tagline: 'الحقيبة الشاملة المعتمدة هندسياً لبناء وإطلاق مشاريع الذكاء الاصطناعي الاحترافية',
    taglineEn: 'The Ultimate Production Suite & Hardware/Software Architecture Toolkit',
    description: 'تشمل جهاز التحكم الرقمي المدمج، 14 نموذجاً معمارياً بـ Next.js وVite وExpress، مع ربط مباشر بنماذج Gemini، وكتيب هندسة الموجهات المتقدم.',
    descriptionEn: 'Includes the flagship digital controller interface, 14 production starter kits, full Gemini SDK pipelines, and commercial license.',
    price: 89,
    commercialPrice: 249,
    currency: '$',
    category: 'bundle',
    image: '/src/assets/images/product_luxury_tech_kit_1792906861653.jpg',
    features: [
      'سعر محدد ومعتمد شخصياً من قبل مصطفى الهاشمي',
      'دفع فوري عبر Google Pay مع تحويل مباشر لحساب المنشئ',
      '14 قالباً معمارياً مهيأ للإنتاج مع ترخيص تجاري كامل',
      'كتيب Prompt Engineering المتقدم (210 صفحة PDF)',
      'تحديثات مستمرة + وصول دائم لمجتمع المهندسين'
    ],
    featuresEn: [
      'Creator-determined verified price by Mustafa Al-Hashemi',
      'Instant checkout with direct creator Google Pay payout',
      '14 production-grade architectures with full commercial license',
      'Advanced Prompt Engineering Master Guide (210-page PDF)',
      'Lifetime updates + exclusive technical Discord'
    ],
    rating: 4.9,
    reviewsCount: 142,
    salesCount: 520,
    isPopular: true,
    commercialLicenseIncluded: true,
    isCustomCreatorPriced: true
  },
  {
    id: 'prod-2',
    name: 'كتاب "من فكرة برمجية إلى شركة تقنية رابحة"',
    nameEn: 'Handbook: From Code Idea to Profitable Tech Venture',
    tagline: 'دليل عملي مفصل لمهندسي البرمجيات لإطلاق وتسويق منتجاتهم المستقلة',
    taglineEn: 'The Engineer\'s Definitive Guide to Validating, Pricing, and Launching Micro-SaaS',
    description: 'خلاصة 10 سنوات من التجارب والأخطاء والدروس المستفادة في بناء وتوسيع مشاريع الـ Micro-SaaS والمحتوى الرقمي.',
    descriptionEn: 'A decade of battle-tested lessons on bootstrapping software products, financial models, and customer acquisition channels.',
    price: 29,
    commercialPrice: 89,
    currency: '$',
    category: 'ebook',
    image: '/src/assets/images/product_digital_bundle_1792905397194.jpg',
    features: [
      'سعر محدد شخصياً من المنشئ (مع خصم 20% بكود GOOGLE)',
      'تحميل فوري بصيغ PDF وePub وKindle',
      'جداول إكسل لحساب نموذج العمل وتكاليف السحابة',
      'دفع آمن بالكامل عبر Google Pay'
    ],
    featuresEn: [
      'Creator-determined pricing with 20% discount via code GOOGLE',
      'Instant digital download in PDF, ePub, and Kindle',
      'Financial model & cloud hosting budget spreadsheets',
      'Protected 1-tap checkout via Google Pay'
    ],
    rating: 4.8,
    reviewsCount: 98,
    salesCount: 875,
    commercialLicenseIncluded: true,
    isCustomCreatorPriced: true
  },
  {
    id: 'prod-3',
    name: 'نظام إدارة المنتجات والمشاريع التقنية على Notion',
    nameEn: 'Complete Tech Product & Sprint OS on Notion',
    tagline: 'لوحة عمل متكاملة للمؤسسين وفرق التطوير لتنظيم الأهداف وخارطة الطريق',
    taglineEn: 'The Operating System for Agile Roadmaps, ADR Decision Logs & Cloud Budgets',
    description: 'قالب Notion احترافي مصمم خصيصاً للمبرمجين ومديري المنتجات مع تتبع المشاكل، الـ Sprints، وإدارة ميزانية الخدمات السحابية.',
    descriptionEn: 'Turnkey Notion workspace tailored for software teams with backlog triage, architecture decisions (ADR), and cost monitors.',
    price: 39,
    commercialPrice: 119,
    currency: '$',
    category: 'template',
    image: '/src/assets/images/service_consulting_session_1792905397372.jpg',
    features: [
      'سعر محدد من المنشئ مع ترخيص تجاري واستخدام للفرق',
      'لوحة تحكم تفاعلية للمنتجات وخارطة الطريق (Roadmap)',
      'مخزن قرارات المعمارية البرمجية (ADR)',
      'تفعيل فوري بعد إتمام الدفع عبر Google Pay'
    ],
    featuresEn: [
      'Creator-determined pricing with team commercial license',
      'Interactive product roadmap & feature prioritization',
      'Architectural Decision Record (ADR) vault',
      'Instant access link via Google Pay receipt'
    ],
    rating: 5.0,
    reviewsCount: 48,
    salesCount: 315,
    commercialLicenseIncluded: true,
    isCustomCreatorPriced: true
  }
];

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'serv-1',
    title: 'استشارة معمارية الذكاء الاصطناعي التوليدي والنظم العصبية',
    titleEn: 'Generative AI & Neural Engine Architecture Advisory',
    tagline: 'جلسة استشارية متخصصة ومسعرة ديناميكياً بواسطة خوارزميات الذكاء الاصطناعي (Gemini)',
    taglineEn: 'Deep-dive AI systems consultation with real-time dynamic pricing evaluated by Gemini',
    description: 'نقوم بدراسة متطلبات مشروعك، تصميم خطوط الإنتاج، ربط نماذج Gemini وتدريب الوكلاء الذكيين (Agents)، مع تسعير ذكي يحدده الذكاء الاصطناعي تلقائياً بناءً على حجم المشروع.',
    descriptionEn: 'Complete architectural evaluation for your LLM pipeline, agentic flows, and multi-modal integration with dynamic market-calibrated AI pricing.',
    price: 340,
    pricingType: 'per_session',
    duration: '90 دقيقة عبر Google Meet',
    durationEn: '90 min via Google Meet',
    image: '/src/assets/images/service_ai_neural_engine_1792906859665.jpg',
    targetAudience: 'الشركات الناشئة والمؤسسات الباحثة عن حلول ذكاء اصطناعي إنتاجية',
    targetAudienceEn: 'Startups & Enterprises Deploying Production AI Systems',
    deliverables: [
      'تسعير ذكي ديناميكي تم احتسابه بواسطة نموذج Gemini 3.8 Flash',
      'تصميم مخطط المعمارية البرمجية وخارطة الربط بالواجهات السحابية',
      'شراء وحجز مباشر مع دفع آمن عبر Google Pay لحساب المنشئ',
      'اتفاقية سرية متبادلة (NDA) وتسجيل كامل للجلسة'
    ],
    deliverablesEn: [
      'Dynamic pricing intelligently calculated by Gemini 3.8 Flash',
      'Architectural blueprint & cloud pipeline specifications',
      'Direct purchase & booking with Google Pay payment to creator',
      'Mutual Non-Disclosure Agreement (NDA) + full video recording'
    ],
    isFeatured: true,
    ndaIncluded: true,
    isAiPriced: true,
    aiPricingRationale: 'تم احتساب السعر بـ $340 بواسطة Gemini: يتضمن 90 دقيقة من الاستشارة المعمارية العميقة، تدقيق 4 خطوط بيانات، ومراجعة أمان المفاتيح بنسبة ثقة 96%.',
    aiPricingRationaleEn: 'Priced dynamically at $340 by Gemini: covers 90 min of advanced architecture design, data pipeline audit, and security review with 96% confidence score.',
    aiConfidence: 0.96
  },
  {
    id: 'serv-2',
    title: 'جلسة استشارية وتوجيه استراتيجي 1:1',
    titleEn: 'Executive 1:1 Strategic Tech & Architecture Advisory',
    tagline: 'جلسة حوارية مكثفة (60 دقيقة) لحل معضلات مشروعك المعمارية والتجارية',
    taglineEn: 'Intensive 60-minute diagnostic session for founders, CTOs, and tech leaders',
    description: 'مخصصة للمؤسسين، قادة الفرق، وكبار المهندسين لمراجعة قرارات المعمارية، جدوى تبني الذكاء الاصطناعي، أو استراتيجيات إطلاق المنتج.',
    descriptionEn: 'Tailored for tech founders and engineering directors to review system blueprints, generative AI feasibility, and market launch strategy.',
    price: 199,
    pricingType: 'per_session',
    duration: '60 دقيقة عبر Google Meet',
    durationEn: '60 min via Google Meet',
    image: '/src/assets/images/service_consulting_session_1792905397372.jpg',
    targetAudience: 'المؤسسون، رؤساء التقنية (CTOs)، ورواد الأعمال التقنيون',
    targetAudienceEn: 'Founders, CTOs, and Enterprise Engineering Leads',
    deliverables: [
      'تشخيص شامل للوضع الحالي والتحديات الفنية',
      'توصيات معمارية مكتوبة وخارطة طريق تنفيذية',
      'دفع وشراء مباشر بضغطة واحدة عبر Google Pay',
      'متابعة بريدية لمدة 7 أيام للرد على الاستفسارات الملحقة'
    ],
    deliverablesEn: [
      'Comprehensive system diagnostic & bottleneck assessment',
      'Written architectural roadmap with clear priorities',
      'Direct 1-tap booking & purchase via Google Pay',
      '7-day async email follow-up for implementation queries'
    ],
    ndaIncluded: true,
    isAiPriced: false
  },
  {
    id: 'serv-3',
    title: 'مراجعة المعمارية البرمجية وتدقيق الأداء السحابي',
    titleEn: 'Software Architecture & Cloud Performance Audit',
    tagline: 'فحص شامل لشيفرتك البرمجية وبنيتك التحتية السحابية مع تسعير محسوب بالذكاء الاصطناعي',
    taglineEn: 'Comprehensive codebase and infrastructure audit with dynamic AI scope pricing',
    description: 'ندرس كود تطبيقك وقواعد البيانات ومصادر الاختناق، ونحدد خطة خفض تكلفة السحابة بنسبة تصل إلى 40%، مع تقدير أتعاب التدقيق عبر الذكاء الاصطناعي.',
    descriptionEn: 'Rigorous engineering audit of codebase and cloud infrastructure to eliminate latency and optimize costs with AI-calculated project fees.',
    price: 780,
    pricingType: 'project',
    duration: 'إنجاز خلال 5 أيام عمل',
    durationEn: 'Delivered in 5 business days',
    image: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
    targetAudience: 'الشركات الناشئة في طور التوسع والأنظمة البرمجية النشطة',
    targetAudienceEn: 'Scaling Tech Startups & High-Traffic Web Platforms',
    deliverables: [
      'تقرير تدقيق فني مفصل يتجاوز 25 صفحة',
      'تحليل مؤشرات الاختناق (Bottlenecks) في قواعد البيانات',
      'دفع رسمي مؤمّن ومفوتر عبر Google Pay',
      'جلسة تسليم تفاعلية لمدة 90 دقيقة مع فريقك الهندسي'
    ],
    deliverablesEn: [
      '25+ page detailed technical audit & security assessment',
      'Database query performance & bottleneck telemetry',
      'Secure corporate Google Pay checkout with tax receipt',
      '90-minute debrief and handover session with your team'
    ],
    ndaIncluded: true,
    isAiPriced: true,
    aiPricingRationale: 'تم احتساب السعر بـ $780 بواسطة خوارزمية Gemini: يشمل فحص 15,000 سطر برمجي، تدقيق استعلامات SQL، واقتراح تخفيض تكاليف السحابة.',
    aiPricingRationaleEn: 'Priced dynamically at $780 by Gemini: accounts for 15k LOC inspection, query optimization, and guaranteed cloud cost-saving plan.',
    aiConfidence: 0.94
  }
];

export const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Principal AI Systems Architect & Founder',
    roleAr: 'كبير مهندسي أنظمة الذكاء الاصطناعي والمؤسس',
    company: 'Autonomous AI Systems & Studio',
    period: '2022 – Present',
    location: 'Baghdad, Iraq / Global Remote',
    badge: 'Current Leadership',
    description: 'Directing the architecture, research, and production deployment of enterprise Generative AI systems, multi-agent frameworks, and B2B software solutions powered by Google Gemini.',
    keyAchievements: [
      'Architected and deployed high-throughput LLM pipelines handling thousands of daily queries with sub-second latency.',
      'Slashed enterprise cloud compute and API token billing by 42% through structured schema enforcement and automated regression evals.',
      'Designed and distributed commercial developer toolkits and digital blueprints generating 1,500+ verified customer transactions via Google Pay.',
      'Delivered strategic technical advisory to 25+ technology startups and corporate software departments across the Middle East.'
    ],
    technologies: ['Google Gemini 3.8', 'TypeScript', 'Node.js', 'Google Cloud Platform', 'Express', 'React 19', 'Evals Benchmarking']
  },
  {
    id: 'exp-2',
    role: 'Senior Cloud Infrastructure & Distributed Systems Lead',
    roleAr: 'قائد البنية التحتية السحابية والأنظمة الموزعة',
    company: 'Apex Cloud & Enterprise Solutions',
    period: '2018 – 2022',
    location: 'Regional Hub',
    badge: 'Enterprise Architecture',
    description: 'Spearheaded the technical transformation and cloud decomposition of mission-critical monolithic banking and payment services into resilient microservices.',
    keyAchievements: [
      'Led the zero-downtime migration of high-volume financial services to Google Cloud Platform with 99.99% SLA availability.',
      'Eliminated critical database bottlenecks, reducing p99 API query response times from 1.8s down to 140ms.',
      'Established organization-wide Architectural Decision Record (ADR) governance and continuous security auditing protocols.',
      'Mentored and guided 18 software and DevOps engineers in distributed systems design and automated observability.'
    ],
    technologies: ['Microservices', 'PostgreSQL', 'Docker', 'GCP Cloud Run', 'Redis', 'CI/CD Pipelines', 'Distributed Tracing']
  },
  {
    id: 'exp-3',
    role: 'Full-Stack Software Consultant & Technical Content Creator',
    roleAr: 'مستشار تطوير برمجي شامل وصانع محتوى تقني',
    company: 'TechSphere Labs & Media',
    period: '2015 – 2018',
    location: 'Baghdad, Iraq',
    badge: 'Bootstrapping & Content',
    description: 'Built custom B2B web applications, bootstrapped digital tools, and created comprehensive educational content that established a community of 120,000+ technology followers.',
    keyAchievements: [
      'Produced over 45 cinematic technical video masterclasses and in-depth software architectural essays.',
      'Authored bestselling engineering playbooks and digital starter packs downloaded by thousands of developers.',
      'Built custom e-commerce payment integrations with automated invoice generation and digital fulfillment.',
      'Consulted for regional businesses transitioning from legacy manual systems to automated web workflows.'
    ],
    technologies: ['React', 'JavaScript (ESNext)', 'Tailwind CSS', 'RESTful APIs', 'Google Pay Integration', 'Content Strategy']
  }
];

export const INITIAL_BOOKS: BookItem[] = [
  // Ja'fari Shia Jurisprudence & Studies
  {
    id: 'book-shia-1',
    title: 'نهج البلاغة: دراسة تحليلية في الحكمة والعدالة والحكم الرشيد',
    titleEn: 'Nahj al-Balagha: Philosophical Analysis of Governance & Justice',
    author: 'الإمام علي بن أبي طالب (تحقيق ودراسة معاصرة)',
    authorEn: 'Imam Ali ibn Abi Talib (Contemporary Analytical Edition)',
    category: 'shia_islam',
    language: 'both',
    price: 34,
    currency: '$',
    coverImage: '/src/assets/images/product_digital_bundle_1792905397194.jpg',
    pages: 620,
    year: '2025',
    description: 'طبعة محققة وموثقة تجمع خطب وكتب وحكم نهج البلاغة مع شروح معمقة في فلسفة الحكم الرشيد، حقوق الرعية، والتوازن الاقتصادي والاجتماعي في الفكر الجعفري.',
    descriptionEn: 'A definitive critical edition examining the political philosophy, ethical treatises, and socioeconomic justice principles articulated in Nahj al-Balagha.',
    keyTopics: ['أصول الحكم الرشيد', 'العدالة الاجتماعية', 'رسالة الإمام لمالك الأشتر', 'فلسفة التوحيد والأخلاق'],
    keyTopicsEn: ['Governance & Statecraft', 'Social Justice', 'Letter to Malik al-Ashtar', 'Theology & Ethics'],
    previewExcerpt: `«واعْلَمْ أَنَّ الرَّعِيَّةَ طَبَقَاتٌ لا يَصْلُحُ بَعْضُهَا إِلَّا بِبَعْضٍ، ولا غِنَى بِبَعْضِهَا عَنْ بَعْضٍ... فَأَعْطِهِمْ مِنْ عَفْوِكَ وصَفْحِكَ مِثْلَ الَّذِي تُحِبُّ وتَرْضَى أَنْ يُعْطِيَكَ اللَّهُ مِنْ عَفْوِهِ وصَفْحِهِ، فَإِنَّكَ فَوْقَهُمْ، وَوَالِي الأَمْرِ عَلَيْكَ فَوْقَكَ، واللَّهُ فَوْقَ مَنْ وَلَّاكَ!» — من عهد الإمام لمالك الأشتر.`,
    previewExcerptEn: 'Know, O Malik, that the subjects comprise diverse classes; none can thrive without the mutual sustenance of the other... Accord them your leniency and forbearance just as you yearn for God to bestow His forgiveness upon you.',
    tableOfContents: [
      'المبحث الأول: معالم الحكمة والتوحيد في خطب الإمام',
      'المبحث الثاني: عهد مالك الأشتر ودستور إدارة الدولة',
      'المبحث الثالث: الفلسفة الاقتصادية وتوزيع الثروات',
      'المبحث الرابع: منهج الإمام في القضاء وفصل الخصومات'
    ],
    tableOfContentsEn: [
      'Section 1: Theological Principles in the Discourses',
      'Section 2: The Treaty with Malik al-Ashtar & Public Administration',
      'Section 3: Economic Equilibrium & Resource Allocation',
      'Section 4: Judicial Integrity & Dispute Resolution'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تم التقييم الذكي بـ $34 بواسطة Gemini 3.8: نظراً لقيمة التحقيق الأكاديمي المقارن (620 صفحة)، وتوافر نسختي PDF وePub التفاعلية بدقة عالية.',
    aiPricingRationaleEn: 'Dynamically valued at $34 by Gemini: reflects extensive 620-page critical scholarly commentary and dual interactive EPUB/PDF licensing.',
    rating: 4.95,
    salesCount: 680,
    format: 'PDF + EPUB',
    fileSize: '18.4 MB'
  },
  {
    id: 'book-shia-2',
    title: 'أصول الكافي: المدخل التحليلي الشامل في العقائد والأخلاق',
    titleEn: 'Al-Kafi: Foundations of Doctrine, Reason & Ethics',
    author: 'الشيخ محمد بن يعقوب الكليني (دراسة منهجية)',
    authorEn: 'Al-Shaykh al-Kulayni (Modern Methodological Study)',
    category: 'shia_islam',
    language: 'ar',
    price: 38,
    currency: '$',
    coverImage: '/src/assets/images/service_consulting_session_1792905397372.jpg',
    pages: 580,
    year: '2024',
    description: 'أهم ركيزة حديثية في الفقه والعقائد الجعفرية، مع دراسة تمهيدية مفصلة حول كتاب العقل والجهل، كتاب فضل العلم، وتوثيق الأسانيد ومصطلحات الرجال.',
    descriptionEn: 'The preeminent classical repository of Ja\'fari traditions, featuring an exhaustive analytical introduction on reason (aql), epistemology, and chain corroboration.',
    keyTopics: ['كتاب العقل والجهل', 'فلسفة المعرفة ونظرية العلم', 'كتاب الحجة والولاية', 'الإيمان والكفر'],
    keyTopicsEn: ['Intellect & Ignorance', 'Epistemology of Knowledge', 'The Proof & Spiritual Leadership', 'Faith & Ethics'],
    previewExcerpt: `«إن الله جعل العقل حجة باطنة والرسل حجة ظاهرة... فبالعقل استخرجت العلوم، وبالعقل عُرفت مكارم الأخلاق وكمالات النفوس.»`,
    tableOfContents: [
      'الباب الأول: مكانة العقل والبرهان في المدرسة الجعفرية',
      'الباب الثاني: كتاب التوحيد ونفي التشبيه',
      'الباب الثالث: كتاب الحجة وفلسفة الإمامة',
      'الباب الرابع: أصول الأخلاق ومعارج تزكية النفس'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تقييم الذكاء الاصطناعي: $38 بناءً على عمق التبويب الحديثي، شروح الأحاديث المعقدة، وجداول أسانيد الرواة الرقمية المرفقة.',
    aiPricingRationaleEn: 'AI Valuation: $38 based on comprehensive biographical indexation, chain-of-narration diagrams, and verified manuscript fidelity.',
    rating: 4.9,
    salesCount: 512,
    format: 'PDF + EPUB',
    fileSize: '24.1 MB'
  },
  {
    id: 'book-shia-3',
    title: 'فلسفة التشريع وأصول الفقه الجعفري المعاصر',
    titleEn: 'Philosophy of Contemporary Ja\'fari Jurisprudence',
    author: 'د. صادق الحسيني الموسوي',
    authorEn: 'Dr. Sadiq Al-Husseini Al-Mousawi',
    category: 'shia_islam',
    language: 'both',
    price: 29,
    currency: '$',
    coverImage: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
    pages: 430,
    year: '2025',
    description: 'دراسة فقهية أصولية تربط بين مناهج الاستنباط الجعفرية الكلاسيكية والنوازل المعاصرة (المعاملات الرقمية، الذكاء الاصطناعي، والعلوم الطبية الحديثة).',
    descriptionEn: 'A contemporary treatise bridging classical Ja\'fari legal methodology (usul al-fiqh) with modern dilemmas including digital assets, artificial intelligence, and bioethics.',
    keyTopics: ['الاجتهاد ومواكبة العصر', 'أصالة البراءة والاستصحاب', 'أحكام التقنيات الناشئة', 'فقه المستحدثات الطبية'],
    keyTopicsEn: ['Contemporary Ijtihad', 'Procedural Principles', 'Emerging Tech Jurisprudence', 'Bioethics & Law'],
    previewExcerpt: `«الاجتهاد في المدرسة الجعفرية عملية حركية متجددة، لا تتوقف عند حدود الزمان، بل تستنطق القواعد الكلية لتشمل المعاملات الحديثة والابتكارات الرقمية.»`,
    tableOfContents: [
      'الفصل 1: المدارس الأصولية ومسارات تطور الاجتهاد',
      'الفصل 2: حجية الدليل العقلي ودوره في المسائل المستحدثة',
      'الفصل 3: فقه العقود الرقمية والذكاء الاصطناعي',
      'الفصل 4: القواعد الفقهية الحاكمة في النظام المعاشي'
    ],
    isAiPriced: true,
    aiPricingRationale: 'سعر محدد بـ $29 بواسطة Gemini: تصنيف تخصصي متقدم يجمع الفقه الإسلامي الرصين مع التطبيقات المعاصرة للتقنية.',
    aiPricingRationaleEn: 'Valued dynamically at $29: specialized synthesis connecting legal jurisprudence with modern fintech and bioethics.',
    rating: 4.88,
    salesCount: 390,
    format: 'PDF',
    fileSize: '12.8 MB'
  },

  // Sunni Jurisprudence & Islamic Thought
  {
    id: 'book-sunni-1',
    title: 'صحيح الإمام البخاري: دراسة نقدية ومنهجية في أصول الحديث',
    titleEn: 'Sahih al-Bukhari: Critical Methodology & Hadith Hermeneutics',
    author: 'الإمام محمد بن إسماعيل البخاري (دراسة وتحقيق فني)',
    authorEn: 'Imam Muhammad al-Bukhari (Critical Scientific Edition)',
    category: 'sunni_islam',
    language: 'both',
    price: 36,
    currency: '$',
    coverImage: '/src/assets/images/product_luxury_tech_kit_1792906861653.jpg',
    pages: 740,
    year: '2025',
    description: 'المرجع الجامع لأحاديث النبي ﷺ في الفكر السني، مشفوعاً بمدخل منهجي حول معايير البخاري الصارمة في نقد الرجال والاتصال والإعلال وضبط الرواية.',
    descriptionEn: 'The foundational Sunni hadith corpus presented with rigorous academic commentary detailing al-Bukhari’s verification metrics, chain continuity, and thematic chaptering.',
    keyTopics: ['شروط الصحة وضبط الرواية', 'منهج التبويب والاستنباط', 'أحاديث المعاملات والبيوع', 'الإيمان والعلم'],
    keyTopicsEn: ['Criteria of Authenticity', 'Thematic Jurisprudence', 'Trade & Transaction Hadiths', 'Faith & Knowledge'],
    previewExcerpt: `«باب كيف كان بدء الوحي إلى رسول الله ﷺ: قال عمر بن الخطاب: سمعت رسول الله ﷺ يقول: إنما الأعمال بالنيات، وإنما لكل امرئ ما نوى...»`,
    tableOfContents: [
      'مقدمة في شروط الإمام البخاري ومنهجه في الجامع المسند',
      'كتاب الإيمان وبناء العقيدة',
      'كتاب العلم ومسؤولية الباحث وطالب المعرفة',
      'كتاب البيوع والأحكام المالية وأخلاقيات السوق'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تسعير ذكي بـ $36 عبر Gemini 3.8: مجلد شامل يضم 740 صفحة محققة مع فهارس موضوعية للمتون ومقارنة نسخ المخطوطات.',
    aiPricingRationaleEn: 'Calculated at $36 by Gemini: comprehensive 740-page edition with cross-referenced indices and text variations.',
    rating: 4.97,
    salesCount: 840,
    format: 'PDF + EPUB',
    fileSize: '28.5 MB'
  },
  {
    id: 'book-sunni-2',
    title: 'إحياء علوم الدين للإمام أبي حامد الغزالي',
    titleEn: 'The Revival of the Religious Sciences (Ihya Ulum al-Din)',
    author: 'حجة الإسلام الإمام أبو حامد الغزالي',
    authorEn: 'Imam Abu Hamid Al-Ghazali (Annotated Academic Text)',
    category: 'sunni_islam',
    language: 'both',
    price: 32,
    currency: '$',
    coverImage: '/src/assets/images/service_ai_neural_engine_1792906859665.jpg',
    pages: 610,
    year: '2024',
    description: 'المصنف الأبرز في تزكية النفس وأخلاق المعاملات والجمع بين الفقه الظاهر وحقائق الباطن، مع تهذيب علمي وتحقيق في التراث المشترك بين كافة المذاهب الإسلامية.',
    descriptionEn: 'Al-Ghazali’s magnum opus harmonizing Islamic legal jurisprudence with inward ethical transformation, spiritual psychology, and societal equilibrium.',
    keyTopics: ['كتاب العلم وآفات الغرور', 'أسرار المعاملات اليومية', 'المهلكات والمنجيات', 'أخلاق العمل والاجتهاد'],
    keyTopicsEn: ['Epistemology of Sciences', 'Ethics of Daily Livelihood', 'Psychology of Virtues', 'Workplace Integrity'],
    previewExcerpt: `«إن العلم بلا عمل جنون، وإن العمل بغير علم لا يكون... واعلم أن اللسان ترجمان القلب، فمتى استقام القلب استقامت الجوارح.»`,
    tableOfContents: [
      'الربع الأول: ربع العبادات وأسرار الطاعات',
      'الربع الثاني: ربع العادات وآداب المعيشة وأخلاق التجارة',
      'الربع الثالث: ربع المهلكات وأمراض القلوب وكيفية علاجها',
      'الربع الرابع: ربع المنجيات واليقين والتوبة والإخلاص'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تسعير ذكي بـ $32 بواسطة Gemini: نظراً لشعبية الكتاب العالمية، ووجود هوامش توضيحية لغوية وفلسفية للمفاهيم الدقيقة.',
    aiPricingRationaleEn: 'AI Evaluated at $32: premium annotated edition with philosophical glossary and universal spiritual frameworks.',
    rating: 4.92,
    salesCount: 620,
    format: 'PDF + EPUB',
    fileSize: '19.2 MB'
  },

  // Electrical Engineering in Arabic & English (Priority 1 in Science)
  {
    id: 'book-elec-1',
    title: 'تحليل نظم القدرة الكهربائية واستقرار الشبكات الذكية الحديثة',
    titleEn: 'Electrical Power Systems Analysis & Modern Smart Grid Stability',
    author: 'د. مصطفى الهاشمي و أ.د. ريتشارد ميلر',
    authorEn: 'Dr. Mustafa Al-Hashemi & Prof. Richard Miller',
    category: 'electrical_eng',
    language: 'both',
    price: 49,
    currency: '$',
    coverImage: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
    pages: 540,
    year: '2026',
    description: 'مرجع هندسي رصيد باللغتين العربية والإنكليزية يغطي تدفق الأحمال (Load Flow Analysis)، دراسات القصر الكهربائي (Short Circuit Studies)، واستقرار شبكات التوزيع الحديثة المدعومة بالطاقة المتجددة وخوارزميات التحكم الذكي.',
    descriptionEn: 'Comprehensive dual-language textbook and industry handbook covering load flow calculations, fault analysis, renewable integration, FACTS devices, and smart grid automation protocols.',
    keyTopics: ['Newton-Raphson Load Flow', 'تحليل الأعطال غير المتماثلة', 'Dynamic Frequency Control', 'SCADA & PMU Networks'],
    keyTopicsEn: ['Newton-Raphson & Fast Decoupled Load Flow', 'Symmetrical Components & Faults', 'Transient Stability', 'Smart Grid SCADA & Phasor Measurement'],
    previewExcerpt: `«In modern interconnected power grids, transient stability is governed by the swing equation: J (d²θ/dt²) = T_m - T_e. When dynamic disturbances occur, rapid fault clearing and automated excitation control are vital to prevent synchronous generator tripping.»`,
    previewExcerptEn: 'In modern interconnected power grids, transient stability is governed by the swing equation: J (d²θ/dt²) = T_m - T_e. Rapid fault isolation and automated excitation control are vital to prevent system blackouts.',
    tableOfContents: [
      'Chapter 1: Mathematical Foundations of AC Power Transmission',
      'Chapter 2: Symmetrical Components & Unbalanced Fault Analysis',
      'Chapter 3: Power Flow Studies (Gauss-Seidel & Newton-Raphson)',
      'Chapter 4: Transient & Steady-State Grid Stability',
      'Chapter 5: Renewable Integration (Solar PV & Wind Turbine Dynamics)',
      'Chapter 6: Smart Grid Telemetry, Substation Automation & Microgrids'
    ],
    tableOfContentsEn: [
      'Chapter 1: Mathematical Foundations of AC Power Transmission',
      'Chapter 2: Symmetrical Components & Unbalanced Fault Analysis',
      'Chapter 3: Power Flow Studies (Gauss-Seidel & Newton-Raphson)',
      'Chapter 4: Transient & Steady-State Grid Stability',
      'Chapter 5: Renewable Integration (Solar PV & Wind Turbine Dynamics)',
      'Chapter 6: Smart Grid Telemetry, Substation Automation & Microgrids'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تقييم الذكاء الاصطناعي: $49 بواسطة Gemini 3.8. يتضمن كود محاكاة MATLAB/Python مفتوح المصدر لـ 14 شبكة نموذجية IEEE، مع ترخيص مهني كامل.',
    aiPricingRationaleEn: 'Priced dynamically at $49 by Gemini: includes open-source MATLAB/Python simulation scripts for IEEE 14/30 bus test systems.',
    rating: 4.96,
    salesCount: 790,
    format: 'PDF + EPUB',
    fileSize: '32.4 MB'
  },
  {
    id: 'book-elec-2',
    title: 'مبادئ الآلات الكهربائية والمحولات ونظم القيادة الصناعية',
    titleEn: 'Principles of Electric Machines, Transformers & Industrial Drives',
    author: 'م. حيدر المعماري و د. ستيفن كرانستون',
    authorEn: 'Eng. Haider Al-Miamari & Dr. Stephen Cranston',
    category: 'electrical_eng',
    language: 'both',
    price: 42,
    currency: '$',
    coverImage: '/src/assets/images/product_luxury_tech_kit_1792906861653.jpg',
    pages: 480,
    year: '2025',
    description: 'دليل هندسي تطبيقي بالعربية والإنكليزية يشرح محولات القدرة ثلاثية الطور، محركات الحث (Induction Motors)، المحركات المتزامنة (Synchronous Motors)، وعاكسات التردد المتغير (VFD) المستخدمة في المصانع الكبرى.',
    descriptionEn: 'Applied engineering guide covering 3-phase power transformers, induction machines, permanent magnet synchronous motors (PMSM), and variable frequency drives (VFD).',
    keyTopics: ['محولات القدرة ونظم التبريد', 'Induction Motor Torque-Speed Curves', 'Vector Control & Field Orientation', 'حماية المحركات والقواطع'],
    keyTopicsEn: ['Three-Phase Transformer Modeling', 'Induction Motor Torque-Speed Characteristics', 'VFD & Field Oriented Control (FOC)', 'Motor Thermal & Short-Circuit Protection'],
    previewExcerpt: `«The efficiency of industrial 3-phase induction motors under field-oriented control (FOC) depends on decoupling flux-producing current i_ds from torque-producing current i_qs. This enables DC machine-like dynamic response with brushless reliability.»`,
    previewExcerptEn: 'Field-oriented control (FOC) enables independent control of electromagnetic flux and torque in induction motors, mimicking DC machine dynamics with maintenance-free brushless architecture.',
    tableOfContents: [
      '1. المغناطيسية والدوائر المغناطيسية المكافئة (Magnetic Circuits)',
      '2. المحولات أحادية وثلاثية الأطوار وفحص اللاحمل والقصر',
      '3. محركات الحث وتحليل انزلاق الدوار (Rotor Slip Analysis)',
      '4. المولدات والمحركات المتزامنة في محطات التوليد',
      '5. إلكترونيات القدرة ونظم تشغيل السرعة المتغيرة (Inverters & Drives)'
    ],
    tableOfContentsEn: [
      '1. Principles of Electromagnetism & Core Loss',
      '2. Single & Three-Phase Transformers (OC and SC Testing)',
      '3. Induction Machines: Slip, Torque & Equivalent Circuits',
      '4. Synchronous Generators in Utility Generation Stations',
      '5. Power Electronics Drives: Inverters, PWM & Soft Starters'
    ],
    isAiPriced: true,
    aiPricingRationale: 'سعر محدد بـ $42 بواسطة Gemini: دليل مرجعي للمهندسين الميدانيين يتضمن مخططات توصيل صناعية ومعادلات تصميم المحولات.',
    aiPricingRationaleEn: 'AI Calculated at $42: verified field handbook featuring wiring schematics, transformer winding sizing, and industrial protection standards.',
    rating: 4.89,
    salesCount: 460,
    format: 'PDF',
    fileSize: '21.0 MB'
  },
  {
    id: 'book-elec-3',
    title: 'إلكترونيات القدرة الحديثة وتطبيقات الطاقة الكهروضوئية والرياح',
    titleEn: 'Modern Power Electronics for Solar PV & Wind Energy Systems',
    author: 'Prof. David Vance & Dr. Tariq Al-Jubouri',
    authorEn: 'Prof. David Vance & Dr. Tariq Al-Jubouri',
    category: 'electrical_eng',
    language: 'en',
    price: 45,
    currency: '$',
    coverImage: '/src/assets/images/video_ai_showcase_cinema_1792906861222.jpg',
    pages: 512,
    year: '2025',
    description: 'Advanced English textbook dissecting DC-DC boost converters, bidirectional buck-boost topologies, MPPT algorithms, grid-tied 3-phase inverters, and battery energy storage management (BESS).',
    descriptionEn: 'Advanced English textbook dissecting DC-DC boost converters, bidirectional buck-boost topologies, MPPT algorithms, grid-tied 3-phase inverters, and battery energy storage management (BESS).',
    keyTopics: ['Perturb & Observe MPPT', 'Total Harmonic Distortion (THD) Mitigation', 'SiC and GaN MOSFET Semiconductors', 'Grid-Tie Inverter Synchronization (PLL)'],
    keyTopicsEn: ['Perturb & Observe MPPT', 'Total Harmonic Distortion (THD) Mitigation', 'SiC and GaN MOSFET Semiconductors', 'Grid-Tie Inverter Synchronization (PLL)'],
    previewExcerpt: `«Wide-bandgap semiconductors based on Silicon Carbide (SiC) and Gallium Nitride (GaN) allow switching frequencies exceeding 100 kHz with minimal thermal losses, shrinking magnetic filter components by up to 60% in utility solar inverters.»`,
    previewExcerptEn: 'Wide-bandgap semiconductors based on SiC and GaN allow switching frequencies exceeding 100 kHz with minimal thermal losses, dramatically shrinking inverter weight and footprint.',
    tableOfContents: [
      '1. Semiconductor Physics of Modern Power Devices (IGBT, SiC, GaN)',
      '2. DC-DC Converter Topologies for Maximum Power Point Tracking (MPPT)',
      '3. High-Efficiency Grid-Tied Inverters & LCL Filter Design',
      '4. Islanding Detection & IEEE 1547 Interconnection Standards',
      '5. Battery Management Systems (BMS) for Large-Scale Energy Storage'
    ],
    tableOfContentsEn: [
      '1. Semiconductor Physics of Modern Power Devices (IGBT, SiC, GaN)',
      '2. DC-DC Converter Topologies for Maximum Power Point Tracking (MPPT)',
      '3. High-Efficiency Grid-Tied Inverters & LCL Filter Design',
      '4. Islanding Detection & IEEE 1547 Interconnection Standards',
      '5. Battery Management Systems (BMS) for Large-Scale Energy Storage'
    ],
    isAiPriced: true,
    aiPricingRationale: 'Priced dynamically at $45 by Gemini 3.8: high academic value, IEEE-compliant circuit designs, and renewable converter models.',
    aiPricingRationaleEn: 'Priced dynamically at $45 by Gemini 3.8: high academic value, IEEE-compliant circuit designs, and renewable converter models.',
    rating: 4.93,
    salesCount: 380,
    format: 'PDF + EPUB',
    fileSize: '26.8 MB'
  },

  // AI & Computer Science
  {
    id: 'book-ai-1',
    title: 'معمارية الذكاء الاصطناعي التوليدي والنماذج اللغوية الضخمة',
    titleEn: 'Generative AI Architecture: Building Large Neural Systems',
    author: 'مصطفى الهاشمي (مهندس نظم الذكاء الاصطناعي)',
    authorEn: 'Mustafa Al-Hashemi (Principal AI Architect)',
    category: 'ai_tech',
    language: 'both',
    price: 39,
    currency: '$',
    coverImage: '/src/assets/images/hero_creator_portrait_1792905396397.jpg',
    pages: 410,
    year: '2026',
    description: 'الدليل الهندسي المعاصر لكيفية بناء تطبيقات الذكاء الاصطناعي التوليدي والوكلاء الأذكياء (Autonomous Agents) باستخدام نماذج Gemini ومكتبات TypeScript، مع أساليب الاختبار وضبط الهلوسة وخفض التكلفة بنسبة 40%.',
    descriptionEn: 'The definitive architectural guide to building multi-agent AI ecosystems with Gemini APIs, structured outputs, real-time tool calling, and deterministic eval pipelines.',
    keyTopics: ['Transformer Attention Mechanisms', 'Gemini Function Calling', 'Autonomous Multi-Agent Orchestration', 'Automated Evals & Token Cost Optimization'],
    keyTopicsEn: ['Transformer Attention Mechanisms', 'Gemini Function Calling', 'Autonomous Multi-Agent Orchestration', 'Automated Evals & Token Cost Optimization'],
    previewExcerpt: `«الذكاء الاصطناعي في بيئة الإنتاج ليس مجرد استدعاء API، بل هو تصميم معماري محكم يتضمن حوكمة البيانات، تقليل زمن الاستجابة إلى ما دون 800ms، وبناء خطوط Evals تختبر ملايين الاحتمالات تلقائياً.»`,
    previewExcerptEn: 'Production AI is never just an API call; it is a resilient system architecture balancing bounded latency, context caching, and regression test suites.',
    tableOfContents: [
      'الباب 1: أسس نماذج التحويل (Transformers) وتدفق الانتباه',
      'الباب 2: تصميم خطوط الاستدعاء وتأمين المفاتيح في الإنتاج',
      'الباب 3: بناء الوكلاء المستقلين (Multi-Agent Swarms)',
      'الباب 4: معايير الرصد والتقييم (Evals) وخفض تكلفة الرموز'
    ],
    tableOfContentsEn: [
      'Part 1: Attention Mechanics & Token Generation Pipelines',
      'Part 2: Production Function Calling & Schema Enforcement',
      'Part 3: Autonomous Multi-Agent Swarms',
      'Part 4: Continuous Evals & 40% Token Cost Reduction'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تسعير ذكي بـ $39 عبر Gemini: كتاب المنشئ الرسمي الذي يجمع بين الخبرة الميدانية وأكواد برمجية جاهزة للعمل مع نماذج Gemini 3.8 Flash.',
    aiPricingRationaleEn: 'AI Priced at $39: official creator textbook pairing production blueprints with ready-to-deploy TypeScript implementations.',
    rating: 5.0,
    salesCount: 1240,
    format: 'PDF + EPUB',
    fileSize: '16.4 MB'
  },

  // Applied Sciences & Physics
  {
    id: 'book-sci-1',
    title: 'الفيزياء التطبيقية وتكنولوجيا أشباه الموصلات الكوانتية',
    titleEn: 'Applied Solid-State Physics & Quantum Semiconductor Devices',
    author: 'د. ليث الجزائري و د. إيلينا سيمينوفا',
    authorEn: 'Dr. Laith Al-Jazairi & Dr. Elena Semenova',
    category: 'applied_science',
    language: 'both',
    price: 35,
    currency: '$',
    coverImage: '/src/assets/images/service_consulting_session_1792905397372.jpg',
    pages: 460,
    year: '2025',
    description: 'مرجع علمي باللغتين العربية والإنكليزية يتناول فيزياء الحالة الصلبة، حزم الطاقة في بلورات السيليكون، والتأثير النفقي الكوانتي (Quantum Tunneling) في ترانزستورات النانوميتر الحديثة (GAAFET & FinFET).',
    descriptionEn: 'In-depth university textbook analyzing solid-state crystal lattices, energy bandgaps, quantum tunneling, and sub-3nm Gate-All-Around (GAAFET) transistor fabrication.',
    keyTopics: ['Schrödinger Wave Equation in Solids', 'P-N Junction & Bandgap Engineering', 'Quantum Wells and Dots', 'EUV Photolithography & Nanofabrication'],
    keyTopicsEn: ['Schrödinger Wave Equation in Solids', 'P-N Junction & Bandgap Engineering', 'Quantum Wells and Dots', 'EUV Photolithography & Nanofabrication'],
    previewExcerpt: `«When semiconductor channel lengths shrink below 3 nanometers, direct source-to-drain quantum mechanical tunneling becomes the dominant leakage mechanism. Gate-All-Around nanosheets restore electrostatic control by enclosing the silicon channel on all four facets.»`,
    previewExcerptEn: 'Below 3nm gate lengths, quantum mechanical tunneling triggers leakage currents. GAAFET architectures restore electrostatic control by surrounding the conduction channel on all four sides.',
    tableOfContents: [
      '1. Crystal Symmetry & Quantum Mechanics Review',
      '2. Energy Bands, Effective Mass & Carrier Transport',
      '3. P-N Junctions, Schottky Barriers & Heterostructures',
      '4. Nanoscale Field-Effect Transistors (FinFET & GAAFET)',
      '5. Optoelectronic Devices & Quantum Dot Photodetectors'
    ],
    tableOfContentsEn: [
      '1. Crystal Symmetry & Quantum Mechanics Review',
      '2. Energy Bands, Effective Mass & Carrier Transport',
      '3. P-N Junctions, Schottky Barriers & Heterostructures',
      '4. Nanoscale Field-Effect Transistors (FinFET & GAAFET)',
      '5. Optoelectronic Devices & Quantum Dot Photodetectors'
    ],
    isAiPriced: true,
    aiPricingRationale: 'تقييم الذكاء الاصطناعي بـ $35 بواسطة Gemini: محتوى أكاديمي متقدم يربط الفيزياء الكوانتية بهندسة تصنيع الرقائق الإلكترونية الحديثة.',
    aiPricingRationaleEn: 'AI Valued at $35: rigorous academic treatment uniting quantum physics with semiconductor fabrication roadmap.',
    rating: 4.87,
    salesCount: 310,
    format: 'PDF',
    fileSize: '23.6 MB'
  }
];


