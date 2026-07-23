import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { Menu, X, ChevronDown, Search, BookOpen, FileText } from 'lucide-react';
import { Publication, BlogPost } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  publications?: Publication[];
  blogPosts?: BlogPost[];
  onSelectPublication?: (id: string | null) => void;
  onSelectBlogPost?: (id: string | null) => void;
  heroInfo?: any;
}

interface SubmenuItem {
  id: string;
  label: string;
  desc: string;
}

interface NavItem {
  id: string;
  label: string;
  submenu?: SubmenuItem[];
}


const formatImgUrl = (url?: string | null) => {
  if (!url) return '';
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) {
    return `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1000`;
  }
  return url;
};

export default function Navbar({ 
  activeTab, 
  setActiveTab,
  publications = [],
  blogPosts = [],
  onSelectPublication,
  onSelectBlogPost,
  heroInfo = {}
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);
  const [mobileOpenSubmenus, setMobileOpenSubmenus] = useState<Record<string, boolean>>({});

  // Global Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchResults = (() => {
    if (!searchQuery.trim()) return { publications: [], blogPosts: [] };
    const q = searchQuery.toLowerCase().trim();
    
    const matchedPubs = publications.filter(pub => 
      pub.title.toLowerCase().includes(q) ||
      pub.authors.toLowerCase().includes(q) ||
      pub.abstract.toLowerCase().includes(q) ||
      pub.keywords.some(k => k.toLowerCase().includes(q))
    ).slice(0, 5);

    const matchedBlogs = blogPosts.filter(post => 
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      post.content.toLowerCase().includes(q)
    ).slice(0, 5);

    return { publications: matchedPubs, blogPosts: matchedBlogs };
  })();

  const hasResults = searchResults.publications.length > 0 || searchResults.blogPosts.length > 0;

  const navItems: NavItem[] = [
    { id: 'home', label: 'Home' },
    { 
      id: 'about', 
      label: 'About', 
      submenu: [
        { id: 'about', label: 'Biography', desc: 'Full profile & academic philosophy' },
        { id: 'cv', label: 'Curriculum Vitae (CV)', desc: 'Official academic CV & service registry' },
        { id: 'gallery', label: 'Gallery', desc: 'Photo gallery and visual highlights' }
      ]
    },
    { id: 'research', label: 'Research' },
    { id: 'books', label: 'Books' },
    {
      id: 'insights',
      label: 'Insights & Media',
      submenu: [
        { id: 'blog', label: 'Insights Blog', desc: 'Scholarly articles, analytical notes, and guidance' },
        { id: 'media', label: 'Talks & Media', desc: 'Conference keynotes, presentations, and recordings' }
      ]
    }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsOpen(false);
    setHoveredItemId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-editorial-border bg-white/95 backdrop-blur-xs no-print">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo / Scholar Name */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center shrink-0">
              <img src={heroInfo?.logoUrl ? formatImgUrl(heroInfo.logoUrl) : logoImg} referrerPolicy="no-referrer" alt="IAS Logo" className="h-full w-full object-contain" />
            </div>
            <div>
              <span 
                onClick={() => handleNavClick('home')}
                className="block cursor-pointer font-serif text-lg font-bold tracking-tight text-editorial-navy hover:text-editorial-navy/90 transition-colors"
              >
                Ing. Dr. Ibrahim A. Sawaneh
              </span>
              <span className="block text-[9px] font-mono tracking-widest text-slate-500 uppercase leading-none mt-0.5">
                Academic & Professional Engineer
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-5">
            {navItems.map((item) => {
              if (item.submenu) {
                const isActive = item.submenu.some(sub => sub.id === activeTab);
                const isHovered = hoveredItemId === item.id;
                return (
                  <div
                    key={item.id}
                    className="relative py-5"
                    onMouseEnter={() => setHoveredItemId(item.id)}
                    onMouseLeave={() => setHoveredItemId(null)}
                  >
                    <button
                      id={`nav-item-${item.id}`}
                      className={`px-1 py-1 text-[11px] uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer inline-flex items-center gap-1 ${
                        isActive
                          ? 'text-editorial-navy border-b-2 border-editorial-navy'
                          : 'text-slate-500 hover:text-editorial-navy'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isHovered ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Dropdown Panel */}
                    {isHovered && (
                      <div className="absolute left-0 mt-3 w-64 bg-white border border-editorial-border shadow-xl py-2 px-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150 rounded-none">
                        {item.submenu.map((sub) => {
                          const isSubActive = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              id={`submenu-item-${sub.id}`}
                              className={`w-full text-left px-3 py-2 text-xs transition-colors hover:bg-slate-50 flex flex-col gap-0.5 ${
                                isSubActive ? 'bg-amber-50/50 border-l-2 border-editorial-gold' : 'border-l-2 border-transparent'
                              }`}
                            >
                              <span className={`font-serif font-bold ${isSubActive ? 'text-editorial-gold' : 'text-editorial-navy'}`}>
                                {sub.label}
                              </span>
                              <span className="text-[10px] text-slate-400 font-sans font-normal leading-normal">
                                {sub.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`nav-item-${item.id}`}
                  className={`px-1 py-2 text-[11px] uppercase tracking-[0.15em] font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'text-editorial-navy border-b-2 border-editorial-navy'
                      : 'text-slate-500 hover:text-editorial-navy'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Global Search Bar (Desktop) */}
          <div ref={searchRef} className="hidden lg:block relative max-w-xs w-48 xl:w-64">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-3.5 w-3.5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search publications & blog..."
              value={searchQuery}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-editorial-border py-1.5 pl-9 pr-3 text-xs font-sans text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-editorial-navy transition-all"
            />
            
            {/* Desktop Search Results Dropdown Overlay */}
            {isSearchFocused && searchQuery.trim() && (
              <div className="absolute top-full right-0 mt-2 w-[380px] bg-white border border-editorial-border shadow-2xl z-50 py-3 px-1.5 animate-in fade-in slide-in-from-top-2 duration-150 rounded-none max-h-[380px] overflow-y-auto">
                {hasResults ? (
                  <div className="space-y-4">
                    {searchResults.publications.length > 0 && (
                      <div>
                        <div className="px-3 pb-1.5 mb-1.5 border-b border-editorial-border-light">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Research Publications ({searchResults.publications.length})</span>
                        </div>
                        <div className="space-y-1">
                          {searchResults.publications.map((pub) => (
                            <button
                              key={pub.id}
                              onClick={() => {
                                onSelectPublication?.(pub.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors flex gap-2.5 items-start border-l-2 border-transparent hover:border-editorial-gold cursor-pointer"
                            >
                              <BookOpen className="h-3.5 w-3.5 text-editorial-gold shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-[11px] font-bold text-editorial-navy leading-snug hover:text-editorial-gold truncate">
                                  {pub.title}
                                </span>
                                <span className="block text-[9px] text-slate-400 font-sans mt-0.5 leading-none">
                                  {pub.authors} ({pub.year})
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {searchResults.blogPosts.length > 0 && (
                      <div>
                        <div className="px-3 pb-1.5 mb-1.5 border-b border-editorial-border-light">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Insights & Blog ({searchResults.blogPosts.length})</span>
                        </div>
                        <div className="space-y-1">
                          {searchResults.blogPosts.map((post) => (
                            <button
                              key={post.id}
                              onClick={() => {
                                onSelectBlogPost?.(post.id);
                                setSearchQuery('');
                                setIsSearchFocused(false);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors flex gap-2.5 items-start border-l-2 border-transparent hover:border-editorial-navy cursor-pointer"
                            >
                              <FileText className="h-3.5 w-3.5 text-editorial-navy shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-[11px] font-bold text-editorial-navy leading-snug hover:text-editorial-gold truncate">
                                  {post.title}
                                </span>
                                <span className="block text-[9px] text-slate-400 font-sans mt-0.5 leading-none">
                                  {post.category} • {post.date}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="px-3 py-4 text-center">
                    <Search className="mx-auto h-5 w-5 text-slate-300 mb-2" />
                    <p className="text-[11px] text-slate-500 font-serif italic">No matching scholarly records or insights found</p>
                    <p className="text-[9px] text-slate-400 font-sans mt-1">Try searching for keywords like "cyber", "e-learning", or "disaster".</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action button in Editorial style */}
          <div className="hidden lg:block">
            <button
              onClick={() => handleNavClick('contact')}
              className="px-5 py-2.5 bg-editorial-navy hover:bg-editorial-navy/90 text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer"
            >
              Collaborate
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              id="mobile-menu-toggle"
              className="inline-flex items-center justify-center p-2 text-slate-500 hover:bg-slate-50 hover:text-editorial-navy focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-editorial-border bg-white shadow-lg animate-in fade-in slide-in-from-top-5 duration-200">
          <div className="space-y-1 px-2 pb-4 pt-2">
            {/* Mobile Search Bar */}
            <div className="px-4 py-2 border-b border-editorial-border-light mb-2">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search publications & blog posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-50 border border-editorial-border py-2 pl-10 pr-3 text-xs font-sans text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-editorial-navy transition-all"
                />
              </div>

              {/* Mobile Search Results list */}
              {searchQuery.trim() && (
                <div className="mt-2 bg-white border border-editorial-border max-h-60 overflow-y-auto py-2 px-1 divide-y divide-slate-100">
                  {hasResults ? (
                    <>
                      {searchResults.publications.length > 0 && (
                        <div className="py-1">
                          <div className="px-2 pb-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Research ({searchResults.publications.length})</span>
                          </div>
                          {searchResults.publications.map((pub) => (
                            <button
                              key={pub.id}
                              onClick={() => {
                                onSelectPublication?.(pub.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-2 py-1.5 hover:bg-slate-50 transition-colors flex gap-2 items-start cursor-pointer"
                            >
                              <BookOpen className="h-3.5 w-3.5 text-editorial-gold shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-xs font-bold text-editorial-navy leading-tight truncate">
                                  {pub.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}

                      {searchResults.blogPosts.length > 0 && (
                        <div className="py-1">
                          <div className="px-2 pb-1">
                            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-400">Blog ({searchResults.blogPosts.length})</span>
                          </div>
                          {searchResults.blogPosts.map((post) => (
                            <button
                              key={post.id}
                              onClick={() => {
                                onSelectBlogPost?.(post.id);
                                setSearchQuery('');
                                setIsOpen(false);
                              }}
                              className="w-full text-left px-2 py-1.5 hover:bg-slate-50 transition-colors flex gap-2 items-start cursor-pointer"
                            >
                              <FileText className="h-3.5 w-3.5 text-editorial-navy shrink-0 mt-0.5" />
                              <div className="min-w-0 flex-1">
                                <span className="block font-serif text-xs font-bold text-editorial-navy leading-tight truncate">
                                  {post.title}
                                </span>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="px-2 py-3 text-center text-[10px] text-slate-500 font-serif italic">
                      No matching records found.
                    </div>
                  )}
                </div>
              )}
            </div>

            {navItems.map((item) => {
              if (item.submenu) {
                const isActive = item.submenu.some(sub => sub.id === activeTab);
                const isMobileOpen = !!mobileOpenSubmenus[item.id];
                return (
                  <div key={item.id} className="w-full">
                    <button
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => setMobileOpenSubmenus(prev => ({ ...prev, [item.id]: !prev[item.id] }))}
                      className={`flex w-full items-center justify-between px-4 py-3 text-xs uppercase tracking-widest font-semibold transition-colors ${
                        isActive
                          ? 'bg-slate-50 text-editorial-navy border-l-2 border-editorial-navy'
                          : 'text-slate-600 hover:bg-slate-50/50 hover:text-editorial-navy'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isMobileOpen ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {/* Collapsible Submenu */}
                    {isMobileOpen && (
                      <div className="bg-slate-50/60 pl-6 pr-4 py-1.5 border-l-2 border-editorial-border space-y-1">
                        {item.submenu.map((sub) => {
                          const isSubActive = activeTab === sub.id;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleNavClick(sub.id)}
                              id={`mobile-submenu-item-${sub.id}`}
                              className={`block w-full text-left py-2.5 px-3 text-[11px] uppercase tracking-widest font-medium transition-colors ${
                                isSubActive
                                  ? 'text-editorial-gold font-bold'
                                  : 'text-slate-500 hover:text-editorial-navy'
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  id={`mobile-nav-item-${item.id}`}
                  className={`block w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-semibold transition-colors ${
                    isActive
                      ? 'bg-slate-50 text-editorial-navy border-l-2 border-editorial-navy'
                      : 'text-slate-600 hover:bg-slate-50/50 hover:text-editorial-navy'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="px-4 pt-2">
              <button
                onClick={() => handleNavClick('contact')}
                className="w-full text-center py-2.5 bg-editorial-navy text-white text-[10px] font-bold uppercase tracking-widest"
              >
                Collaborate
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
