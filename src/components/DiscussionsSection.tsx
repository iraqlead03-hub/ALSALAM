import React, { useState } from 'react';
import { MessageSquare, ArrowUp, Sparkles, Plus, X, Send, Share2, Check } from 'lucide-react';
import { DiscussionItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface DiscussionsSectionProps {
  language: Language;
  discussions: DiscussionItem[];
  onAddDiscussion: (item: DiscussionItem) => void;
  onOpenAiStudio: (presetType?: 'discussion') => void;
  onUpvoteDiscussion: (id: string) => void;
}

export const DiscussionsSection: React.FC<DiscussionsSectionProps> = ({
  language,
  discussions,
  onAddDiscussion,
  onOpenAiStudio,
  onUpvoteDiscussion,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [activeDiscussion, setActiveDiscussion] = useState<DiscussionItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // New discussion modal state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState(language === 'ar' ? 'الذكاء الاصطناعي' : 'Artificial Intelligence');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');

  // Reader modal comments
  const [newComment, setNewComment] = useState('');

  const handleShare = (id: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCreateDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: DiscussionItem = {
      id: `disc-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitle.trim(),
      category: newCategory,
      categoryEn: newCategory,
      summary: newSummary.trim() || newContent.slice(0, 120) + '...',
      summaryEn: newSummary.trim() || newContent.slice(0, 120) + '...',
      content: newContent.trim(),
      contentEn: newContent.trim(),
      publishDate: language === 'ar' ? 'اليوم' : 'Today',
      publishDateEn: 'Today',
      readTime: language === 'ar' ? '4 دقائق قراءة' : '4 min read',
      readTimeEn: '4 min read',
      upvotes: 1,
      views: 1,
      commentsCount: 0,
      comments: [],
    };

    onAddDiscussion(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !activeDiscussion) return;

    const commentObj = {
      id: `comm-${Date.now()}`,
      author: language === 'ar' ? 'قارئ مشارك' : 'Community Member',
      avatar: 'CM',
      date: language === 'ar' ? 'الآن' : 'Just now',
      content: newComment.trim(),
      likes: 0,
    };

    const updated = {
      ...activeDiscussion,
      commentsCount: activeDiscussion.commentsCount + 1,
      comments: [...(activeDiscussion.comments || []), commentObj],
    };

    setActiveDiscussion(updated);
    setNewComment('');
  };

  return (
    <section id="discussions" className="py-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {t.discussionsHeaderTag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.discussionsTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              {t.discussionsSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAiStudio('discussion')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.discussionsAiDraft}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.discussionsAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Discussions List */}
        <div className="space-y-4">
          {discussions.map((disc) => {
            const displayTitle = language === 'en' && disc.titleEn ? disc.titleEn : disc.title;
            const displaySummary = language === 'en' && disc.summaryEn ? disc.summaryEn : disc.summary;
            const displayCategory = language === 'en' && disc.categoryEn ? disc.categoryEn : disc.category;
            const displayDate = language === 'en' && disc.publishDateEn ? disc.publishDateEn : disc.publishDate;
            const displayReadTime = language === 'en' && disc.readTimeEn ? disc.readTimeEn : disc.readTime;

            return (
              <div
                key={disc.id}
                className={`p-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-850/60 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="flex-1 space-y-2">
                  
                  {/* Clean unboxed metadata (Zero-Pill Rule) */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-blue-600 dark:text-blue-400">{displayCategory}</span>
                    <span aria-hidden="true">·</span>
                    <span>{displayDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{displayReadTime}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono tabular-nums">
                      {disc.views.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t.discussionsViews}
                    </span>
                  </div>

                  <h3
                    onClick={() => setActiveDiscussion(disc)}
                    className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug"
                  >
                    {displayTitle}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {displaySummary}
                  </p>
                </div>

                {/* Interaction Column */}
                <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200 dark:border-slate-800">
                  
                  {/* Upvote Button */}
                  <button
                    onClick={() => onUpvoteDiscussion(disc.id)}
                    aria-label={t.discussionsUpvote}
                    className="flex sm:flex-col items-center gap-1.5 px-3 py-1.5 sm:py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors"
                  >
                    <ArrowUp className="w-4 h-4 text-blue-600" />
                    <span className="font-mono tabular-nums">{disc.upvotes}</span>
                  </button>

                  {/* Read & Comments Trigger */}
                  <button
                    onClick={() => setActiveDiscussion(disc)}
                    className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span className="font-mono tabular-nums">{disc.commentsCount} {t.videoComments}</span>
                  </button>

                  <button
                    onClick={() => handleShare(disc.id)}
                    aria-label="Share Link"
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  >
                    {copiedId === disc.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Share2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Discussion Reading Modal */}
      {activeDiscussion && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-6 sm:p-8 max-h-[90vh] flex flex-col ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <button
                onClick={() => setActiveDiscussion(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>{language === 'en' && activeDiscussion.categoryEn ? activeDiscussion.categoryEn : activeDiscussion.category}</span>
                <span aria-hidden="true">·</span>
                <span>{language === 'en' && activeDiscussion.readTimeEn ? activeDiscussion.readTimeEn : activeDiscussion.readTime}</span>
              </div>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto flex-1 py-6 space-y-6">
              
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {language === 'en' && activeDiscussion.titleEn ? activeDiscussion.titleEn : activeDiscussion.title}
              </h2>

              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {language === 'ar' ? 'م' : 'M'}
                </div>
                <div>
                  <div className="font-semibold text-slate-800 dark:text-slate-200">{t.brandName}</div>
                  <div>{language === 'en' && activeDiscussion.publishDateEn ? activeDiscussion.publishDateEn : activeDiscussion.publishDate}</div>
                </div>
              </div>

              {/* Prose Content */}
              <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4 whitespace-pre-line border-t border-b border-slate-100 dark:border-slate-800 py-6">
                {language === 'en' && activeDiscussion.contentEn ? activeDiscussion.contentEn : activeDiscussion.content}
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? `النقاش والآراء (${activeDiscussion.commentsCount})` : `Community Discussion (${activeDiscussion.commentsCount})`}
                  </h4>
                  <button
                    onClick={() => onUpvoteDiscussion(activeDiscussion.id)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 rounded text-xs font-medium text-slate-700 dark:text-slate-300"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                    <span>{t.discussionsUpvote} ({activeDiscussion.upvotes})</span>
                  </button>
                </div>

                {/* Comment Form */}
                <form onSubmit={handleAddComment} className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إرسال تعليق' : 'Post'}</span>
                  </button>
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder={language === 'ar' ? 'شاركنا رأيك أو تجربتك حول الموضوع...' : 'Share your perspective or experience...'}
                    className={`flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </form>

                {/* Existing comments */}
                <div className="space-y-3">
                  {activeDiscussion.comments && activeDiscussion.comments.length > 0 ? (
                    activeDiscussion.comments.map((cm) => (
                      <div
                        key={cm.id}
                        className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{cm.date}</span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{cm.author}</span>
                        </div>
                        <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                          {cm.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-slate-400">
                      {language === 'ar' ? 'كن أول من يشارك برأيه في هذا النقاش!' : 'Be the first to share your thoughts!'}
                    </div>
                  )}
                </div>

              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Discussion Modal */}
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
                {language === 'ar' ? 'بدء موضوع نقاش أو نشر مقال جديد' : 'Start a Discussion or Publish Article'}
              </h3>
            </div>

            <form onSubmit={handleCreateDiscussion} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'عنوان النقاش أو المقال *' : 'Discussion / Article Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: معمارية الأنظمة الموزعة في 2026' : 'e.g. Distributed System Trade-offs in 2026'}
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'نص المقال أو المحاور التفصيلية *' : 'Article Body & Discussion Points *'}
                </label>
                <textarea
                  rows={6}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب أفكارك ومحاور النقاش...' : 'Write your insights, arguments, and questions for the community...'}
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                />
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
                  {language === 'ar' ? 'نشر المقال فوراً' : 'Publish Article Now'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
