import React, { useState } from 'react';
import { Search, Filter, BookOpen, Quote, Download, FileText, ExternalLink, Calendar, Users, Hash, Check, Send, X, ZoomIn, ZoomOut, Printer } from 'lucide-react';
import { PUBLICATIONS } from '../data/academicData';
import { Publication } from '../types';
import ResearchImpactChart from './ResearchImpactChart';

interface ResearchSectionProps {
  publications?: Publication[];
  selectedPubId?: string | null;
  onSelectPublication?: (id: string | null) => void;
}

export default function ResearchSection({ 
  publications = PUBLICATIONS,
  selectedPubId,
  onSelectPublication
}: ResearchSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [activeCitationPub, setActiveCitationPub] = useState<Publication | null>(null);
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);
  const [requestPub, setRequestPub] = useState<Publication | null>(null);
  const [requestEmail, setRequestEmail] = useState('');
  const [requestPurpose, setRequestPurpose] = useState('Research');
  const [requestSuccess, setRequestSuccess] = useState(false);

  // Document Preview States
  const [activePreviewPub, setActivePreviewPub] = useState<Publication | null>(null);
  const [previewMode, setPreviewMode] = useState<'preprint' | 'metadata'>('preprint');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [printSuccess, setPrintSuccess] = useState<boolean>(false);

  React.useEffect(() => {
    if (selectedPubId) {
      const pub = publications.find(p => p.id === selectedPubId);
      if (pub) {
        setSearchTerm('');
        setSelectedCategory('all');
        setSelectedYear('all');
        setActivePreviewPub(pub);
        setPreviewMode('preprint');
        setZoomLevel(100);
        
        // Scroll to the content after layout is updated
        setTimeout(() => {
          const detailElement = document.getElementById('preprint-modal-title');
          if (detailElement) {
            detailElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);

        if (onSelectPublication) {
          onSelectPublication(null);
        }
      }
    }
  }, [selectedPubId, publications, onSelectPublication]);

  // Helper to dynamically build beautiful iframe contents
  const generatePreviewSrcDoc = (pub: Publication, mode: 'preprint' | 'metadata', zoom: number) => {
    const baseFontSize = mode === 'preprint' ? 13 : 11;
    const zoomScale = zoom / 100;
    
    // Perform all arithmetic operations strictly with numbers first, then format them
    const computedSizeVal = baseFontSize * zoomScale;
    const titleSizeVal = 18 * zoomScale;
    const metaSizeVal = 10 * zoomScale;

    const computedSize = computedSizeVal.toFixed(1);
    const titleSize = titleSizeVal.toFixed(1);
    const metaSize = metaSizeVal.toFixed(1);
    
    const metaSizeLarge = (metaSizeVal * 1.1).toFixed(1);
    const metaSizeExtraLarge = (metaSizeVal * 1.15).toFixed(1);
    const computedSizeLarge = (computedSizeVal * 1.05).toFixed(1);
    const computedSizeItalic = (computedSizeVal * 1.02).toFixed(1);
    const computedSizeSmall = (computedSizeVal * 0.9).toFixed(1);
    const computedSizeWatermark = (computedSizeVal * 3).toFixed(1);
    const computedSizeWarning = (computedSizeVal * 0.8).toFixed(1);

    if (mode === 'preprint') {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Times New Roman', Times, serif;
              color: #1e293b;
              line-height: 1.6;
              padding: 30px;
              margin: 0;
              background-color: #ffffff;
              font-size: ${computedSize}px;
              position: relative;
              min-height: 100%;
              box-sizing: border-box;
            }
            .crest-container {
              text-align: center;
              margin-bottom: 10px;
            }
            .seal-svg {
              width: 50px;
              height: 50px;
              opacity: 0.85;
            }
            .header {
              text-align: center;
              border-bottom: 2px double #334155;
              padding-bottom: 12px;
              margin-bottom: 20px;
            }
            .institution {
              font-size: ${metaSizeLarge}px;
              text-transform: uppercase;
              letter-spacing: 1.2px;
              color: #475569;
              font-weight: bold;
            }
            .document-type {
              font-size: ${metaSizeExtraLarge}px;
              font-weight: bold;
              color: #b45309;
              margin-top: 5px;
              letter-spacing: 0.8px;
            }
            .title {
              font-size: ${titleSize}px;
              font-weight: bold;
              margin-top: 12px;
              margin-bottom: 8px;
              line-height: 1.3;
              color: #0f172a;
            }
            .authors {
              font-size: ${computedSizeItalic}px;
              font-style: italic;
              color: #334155;
              margin-bottom: 4px;
            }
            .meta {
              font-size: ${metaSize}px;
              color: #64748b;
              margin-bottom: 4px;
            }
            .section-title {
              font-size: ${computedSizeLarge}px;
              font-weight: bold;
              text-transform: uppercase;
              letter-spacing: 0.8px;
              margin-top: 20px;
              margin-bottom: 10px;
              color: #0f172a;
              border-bottom: 1px solid #cbd5e1;
              padding-bottom: 4px;
            }
            .abstract-content {
              font-size: ${computedSize}px;
              text-align: justify;
              color: #334155;
              text-indent: 20px;
              margin-bottom: 12px;
            }
            .keywords {
              font-size: ${computedSizeSmall}px;
              margin-top: 20px;
              color: #475569;
              background: #f8fafc;
              padding: 8px 12px;
              border-left: 3px solid #64748b;
            }
            .keywords-label {
              font-weight: bold;
            }
            .watermark {
              position: fixed;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-45deg);
              font-size: ${computedSizeWatermark}px;
              font-weight: bold;
              color: rgba(15, 23, 42, 0.03);
              white-space: nowrap;
              pointer-events: none;
              z-index: 1000;
              text-transform: uppercase;
              letter-spacing: 4px;
            }
            .excerpt-warning {
              margin-top: 40px;
              border-top: 1px dashed #cbd5e1;
              padding-top: 12px;
              text-align: center;
              font-size: ${computedSizeWarning}px;
              color: #94a3b8;
              font-style: italic;
            }
          </style>
        </head>
        <body>
          <div class="watermark">PRE-PRINT EXCERPT</div>
          
          <div class="crest-container">
            <svg class="seal-svg" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="45" stroke="#334155" stroke-width="2" stroke-dasharray="2 2"/>
              <circle cx="50" cy="50" r="40" stroke="#b45309" stroke-width="1.5"/>
              <path d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z" stroke="#334155" stroke-width="1.5" fill="#f8fafc"/>
              <path d="M50 25 L68 36 L68 60 L50 71 L32 60 L32 36 Z" fill="#334155" opacity="0.1"/>
              <path d="M35 48 H65 M35 54 H65 M35 60 H55" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>
              <path d="M50 30 L50 42" stroke="#334155" stroke-width="2"/>
              <circle cx="50" cy="42" r="2" fill="#334155"/>
            </svg>
          </div>

          <div class="header">
            <div class="institution">Institute of Advanced Management and Technology</div>
            <div class="document-type">${pub.category.toUpperCase().replace('-', ' ')} MANUSCRIPT EXCERPT</div>
            <div class="title">${pub.title}</div>
            <div class="authors">By ${pub.authors}</div>
            <div class="meta">Journal Record: ${pub.journal || 'Academic Proceedings Repository'}</div>
            <div class="meta">Year of Release: ${pub.year} | Identifier: ${pub.doi ? `DOI ${pub.doi}` : `REF-${pub.id.toUpperCase()}`}</div>
          </div>
          
          <div class="section-title">I. Technical Abstract Outline</div>
          <div class="abstract-content">
            ${pub.abstract}
          </div>

          <div class="abstract-content" style="font-weight: 500; font-style: italic; color: #475569;">
            Note: This pre-print excerpt acts as a sovereign micro-record of regional scientific endeavors. It is synchronized with the digital registry of Sierra Leone to prevent institutional duplication and promote localized peer collaboration.
          </div>
          
          <div class="section-title">II. Implementation Directives</div>
          <div class="abstract-content">
            Full data tables, structural equation path loading parameters, regression outcomes, and localized architectural schematics are preserved within the secure institutional vault. To requisition complete administrative access, please close this viewer and trigger the "Request Copy" portal.
          </div>

          <div class="keywords">
            <span class="keywords-label">CLASSIFIED KEYWORDS:</span> ${pub.keywords.join(', ')}
          </div>

          <div class="excerpt-warning">
            Sovereign Scientific Record — Department of Information Systems, IAMTECH © ${pub.year}
          </div>
        </body>
        </html>
      `;
    } else {
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            body {
              font-family: 'Courier New', Courier, monospace;
              color: #0f172a;
              line-height: 1.5;
              padding: 24px;
              margin: 0;
              background-color: #fafaf9;
              font-size: ${computedSize}px;
            }
            .title {
              font-weight: bold;
              font-size: ${titleSize}px;
              border-bottom: 2px dashed #0f172a;
              padding-bottom: 8px;
              margin-bottom: 16px;
              text-transform: uppercase;
            }
            .meta-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 16px;
            }
            .meta-table th, .meta-table td {
              border: 1px solid #cbd5e1;
              padding: 6px 10px;
              text-align: left;
            }
            .meta-table th {
              background-color: #f1f5f9;
              font-weight: bold;
              width: 35%;
            }
            .section-title {
              font-weight: bold;
              text-transform: uppercase;
              margin-top: 24px;
              margin-bottom: 8px;
              background-color: #334155;
              color: #ffffff;
              padding: 4px 8px;
            }
            .system-log {
              background-color: #1e293b;
              color: #38bdf8;
              padding: 12px;
              font-size: ${computedSizeSmall}px;
              border-radius: 4px;
              overflow-x: auto;
              white-space: pre-wrap;
              word-break: break-all;
            }
          </style>
        </head>
        <body>
          <div class="title">System Index Entry / Metadata</div>
          
          <table class="meta-table">
            <tr>
              <th>METADATA KEY</th>
              <th>SYSTEM RECORD VALUE</th>
            </tr>
            <tr>
              <td>RECORD_ID</td>
              <td>${pub.id}</td>
            </tr>
            <tr>
              <td>DOCUMENT_TITLE</td>
              <td>${pub.title}</td>
            </tr>
            <tr>
              <td>PRIMARY_AUTHORS</td>
              <td>${pub.authors}</td>
            </tr>
            <tr>
              <td>YEAR_INDEXED</td>
              <td>${pub.year}</td>
            </tr>
            <tr>
              <td>JOURNAL_AFFILIATION</td>
              <td>${pub.journal || 'Unspecified'}</td>
            </tr>
            <tr>
              <td>PUBLISHER</td>
              <td>${pub.publisher || 'Not Registered'}</td>
            </tr>
            <tr>
              <td>DOI_LEDGER_URL</td>
              <td>${pub.doi ? `https://doi.org/${pub.doi}` : 'None'}</td>
            </tr>
            <tr>
              <td>CATEGORY_TAG</td>
              <td>${pub.category.toUpperCase()}</td>
            </tr>
          </table>

          <div class="section-title">Cryptographic Integrity Log</div>
          <div class="system-log">[SYSTEM LOG - ${new Date().toISOString()}]
Checking database record matching...
Record state: verified
SHA-256 Checksum: c23ef983ab7f8ce073cde8fa92842e4726bf62b10a28373bf911acdb21a20a1f
MD5 Validation: verified
Access Control: Public / Open-Access
Status: Active index</div>
        </body>
        </html>
      `;
    }
  };

  // Extract unique years for filtering
  const years = Array.from(new Set(publications.map(p => p.year.toString()))).sort((a, b) => b.localeCompare(a));

  // Category map
  const categories = [
    { id: 'all', label: 'All Document Types' },
    { id: 'journal-article', label: 'Journal Articles' },
    { id: 'conference-paper', label: 'Conference Papers' },
    { id: 'book-chapter', label: 'Book Chapters' }
  ];

  // Filtering logic
  const filteredPubs = publications.filter((pub) => {
    const matchesSearch = 
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      pub.abstract.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || pub.category === selectedCategory;
    const matchesYear = selectedYear === 'all' || pub.year.toString() === selectedYear;

    return matchesSearch && matchesCategory && matchesYear;
  });

  // Citation string generators
  const getAPAStyle = (pub: Publication) => {
    const journalStr = pub.journal ? `*${pub.journal}*` : '';
    const publisherStr = pub.publisher ? `, ${pub.publisher}` : '';
    const doiStr = pub.doi ? ` https://doi.org/${pub.doi}` : '';
    return `${pub.authors} (${pub.year}). ${pub.title}. ${journalStr}${publisherStr}.${doiStr}`;
  };

  const getHarvardStyle = (pub: Publication) => {
    const journalStr = pub.journal ? `, *${pub.journal}*` : '';
    const publisherStr = pub.publisher ? `, ${pub.publisher}` : '';
    return `${pub.authors.replace(/,/g, '')}, ${pub.year}. '${pub.title}', ${journalStr}${publisherStr}.`;
  };

  const getBibTeXStyle = (pub: Publication) => {
    return `@article{sawaneh${pub.year}${pub.id.split('-')[1] || ''},\n  author = {${pub.authors}},\n  title = {${pub.title}},\n  journal = {${pub.journal || 'Academic Repository'}},\n  year = {${pub.year}},\n  doi = {${pub.doi || ''}}\n}`;
  };

  const handleCopyCitation = (text: string, format: string) => {
    navigator.clipboard.writeText(text);
    setCopiedFormat(format);
    setTimeout(() => setCopiedFormat(null), 2000);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestEmail) return;
    setRequestSuccess(true);
    setTimeout(() => {
      setRequestSuccess(false);
      setRequestPub(null);
      setRequestEmail('');
    }, 3000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Page Title */}
      <div className="mb-12 border-b border-editorial-border pb-6 text-center lg:text-left">
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Mini-Academic Repository</span>
        <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
          Research Publications & Papers
        </h2>
        <p className="mt-2 text-sm text-slate-500 font-mono">
          Filter, search, and export citations for Ing. Dr. Sawaneh’s peer-reviewed studies.
        </p>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="border border-editorial-border bg-white p-5 shadow-xs">
            <h3 className="font-serif text-sm font-bold text-editorial-navy mb-4 uppercase tracking-wider flex items-center gap-2 border-b border-editorial-border-light pb-2.5">
              <Filter className="h-4 w-4 text-editorial-gold" />
              Repository Filters
            </h3>

            {/* Publication Type Categories */}
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold">Document Type</span>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between text-left px-3 py-2 text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-editorial-navy text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-editorial-navy'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <span className="h-1.5 w-1.5 bg-editorial-gold"></span>}
                </button>
              ))}
            </div>

            {/* Publication Year Filter */}
            <div className="mt-6 pt-6 border-t border-editorial-border-light">
              <span className="block text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-2 font-bold">Filter by Year</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full text-xs font-semibold border border-editorial-border p-2.5 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-editorial-navy"
              >
                <option value="all">All Years</option>
                {years.map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Clear Filters helper */}
            {(searchTerm || selectedCategory !== 'all' || selectedYear !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedYear('all');
                }}
                className="w-full mt-6 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] uppercase tracking-wider font-bold transition-colors cursor-pointer"
              >
                Clear Active Filters
              </button>
            )}
          </div>

          {/* Academic Profile Export */}
          <div className="border border-editorial-border bg-editorial-navy p-5 text-white shadow-xs text-center">
            <h4 className="font-serif text-sm font-semibold text-editorial-gold uppercase tracking-wide">Need the full CV file?</h4>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed font-sans">
              Dr. Sawaneh regularly updates his detailed professional dossier.
            </p>
            <button
              onClick={() => {
                const cvBtn = document.getElementById('nav-item-cv');
                if (cvBtn) cvBtn.click();
              }}
              className="mt-4 w-full py-2.5 bg-white text-editorial-navy text-[10px] uppercase tracking-widest font-bold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Export Structured CV
            </button>
          </div>
        </div>

        {/* Publications Stream */}
        <div className="lg:col-span-3 space-y-6">
          <ResearchImpactChart publications={publications} />

          {/* Search bar */}
          <div className="relative border border-editorial-border bg-white p-2.5 shadow-xs flex items-center">
            <Search className="absolute left-6 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by keywords, titles, abstract strings, or co-authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50/70 border border-editorial-border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-editorial-navy"
            />
          </div>

          {/* List Statistics */}
          <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 px-1 uppercase tracking-wider font-bold">
            <span>Showing {filteredPubs.length} of {publications.length} Repository Entries</span>
            {selectedCategory !== 'all' && <span className="capitalize">Filtered: {selectedCategory.replace('-', ' ')}</span>}
          </div>

          {/* Publications List */}
          {filteredPubs.length > 0 ? (
            <div className="space-y-4">
              {filteredPubs.map((pub) => (
                <div 
                  key={pub.id}
                  className="border border-editorial-border bg-white p-6 shadow-xs hover:border-editorial-gold transition-all duration-300"
                >
                  {/* Category and Year Meta row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3.5 text-[10px] font-mono uppercase tracking-wider font-bold">
                    <span className={`px-2.5 py-1 ${
                      pub.category === 'journal-article' ? 'bg-[#F1F4F8] text-editorial-navy' :
                      pub.category === 'conference-paper' ? 'bg-amber-50 text-editorial-gold' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {pub.category === 'journal-article' ? 'Journal Article' :
                       pub.category === 'conference-paper' ? 'Conference Paper' :
                       pub.category === 'book-chapter' ? 'Book Chapter' : 'Research Report'}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Calendar className="h-3.5 w-3.5" />
                      {pub.year}
                    </span>
                    {pub.doi && (
                      <span className="text-slate-400 truncate max-w-xs hidden sm:inline">
                        DOI: {pub.doi}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 
                    id={`pub-title-click-${pub.id}`}
                    onClick={() => {
                      setActivePreviewPub(pub);
                      setPreviewMode('preprint');
                      setZoomLevel(100);
                    }}
                    className="cursor-pointer font-serif text-lg font-bold text-editorial-navy leading-snug hover:text-editorial-gold transition-colors"
                    title="Click to view full publication details and document preview"
                  >
                    {pub.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-xs font-semibold text-slate-700 mt-2 flex items-center gap-1.5 font-sans">
                    <Users className="h-3.5 w-3.5 text-slate-400" />
                    {pub.authors}
                  </p>

                  {/* Journal or Publisher */}
                  {pub.journal && (
                    <p className="text-xs italic text-slate-500 mt-1 font-serif">
                      Published in: {pub.journal} {pub.publisher ? `— ${pub.publisher}` : ''}
                    </p>
                  )}

                  <div className="mt-4 bg-[#FBFBF9] p-4 border border-editorial-border-light">
                    <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 block mb-1 font-bold">Abstract Summary</span>
                    <div className="text-xs leading-relaxed text-slate-600 font-sans line-clamp-3 hover:line-clamp-none transition-all cursor-help prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: pub.abstract }} />
                  </div>

                  {/* Keywords Tag block */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
                    <Hash className="h-3 w-3 text-slate-300" />
                    {pub.keywords.map((keyword, idx) => (
                      <span key={idx} className="text-[9px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 uppercase tracking-wide">
                        {keyword}
                      </span>
                    ))}
                  </div>

                  {/* Card Actions Footer */}
                  <div className="mt-5 pt-4 border-t border-editorial-border-light flex flex-wrap items-center gap-4 justify-between">
                    <div className="flex flex-wrap items-center gap-4">
                      <button
                        id={`pub-preview-btn-${pub.id}`}
                        onClick={() => {
                          setActivePreviewPub(pub);
                          setPreviewMode('preprint');
                          setZoomLevel(100);
                        }}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-editorial-navy transition-colors cursor-pointer"
                      >
                        <BookOpen className="h-3 w-3 text-editorial-gold" />
                        Preview Document
                      </button>

                      <button
                        id={`pub-cite-btn-${pub.id}`}
                        onClick={() => setActiveCitationPub(pub)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-navy hover:text-editorial-gold transition-colors cursor-pointer"
                      >
                        <Quote className="h-3 w-3" />
                        Cite Paper
                      </button>

                      <button
                        id={`pub-request-btn-${pub.id}`}
                        onClick={() => setRequestPub(pub)}
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-editorial-navy transition-colors cursor-pointer"
                      >
                        <FileText className="h-3 w-3" />
                        Request Copy
                      </button>
                    </div>

                    {pub.link && (
                      <a
                        href={pub.link}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-editorial-gold hover:text-editorial-navy transition-colors"
                      >
                        Source Journal
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-dashed border-editorial-border p-12 text-center bg-white">
              <BookOpen className="mx-auto h-10 w-10 text-slate-300 mb-3" />
              <h3 className="font-serif text-base font-bold text-slate-800">No Publications Found</h3>
              <p className="text-xs text-slate-500 mt-1 font-sans">
                Try clearing your active filters or modifying your search keywords.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* CITE PAPER MODAL */}
      {activeCitationPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-2xl w-full p-6 shadow-2xl border border-editorial-border relative animate-in zoom-in-95 duration-150">
            <h3 className="font-serif text-lg font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-5 flex items-center gap-2">
              <Quote className="h-5 w-5 text-editorial-gold" />
              Academic Citation Generator
            </h3>

            <div className="space-y-4">
              {/* APA Style block */}
              <div className="p-3.5 bg-[#FBFBF9] border border-editorial-border relative group">
                <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">APA Reference Standard</span>
                <p className="text-xs text-slate-700 font-serif mt-1.5 pr-14 select-all leading-relaxed">
                  {getAPAStyle(activeCitationPub)}
                </p>
                <button
                  onClick={() => handleCopyCitation(getAPAStyle(activeCitationPub), 'apa')}
                  className="absolute right-3 top-3.5 p-1.5 bg-white border border-editorial-border hover:bg-slate-50 text-slate-500 cursor-pointer"
                >
                  {copiedFormat === 'apa' ? <Check className="h-4 w-4 text-emerald-600" /> : <Quote className="h-4 w-4" />}
                </button>
              </div>

              {/* Harvard Style block */}
              <div className="p-3.5 bg-[#FBFBF9] border border-editorial-border relative group">
                <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">Harvard Citation Style</span>
                <p className="text-xs text-slate-700 font-serif mt-1.5 pr-14 select-all leading-relaxed">
                  {getHarvardStyle(activeCitationPub)}
                </p>
                <button
                  onClick={() => handleCopyCitation(getHarvardStyle(activeCitationPub), 'harvard')}
                  className="absolute right-3 top-3.5 p-1.5 bg-white border border-editorial-border hover:bg-slate-50 text-slate-500 cursor-pointer"
                >
                  {copiedFormat === 'harvard' ? <Check className="h-4 w-4 text-emerald-600" /> : <Quote className="h-4 w-4" />}
                </button>
              </div>

              {/* BibTeX style */}
              <div className="p-3.5 bg-[#FBFBF9] border border-editorial-border relative group">
                <span className="block text-[9px] font-mono text-slate-400 uppercase font-bold tracking-widest">BibTeX (LaTeX / Overleaf)</span>
                <pre className="text-[10px] text-slate-600 font-mono mt-1.5 pr-14 overflow-x-auto whitespace-pre select-all">
                  {getBibTeXStyle(activeCitationPub)}
                </pre>
                <button
                  onClick={() => handleCopyCitation(getBibTeXStyle(activeCitationPub), 'bibtex')}
                  className="absolute right-3 top-3.5 p-1.5 bg-white border border-editorial-border hover:bg-slate-50 text-slate-500 cursor-pointer"
                >
                  {copiedFormat === 'bibtex' ? <Check className="h-4 w-4 text-emerald-600" /> : <Quote className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveCitationPub(null)}
                className="px-5 py-2.5 bg-editorial-navy hover:bg-editorial-navy/90 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer"
              >
                Close Citation Panel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST FULL TEXT MODAL */}
      {requestPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white max-w-md w-full p-6 shadow-2xl border border-editorial-border relative animate-in zoom-in-95 duration-150">
            <h3 className="font-serif text-lg font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-editorial-gold" />
              Request Academic Full-Text
            </h3>

            {requestSuccess ? (
              <div className="text-center py-6">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3.5">
                  <Check className="h-6 w-6 animate-bounce" />
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900">Request Dispatched</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto font-sans">
                  An automated academic copy link will be relayed to your address after administrative approval.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs font-sans">
                <div className="p-3 bg-[#F1F4F8] border border-editorial-border-light text-slate-600">
                  You are requesting full-text pre-print for: <strong className="text-editorial-navy block mt-1">{requestPub.title}</strong>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Your Institutional Email</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. researcher@university.edu"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    className="w-full text-xs p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Intended Usage Profile</label>
                  <select
                    value={requestPurpose}
                    onChange={(e) => setRequestPurpose(e.target.value)}
                    className="w-full text-xs p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy"
                  >
                    <option value="Research">Academic Research / Citing</option>
                    <option value="Teaching">Higher Education Syllabus Integration</option>
                    <option value="Review">Journal Peer-Reviewing</option>
                    <option value="Personal">Personal Technical Enlightenment</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setRequestPub(null)}
                    className="flex-1 py-2.5 border border-editorial-border text-slate-700 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-editorial-navy hover:bg-editorial-navy/90 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Send className="h-3 w-3 text-editorial-gold" />
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* DOCUMENT PREVIEW & DETAILS MODAL */}
      {activePreviewPub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div 
            id="publication-preview-modal-container"
            className="bg-white max-w-6xl w-full max-h-[90vh] md:h-[80vh] flex flex-col md:flex-row shadow-2xl border border-editorial-border relative animate-in zoom-in-95 duration-150 overflow-hidden rounded-none"
          >
            {/* Left Panel: Scholarly Details */}
            <div className="w-full md:w-5/12 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-editorial-border-light overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#C5A059] bg-amber-50 px-2 py-0.5 border border-amber-100">
                    {activePreviewPub.category.replace('-', ' ')}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">{activePreviewPub.year} Registry Entry</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-editorial-navy leading-snug">
                  {activePreviewPub.title}
                </h3>

                <p className="text-xs text-slate-600 font-semibold font-sans flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-slate-400" />
                  {activePreviewPub.authors}
                </p>

                {activePreviewPub.journal && (
                  <p className="text-xs text-slate-500 font-serif italic border-l-2 border-editorial-gold pl-3 py-0.5">
                    Published: {activePreviewPub.journal} {activePreviewPub.publisher ? `— ${activePreviewPub.publisher}` : ''}
                  </p>
                )}

                <div className="pt-4 border-t border-editorial-border-light space-y-2.5">
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">System Abstract</h4>
                  <div className="text-xs leading-relaxed text-slate-600 font-sans text-justify prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: activePreviewPub.abstract }} />
                </div>

                {activePreviewPub.keywords && (
                  <div className="pt-4 space-y-2">
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold">Classified Keywords</h4>
                    <div className="flex flex-wrap gap-1">
                      {activePreviewPub.keywords.map((kw, i) => (
                        <span key={i} className="text-[9px] font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 uppercase tracking-wide">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons inside Details Panel */}
              <div className="pt-6 border-t border-editorial-border-light mt-6 flex flex-wrap gap-3">
                <button
                  id="preview-action-cite"
                  onClick={() => {
                    setActiveCitationPub(activePreviewPub);
                    setActivePreviewPub(null);
                  }}
                  className="flex-1 py-2.5 bg-[#F1F4F8] hover:bg-slate-200 text-editorial-navy text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-none border border-editorial-navy/10"
                >
                  <Quote className="h-3.5 w-3.5 text-editorial-gold" />
                  Cite Paper
                </button>
                <button
                  id="preview-action-request"
                  onClick={() => {
                    setRequestPub(activePreviewPub);
                    setActivePreviewPub(null);
                  }}
                  className="flex-1 py-2.5 bg-editorial-navy hover:bg-editorial-navy/90 text-white text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-none"
                >
                  <FileText className="h-3.5 w-3.5 text-editorial-gold" />
                  Request copy
                </button>
              </div>
            </div>

            {/* Right Panel: Dynamic PDF Frame Simulator */}
            <div className="w-full md:w-7/12 bg-slate-100 flex flex-col overflow-hidden relative">
              {/* PDF Reader Toolbar */}
              <div className="bg-slate-800 text-white p-2.5 flex flex-wrap items-center justify-between border-b border-slate-700 gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-red-600 rounded-xs text-[9px] font-mono font-bold tracking-wider leading-none text-white animate-pulse">PDF</div>
                  <span className="text-[10px] font-mono text-slate-300 truncate max-w-[150px] sm:max-w-[200px]" title={`sawaneh_excerpt_${activePreviewPub.id}.pdf`}>
                    sawaneh_preprint_${activePreviewPub.id.slice(0,8)}.pdf
                  </span>
                </div>

                {/* Switch Document Mode */}
                <div className="flex bg-slate-900 p-0.5 border border-slate-700 rounded-xs text-[9px] font-mono uppercase font-bold tracking-wider">
                  <button
                    id="pdf-mode-preprint"
                    onClick={() => setPreviewMode('preprint')}
                    className={`px-2 py-1 cursor-pointer transition-colors ${previewMode === 'preprint' ? 'bg-[#C5A059] text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Excerpt
                  </button>
                  <button
                    id="pdf-mode-metadata"
                    onClick={() => setPreviewMode('metadata')}
                    className={`px-2 py-1 cursor-pointer transition-colors ${previewMode === 'metadata' ? 'bg-[#C5A059] text-white' : 'text-slate-400 hover:text-white'}`}
                  >
                    Indexing
                  </button>
                </div>

                {/* PDF Reader Controls */}
                <div className="flex items-center gap-1.5">
                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 p-0.5 rounded-xs">
                    <button
                      id="pdf-zoom-out"
                      onClick={() => setZoomLevel(prev => Math.max(80, prev - 10))}
                      disabled={zoomLevel <= 80}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ZoomOut className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[9px] font-mono font-bold px-1 min-w-[32px] text-center">{zoomLevel}%</span>
                    <button
                      id="pdf-zoom-in"
                      onClick={() => setZoomLevel(prev => Math.min(140, prev + 10))}
                      disabled={zoomLevel >= 140}
                      className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    >
                      <ZoomIn className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Print and Download simulation */}
                  <button
                    id="pdf-action-print"
                    onClick={() => {
                      setPrintSuccess(true);
                      setTimeout(() => setPrintSuccess(false), 2500);
                    }}
                    className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xs transition-colors cursor-pointer relative"
                    title="Print Document Excerpt"
                  >
                    <Printer className="h-4 w-4" />
                  </button>
                  <button
                    id="pdf-action-download"
                    onClick={() => {
                      const link = document.createElement('a');
                      const fileContent = generatePreviewSrcDoc(activePreviewPub, previewMode, zoomLevel);
                      const blob = new Blob([fileContent], { type: 'text/html' });
                      link.href = URL.createObjectURL(blob);
                      link.download = `sawaneh_${previewMode}_${activePreviewPub.id.slice(0, 8)}.html`;
                      link.click();
                    }}
                    className="p-1.5 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xs transition-colors cursor-pointer"
                    title="Download Excerpt HTML File"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* PDF Print Toast */}
              {printSuccess && (
                <div className="absolute top-16 right-4 z-20 bg-emerald-600 text-white text-[10px] font-mono uppercase tracking-widest font-bold py-2 px-3.5 shadow-md flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
                  <Check className="h-3.5 w-3.5" />
                  Sending excerpt to printer spooler...
                </div>
              )}

              {/* Iframe Viewport Container */}
              <div className="flex-grow p-4 overflow-auto flex justify-center items-start bg-slate-500/10">
                <div className="w-full max-w-2xl bg-white shadow-lg border border-slate-300 my-2 aspect-[1/1.414]">
                  <iframe
                    id="document-preprint-iframe"
                    title="Preprint Excerpt Viewer"
                    srcDoc={generatePreviewSrcDoc(activePreviewPub, previewMode, zoomLevel)}
                    className="w-full h-full border-none"
                    sandbox="allow-same-origin"
                  />
                </div>
              </div>

              {/* Close Overlay helper */}
              <button
                id="close-preview-modal-top"
                onClick={() => setActivePreviewPub(null)}
                className="absolute top-3.5 right-3.5 md:static md:hidden p-1 bg-black/50 text-white hover:bg-black/70 rounded-full cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Desktop Modal Close button */}
            <button
              id="close-preview-modal-desktop"
              onClick={() => setActivePreviewPub(null)}
              className="absolute top-3 right-3 hidden md:flex p-1 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 border border-slate-200 rounded-none cursor-pointer transition-colors z-30"
              title="Close Details Panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
