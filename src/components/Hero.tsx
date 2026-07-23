import React from 'react';
import { motion } from 'motion/react';
import { FileText, BookOpen, Mail, ArrowRight, ShieldCheck, Award, Users, BookMarked } from 'lucide-react';
import { HERO_INFO, RESEARCH_STATISTICS } from '../data/academicData';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  heroInfo?: typeof HERO_INFO;
}

export default function Hero({ setActiveTab, heroInfo = HERO_INFO }: HeroProps) {
  // Animation presets
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  return (
    <div className="relative overflow-hidden bg-editorial-cream py-16 lg:py-24 border-b border-editorial-border">
      {/* Background Subtle Elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute -top-12 -left-12 h-96 w-96 rounded-full bg-editorial-navy/5 blur-3xl"></div>
        <div className="absolute top-1/2 right-10 h-72 w-72 rounded-full bg-editorial-gold/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12"
        >
          {/* Text Content */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <motion.div 
              variants={itemVariants} 
              className="inline-block px-3 py-1 bg-slate-100 text-editorial-navy text-[10px] font-bold uppercase tracking-widest mb-6 w-fit font-mono"
            >
              Academic Profile & Research Repository
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="font-serif text-4xl leading-tight text-editorial-navy sm:text-5xl lg:text-7xl font-extrabold tracking-tight"
            >
              <span className="block text-slate-500 font-sans font-light text-xl sm:text-2xl uppercase tracking-widest mb-2">
                {heroInfo.titles && heroInfo.titles.length > 1 ? heroInfo.titles.slice(0, 2).join(' ') : 'Ing. Dr.'}
              </span>
              {heroInfo.name ? heroInfo.name.split(' ').slice(0, 2).join(' ') : 'Ibrahim Abdulai'} <br />
              <span className="italic font-light text-editorial-gold">
                {heroInfo.name ? heroInfo.name.split(' ').slice(2).join(' ') || 'Sawaneh' : 'Sawaneh'}
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="mt-4 font-serif text-lg italic text-editorial-navy/85 max-w-xl border-l-2 border-editorial-gold pl-4 py-1"
            >
              {heroInfo.tagline}
            </motion.p>

            <motion.p 
              variants={itemVariants}
              className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg max-w-xl font-sans"
            >
              {heroInfo.summary}
            </motion.p>

            {/* CTA Buttons - Pure Editorial Styling (Square, High-Contrast, Tracking-Widest) */}
            <motion.div 
              variants={itemVariants}
              className="mt-8 flex flex-wrap gap-3 sm:gap-4"
            >
              <button
                onClick={() => setActiveTab('research')}
                id="hero-btn-research"
                className="px-6 py-3.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xs inline-flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                View Research
                <ArrowRight className="h-3.5 w-3.5" />
              </button>

              <button
                onClick={() => setActiveTab('books')}
                id="hero-btn-books"
                className="px-6 py-3.5 border border-editorial-navy text-editorial-navy hover:bg-slate-50 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Explore Books
              </button>

              <button
                onClick={() => setActiveTab('cv')}
                id="hero-btn-cv"
                className="px-6 py-3.5 border border-editorial-navy text-editorial-navy hover:bg-slate-50 text-[11px] font-bold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <Award className="h-4 w-4" />
                Download CV
              </button>
            </motion.div>
          </div>

          {/* Profile Badge in Editorial style */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="relative w-full max-w-sm"
            >
              <div className="border border-editorial-border bg-white p-6 shadow-xs">
                {/* Profile Image */}
                <div className="flex h-80 w-full items-center justify-center bg-slate-50 relative overflow-hidden border-r-4 border-editorial-gold">
                  <img src="/hero.jpg" alt="Ing. Dr. Ibrahim Abdulai Sawaneh" className="w-full h-full object-cover" />
                </div>

                {/* Meta details */}
                <div className="mt-6 space-y-4 text-xs text-slate-600 font-sans">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="p-1.5 bg-slate-50 text-editorial-navy">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="font-bold text-slate-800 block">Ing. Dr. Ibrahim Abdulai Sawaneh</span>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase leading-none mt-1">Higher Education Leader</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                    <div className="p-1.5 bg-slate-50 text-editorial-navy">
                      <ShieldCheck className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase leading-none">Primary Affiliation</span>
                      <span className="font-bold text-slate-800 block mt-1">UNIMTECH Sierra Leone</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-1.5 bg-slate-50 text-editorial-gold">
                      <Award className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-slate-400 uppercase leading-none">Engineering Credentials</span>
                      <span className="font-bold text-slate-800 block mt-1">Registered Professional Engineer (SLIE)</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dynamic Impact Counters Grid - Styled exactly like the Editorial ledger */}
        <div className="mt-16 border-t border-editorial-border pt-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-y-8 gap-x-4 md:grid-cols-3 lg:grid-cols-6"
          >
            {[
              { value: `${RESEARCH_STATISTICS.yearsExperience}yr`, label: "Academic Service", icon: ShieldCheck },
              { value: RESEARCH_STATISTICS.publicationsCount, label: "Publications Count", icon: FileText },
              { value: RESEARCH_STATISTICS.citationsCount, label: "Google Citations", icon: Users },
              { value: `h-${RESEARCH_STATISTICS.hIndex}`, label: "Academic h-Index", icon: Award },
              { value: RESEARCH_STATISTICS.booksPublished, label: "Authored Books", icon: BookOpen },
              { value: RESEARCH_STATISTICS.completedProjects, label: "Research Projects", icon: BookMarked }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center md:items-start text-center md:text-left border-l border-editorial-border pl-4"
              >
                <div className="text-[#C5A059] mb-1.5">
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="font-serif text-3xl font-bold text-editorial-navy tracking-tight">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-wider text-[#999] mt-1 font-sans">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
