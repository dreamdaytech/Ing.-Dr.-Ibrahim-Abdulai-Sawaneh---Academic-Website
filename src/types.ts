export interface Publication {
  id: string;
  title: string;
  authors: string;
  year: number;
  journal?: string;
  publisher?: string;
  abstract: string;
  keywords: string[];
  category: 'journal-article' | 'conference-paper' | 'research-report' | 'working-paper' | 'book-chapter';
  doi?: string;
  link?: string;
  pdfUrl?: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  year: number;
  publisher: string;
  isbn?: string;
  coverColor: string; // Tailored gradient/color for academic book covers
  synopsis: string;
  whyItMatters: string;
  tableOfContents: string[];
  reviews?: { author: string; role: string; text: string }[];
  purchaseUrl?: string;
  pdfExcerptUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string; // Support markdown or structured sections
  imageColor: string;
  author: string;
}

export interface TalkEvent {
  id: string;
  title: string;
  type: 'Keynote' | 'Guest Lecture' | 'Conference Presentation' | 'Panel Discussion' | 'Seminar';
  eventName: string;
  date: string;
  location: string;
  role: string;
  summary: string;
  link?: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  institution: string;
  category: 'education' | 'appointment' | 'leadership' | 'award' | 'research';
  description?: string;
}

export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  icon: string; // name of lucide icon
  keyTopics: string[];
}

export interface GalleryCategory {
  id: string;
  name: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption: string;
  category: string;
  order: number;
}
