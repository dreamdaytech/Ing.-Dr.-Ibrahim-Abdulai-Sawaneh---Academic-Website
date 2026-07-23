import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Star, Sparkles, ExternalLink, Download, FileText, Check, Award, Copy, ArrowRight } from 'lucide-react';
import { BOOKS } from '../data/academicData';
import { Book } from '../types';

interface BooksSectionProps {
  books?: Book[];
  initialSelectedBookId?: string | null;
}

export default function BooksSection({ books = BOOKS, initialSelectedBookId }: BooksSectionProps) {
  const [selectedBookState, setSelectedBookState] = useState<Book | null>(null);

  React.useEffect(() => {
    if (initialSelectedBookId) {
      const book = books.find(b => b.id === initialSelectedBookId);
      if (book) setSelectedBookState(book);
    }
  }, [initialSelectedBookId, books]);
  const activeBookSelected = selectedBookState || books[0] || null;
  const [copiedIsbn, setCopiedIsbn] = useState<string | null>(null);
  const [isExportingExcerpt, setIsExportingExcerpt] = useState(false);

  const handleCopyIsbn = (isbn: string) => {
    navigator.clipboard.writeText(isbn);
    setCopiedIsbn(isbn);
    setTimeout(() => setCopiedIsbn(null), 2000);
  };

  const exportExcerptToPDF = async () => {
    if (!activeBookSelected) return;
    
    setIsExportingExcerpt(true);
    try {
      const html2pdf = (await import('html2pdf.js')).default;
      
      const htmlContent = `
        <div style="padding: 20px; font-family: 'Times New Roman', Times, serif; color: #000; max-width: 800px; margin: 0 auto; background: #fff;">
          <style>
            p { margin-bottom: 15px; }
            ul, ol { margin-bottom: 15px; padding-left: 20px; }
            li { margin-bottom: 5px; page-break-inside: avoid; }
            p { margin-bottom: 15px; page-break-inside: avoid; }
            h1, h2, h3, h4, h5, h6 { page-break-after: avoid; }
            h1, h2, h3, h4, h5, h6 { margin-top: 20px; margin-bottom: 10px; color: #0f172a; }
            strong, b { font-weight: bold; }
            em, i { font-style: italic; }
          </style>
          <h1 style="font-size: 24pt; font-weight: bold; text-align: center; color: #0f172a; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-bottom: 10px;">
            ${activeBookSelected.title}
          </h1>
          <h2 style="font-size: 16pt; font-weight: normal; text-align: center; color: #475569; margin-bottom: 30px;">
            Full Index & Synopsis
          </h2>
          
          <div style="margin-bottom: 30px; font-size: 12pt; color: #333; text-align: center; border-bottom: 1px solid #eee; padding-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Author:</strong> Dr. Ibrahim A. Sawaneh</p>
            <p style="margin: 5px 0;"><strong>Publisher:</strong> ${activeBookSelected.publisher}</p>
            <p style="margin: 5px 0;"><strong>ISBN:</strong> ${activeBookSelected.isbn}</p>
          </div>
          
          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Synopsis / Overview
          </h3>
          <div style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; text-align: justify;">
            ${activeBookSelected.synopsis}
          </div>

          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Why This Study Matters
          </h3>
          <div style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; text-align: justify; font-style: italic; background-color: #fbfbf9; padding: 15px; border-left: 4px solid #b89b5e;">
            ${activeBookSelected.whyItMatters}
          </div>

          <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
            Table of Contents (Full Index)
          </h3>
          <ul style="font-size: 12pt; line-height: 1.8; color: #111; margin-bottom: 40px; padding-left: 20px;">
            ${activeBookSelected.tableOfContents.map(chapter => `<li style="margin-bottom: 10px;">${chapter}</li>`).join('')}
          </ul>
          
          ${activeBookSelected.reviews && activeBookSelected.reviews.length > 0 ? `
            <h3 style="font-size: 16pt; font-weight: bold; color: #0f172a; margin-top: 30px; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
              Scholarly Endorsements & Reviews
            </h3>
            <div style="margin-bottom: 40px;">
              ${activeBookSelected.reviews.map(review => `
                <blockquote style="margin: 0 0 20px 0; padding: 15px 20px; background-color: #f8fafc; border-left: 4px solid #94a3b8;">
                  <p style="font-size: 12pt; font-style: italic; color: #334155; margin-bottom: 10px;">"${review.text}"</p>
                  <footer style="font-size: 10pt; color: #64748b; font-family: monospace; text-transform: uppercase;">
                    <strong>${review.author}</strong>, ${review.role}
                  </footer>
                </blockquote>
              `).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 50px; padding: 20px; font-size: 10pt; line-height: 1.5; color: #555; border-top: 1px solid #ccc; text-align: center;">
            <em>Note: This is an automatically generated document for preview purposes.<br/>For the full volume, please consult academic retailers or institutional libraries.</em>
          </div>
        </div>
      `;

      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;

      const opt = {
        margin:       0.75,
        filename:     `excerpt_${activeBookSelected.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`,
        image:        { type: 'jpeg' as const, quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, logging: false },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' as const },
        pagebreak:    { mode: ['css', 'legacy'] }
      };
      
      await html2pdf().set(opt).from(tempDiv).save();
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExportingExcerpt(false);
    }
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
                <button
                  onClick={exportExcerptToPDF}
                  disabled={isExportingExcerpt}
                  className={`w-full py-3 border text-[10px] font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isExportingExcerpt
                      ? 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-[#FBFBF9] hover:bg-slate-100 border-editorial-border text-slate-700'
                  }`}
                >
                  <Download className="h-3.5 w-3.5 text-slate-500" />
                  {isExportingExcerpt ? 'Generating PDF...' : 'Download Full Index & Synopsis'}
                </button>
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
