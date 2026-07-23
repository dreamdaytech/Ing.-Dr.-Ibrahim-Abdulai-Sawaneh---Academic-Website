import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Calendar, Clock, Search, ArrowLeft, Send, CheckCircle2, Heart, Share2, Compass, ArrowRight, Twitter, Linkedin, Facebook, MessageCircle } from 'lucide-react';
import { BLOG_POSTS } from '../data/academicData';
import { BlogPost } from '../types';

interface BlogSectionProps {
  blogPosts?: BlogPost[];
  selectedBlogPostId?: string | null;
  onSelectBlogPost?: (id: string | null) => void;
}

export default function BlogSection({ 
  blogPosts = BLOG_POSTS,
  selectedBlogPostId,
  onSelectBlogPost
}: BlogSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [emailSubscribe, setEmailSubscribe] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  React.useEffect(() => {
    if (!activePost) {
      setScrollProgress(0);
      return;
    }

    const handleScroll = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (height > 0) {
        const scrolled = (winScroll / height) * 100;
        setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [activePost]);

  React.useEffect(() => {
    if (selectedBlogPostId) {
      const post = blogPosts.find(p => p.id === selectedBlogPostId);
      if (post) {
        setSearchTerm('');
        setSelectedCategory('all');
        setActivePost(post);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (onSelectBlogPost) {
          onSelectBlogPost(null);
        }
      }
    }
  }, [selectedBlogPostId, blogPosts, onSelectBlogPost]);

  const categories = ['all', 'Cybersecurity', 'Education Technology', 'Disaster Management'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSubscribe) return;
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSubscribe('');
    }, 3000);
  };

  // View full post
  if (activePost) {
    const relatedPosts = blogPosts.filter(p => p.id !== activePost.id).slice(0, 2);

    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Scroll-based Reading Progress Bar */}
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200/40 z-[100] pointer-events-none no-print">
          <div 
            className="h-full bg-editorial-gold transition-all duration-75 ease-out shadow-[0_0_10px_rgba(197,160,89,0.6)]"
            style={{ width: `${scrollProgress}%` }}
          />
          {/* Subtle floating progress tag */}
          <div className="absolute right-4 top-3 bg-editorial-navy/95 backdrop-blur-xs text-white text-[8px] font-mono px-2 py-0.5 uppercase tracking-widest font-bold border border-editorial-gold/45 shadow-sm">
            {Math.round(scrollProgress)}% Read
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => {
            setActivePost(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-editorial-navy mb-6 cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Insights Feed
        </button>

        {/* Article header */}
        <article className="border border-editorial-border bg-white p-6 sm:p-10 shadow-xs relative overflow-hidden rounded-none">
          <div className="absolute top-0 left-0 right-0 h-1 bg-editorial-navy"></div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
            <span className="px-2 py-0.5 bg-[#F1F4F8] text-editorial-navy font-bold">{activePost.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-editorial-gold" /> {activePost.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {activePost.readTime}</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-extrabold tracking-tight text-editorial-navy mt-4 leading-tight">
            {activePost.title}
          </h2>

          <p className="text-xs font-semibold text-slate-400 mt-2 font-mono uppercase tracking-widest">
            By {activePost.author}
          </p>

          {/* Abstract callout */}
          <div className="mt-6 border-l-2 border-editorial-gold bg-[#FBFBF9] p-4">
            <p className="text-sm font-serif text-slate-700 leading-relaxed italic">
              "{activePost.excerpt}"
            </p>
          </div>

          {/* Long Form Article Body */}
          <div className="mt-8 text-sm sm:text-base leading-relaxed text-slate-700 space-y-6 border-t border-editorial-border-light pt-8 font-sans">
            <div 
              className="prose prose-sm sm:prose-base max-w-none text-slate-700 prose-headings:font-serif prose-headings:text-editorial-navy prose-a:text-editorial-gold hover:prose-a:text-editorial-gold/80 prose-strong:text-editorial-navy"
              dangerouslySetInnerHTML={{ __html: activePost.content }}
            />
          </div>

          {/* Interactive Share/Like block */}
          <div className="mt-10 pt-6 border-t border-editorial-border-light flex flex-wrap gap-4 items-center justify-between text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">
            <div className="flex items-center gap-4">
              <button onClick={() => alert("Liked!")} className="inline-flex items-center gap-1 hover:text-red-500 cursor-pointer">
                <Heart className="h-3.5 w-3.5" />
                <span>Like Article</span>
              </button>
              <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert("Article URL copied!"); }} className="inline-flex items-center gap-1 hover:text-editorial-navy cursor-pointer">
                <Share2 className="h-3.5 w-3.5" />
                <span>Copy URL</span>
              </button>
              <span className="text-slate-200 mx-1">|</span>
              <button onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(activePost.title)}`, '_blank')} className="inline-flex items-center gap-1 hover:text-[#1DA1F2] cursor-pointer" aria-label="Share on X (Twitter)">
                <Twitter className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')} className="inline-flex items-center gap-1 hover:text-[#0A66C2] cursor-pointer" aria-label="Share on LinkedIn">
                <Linkedin className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')} className="inline-flex items-center gap-1 hover:text-[#1877F2] cursor-pointer" aria-label="Share on Facebook">
                <Facebook className="h-3.5 w-3.5" />
              </button>
              <button onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(activePost.title + ' ' + window.location.href)}`, '_blank')} className="inline-flex items-center gap-1 hover:text-[#25D366] cursor-pointer" aria-label="Share on WhatsApp">
                <MessageCircle className="h-3.5 w-3.5" />
              </button>
            </div>
            <span>Open-Access Creative Commons</span>
          </div>
        </article>

        {/* Related posts */}
        <section className="mt-12">
          <h3 className="font-serif text-lg font-bold text-editorial-navy mb-4 border-b border-editorial-border-light pb-2 uppercase tracking-wider">
            Related Thought Pieces
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((post) => (
              <div 
                key={post.id}
                onClick={() => {
                  setActivePost(post);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer border border-editorial-border bg-white p-5 shadow-xs hover:border-editorial-gold transition-all duration-300 rounded-none"
              >
                <span className="text-[9px] font-mono text-editorial-gold uppercase font-bold tracking-widest">{post.category}</span>
                <h4 className="font-serif text-base font-bold text-editorial-navy leading-snug mt-1.5 hover:text-editorial-gold line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 mt-2 font-sans">
                  {post.excerpt}
                </p>
                <div className="mt-4 pt-3 border-t border-editorial-border-light flex items-center justify-between text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                  <span>{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Thought Leadership Feed</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Insights & Academic Commentary
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Explorations in cybersecurity, higher education design, database engineering, and regional policy development.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-6">
          {/* Search bar */}
          <div className="relative border border-editorial-border bg-white p-2.5 shadow-xs flex items-center">
            <Search className="absolute left-6 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search opinions, policy commentaries, or dissertation highlights..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/70 border border-editorial-border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-editorial-navy"
            />
          </div>

          {/* Grid list of posts */}
          {filteredPosts.length > 0 ? (
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <div 
                  key={post.id}
                  className="border border-editorial-border bg-white p-6 shadow-xs hover:border-editorial-gold transition-all duration-300 relative overflow-hidden group rounded-none"
                >
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-400 uppercase tracking-widest font-bold">
                    <span className="px-2 py-0.5 bg-[#F1F4F8] text-editorial-navy font-bold">{post.category}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5 text-editorial-gold" /> {post.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {post.readTime}</span>
                  </div>

                  <h3 
                    onClick={() => { setActivePost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="cursor-pointer font-serif text-xl font-bold text-editorial-navy mt-3 leading-snug group-hover:text-editorial-gold transition-colors duration-300"
                  >
                    {post.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-slate-600 mt-2.5 font-sans">
                    {post.excerpt}
                  </p>

                  <div className="mt-4 pt-4 border-t border-editorial-border-light flex items-center justify-between">
                    <button
                      onClick={() => { setActivePost(post); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-navy hover:text-editorial-gold transition-colors cursor-pointer"
                    >
                      Read Full Article
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">By {post.author.split(' ')[2]}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-editorial-border p-12 text-center bg-white">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300 mb-3" />
              <h3 className="font-serif text-base font-bold text-slate-800">No Articles Found</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Try searching for keywords like 'database', 'cybercrime', or 'disaster'.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar categories & Subscribe widget */}
        <div className="lg:col-span-4 space-y-6">
          {/* Categories card */}
          <div className="border border-editorial-border bg-white p-5 shadow-xs rounded-none">
            <h3 className="font-serif text-sm font-bold text-editorial-navy mb-4 uppercase tracking-widest border-b border-editorial-border-light pb-2.5 flex items-center gap-2">
              <Compass className="h-4.5 w-4.5 text-editorial-gold" />
              Categories
            </h3>
            <div className="space-y-1 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 transition-colors flex items-center justify-between cursor-pointer rounded-none ${
                    selectedCategory === cat
                      ? 'bg-editorial-navy text-white font-bold'
                      : 'hover:bg-slate-50 hover:text-editorial-navy'
                  }`}
                >
                  <span>{cat === 'all' ? 'All Insights' : cat}</span>
                  {selectedCategory === cat && <span className="h-1.5 w-1.5 bg-editorial-gold"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Newsletter Subscribe card */}
          <div className="border border-editorial-border bg-editorial-navy p-6 text-white shadow-xs relative overflow-hidden rounded-none">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-editorial-gold/10 blur-xl pointer-events-none"></div>
            <h3 className="font-serif text-base font-bold text-editorial-gold uppercase tracking-wider">Insights Despatch</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
              Subscribe to receive automated notifications when Dr. Sawaneh publishes new books, research abstracts, or policy briefs.
            </p>

            {subSuccess ? (
              <div className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2 font-sans">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Subscription recorded!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="mt-4 space-y-2 font-sans">
                <input
                  type="email"
                  required
                  placeholder="e.g. scientist@institution.edu"
                  value={emailSubscribe}
                  onChange={(e) => setEmailSubscribe(e.target.value)}
                  className="w-full text-xs p-2.5 bg-white/5 border border-white/10 rounded-none focus:outline-none focus:ring-1 focus:ring-editorial-gold text-white placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-editorial-gold hover:bg-editorial-gold/90 text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none"
                >
                  <Send className="h-3.5 w-3.5 text-white" />
                  Subscribe Feed
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
