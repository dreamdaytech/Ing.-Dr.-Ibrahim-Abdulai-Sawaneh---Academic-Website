import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, PlayCircle, Presentation, Users, Mic, Award, Compass, ExternalLink } from 'lucide-react';
import { TALK_EVENTS } from '../data/academicData';
import { TalkEvent } from '../types';

interface MediaSectionProps {
  talkEvents?: TalkEvent[];
}

export default function MediaSection({ talkEvents = TALK_EVENTS }: MediaSectionProps) {
  const [activeType, setActiveType] = useState<string>('all');

  const filteredEvents = talkEvents.filter(event => {
    if (activeType === 'all') return true;
    return event.type.toLowerCase().includes(activeType.toLowerCase());
  });

  const getMediaIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'keynote': return <Award className="h-4 w-4 text-editorial-gold" />;
      case 'guest lecture': return <Presentation className="h-4 w-4 text-editorial-navy" />;
      case 'panel discussion': return <Users className="h-4 w-4 text-editorial-navy" />;
      default: return <Mic className="h-4 w-4 text-editorial-gold" />;
    }
  };

  const videoPlaceholders = [
    { title: "Keynote Address: Sovereign Cyber Defense Strategy", event: "National Cybersecurity Summit 2025", duration: "45:12" },
    { title: "Panel: Low-Bandwidth LMS Implementations", event: "Higher EdTech Forum 2024", duration: "32:04" }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Public Speaking & Forums</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Conference Talks & Media
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Keynotes, scientific presentations, panel discussions, and downloadable slide materials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Speaking Timeline & Filter */}
        <div className="lg:col-span-8 space-y-6">
          {/* Speaking filters */}
          <div className="flex flex-wrap gap-2 border-b border-editorial-border-light pb-4">
            {[
              { id: 'all', label: 'All Speaking Events' },
              { id: 'keynote', label: 'Keynotes' },
              { id: 'presentation', label: 'Conference Papers' },
              { id: 'lecture', label: 'Guest Lectures' },
              { id: 'panel', label: 'Panels' }
            ].map((pill) => (
              <button
                key={pill.id}
                onClick={() => setActiveType(pill.id)}
                className={`px-3.5 py-2 border text-[10px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer rounded-none ${
                  activeType === pill.id
                    ? 'bg-editorial-navy text-white border-editorial-navy shadow-xs'
                    : 'text-slate-600 border-editorial-border hover:border-editorial-navy hover:text-editorial-navy hover:bg-slate-50'
                }`}
              >
                {pill.label}
              </button>
            ))}
          </div>

          {/* Events Streams */}
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <div 
                key={event.id}
                className="border border-editorial-border bg-white p-6 shadow-xs hover:border-editorial-gold transition-all duration-300 rounded-none"
              >
                <div className="flex flex-wrap items-center gap-2 mb-3.5 text-[9px] font-mono uppercase tracking-widest font-bold text-slate-400">
                  <span className="px-2 py-0.5 bg-[#F1F4F8] text-editorial-navy flex items-center gap-1">
                    {getMediaIcon(event.type)}
                    {event.type}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-editorial-gold" />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {event.location}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-bold text-editorial-navy leading-snug">
                  {event.title}
                </h3>
                <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase font-mono tracking-widest">
                  Forum: {event.eventName} | Role: {event.role}
                </p>

                <div className="text-xs text-slate-600 leading-relaxed mt-3 font-sans bg-[#FBFBF9] p-3 border border-editorial-border-light prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: event.summary }} />

                <div className="mt-4 pt-3 border-t border-editorial-border-light flex items-center justify-between">
                  <button 
                    onClick={() => alert("Presentation slides dispatched directly via administrative state.")}
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-editorial-navy hover:text-editorial-gold cursor-pointer"
                  >
                    <Presentation className="h-4 w-4" />
                    Request Slide Deck (PDF)
                  </button>
                  {event.link && (
                    <a 
                      href={event.link} 
                      target="_blank" 
                      referrerPolicy="no-referrer"
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-editorial-navy transition-colors"
                    >
                      Event Details
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Audio/Video Player Placeholders */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-editorial-border bg-white p-5 shadow-xs rounded-none">
            <h3 className="font-serif text-sm font-bold text-editorial-navy mb-4 uppercase tracking-widest border-b border-editorial-border-light pb-2.5 flex items-center gap-2">
              <PlayCircle className="h-4.5 w-4.5 text-editorial-gold" />
              Embedded Lecture Casts
            </h3>

            <div className="space-y-4">
              {videoPlaceholders.map((vid, idx) => (
                <div key={idx} className="space-y-2.5">
                  <div className="h-40 w-full bg-editorial-navy p-4 text-white relative flex flex-col justify-between overflow-hidden shadow-sm group cursor-pointer rounded-none border-r-4 border-editorial-gold">
                    <div className="absolute inset-0 bg-white/[0.02] bg-[size:8px_8px]"></div>
                    
                    {/* Play Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/35 transition-colors">
                      <PlayCircle className="h-10 w-10 text-white/90 drop-shadow-md group-hover:scale-105 transition-transform" />
                    </div>

                    <span className="inline-block text-[9px] font-mono font-bold uppercase bg-white/10 px-2.5 py-0.5 border border-white/10 w-fit">
                      Lecture {vid.duration}
                    </span>

                    <div className="relative z-10">
                      <h4 className="font-serif text-xs font-bold leading-tight">{vid.title}</h4>
                      <p className="text-[10px] text-slate-300 mt-0.5">{vid.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invitation banner */}
          <div className="border border-editorial-border bg-editorial-navy p-6 text-white shadow-xs relative overflow-hidden rounded-none">
            <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-editorial-gold/10 blur-xl pointer-events-none"></div>
            <h3 className="font-serif text-base font-bold text-editorial-gold uppercase tracking-wider">Invite Dr. Sawaneh</h3>
            <p className="text-xs text-slate-300 leading-relaxed mt-2 font-sans">
              Dr. Sawaneh delivers authoritative keynote lectures, peer review summaries, and policy advisory papers on cybersecurity and regional resilience models.
            </p>
            <button
              onClick={() => {
                const contactBtn = document.getElementById('nav-item-contact');
                if (contactBtn) contactBtn.click();
              }}
              className="mt-4 px-4 py-2.5 bg-editorial-gold hover:bg-editorial-gold/90 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
            >
              Request Speaker Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
