import React, { useState } from 'react';
import { ShoppingBag, Star, Check, Sparkles, Plus, X, Edit3, ShieldCheck, Zap } from 'lucide-react';
import { ProductItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface ProductsSectionProps {
  language: Language;
  products: ProductItem[];
  onAddToCart: (product: ProductItem, isCommercial?: boolean) => void;
  onInstantBuyGPay: (product: ProductItem, isCommercial?: boolean) => void;
  onOpenAiStudio: (presetType?: 'product') => void;
  onAddProduct: (item: ProductItem) => void;
  onUpdateProductPrice?: (productId: string, newPrice: number) => void;
}

export const ProductsSection: React.FC<ProductsSectionProps> = ({
  language,
  products,
  onAddToCart,
  onInstantBuyGPay,
  onOpenAiStudio,
  onAddProduct,
  onUpdateProductPrice,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [filter, setFilter] = useState<'all' | 'bundle' | 'ebook' | 'template'>('all');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [licenseTypeMap, setLicenseTypeMap] = useState<Record<string, 'personal' | 'commercial'>>({});

  // Editing price state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');

  // New product form state
  const [newName, setNewName] = useState('');
  const [newTagline, setNewTagline] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('49');
  const [newCommercialPrice, setNewCommercialPrice] = useState('149');
  const [newCategory, setNewCategory] = useState<'bundle' | 'ebook' | 'template'>('bundle');
  const [newFeatures, setNewFeatures] = useState(
    language === 'ar' ? 'سعر محدد شخصياً، عتاد عالي الجودة، ترخيص تجاري' : 'Creator-fixed pricing, Premium hardware, Full license'
  );

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.category === filter);

  const getProductLicense = (productId: string) => {
    return licenseTypeMap[productId] || 'personal';
  };

  const toggleLicense = (productId: string, type: 'personal' | 'commercial') => {
    setLicenseTypeMap((prev) => ({ ...prev, [productId]: type }));
  };

  const handleAddToCartClick = (product: ProductItem) => {
    const isCommercial = getProductLicense(product.id) === 'commercial';
    onAddToCart(product, isCommercial);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleSavePrice = (productId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val > 0 && onUpdateProductPrice) {
      onUpdateProductPrice(productId, val);
    }
    setEditingProductId(null);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const created: ProductItem = {
      id: `prod-${Date.now()}`,
      name: newName.trim(),
      nameEn: newName.trim(),
      tagline: newTagline.trim() || 'Curated goods with price determined personally by Mustafa',
      taglineEn: newTagline.trim(),
      description: newDesc.trim() || 'Curated hardware & software toolkit with direct Google Pay payment.',
      descriptionEn: newDesc.trim(),
      price: parseFloat(newPrice) || 49,
      commercialPrice: parseFloat(newCommercialPrice) || 129,
      currency: '$',
      category: newCategory,
      image: '/src/assets/images/product_luxury_tech_kit_1792906861653.jpg',
      features: newFeatures.split(/[,،]/).map((f) => f.trim()).filter(Boolean),
      featuresEn: newFeatures.split(/[,،]/).map((f) => f.trim()).filter(Boolean),
      rating: 5.0,
      reviewsCount: 1,
      salesCount: 1,
      commercialLicenseIncluded: true,
      isCustomCreatorPriced: true,
    };

    onAddProduct(created);
    setShowAddModal(false);
    setNewName('');
    setNewTagline('');
    setNewDesc('');
  };

  return (
    <section id="products" className="py-16 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" />
              <span>{t.productsHeaderTag}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.productsTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              {t.productsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAiStudio('product')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.productsAiDraft}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.productsAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Creator Google Play / Pay Direct Payout Guarantee */}
        <div className="mb-8 p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-slate-900 dark:text-white">
                {language === 'ar'
                  ? 'الدفع المباشر لحساب المنشئ عبر Google Pay / Google Play'
                  : 'Direct Creator Payouts via Google Pay / Google Play'}
              </div>
              <p className="text-slate-600 dark:text-slate-300 mt-0.5 leading-relaxed">
                {language === 'ar'
                  ? 'جميع المنتجات المعروضة (سواء كانت منتجات ذكاء اصطناعي أو منتجاتي المعروضة الخاصة) يتم دفعها من قبل المشاهد والزبون مباشرة لحسابي في Google Pay / Google Play: iraqlead03@gmail.com'
                  : 'All offered products (both AI solutions and personal curated products) are paid directly by viewers to my Google Pay / Google Play account: iraqlead03@gmail.com'}
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-[11px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
            <span>iraqlead03@gmail.com</span>
          </div>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg max-w-fit mb-8 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t.productsAll} ({products.length})
          </button>
          <button
            onClick={() => setFilter('bundle')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'bundle'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t.productsBundles}
          </button>
          <button
            onClick={() => setFilter('ebook')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'ebook'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t.productsEbooks}
          </button>
          <button
            onClick={() => setFilter('template')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'template'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            {t.productsTemplates}
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const displayTitle = language === 'en' && product.nameEn ? product.nameEn : product.name;
            const displayTagline = language === 'en' && product.taglineEn ? product.taglineEn : product.tagline;
            const featuresList = language === 'en' && product.featuresEn ? product.featuresEn : product.features;
            const currentLicense = getProductLicense(product.id);
            const activePrice = currentLicense === 'commercial' && product.commercialPrice ? product.commercialPrice : product.price;

            return (
              <div
                key={product.id}
                className={`group rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden shadow-2xs ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div>
                  {/* Product Image */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="relative aspect-[4/3] bg-slate-100 dark:bg-slate-800 cursor-pointer overflow-hidden"
                  >
                    <img
                      src={product.image}
                      alt={displayTitle}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    
                    {/* Creator pricing badge */}
                    <div className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} text-[10px] font-bold px-2 py-0.5 bg-slate-900/90 text-white rounded backdrop-blur-xs flex items-center gap-1`}>
                      <span>{t.creatorPriceBadge}</span>
                    </div>

                    {product.isPopular && (
                      <div className={`absolute bottom-3 ${isRtl ? 'right-3' : 'left-3'} text-[10px] font-bold px-2 py-0.5 bg-blue-600 text-white rounded`}>
                        {t.productPopular}
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    
                    {/* Clean unboxed metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span className="font-mono tabular-nums font-semibold text-slate-700 dark:text-slate-300">
                          {product.rating}
                        </span>
                        <span className="text-slate-400">({product.reviewsCount})</span>
                      </div>
                      <span className="font-mono tabular-nums">{product.salesCount} {t.productSales}</span>
                    </div>

                    <h3
                      onClick={() => setSelectedProduct(product)}
                      className="text-base font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug"
                    >
                      {displayTitle}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {displayTagline}
                    </p>

                    {/* License Selection Tabs */}
                    <div className="mt-4 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center gap-1 text-[11px]">
                      <button
                        type="button"
                        onClick={() => toggleLicense(product.id, 'personal')}
                        className={`flex-1 py-1 rounded-md font-medium transition-colors ${
                          currentLicense === 'personal'
                            ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        {t.licensePersonal}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleLicense(product.id, 'commercial')}
                        className={`flex-1 py-1 rounded-md font-medium transition-colors flex items-center justify-center gap-1 ${
                          currentLicense === 'commercial'
                            ? 'bg-blue-600 text-white shadow-2xs font-semibold'
                            : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>{t.licenseCommercial}</span>
                      </button>
                    </div>

                    {/* Key Features Preview */}
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                      {featuresList.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                          <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{feat}</span>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* Price, Creator Edit & Action Bottom Strip */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                    
                    <div className="flex items-center justify-between">
                      <div className={isRtl ? 'text-right' : 'text-left'}>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] text-slate-400">
                            {currentLicense === 'commercial' ? (language === 'ar' ? 'السعر التجاري:' : 'Commercial:') : (language === 'ar' ? 'سعر المنشئ:' : 'Creator Price:')}
                          </span>
                          
                          {/* Inline creator price editor trigger */}
                          {editingProductId !== product.id && (
                            <button
                              onClick={() => {
                                setEditingProductId(product.id);
                                setTempPrice(product.price.toString());
                              }}
                              title={t.editPriceBtn}
                              className="text-slate-400 hover:text-blue-600 p-0.5"
                            >
                              <Edit3 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        {editingProductId === product.id ? (
                          <div className="flex items-center gap-1 mt-1">
                            <input
                              type="number"
                              min="1"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 px-1.5 py-0.5 text-xs border border-blue-500 rounded font-mono text-slate-900 dark:text-white bg-white dark:bg-slate-800"
                            />
                            <button
                              onClick={() => handleSavePrice(product.id)}
                              className="px-2 py-0.5 text-[10px] bg-blue-600 text-white rounded font-bold"
                            >
                              {t.savePriceBtn}
                            </button>
                          </div>
                        ) : (
                          <div className="text-xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                            {product.currency}{activePrice}
                          </div>
                        )}
                      </div>

                      {/* Google Pay Direct Indicator */}
                      <div className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                        <span>Google Pay / Play</span>
                      </div>
                    </div>

                    {/* Dual Action Buttons: Add to Cart OR 1-Tap Google Pay Buy */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleAddToCartClick(product)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all flex items-center justify-center gap-1.5 ${
                          addedId === product.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {addedId === product.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>{t.addedToCart}</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>{t.addToCart}</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => onInstantBuyGPay(product, currentLicense === 'commercial')}
                        className="py-2 px-2.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center justify-center gap-1"
                        title={language === 'ar' ? 'شراء فوري مع تحويل لحسابي عبر Google Pay / Play' : 'Instant purchase with payout to creator'}
                      >
                        <span className="truncate">Google Pay / Play</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto ${isRtl ? 'text-right' : 'text-left'}`}>
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-xs text-slate-500 font-mono">
                Merchant Receiver: iraqlead03@gmail.com
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {language === 'en' && selectedProduct.nameEn ? selectedProduct.nameEn : selectedProduct.name}
                </h3>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mt-1">
                  {language === 'en' && selectedProduct.taglineEn ? selectedProduct.taglineEn : selectedProduct.tagline}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {language === 'en' && selectedProduct.descriptionEn ? selectedProduct.descriptionEn : selectedProduct.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mb-3">
                  {language === 'ar' ? 'محتويات الحزمة وضمان الدفع:' : 'Package Features & Google Pay Protection:'}
                </h4>
                <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                  {(language === 'en' && selectedProduct.featuresEn ? selectedProduct.featuresEn : selectedProduct.features).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <span className="text-xs text-slate-400">{language === 'ar' ? 'السعر المحدد من قبلي:' : 'Creator Price:'}</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono tabular-nums">
                    {selectedProduct.currency}{selectedProduct.price}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onAddToCart(selectedProduct, false);
                      setSelectedProduct(null);
                    }}
                    className="px-4 py-2 text-xs font-semibold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 rounded-lg"
                  >
                    {t.addToCart}
                  </button>

                  <button
                    onClick={() => {
                      onInstantBuyGPay(selectedProduct, false);
                      setSelectedProduct(null);
                    }}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
                  >
                    <span>الدفع بـ Google Pay</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Add New Product Modal */}
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
                {language === 'ar' ? 'إضافة منتج معروض وتحديد سعره شخصياً' : 'Add Product & Set Your Price'}
              </h3>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'اسم المنتج أو البضاعة *' : 'Product / Goods Name *'}
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: حزمة الأجهزة والمفاتيح الرقمية' : 'e.g. Primus Hardware Suite'}
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    {language === 'ar' ? 'السعر المحدد من قبلك ($) *' : 'Your Determined Price ($) *'}
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
                    {language === 'ar' ? 'السعر التجاري للشركات ($)' : 'B2B Price ($)'}
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={newCommercialPrice}
                    onChange={(e) => setNewCommercialPrice(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-slate-900 dark:text-white"
                  />
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
                  {language === 'ar' ? 'نشر وتحديد السعر فوراً' : 'Publish Product'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
