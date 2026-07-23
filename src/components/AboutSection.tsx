import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, FlameKindling, Ambulance, GraduationCap, Cpu, Briefcase, Award, Target, Eye, BookOpen, Compass } from 'lucide-react';
import { BIOGRAPHY_DETAILS, RESEARCH_AREAS, HERO_INFO } from '../data/academicData';

interface AboutSectionProps {
  biographyDetails?: typeof BIOGRAPHY_DETAILS;
  heroInfo?: typeof HERO_INFO;
}

export default function AboutSection({ biographyDetails = BIOGRAPHY_DETAILS, heroInfo = HERO_INFO }: AboutSectionProps) {
  const renderIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert': return <ShieldAlert className="h-5 w-5 text-editorial-navy" />;
      case 'FlameKindling': return <FlameKindling className="h-5 w-5 text-editorial-gold" />;
      case 'Ambulance': return <Ambulance className="h-5 w-5 text-editorial-navy" />;
      case 'GraduationCap': return <GraduationCap className="h-5 w-5 text-editorial-gold" />;
      case 'Cpu': return <Cpu className="h-5 w-5 text-editorial-navy" />;
      case 'Briefcase': return <Briefcase className="h-5 w-5 text-slate-700" />;
      default: return <BookOpen className="h-5 w-5 text-editorial-navy" />;
    }
  };

  const metadataRows = [
    { label: "Full Name", value: heroInfo.name },
    { label: "Aesthetic Titles", value: heroInfo.tagline },
    { label: "Nationality", value: "Sierra Leonean" },
    { label: "Key Specializations", value: "ICT Systems, Cybersecurity, Risk Assessment, E-Learning Pedagogy" },
    { label: "Current Affiliation", value: heroInfo.address?.includes("IAMTECH") ? "Dept. of Information Systems & Computing, IAMTECH" : heroInfo.address },
    { label: "Leadership Roles", value: "Chairman of Academic Senate Curriculum Committee, Professional Engineering Board Consultant" },
    { label: "Research Focus", value: "Digital Transformation, Disaster Reduction Policy, Post-War Cyber Governance" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title Header */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Executive Profile</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Biography & Areas of Focus
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          An overview of academic journey, research mission, and core competencies.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Scholarly Long Biography & Vision */}
        <div className="lg:col-span-8 space-y-10">
          <section className="prose prose-slate max-w-none">
            <h3 className="font-serif text-2xl font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-4">
              Scholarly Narrative
            </h3>
            <p className="text-lg leading-relaxed text-slate-800 font-serif italic mb-6">
              {biographyDetails.introduction}
            </p>
            {biographyDetails.longForm.map((paragraph, index) => (
              <div 
                key={index} 
                className="text-base leading-relaxed text-slate-600 mb-5 font-sans prose prose-sm sm:prose-base max-w-none prose-headings:font-serif prose-headings:text-editorial-navy prose-a:text-editorial-gold"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            ))}
          </section>

          {/* Vision and Mission Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="relative border border-editorial-border bg-white p-6 shadow-xs overflow-hidden group hover:border-editorial-gold transition-colors duration-300">
              <div className="absolute -right-6 -bottom-6 text-editorial-navy/[0.03] font-bold font-serif text-7xl select-none pointer-events-none">
                VISION
              </div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#F1F4F8] text-editorial-navy mb-4 shadow-xs">
                <Eye className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-editorial-navy mb-2">Academic Vision</h4>
              <div className="text-sm leading-relaxed text-slate-600 relative z-10 font-sans prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ __html: biographyDetails.vision }} />
            </div>

            <div className="relative border border-editorial-border bg-white p-6 shadow-xs overflow-hidden group hover:border-editorial-gold transition-colors duration-300">
              <div className="absolute -right-6 -bottom-6 text-editorial-gold/[0.03] font-bold font-serif text-7xl select-none pointer-events-none">
                MISSION
              </div>
              <div className="flex h-10 w-10 items-center justify-center bg-[#F1F4F8] text-editorial-gold mb-4 shadow-xs">
                <Target className="h-5 w-5" />
              </div>
              <h4 className="font-serif text-lg font-bold text-editorial-navy mb-2">Research Mission</h4>
              <div className="text-sm leading-relaxed text-slate-600 relative z-10 font-sans prose prose-sm max-w-none prose-p:my-1" dangerouslySetInnerHTML={{ __html: biographyDetails.mission }} />
            </div>
          </div>
        </div>

        {/* Right Column: Structured Summary Table */}
        <div className="lg:col-span-4 space-y-8">
          <div className="border border-editorial-border bg-white p-6 shadow-xs">
            <h3 className="font-serif text-lg font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-4 flex items-center gap-2">
              <Compass className="h-5 w-5 text-editorial-gold" />
              Academic Ledger
            </h3>
            <div className="divide-y divide-editorial-border-light text-sm font-sans">
              {metadataRows.map((row, index) => (
                <div key={index} className="py-3">
                  <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest">{row.label}</span>
                  <span className="block font-semibold text-slate-800 mt-1 leading-snug">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Download and External Portals Card - High Quality Editorial look */}
          <div className="border border-editorial-border bg-editorial-navy p-6 text-white shadow-xs relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-editorial-gold/10 blur-xl pointer-events-none"></div>
            <h3 className="font-serif text-base font-bold text-editorial-gold mb-2 uppercase tracking-wide">Academic & Research Indexes</h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-5 font-sans">
              Explore authenticated publications, indices, citations, and scholarly profiles on international research repositories.
            </p>
            <div className="space-y-2 text-[11px] font-mono">
              <a 
                href={HERO_INFO.researchGate} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-editorial-gold hover:bg-white/10 transition-all text-slate-200"
              >
                <span>ResearchGate Profile</span>
                <span className="text-editorial-gold">View →</span>
              </a>
              <a 
                href={HERO_INFO.orcid} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-editorial-gold hover:bg-white/10 transition-all text-slate-200"
              >
                <span>ORCID iD Ledger</span>
                <span className="text-editorial-gold">0000-0000 →</span>
              </a>
              <a 
                href={HERO_INFO.googleScholar} 
                target="_blank" 
                referrerPolicy="no-referrer"
                className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-editorial-gold hover:bg-white/10 transition-all text-slate-200"
              >
                <span>Google Scholar citations</span>
                <span className="text-editorial-gold">Index →</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Research Focus Areas Grid Section */}
      <section className="mt-20">
        <div className="mb-8 border-b border-editorial-border pb-4 text-center lg:text-left">
          <h3 className="font-serif text-2xl font-bold text-editorial-navy">
            Core Research & System Interventions
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Clickable themes framing his papers, authored manuals, and ongoing national advisory programs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESEARCH_AREAS.map((area, index) => (
            <motion.div 
              key={area.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-editorial-border bg-white p-6 shadow-xs hover:border-editorial-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex h-10 w-10 items-center justify-center bg-[#F1F4F8] mb-4 shadow-xs text-editorial-navy">
                  {renderIcon(area.icon)}
                </div>
                <h4 className="font-serif text-lg font-bold text-editorial-navy mb-2 leading-snug">
                  {area.title}
                </h4>
                <p className="text-xs leading-relaxed text-slate-600 mb-4 font-sans">
                  {area.description}
                </p>
              </div>

              {/* Sub-Topics badges */}
              <div className="border-t border-editorial-border-light pt-4 mt-auto">
                <span className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold">Core Subfields</span>
                <div className="flex flex-wrap gap-1.5">
                  {area.keyTopics.map((topic, tid) => (
                    <span 
                      key={tid}
                      className="px-2 py-1 bg-slate-100 text-slate-700 text-[9px] font-semibold tracking-wider uppercase font-mono"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
