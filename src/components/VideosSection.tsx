import React, { useState } from 'react';
import { Play, ThumbsUp, MessageSquare, Plus, Sparkles, X, Send } from 'lucide-react';
import { VideoItem, Language } from '../types';
import { translations } from '../i18n/translations';

interface VideosSectionProps {
  language: Language;
  videos: VideoItem[];
  onAddVideo: (video: VideoItem) => void;
  onOpenAiStudio: (presetType?: 'video') => void;
  onLikeVideo: (videoId: string) => void;
}

export const VideosSection: React.FC<VideosSectionProps> = ({
  language,
  videos,
  onAddVideo,
  onOpenAiStudio,
  onLikeVideo,
}) => {
  const t = translations[language];
  const isRtl = language === 'ar';

  const [filter, setFilter] = useState<'all' | 'ai' | 'tech' | 'startup' | 'podcast'>('all');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New video form state
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<'ai' | 'tech' | 'startup' | 'podcast'>('ai');
  const [newDuration, setNewDuration] = useState('15:30');
  const [newUrl, setNewUrl] = useState('https://www.youtube.com/embed/dQw4w9WgXcQ');
  const [newTopics, setNewTopics] = useState(language === 'ar' ? 'ذكاء اصطناعي، تقنية' : 'AI, Cloud, Systems');

  // Video player modal comments state
  const [commentInput, setCommentInput] = useState('');
  const [modalComments, setModalComments] = useState<Array<{ id: string; name: string; text: string; time: string }>>([
    {
      id: '1',
      name: language === 'ar' ? 'طارق العبيدي' : 'Tariq Al-Obaidi',
      text: language === 'ar' ? 'شرح احترافي ودقيق، خصوصاً تفصيل معمارية النظم الموزعة!' : 'Exceptional breakdown of distributed system architecture and failover mechanisms.',
      time: language === 'ar' ? 'قبل يومين' : '2 days ago',
    },
    {
      id: '2',
      name: language === 'ar' ? 'مريم الجابري' : 'Mariam Al-Jaberi',
      text: language === 'ar' ? 'أفضل مرجع رأيته مؤخراً في هذا المجال، شكراً جزيلاً.' : 'One of the best production guides on Gemini SDK integration.',
      time: language === 'ar' ? 'أمس' : 'Yesterday',
    },
  ]);

  const filteredVideos = filter === 'all' ? videos : videos.filter((v) => v.category === filter);

  const handleCreateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: VideoItem = {
      id: `vid-${Date.now()}`,
      title: newTitle.trim(),
      titleEn: newTitle.trim(),
      description: newDesc.trim() || 'New architectural session published by Mustafa.',
      descriptionEn: newDesc.trim(),
      category: newCategory,
      duration: newDuration || '12:00',
      views: 1,
      likes: 1,
      thumbnail: '/src/assets/images/video_tech_masterclass_1792905398038.jpg',
      videoUrl: newUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      publishDate: language === 'ar' ? 'الآن' : 'Just now',
      publishDateEn: 'Just now',
      commentsCount: 0,
      keyTopics: newTopics.split(/[,،]/).map((t) => t.trim()).filter(Boolean),
      transcript: 'Full transcript published with the session.',
    };

    onAddVideo(created);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    setModalComments((prev) => [
      ...prev,
      {
        id: `cm-${Date.now()}`,
        name: language === 'ar' ? 'زائر المنصة' : 'Platform Visitor',
        text: commentInput.trim(),
        time: language === 'ar' ? 'الآن' : 'Just now',
      },
    ]);
    setCommentInput('');
  };

  return (
    <section id="videos" className="py-16 bg-slate-50/50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 ${isRtl ? 'text-right' : 'text-left'}`}>
          <div>
            <div className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-1">
              {t.videosHeaderTag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.videosTitle}
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-xl">
              {t.videosSubtitle}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAiStudio('video')}
              className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/40 rounded-lg transition-colors whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>{t.videosAiDraft}</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white rounded-lg shadow-sm transition-all whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{t.videosAddBtn}</span>
            </button>
          </div>
        </div>

        {/* Filter Bar (Segmented Controls) */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 dark:bg-slate-800 rounded-lg max-w-fit mb-8 overflow-x-auto">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.videosAll} ({videos.length})
          </button>
          <button
            onClick={() => setFilter('ai')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'ai'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.videosAi}
          </button>
          <button
            onClick={() => setFilter('startup')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'startup'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.videosStartup}
          </button>
          <button
            onClick={() => setFilter('tech')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'tech'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.videosTech}
          </button>
          <button
            onClick={() => setFilter('podcast')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              filter === 'podcast'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.videosPodcast}
          </button>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredVideos.map((video) => {
            const displayTitle = language === 'en' && video.titleEn ? video.titleEn : video.title;
            const displayDesc = language === 'en' && video.descriptionEn ? video.descriptionEn : video.description;
            const displayDate = language === 'en' && video.publishDateEn ? video.publishDateEn : video.publishDate;

            return (
              <div
                key={video.id}
                className={`group overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col shadow-2xs ${isRtl ? 'text-right' : 'text-left'}`}
              >
                {/* Thumbnail Container with Play Overlay */}
                <div
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
                >
                  <img
                    src={video.thumbnail}
                    alt={displayTitle}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration indicator */}
                  <div className="absolute bottom-3 left-3 px-2 py-0.5 bg-black/80 text-white text-[11px] font-mono rounded">
                    {video.duration}
                  </div>

                  {/* Quiet unboxed category label */}
                  <div className="absolute top-3 right-3 text-xs text-white/90 font-medium px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded">
                    {video.category === 'ai' ? t.videosAi : video.category === 'startup' ? t.videosStartup : video.category === 'tech' ? t.videosTech : t.videosPodcast}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Clean unboxed metadata (Zero-Pill Rule) */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span>{displayDate}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums">
                        {video.views.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t.videoViews}
                      </span>
                    </div>

                    <h3
                      onClick={() => setActiveVideo(video)}
                      className="text-lg font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors leading-snug line-clamp-2"
                    >
                      {displayTitle}
                    </h3>

                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                      {displayDesc}
                    </p>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => onLikeVideo(video.id)}
                        className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono tabular-nums">
                          {video.likes.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')}
                        </span>
                      </button>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span className="font-mono tabular-nums">{video.commentsCount} {t.videoComments}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveVideo(video)}
                      className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {t.watchVideo}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Video Player & Discussion Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className={`relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden ${isRtl ? 'text-right' : 'text-left'}`}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="text-sm font-bold text-slate-800 dark:text-white truncate max-w-md">
                {language === 'en' && activeVideo.titleEn ? activeVideo.titleEn : activeVideo.title}
              </div>
            </div>

            {/* Video Frame */}
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <iframe
                src={`${activeVideo.videoUrl}?autoplay=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Video Meta & Details */}
            <div className="p-6 max-h-[40vh] overflow-y-auto space-y-6">
              
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mb-2">
                  <span>{language === 'en' && activeVideo.publishDateEn ? activeVideo.publishDateEn : activeVideo.publishDate}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">
                    {activeVideo.views.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US')} {t.videoViews}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono tabular-nums">{activeVideo.duration}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {language === 'en' && activeVideo.titleEn ? activeVideo.titleEn : activeVideo.title}
                </h3>

                <p className="text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed">
                  {language === 'en' && activeVideo.descriptionEn ? activeVideo.descriptionEn : activeVideo.description}
                </p>
              </div>

              {/* Comments Thread */}
              <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
                <div className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  {language === 'ar' ? `النقاش والتعليقات على الفيديو (${modalComments.length})` : `Community Discussion & Feedback (${modalComments.length})`}
                </div>

                {/* Comment Input */}
                <form onSubmit={handleAddComment} className="flex gap-2 mb-6">
                  <button
                    type="submit"
                    className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'إرسال' : 'Send'}</span>
                  </button>
                  <input
                    type="text"
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder={language === 'ar' ? 'اكتب تعليقك أو سؤالك حول الفيديو...' : 'Write your comment or question about this session...'}
                    className={`flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                  />
                </form>

                {/* Comment list */}
                <div className="space-y-3">
                  {modalComments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <span>{comment.time}</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{comment.name}</span>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add New Video Modal */}
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
                {language === 'ar' ? 'نشر فيديو جديد على المنصة' : 'Publish New Video to Platform'}
              </h3>
            </div>

            <form onSubmit={handleCreateVideo} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'عنوان الفيديو *' : 'Video Title *'}
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={language === 'ar' ? 'مثال: كيفية بناء شات بوت ذكي بـ Gemini' : 'e.g. Building Production Agents with Gemini'}
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'التصنيف' : 'Category'}
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className={`w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <option value="ai">{t.videosAi}</option>
                  <option value="tech">{t.videosTech}</option>
                  <option value="startup">{t.videosStartup}</option>
                  <option value="podcast">{t.videosPodcast}</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  {language === 'ar' ? 'الوصف والمحاور' : 'Description & Outline'}
                </label>
                <textarea
                  rows={3}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder={language === 'ar' ? 'وصف مختصر لموضوع الفيديو...' : 'Brief summary of the video topic...'}
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
                  {language === 'ar' ? 'نشر الفيديو الآن' : 'Publish Video Now'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </section>
  );
};
