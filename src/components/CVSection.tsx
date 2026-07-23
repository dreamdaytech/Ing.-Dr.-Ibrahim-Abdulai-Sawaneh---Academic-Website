import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, GraduationCap, Briefcase, Award, Printer, ShieldCheck, CheckCircle2, ChevronRight, FileText } from 'lucide-react';
import { TIMELINE_EXPERIENCE, HERO_INFO } from '../data/academicData';
import { TimelineItem } from '../types';

interface CVSectionProps {
  timelineItems?: TimelineItem[];
}

export default function CVSection({ timelineItems = TIMELINE_EXPERIENCE }: CVSectionProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const filteredTimeline = timelineItems.filter(item => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const getIcon = (category: string) => {
    switch (category) {
      case 'education': return <GraduationCap className="h-4 w-4 text-editorial-navy" />;
      case 'appointment': return <Briefcase className="h-4 w-4 text-editorial-gold" />;
      case 'leadership': return <ShieldCheck className="h-4 w-4 text-editorial-navy" />;
      case 'award': return <Award className="h-4 w-4 text-editorial-gold" />;
      default: return <FileText className="h-4 w-4 text-slate-500" />;
    }
  };

  const skillGroups = [
    {
      title: "Systems Engineering & ICT",
      skills: ["Enterprise Relational Databases (MySQL, PostgreSQL)", "Network Architecture & Routing Security", "Lightweight Web Architectures (PHP, Node.js)", "Linux Server Administration", "LoRaWAN & IoT Sensor Node Configuration"]
    },
    {
      title: "Research & Statistical Methods",
      skills: ["Structural Equation Modeling (SEM)", "Technology Acceptance Models (TAM, UTAUT)", "Geospatial Risk Analysis (GIS & Landslide Maps)", "Quantitative Academic Survey Designs", "Data Processing & Regression Analysis"]
    },
    {
      title: "Higher Education & Leadership",
      skills: ["Syllabus & Curricula Redesign", "Academic Senate Governance", "Student Thesis Supervision", "E-Learning Infrastructure deployment", "Corporate Cyber Risk Contingency Audits"]
    }
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title with Print CTA */}
      <div className="mb-12 border-b border-editorial-border pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 no-print">
        <div className="text-center md:text-left">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Curriculum Vitae</span>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
            Academic Dossier & Appointments
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-mono">
            A chronological timeline of leadership, engineering research, and scholarly appointments.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2 bg-editorial-navy hover:bg-editorial-navy/95 text-white text-[10px] font-bold uppercase tracking-widest px-5 py-3 transition-all self-center md:self-auto cursor-pointer shadow-xs rounded-none border border-editorial-navy"
        >
          <Printer className="h-4 w-4 text-editorial-gold" />
          Print / Export PDF Dossier
        </button>
      </div>

      {/* PRINT-ONLY HEADER */}
      <div className="hidden print-only border-b-2 border-slate-900 pb-6 mb-8">
        <h1 className="font-serif text-3xl font-bold text-slate-900">{HERO_INFO.name}</h1>
        <p className="text-sm font-semibold text-slate-700 uppercase mt-1">{HERO_INFO.tagline}</p>
        <p className="text-xs text-slate-500 mt-2 font-mono leading-relaxed">
          Email: {HERO_INFO.email} | Phone: {HERO_INFO.phone} | Affiliation: {HERO_INFO.address}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Timeline chronology stream column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Timeline filter pills (no-print) */}
          <div className="flex flex-wrap gap-2 no-print border-b border-editorial-border-light pb-4">
            {[
              { id: 'all', label: 'All Activities' },
              { id: 'appointment', label: 'Academic Appointments' },
              { id: 'education', label: 'Degrees & Education' },
              { id: 'leadership', label: 'Institutional Leadership' },
              { id: 'award', label: 'Honors & Awards' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setFilterCategory(pill.id)}
                className={`px-3.5 py-2 border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-none ${
                  filterCategory === pill.id
                    ? 'bg-editorial-navy text-white border-editorial-navy shadow-xs'
                    : 'text-slate-600 border-editorial-border hover:border-editorial-navy hover:text-editorial-navy hover:bg-slate-50'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Chronological Vertical List */}
          <div className="relative border-l border-editorial-border pl-6 space-y-8 mt-6">
            {filteredTimeline.map((item, idx) => (
              <div key={item.id} className="relative group">
                {/* Connector Node */}
                <div className="absolute -left-[34px] top-1 h-4.5 w-4.5 border border-editorial-border bg-white flex items-center justify-center shadow-xs group-hover:border-editorial-gold transition-colors z-10 rounded-none">
                  {getIcon(item.category)}
                </div>

                {/* Event text content */}
                <div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-editorial-gold font-bold uppercase tracking-widest">
                    <Calendar className="h-3 w-3" />
                    {item.year}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-editorial-navy leading-snug mt-1 group-hover:text-editorial-gold transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs font-semibold text-slate-700 font-sans mt-0.5 uppercase tracking-wide">
                    {item.subtitle} — <span className="italic text-slate-500 font-serif lowercase font-normal">{item.institution}</span>
                  </p>

                  {item.description && (
                    <div className="text-xs leading-relaxed text-slate-600 mt-2.5 max-w-2xl bg-white p-4 border border-editorial-border group-hover:border-editorial-gold transition-all duration-300 font-sans prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.description }} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core skills & Credentials Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          {/* Expertise matrices */}
          <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
            <h3 className="font-serif text-sm font-bold text-editorial-navy mb-5 uppercase tracking-widest border-b border-editorial-border-light pb-2 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-editorial-gold" />
              Technical Competence Matrix
            </h3>

            <div className="space-y-6 text-xs font-sans">
              {skillGroups.map((group, gidx) => (
                <div key={gidx}>
                  <h4 className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2.5">{group.title}</h4>
                  <ul className="space-y-2">
                    {group.skills.map((skill, sidx) => (
                      <li key={sidx} className="flex items-start gap-2 text-slate-600 leading-snug font-medium">
                        <ChevronRight className="h-3.5 w-3.5 text-editorial-gold shrink-0 mt-0.5" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional registries block */}
          <div className="border border-editorial-border bg-[#FBFBF9] p-6 shadow-xs rounded-none">
            <h4 className="font-serif text-xs font-bold text-editorial-navy uppercase tracking-wider mb-2">Registered Registries</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-sans">
              Dr. Sawaneh is fully registered and maintains affiliations with leading scientific groups.
            </p>
            <div className="mt-4 space-y-2.5 text-[10px] font-mono text-slate-600 uppercase tracking-wide">
              <div className="p-3 bg-white border border-editorial-border flex justify-between gap-2">
                <span>Sierra Leone Inst. of Engineers</span>
                <span className="font-bold text-editorial-navy">SLIE Registered</span>
              </div>
              <div className="p-3 bg-white border border-editorial-border flex justify-between gap-2">
                <span>West African Research Association</span>
                <span className="font-bold text-editorial-navy">WARA Council</span>
              </div>
              <div className="p-3 bg-white border border-editorial-border flex justify-between gap-2">
                <span>National Disaster Policy Forum</span>
                <span className="font-bold text-editorial-navy">NDMA Committee</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
