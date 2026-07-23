import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Sparkles, ExternalLink, Download, FileText, Check, Award, Copy, ArrowRight } from 'lucide-react';
import { BOOKS } from '../data/academicData';
import { Book } from '../types';

interface BooksSectionProps {
  books?: Book[];
}

export default function BooksSection({ books = BOOKS }: BooksSectionProps) {
  const [selectedBookState, setSelectedBookState] = useState<Book | null>(null);
  const activeBookSelected = selectedBookState || books[0] || null;
  const [copiedIsbn, setCopiedIsbn] = useState<string | null>(null);

  const handleCopyIsbn = (isbn: string) => {
    navigator.clipboard.writeText(isbn);
    setCopiedIsbn(isbn);
    setTimeout(() => setCopiedIsbn(null), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title Header */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Monographs & Textbooks</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Authored Volumes & Book Showcase
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Comprehensive studies published for institutions, security policymakers, and higher education libraries.
        </p>
      </div>

      {/* Book Shelving Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {books.map((book) => (
          <div 
            key={book.id}
            onClick={() => {
              setSelectedBookState(book);
              const container = document.getElementById('book-detail-showcase');
              if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className={`cursor-pointer border p-6 flex flex-col sm:flex-row gap-6 transition-all duration-300 shadow-xs rounded-none ${
              activeBookSelected?.id === book.id
                ? 'bg-[#FBFBF9] border-editorial-navy/60 ring-1 ring-editorial-navy/20'
                : 'bg-white border-editorial-border hover:border-editorial-gold'
            }`}
          >
            {/* Textbook Cover Render - Classical Design */}
            <div className="h-60 w-44 bg-editorial-navy p-4 flex flex-col justify-between text-white shrink-0 shadow-sm relative overflow-hidden group rounded-none border-r-4 border-editorial-gold">
              <div className="absolute inset-0 bg-white/[0.02] bg-[size:10px_10px]"></div>
              
              <div className="space-y-2 relative z-10">
                <span className="block text-[8px] font-mono tracking-widest text-editorial-gold uppercase leading-none border-b border-white/10 pb-1.5 font-bold">Sawaneh Monograph</span>
                <h4 className="font-serif text-sm font-bold tracking-tight leading-snug line-clamp-4">
                  {book.title}
                </h4>
              </div>

              <div className="mt-auto relative z-10">
                <span className="block text-[7px] font-mono text-slate-400 uppercase">Publisher</span>
                <span className="block text-[9px] font-semibold text-slate-200 truncate mt-0.5">{book.publisher.split('(')[0]}</span>
                <div className="mt-2 border-t border-white/10 pt-1 flex items-center justify-between">
                  <span className="text-[8px] font-mono text-editorial-gold font-bold">{book.year}</span>
                  <BookOpen className="h-3.5 w-3.5 text-white/40" />
                </div>
              </div>
            </div>

            {/* Quick Metadata */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest font-bold">{book.year} Publication</span>
                <h3 className="font-serif text-lg font-bold text-editorial-navy leading-snug mt-1.5 hover:text-editorial-gold transition-colors">
                  {book.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-mono mt-1">ISBN: {book.isbn}</p>
                <div className="text-xs text-slate-600 line-clamp-3 mt-3 leading-relaxed font-sans prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: book.synopsis }} />
              </div>

              <div className="mt-4 pt-4 border-t border-editorial-border-light flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-editorial-navy group-hover:text-editorial-gold transition-colors">
                <span>View Full Index & Synopsis</span>
                <ArrowRight className="h-4.5 w-4.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED BOOK DETAILED VIEW */}
      {activeBookSelected && (
        <div 
          id="book-detail-showcase"
          className="border border-editorial-border bg-white p-6 md:p-8 shadow-xs relative overflow-hidden animate-in fade-in duration-300 rounded-none"
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-editorial-gold"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Cover & Purchase Card Column */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div className="h-80 w-56 bg-editorial-navy p-6 flex flex-col justify-between text-white shadow-sm relative overflow-hidden rounded-none border-r-8 border-editorial-gold">
                <div className="absolute inset-0 bg-white/[0.02] bg-[size:12px_12px]"></div>
                
                <div className="space-y-3 relative z-10">
                  <span className="block text-[8px] font-mono tracking-widest text-editorial-gold uppercase leading-none border-b border-white/10 pb-2 font-bold">Academic Textbook Monograph</span>
                  <h3 className="font-serif text-base font-bold tracking-tight leading-snug">
                    {activeBookSelected.title}
                  </h3>
                  {activeBookSelected.subtitle && (
                    <p className="text-[10px] text-slate-300 leading-normal font-sans italic line-clamp-3">
                      {activeBookSelected.subtitle}
                    </p>
                  )}
                </div>

                <div className="mt-auto relative z-10">
                  <span className="block text-[7px] font-mono text-slate-400 uppercase">Author Academic Identity</span>
                  <span className="block text-xs font-serif font-bold text-editorial-gold">Ing. Dr. Ibrahim A. Sawaneh</span>
                  <div className="mt-3 border-t border-white/10 pt-2 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-slate-300">{activeBookSelected.publisher.split(' ')[0]}</span>
                    <span className="text-[9px] font-mono text-editorial-gold font-bold">{activeBookSelected.year}</span>
                  </div>
                </div>
              </div>

              {/* Purchase and Excerpt buttons */}
              <div className="w-full max-w-xs mt-6 space-y-2.5">
                {activeBookSelected.purchaseUrl && (
                  <a
                    href={activeBookSelected.purchaseUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="w-full py-3 bg-editorial-navy hover:bg-editorial-navy/95 text-white text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    Request Library Copy
                    <ExternalLink className="h-3.5 w-3.5 text-editorial-gold" />
                  </a>
                )}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert("PDF Excerpt dispatched directly via administrative state."); }}
                  className="w-full py-3 bg-[#FBFBF9] hover:bg-slate-100 border border-editorial-border text-slate-700 text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  Download Excerpt Chapter
                </a>
              </div>
            </div>

            {/* Right Textbook details Column */}
            <div className="lg:col-span-8 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase font-bold tracking-widest">
                  <span>{activeBookSelected.publisher}</span>
                  <span>•</span>
                  <span>{activeBookSelected.year}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-editorial-navy mt-1.5 leading-snug">
                  {activeBookSelected.title}
                </h3>
                {activeBookSelected.subtitle && (
                  <p className="text-sm text-slate-600 italic mt-1.5 leading-relaxed font-serif">
                    {activeBookSelected.subtitle}
                  </p>
                )}

                {/* ISBN Code Box */}
                <div className="mt-3.5 inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-xs font-mono text-slate-600">
                  <span>ISBN-13: {activeBookSelected.isbn}</span>
                  <button 
                    onClick={() => handleCopyIsbn(activeBookSelected.isbn || '')}
                    className="hover:text-slate-900 transition-colors cursor-pointer"
                    aria-label="Copy ISBN"
                  >
                    {copiedIsbn === activeBookSelected.isbn ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              {/* Synopsis and Value proposition */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Synopsis Overview</h4>
                  <div className="text-sm text-slate-600 leading-relaxed mt-1.5 font-sans prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activeBookSelected.synopsis }} />
                </div>

                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-editorial-gold" />
                    Why This Study Matters
                  </h4>
                  <div className="text-sm text-slate-700 leading-relaxed mt-1.5 font-serif italic bg-[#FBFBF9] border-l-2 border-editorial-gold p-4 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activeBookSelected.whyItMatters }} />
                </div>
              </div>

              {/* Table of contents block */}
              <div>
                <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-2">Chapters Outline</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50/50 p-4 border border-editorial-border-light font-sans">
                  {activeBookSelected.tableOfContents.map((chapter, idx) => (
                    <div key={idx} className="flex items-start gap-2 py-1">
                      <span className="font-mono text-editorial-gold font-bold shrink-0">{idx + 1}.</span>
                      <span className="leading-snug">{chapter.replace(/^Chapter \d+:\s*/, '')}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews and Endorsements */}
              {activeBookSelected.reviews && activeBookSelected.reviews.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-editorial-gold fill-editorial-gold" />
                    Scholarly Endorsements & Reviews
                  </h4>
                  <div className="space-y-3.5 font-serif">
                    {activeBookSelected.reviews.map((review, idx) => (
                      <div key={idx} className="border-l border-editorial-border pl-4 py-1">
                        <p className="text-xs italic text-slate-600 leading-relaxed">
                          "{review.text}"
                        </p>
                        <p className="text-[10px] font-bold text-slate-800 mt-1.5 font-mono uppercase tracking-widest">
                          — {review.author}, <span className="font-normal text-slate-500 capitalize">{review.role}</span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
