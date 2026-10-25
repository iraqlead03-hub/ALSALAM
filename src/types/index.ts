export type Language = 'ar' | 'en';

export type ContentTab = 'all' | 'books' | 'dashboard' | 'videos' | 'discussions' | 'products' | 'services' | 'commercial' | 'experience';

export type BookCategory =
  | 'shia_islam'
  | 'sunni_islam'
  | 'electrical_eng'
  | 'ai_tech'
  | 'applied_science';

export interface BookItem {
  id: string;
  title: string;
  titleEn: string;
  author: string;
  authorEn: string;
  category: BookCategory;
  language: 'ar' | 'en' | 'both';
  price: number;
  currency: string;
  coverImage: string;
  pages: number;
  year?: string;
  description: string;
  descriptionEn: string;
  keyTopics: string[];
  keyTopicsEn: string[];
  previewExcerpt: string;
  previewExcerptEn?: string;
  tableOfContents?: string[];
  tableOfContentsEn?: string[];
  isAiPriced: boolean;
  aiPricingRationale?: string;
  aiPricingRationaleEn?: string;
  rating: number;
  salesCount: number;
  format: 'PDF' | 'EPUB' | 'PDF + EPUB';
  fileSize: string;
  downloadUrl?: string;
  isCreatorUpload?: boolean;
}

export interface ExperienceItem {
  id: string;
  role: string;
  roleAr?: string;
  company: string;
  period: string;
  location: string;
  description: string;
  keyAchievements: string[];
  technologies: string[];
  badge?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  category: 'ai' | 'tech' | 'startup' | 'podcast';
  duration: string;
  views: number;
  likes: number;
  thumbnail: string;
  videoUrl: string;
  publishDate: string;
  publishDateEn?: string;
  transcript?: string;
  transcriptEn?: string;
  keyTopics?: string[];
  commentsCount: number;
}

export interface DiscussionItem {
  id: string;
  title: string;
  titleEn?: string;
  summary: string;
  summaryEn?: string;
  content: string;
  contentEn?: string;
  category: string;
  categoryEn?: string;
  publishDate: string;
  publishDateEn?: string;
  readTime: string;
  readTimeEn?: string;
  upvotes: number;
  views: number;
  commentsCount: number;
  comments?: Array<{
    id: string;
    author: string;
    avatar: string;
    date: string;
    content: string;
    likes: number;
  }>;
}

export interface ProductItem {
  id: string;
  name: string;
  nameEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  commercialPrice?: number;
  currency: string;
  category: 'tools' | 'ebook' | 'template' | 'bundle';
  image: string;
  features: string[];
  featuresEn?: string[];
  rating: number;
  reviewsCount: number;
  salesCount: number;
  downloadUrl?: string;
  isPopular?: boolean;
  commercialLicenseIncluded?: boolean;
  isCustomCreatorPriced?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleEn?: string;
  tagline: string;
  taglineEn?: string;
  description: string;
  descriptionEn?: string;
  price: number;
  pricingType: 'per_session' | 'project' | 'monthly';
  duration: string;
  durationEn?: string;
  image: string;
  deliverables: string[];
  deliverablesEn?: string[];
  targetAudience: string;
  targetAudienceEn?: string;
  isFeatured?: boolean;
  ndaIncluded?: boolean;
  isAiPriced?: boolean;
  aiPricingRationale?: string;
  aiPricingRationaleEn?: string;
  aiConfidence?: number;
}

export interface CartItem {
  id: string;
  type: 'product' | 'service' | 'book';
  title: string;
  titleEn?: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  isCommercialLicense?: boolean;
  isAiPriced?: boolean;
}

export interface BookingSubmission {
  serviceId: string;
  serviceTitle: string;
  name: string;
  email: string;
  date: string;
  timeSlot: string;
  company?: string;
  notes: string;
  commercialTaxId?: string;
  paidViaGooglePay?: boolean;
  amountPaid?: number;
}

export interface GooglePayOrderReceipt {
  orderId: string;
  date: string;
  merchantEmail: string;
  merchantName: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'Google Pay';
  status: 'PAID' | 'SETTLED';
}

export interface AdSenseConfig {
  isConnected: boolean;
  publisherId: string;
  autoAdsEnabled: boolean;
  inFeedAdsEnabled: boolean;
  bannerAdsEnabled: boolean;
  testMode: boolean;
  verificationStatus: 'verified' | 'pending' | 'disconnected';
  adSlotBannerId?: string;
  adSlotInFeedId?: string;
  lastCheckedDate?: string;
}
