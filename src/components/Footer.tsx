import React from 'react';
import logoImg from '../assets/logo.png';
import { GraduationCap, Mail, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';
import { HERO_INFO } from '../data/academicData';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-editorial-navy border-t border-editorial-gold text-slate-300 py-12 md:py-16 no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12 border-b border-white/10 pb-10">
          {/* Logo & short summary */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-white text-editorial-navy rounded-none flex items-center justify-center shrink-0">
                <img src={logoImg} alt="IAS Logo" className="h-full w-full object-contain" />
              </div>
              <span className="font-serif text-base font-bold text-white tracking-tight">
                Ing. Dr. Ibrahim A. Sawaneh
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              Official digital profile, research repository, and book showcase. Fostering technological advancements, cybersecurity sovereign controls, and disaster resilience policies in West Africa.
            </p>
            <div className="flex items-center gap-1.5 text-[9px] font-mono text-editorial-gold uppercase tracking-widest font-bold">
              <ShieldCheck className="h-4 w-4 text-editorial-gold" />
              Verified Academic Signature
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Website Directory</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider font-sans">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About Biography' },
                { id: 'research', label: 'Research Papers' },
                { id: 'books', label: 'Books Published' },
                { id: 'cv', label: 'Curriculum Vitae' },
                { id: 'cms', label: 'CMS Schema (Admin)' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleNavClick(link.id)}
                    className="hover:text-editorial-gold transition-colors cursor-pointer text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* External scholar indexes */}
          <div className="space-y-3.5">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">Scholar Indexes</h4>
            <ul className="space-y-2 text-xs font-semibold uppercase tracking-wider font-sans">
              <li>
                <a 
                  href={HERO_INFO.researchGate} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="hover:text-editorial-gold transition-colors inline-flex items-center gap-1.5"
                >
                  ResearchGate profile
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={HERO_INFO.orcid} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="hover:text-editorial-gold transition-colors inline-flex items-center gap-1.5"
                >
                  ORCID iD Ledger
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={HERO_INFO.googleScholar} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="hover:text-editorial-gold transition-colors inline-flex items-center gap-1.5"
                >
                  Google Scholar Ledger
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href={HERO_INFO.linkedin} 
                  target="_blank" 
                  referrerPolicy="no-referrer"
                  className="hover:text-editorial-gold transition-colors inline-flex items-center gap-1.5"
                >
                  Professional LinkedIn
                  <ExternalLink className="h-3 w-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Lower footer copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4 font-sans">
          <span>
            © {new Date().getFullYear()} Ing. Dr. Ibrahim Abdulai Sawaneh. All Rights Reserved.
          </span>
          <span className="text-center md:text-right text-[10px] uppercase tracking-wider leading-relaxed">
            Designed for digital scientific archiving • Open-Access Research Policy • Freetown, Sierra Leone
          </span>
        </div>
      </div>
    </footer>
  );
}
