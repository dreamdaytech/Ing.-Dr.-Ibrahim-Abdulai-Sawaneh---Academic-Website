/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { FileText, BookOpen, ChevronRight, Award, GraduationCap, ArrowRight, ShieldCheck, Mail, Database, Sparkles, Cloud, Wifi, Sun, Moon } from 'lucide-react';

// Data imports
import { PUBLICATIONS, BOOKS, TIMELINE_EXPERIENCE, TALK_EVENTS, BLOG_POSTS, HERO_INFO, BIOGRAPHY_DETAILS, RESEARCH_STATISTICS, GALLERY_IMAGES, GALLERY_CATEGORIES } from './data/academicData';
import { Publication, Book, BlogPost, TalkEvent, TimelineItem, GalleryImage, GalleryCategory } from './types';

// Firebase imports
import { fetchCollection, seedDatabase } from './lib/firebase';

// Component imports
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ResearchSection from './components/ResearchSection';
import BooksSection from './components/BooksSection';
import CVSection from './components/CVSection';
import GallerySection from './components/GallerySection';
import MediaSection from './components/MediaSection';
import BlogSection from './components/BlogSection';
import CMSDashboard from './components/CMSDashboard';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [dynamicPubs, setDynamicPubs] = useState<Publication[]>(PUBLICATIONS);
  const [dynamicBooks, setDynamicBooks] = useState<Book[]>(BOOKS);
  const [dynamicBlogPosts, setDynamicBlogPosts] = useState<BlogPost[]>(BLOG_POSTS);
  const [dynamicTalkEvents, setDynamicTalkEvents] = useState<TalkEvent[]>(TALK_EVENTS);
  const [dynamicTimelineItems, setDynamicTimelineItems] = useState<TimelineItem[]>(TIMELINE_EXPERIENCE);
  const [dynamicHeroInfo, setDynamicHeroInfo] = useState<any>(HERO_INFO);
  const [dynamicBiographyDetails, setDynamicBiographyDetails] = useState<any>(BIOGRAPHY_DETAILS);
  const [dynamicGalleryImages, setDynamicGalleryImages] = useState<GalleryImage[]>(GALLERY_IMAGES);
  const [dynamicGalleryCategories, setDynamicGalleryCategories] = useState<GalleryCategory[]>(GALLERY_CATEGORIES);

  const [selectedPubId, setSelectedPubId] = useState<string | null>(null);
  const [selectedBlogPostId, setSelectedBlogPostId] = useState<string | null>(null);

  const [isDbLoading, setIsDbLoading] = useState(true);
  const [isDbConnected, setIsDbConnected] = useState(false);

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  React.useEffect(() => {
    async function loadDataFromFirestore() {
      try {
        setIsDbLoading(true);
        const pubs = await fetchCollection<Publication>('publications');
        const bks = await fetchCollection<Book>('books');
        const posts = await fetchCollection<BlogPost>('blogPosts');
        const events = await fetchCollection<TalkEvent>('talkEvents');
        const timeline = await fetchCollection<TimelineItem>('timelineItems');
        const profile = await fetchCollection<any>('profile');
        const gallery = await fetchCollection<GalleryImage>('galleryImages');
        const galCats = await fetchCollection<GalleryCategory>('galleryCategories');
        const heroDoc = profile.find(p => p.id === 'hero');
        const bioDoc = profile.find(p => p.id === 'biography');

        if (pubs.length === 0 && bks.length === 0 && posts.length === 0 && events.length === 0 && timeline.length === 0 && profile.length === 0 && gallery.length === 0 && galCats.length === 0) {
          console.log("Firestore database is empty. Auto-seeding default collections with rich demo data...");
          await seedDatabase({
            publications: PUBLICATIONS,
            books: BOOKS,
            blogPosts: BLOG_POSTS,
            talkEvents: TALK_EVENTS,
            timelineItems: TIMELINE_EXPERIENCE,
            heroInfo: HERO_INFO,
            biographyDetails: BIOGRAPHY_DETAILS,
            galleryImages: GALLERY_IMAGES,
            galleryCategories: GALLERY_CATEGORIES
          });
          setIsDbConnected(true);
        } else {
          console.log("Successfully connected to Live Firestore Database. Loading scholarly records.");
          if (pubs.length > 0) setDynamicPubs(pubs);
          if (bks.length > 0) setDynamicBooks(bks);
          if (posts.length > 0) setDynamicBlogPosts(posts);
          if (events.length > 0) setDynamicTalkEvents(events);
          if (timeline.length > 0) setDynamicTimelineItems(timeline);
          if (gallery.length > 0) setDynamicGalleryImages(gallery.sort((a, b) => (a.order || 0) - (b.order || 0)));
          if (galCats.length > 0) setDynamicGalleryCategories(galCats);
          if (heroDoc) setDynamicHeroInfo(heroDoc);
          if (bioDoc) setDynamicBiographyDetails(bioDoc);
          setIsDbConnected(true);
        }
      } catch (error) {
        console.error("Firebase live sync offline. Falling back to local offline data registers:", error);
        setIsDbConnected(false);
      } finally {
        setIsDbLoading(false);
      }
    }
    loadDataFromFirestore();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" as const } }
  };

  // Render Homepage layout modules
  const renderHomeContent = () => (
    <div className="space-y-20">
      {/* 1. Hero Block */}
      <Hero setActiveTab={setActiveTab} heroInfo={dynamicHeroInfo} />

      {/* 2. About Snapshot */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-editorial-gold">The Scholar's Mission</span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl">
              About {dynamicHeroInfo.titles && dynamicHeroInfo.titles.length > 1 ? dynamicHeroInfo.titles.slice(0, 2).join(' ') : 'Ing. Dr.'} {dynamicHeroInfo.name ? dynamicHeroInfo.name.split(' ').slice(0, 2).join(' ') : 'Ibrahim A.'} Sawaneh
            </h2>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              {dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[0] ? dynamicBiographyDetails.longForm[0] : BIOGRAPHY_DETAILS.longForm[0]}
            </p>
            <p className="text-base text-slate-600 leading-relaxed font-sans">
              {dynamicBiographyDetails.longForm && dynamicBiographyDetails.longForm[1] ? dynamicBiographyDetails.longForm[1] : BIOGRAPHY_DETAILS.longForm[1]}
            </p>
            <button
              onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-editorial-navy hover:text-editorial-gold transition-colors cursor-pointer group"
            >
              Read Full Biography
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Core specializations overview bento */}
          <div className="lg:col-span-5 bg-white border border-editorial-border p-6 shadow-xs space-y-4 rounded-none">
            <h3 className="font-serif text-sm font-bold text-editorial-navy border-b border-editorial-border-light pb-2.5 uppercase tracking-widest">
              Core Technical Realms
            </h3>
            <div className="space-y-4 text-xs text-slate-600 font-sans">
              {[
                { realm: "Sovereign Cybersecurity Systems", desc: "Modeling defensive networks, cybercrime profiling laws, and ECOWAS regional policy alignment." },
                { realm: "Disaster Risk & Resilience Models", desc: "Bridging the gap between contingency guidelines and rural emergency response squads." },
                { realm: "Database Management & Academic Registries", desc: "Deploying secure digital systems to index research, preventing duplication." },
                { realm: "E-Learning Pedagogy & Cloud Platforms", desc: "Developing low-bandwidth LMS solutions for universities in West Africa." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <div className="h-2 w-2 bg-editorial-gold shrink-0 mt-1.5 rounded-none"></div>
                  <div>
                    <span className="block font-serif font-bold text-slate-800 leading-snug">{item.realm}</span>
                    <span className="block text-slate-500 mt-0.5 leading-normal">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Publications & Textbook Spotlight */}
      <section className="bg-editorial-navy py-16 text-white relative overflow-hidden border-t border-b border-editorial-gold">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-editorial-gold">Featured Outputs</span>
              <h2 className="font-serif text-3xl font-extrabold tracking-tight text-white mt-1">
                Monograph & Research Spotlights
              </h2>
            </div>
            <button
              onClick={() => { setActiveTab('research'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-white transition-colors mt-4 md:mt-0 cursor-pointer"
            >
              Browse Complete Archive →
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Textbook cover teaser */}
            <div className="lg:col-span-5 flex justify-center w-full">
              {dynamicBooks.length > 0 ? (
                <div 
                  onClick={() => { setActiveTab('books'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="cursor-pointer bg-white/5 border border-white/15 p-6 shadow-xs hover:border-editorial-gold transition-colors duration-300 rounded-none flex gap-5 items-center w-full"
                >
                  <div className={`h-48 w-32 bg-editorial-navy border border-editorial-gold p-3.5 flex flex-col justify-between text-white shrink-0 shadow-lg relative overflow-hidden rounded-none border-t-8`}>
                    <div className="absolute inset-0 bg-white/[0.02] bg-[size:10px_10px]"></div>
                    <span className="text-[6px] font-mono tracking-widest text-editorial-gold uppercase leading-none font-bold">Sawaneh Volume</span>
                    <h4 className="font-serif text-[10px] font-bold tracking-tight leading-tight line-clamp-3 mt-1.5">
                      {dynamicBooks[0].title}
                    </h4>
                    <div className="mt-auto border-t border-white/10 pt-1.5 flex items-center justify-between text-[8px] font-mono">
                      <span className="text-editorial-gold font-bold">{dynamicBooks[0].year}</span>
                      <BookOpen className="h-2.5 w-2.5 text-editorial-gold" />
                    </div>
                  </div>

                  <div className="font-sans">
                    <span className="inline-block text-[9px] font-mono text-editorial-gold uppercase tracking-widest font-bold">Featured Book Volume</span>
                    <h3 className="font-serif text-base font-bold text-white leading-snug mt-1 hover:text-editorial-gold transition-colors line-clamp-2">
                      {dynamicBooks[0].title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-3 mt-2 leading-relaxed">
                      {dynamicBooks[0].synopsis}
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-editorial-gold inline-flex items-center gap-1 mt-4">
                      Read synopsis <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/15 p-6 rounded-none text-center text-slate-400 text-xs w-full py-16">
                  No authored book volumes available.
                </div>
              )}
            </div>

            {/* Selected paper detail */}
            <div className="lg:col-span-7 bg-white/5 border border-white/15 p-6 shadow-xs space-y-4 rounded-none">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-editorial-gold uppercase tracking-widest font-bold">
                <ShieldCheck className="h-4 w-4" />
                Featured Peer-Reviewed Study
              </span>
              {dynamicPubs.length > 0 ? (
                <>
                  <h3 className="font-serif text-xl font-bold text-white leading-snug">
                    {dynamicPubs[0].title}
                  </h3>
                  <p className="text-[10px] text-slate-300 font-mono uppercase tracking-wider">
                    Authors: {dynamicPubs[0].authors} | Year: {dynamicPubs[0].year} | Journal: {dynamicPubs[0].journal || "Academic Journal"}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed italic line-clamp-3 font-sans">
                    "{dynamicPubs[0].abstract}"
                  </p>
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest font-mono">
                    <button
                      onClick={() => { setActiveTab('research'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="px-4 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/10 cursor-pointer rounded-none"
                    >
                      Generate Citations
                    </button>
                    {dynamicPubs[0].link && (
                      <a
                        href={dynamicPubs[0].link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="text-editorial-gold hover:text-white flex items-center gap-1 transition-colors"
                      >
                        Source Journal →
                      </a>
                    )}
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-400 italic">No publications indexed yet.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Experience Snapshot Timeline brief */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline details */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-editorial-gold">Active Chronology</span>
            <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy">
              Appointments & Senate Mandates
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed font-sans">
              Dr. Sawaneh maintains deep ties to academia and professional registries. Here is a brief look at his chronology:
            </p>

            <div className="border-l border-editorial-border-light pl-5 space-y-6">
              {dynamicTimelineItems.length > 0 ? (
                dynamicTimelineItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="relative group">
                    {/* Dot */}
                    <div className="absolute -left-[25px] top-1.5 h-2 w-2 bg-editorial-gold group-hover:bg-editorial-navy transition-colors rounded-none"></div>
                    <span className="block text-[10px] font-mono text-editorial-gold font-bold uppercase tracking-widest">{item.year}</span>
                    <h4 className="font-serif text-base font-bold text-editorial-navy group-hover:text-editorial-gold mt-0.5">{item.title}</h4>
                    <p className="text-xs text-slate-500 font-sans">{item.subtitle} • {item.institution}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">No timeline achievements entered.</p>
              )}
            </div>

            <button
              onClick={() => { setActiveTab('cv'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-editorial-navy hover:text-editorial-gold transition-colors mt-6 cursor-pointer group"
            >
              Browse Extended CV Portfolio
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Impact testimonials slider snapshot */}
          <div className="lg:col-span-5 bg-[#FBFBF9] border border-editorial-border p-6 flex flex-col justify-between rounded-none shadow-xs">
            <div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#F1F4F8] text-editorial-navy mb-4 rounded-none">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-editorial-navy leading-snug">
                Fostering Localized ICT Competence
              </h3>
              <p className="text-xs text-slate-600 italic leading-relaxed mt-3 font-sans">
                "Our academic frameworks cannot rely purely on foreign templates. To prevent critical infrastructure vulnerabilities and secure our student databases, Sierra Leonean universities must train database engineers using localized, context-aware cybersecurity models."
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400 mt-4">
                — Dr. Ibrahim Abdulai Sawaneh, Academic Senate address
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-editorial-border-light flex items-center justify-between text-[10px] font-mono uppercase tracking-widest font-bold text-slate-400">
              <span>National Outstanding Impact Awardee</span>
              <span className="text-[#C5A059]">2024 Recognition</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Contact / Collaboration Invite CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
        <div className="border border-editorial-border bg-editorial-navy p-8 sm:p-12 text-white relative overflow-hidden rounded-none text-center md:text-left shadow-xs">
          <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-editorial-gold/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-editorial-gold">Collaboration Gateway</span>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight">
                Initiate Research Partnerships
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Dr. Sawaneh partners with universities, government boards (such as the NDMA), security organizations, and postgraduate candidates on digital transformation and cyber policy audits.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0 font-mono">
              <button
                onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 bg-editorial-gold hover:bg-editorial-gold/90 text-white rounded-none text-[10px] uppercase font-bold tracking-widest transition-colors shadow-xs cursor-pointer"
              >
                Inquire Cooperation
              </button>
              <button
                onClick={() => { setActiveTab('cms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-none text-[10px] uppercase font-bold tracking-widest text-white transition-colors cursor-pointer"
              >
                Model Schema Panel
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // Render core pages
  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return renderHomeContent();
      case 'about':
        return <AboutSection biographyDetails={dynamicBiographyDetails} heroInfo={dynamicHeroInfo} />;
      case 'research':
        return (
          <ResearchSection 
            publications={dynamicPubs} 
            selectedPubId={selectedPubId} 
            onSelectPublication={setSelectedPubId} 
          />
        );
      case 'books':
        return <BooksSection books={dynamicBooks} />;
      case 'cv':
        return <CVSection timelineItems={dynamicTimelineItems} />;
      case 'gallery':
        return <GallerySection galleryImages={dynamicGalleryImages} galleryCategories={dynamicGalleryCategories} />;
      case 'media':
        return <MediaSection talkEvents={dynamicTalkEvents} />;
      case 'blog':
        return (
          <BlogSection 
            blogPosts={dynamicBlogPosts} 
            selectedBlogPostId={selectedBlogPostId} 
            onSelectBlogPost={setSelectedBlogPostId} 
          />
        );
      case 'cms':
        return (
          <CMSDashboard 
            publications={dynamicPubs}
            setPublications={setDynamicPubs}
            books={dynamicBooks}
            setBooks={setDynamicBooks}
            blogPosts={dynamicBlogPosts}
            setBlogPosts={setDynamicBlogPosts}
            talkEvents={dynamicTalkEvents}
            setTalkEvents={setDynamicTalkEvents}
            timelineItems={dynamicTimelineItems}
            setTimelineItems={setDynamicTimelineItems}
            isDbConnected={isDbConnected}
            isDbLoading={isDbLoading}
            heroInfo={dynamicHeroInfo}
            setHeroInfo={setDynamicHeroInfo}
            biographyDetails={dynamicBiographyDetails}
            setBiographyDetails={setDynamicBiographyDetails}
            galleryImages={dynamicGalleryImages}
            setGalleryImages={setDynamicGalleryImages}
            galleryCategories={dynamicGalleryCategories}
            setGalleryCategories={setDynamicGalleryCategories}
          />
        );
      case 'contact':
        return <ContactSection />;
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFB] flex flex-col font-sans relative">
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-editorial-gold z-[100] origin-left"
        style={{ scaleX }}
      />
      {/* Dynamic top bar */}
      <div className="bg-editorial-navy text-white py-2 px-4 text-center text-[10px] font-bold font-mono tracking-widest uppercase no-print border-b border-editorial-gold flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 justify-center sm:justify-start">
          ✨ Global citations index: {RESEARCH_STATISTICS.citationsCount} • Outstanding Research Impact Award recipient 2024
        </div>
        
        <div className="flex items-center gap-2">
          {/* Eye-safe Academic Reading Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-[10px] font-bold font-mono tracking-widest text-editorial-gold hover:text-white transition-all flex items-center gap-1 cursor-pointer uppercase border border-editorial-gold/35 hover:border-white/50 px-2.5 py-0.5"
            title={darkMode ? "Switch to Light Mode" : "Switch to High-Contrast Academic Dark Mode"}
          >
            {darkMode ? (
              <>
                <Sun className="h-3 w-3" />
                <span>Light Reading</span>
              </>
            ) : (
              <>
                <Moon className="h-3 w-3" />
                <span>Dark Reading</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              setActiveTab('cms');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-[10px] font-bold font-mono tracking-widest text-editorial-gold hover:text-white transition-all flex items-center gap-1 cursor-pointer uppercase border border-editorial-gold/35 hover:border-white/50 px-2.5 py-0.5"
          >
            <ShieldCheck className="h-3 w-3" />
            Login / Sign In
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        publications={dynamicPubs}
        blogPosts={dynamicBlogPosts}
        onSelectPublication={setSelectedPubId}
        onSelectBlogPost={setSelectedBlogPostId}
      />

      {/* Primary Page Canvas */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Master footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
