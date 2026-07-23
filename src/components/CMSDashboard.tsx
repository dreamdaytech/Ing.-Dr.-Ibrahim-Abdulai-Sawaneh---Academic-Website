import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { Database, PlusCircle, CheckCircle2, ShieldAlert, Key, Layers, Layout, Edit, HardDrive, FileText, Check, Lock, User, Eye, EyeOff, LogOut, Trash2, BookOpen, Clock, Calendar, Award, Presentation, Briefcase, MapPin, ExternalLink, CloudLightning, RefreshCw, CheckCircle, Image as ImageIcon, Upload, Loader2, Search, Sparkles, Globe } from 'lucide-react';
import { CMS_MODELS_INFO, PUBLICATIONS, BOOKS, BLOG_POSTS, TALK_EVENTS, TIMELINE_EXPERIENCE, HERO_INFO, BIOGRAPHY_DETAILS } from '../data/academicData';
import { Publication, Book, BlogPost, TalkEvent, TimelineItem, GalleryImage } from '../types';
import { saveDocument, deleteDocument, seedDatabase, auth, uploadFile } from '../lib/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, createUserWithEmailAndPassword, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

interface CMSDashboardProps {
  publications: Publication[];
  setPublications: React.Dispatch<React.SetStateAction<Publication[]>>;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  blogPosts: BlogPost[];
  setBlogPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  talkEvents: TalkEvent[];
  setTalkEvents: React.Dispatch<React.SetStateAction<TalkEvent[]>>;
  timelineItems: TimelineItem[];
  setTimelineItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  isDbConnected: boolean;
  isDbLoading: boolean;
  heroInfo: any;
  setHeroInfo: React.Dispatch<React.SetStateAction<any>>;
  biographyDetails: any;
  setBiographyDetails: React.Dispatch<React.SetStateAction<any>>;
  galleryImages: GalleryImage[];
  setGalleryImages: React.Dispatch<React.SetStateAction<GalleryImage[]>>;
}

const quillModules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    ['link'],
    ['clean']
  ],
};

export default function CMSDashboard({
  publications,
  setPublications,
  books,
  setBooks,
  blogPosts,
  setBlogPosts,
  talkEvents,
  setTalkEvents,
  timelineItems,
  setTimelineItems,
  isDbConnected,
  isDbLoading,
  heroInfo,
  setHeroInfo,
  biographyDetails,
  setBiographyDetails,
  galleryImages,
  setGalleryImages
}: CMSDashboardProps) {
  // Authentication state persisted in sessionStorage and synced with Firebase Auth
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('sawaneh_cms_isLoggedIn') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Sync auth state using Firebase's onAuthStateChanged
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        sessionStorage.setItem('sawaneh_cms_isLoggedIn', 'true');
        sessionStorage.setItem('sawaneh_cms_login_type', 'firebase');
      } else {
        const loginType = sessionStorage.getItem('sawaneh_cms_login_type');
        if (loginType !== 'local') {
          setIsLoggedIn(false);
          sessionStorage.removeItem('sawaneh_cms_isLoggedIn');
          sessionStorage.removeItem('sawaneh_cms_login_type');
        }
      }
    });
    return () => unsubscribe();
  }, []);

  // Selected category model to manage
  const [activeModel, setActiveModel] = useState<'publications' | 'books' | 'blog' | 'cv' | 'talks' | 'profile' | 'gallery'>('publications');

  // Currently editing item ID (null if adding new)
  const [editingId, setEditingId] = useState<string | null>(null);

  // Common/All form field states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [authors, setAuthors] = useState('Sawaneh, I. A.');
  const [year, setYear] = useState('2026');
  const [publisher, setPublisher] = useState('');
  const [isbn, setIsbn] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [whyItMatters, setWhyItMatters] = useState('');
  const [tableOfContents, setTableOfContents] = useState('');
  const [category, setCategory] = useState('journal-article');
  const [doi, setDoi] = useState('');
  const [link, setLink] = useState('');
  const [abstract, setAbstract] = useState('');
  const [keywords, setKeywords] = useState('');
  
  // Blog / Talk specific states
  const [date, setDate] = useState('2026-07-04');
  const [readTime, setReadTime] = useState('5 min read');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [eventName, setEventName] = useState('');
  const [location, setLocation] = useState('Freetown, Sierra Leone');
  const [role, setRole] = useState('Keynote Speaker');
  const [institution, setInstitution] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('Keynote');

  // Gallery specific states
  const [imageUrl, setImageUrl] = useState('');
  const [imageCaption, setImageCaption] = useState('');
  const [imageCategory, setImageCategory] = useState('');
  const [imageOrder, setImageOrder] = useState('0');
  const [isUploading, setIsUploading] = useState(false);
  const [localPreviewUrl, setLocalPreviewUrl] = useState('');

  // Academic AI Publication Discovery States
  const [isDiscovering, setIsDiscovering] = useState(false);
  const [discoveredPubs, setDiscoveredPubs] = useState<any[]>([]);
  const [discoveredSources, setDiscoveredSources] = useState<any[]>([]);
  const [discoveryError, setDiscoveryError] = useState<string | null>(null);
  const [discoveryStatus, setDiscoveryStatus] = useState<string>('');
  const [publishingId, setPublishingId] = useState<string | null>(null);

  // Profile specific states
  const [profileName, setProfileName] = useState(heroInfo?.name || '');
  const [profileTitles, setProfileTitles] = useState(heroInfo?.titles?.join(', ') || '');
  const [profileTagline, setProfileTagline] = useState(heroInfo?.tagline || '');
  const [profileSummary, setProfileSummary] = useState(heroInfo?.summary || '');
  const [profileAvatarPlaceholder, setProfileAvatarPlaceholder] = useState(heroInfo?.avatarPlaceholder || '');
  const [profileGoogleScholar, setProfileGoogleScholar] = useState(heroInfo?.googleScholar || '');
  const [profileResearchGate, setProfileResearchGate] = useState(heroInfo?.researchGate || '');
  const [profileOrcid, setProfileOrcid] = useState(heroInfo?.orcid || '');
  const [profileLinkedin, setProfileLinkedin] = useState(heroInfo?.linkedin || '');
  const [profileEmail, setProfileEmail] = useState(heroInfo?.email || '');
  const [profilePhone, setProfilePhone] = useState(heroInfo?.phone || '');
  const [profileAddress, setProfileAddress] = useState(heroInfo?.address || '');

  const [profileIntroduction, setProfileIntroduction] = useState(biographyDetails?.introduction || '');
  const [profileLongForm, setProfileLongForm] = useState(biographyDetails?.longForm?.join('\n\n') || '');
  const [profileVision, setProfileVision] = useState(biographyDetails?.vision || '');
  const [profileMission, setProfileMission] = useState(biographyDetails?.mission || '');

  useEffect(() => {
    if (heroInfo) {
      setProfileName(heroInfo.name || '');
      setProfileTitles(heroInfo.titles?.join(', ') || '');
      setProfileTagline(heroInfo.tagline || '');
      setProfileSummary(heroInfo.summary || '');
      setProfileAvatarPlaceholder(heroInfo.avatarPlaceholder || '');
      setProfileGoogleScholar(heroInfo.googleScholar || '');
      setProfileResearchGate(heroInfo.researchGate || '');
      setProfileOrcid(heroInfo.orcid || '');
      setProfileLinkedin(heroInfo.linkedin || '');
      setProfileEmail(heroInfo.email || '');
      setProfilePhone(heroInfo.phone || '');
      setProfileAddress(heroInfo.address || '');
    }
  }, [heroInfo]);

  useEffect(() => {
    if (biographyDetails) {
      setProfileIntroduction(biographyDetails.introduction || '');
      setProfileLongForm(biographyDetails.longForm?.join('\n\n') || '');
      setProfileVision(biographyDetails.vision || '');
      setProfileMission(biographyDetails.mission || '');
    }
  }, [biographyDetails]);

  const [successMsg, setSuccessMsg] = useState(false);

  // Discovery Action Handlers
  const handleDiscoverPublications = async () => {
    setIsDiscovering(true);
    setDiscoveryError(null);
    setDiscoveredPubs([]);
    setDiscoveredSources([]);
    
    const messages = [
      "Establishing connection with Google Scholar & indexing pipelines...",
      "Querying global digital libraries for 'Ibrahim Abdulai Sawaneh'...",
      "Extracting publication titles, citations, and co-author arrays...",
      "Filtering academic duplicates and cross-referencing with local registry...",
      "Synthesizing abstracts and preparing records for administrative review..."
    ];
    
    let currentMsgIndex = 0;
    setDiscoveryStatus(messages[currentMsgIndex]);
    
    const interval = setInterval(() => {
      currentMsgIndex = (currentMsgIndex + 1) % messages.length;
      setDiscoveryStatus(messages[currentMsgIndex]);
    }, 2500);

    try {
      const response = await fetch('/api/discover-publications');
      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with ${response.status}`);
      }
      const data = await response.json();
      
      // Filter out publications that already exist (by matching titles lowercase)
      const existingTitles = new Set(publications.map(p => p.title.toLowerCase().trim()));
      const filtered = (data.publications || []).filter((p: any) => !existingTitles.has(p.title.toLowerCase().trim()));
      
      setDiscoveredPubs(filtered);
      setDiscoveredSources(data.sources || []);
      
      if (filtered.length === 0) {
        setDiscoveryError("Academic index is fully up to date. No new unindexed publications were found.");
      }
    } catch (err: any) {
      console.error(err);
      setDiscoveryError(err.message || "An unexpected error occurred during the academic query.");
    } finally {
      clearInterval(interval);
      setIsDiscovering(false);
    }
  };

  const handlePublishDiscovered = async (discovered: any) => {
    setPublishingId(discovered.title);
    try {
      const newId = `pub-discovered-${Date.now()}`;
      const newPub: Publication = {
        id: newId,
        title: discovered.title,
        authors: discovered.authors || "Sawaneh, I. A.",
        year: parseInt(discovered.year) || 2026,
        category: (discovered.category || 'journal-article') as any,
        journal: discovered.journal || "International Journal of Academic Research",
        abstract: discovered.abstract || "",
        keywords: ["Engineering", "Cybersecurity", "Sierra Leone"],
        doi: discovered.doi || undefined,
        link: discovered.link || undefined
      };

      await saveDocument('publications', newId, newPub);
      setPublications([newPub, ...publications]);
      
      // Remove from discovered list
      setDiscoveredPubs(prev => prev.filter(p => p.title !== discovered.title));
    } catch (err: any) {
      alert("Failed to publish record: " + err.message);
    } finally {
      setPublishingId(null);
    }
  };

  const handleEditDiscovered = (discovered: any) => {
    setEditingId(null);
    setTitle(discovered.title || '');
    setAuthors(discovered.authors || 'Sawaneh, I. A.');
    setYear(discovered.year ? discovered.year.toString() : '2026');
    setCategory(discovered.category || 'journal-article');
    setPublisher(discovered.journal || '');
    setAbstract(discovered.abstract || '');
    setDoi(discovered.doi || '');
    setLink(discovered.link || '');
    setKeywords("Engineering, Cybersecurity, Sierra Leone");
    
    // Scroll to form
    const formElement = document.getElementById("cms-form-section");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDismissDiscovered = (title: string) => {
    setDiscoveredPubs(prev => prev.filter(p => p.title !== title));
  };

  // Change Password states
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPasswordForChange, setCurrentPasswordForChange] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [changePasswordError, setChangePasswordError] = useState('');
  const [changePasswordSuccess, setChangePasswordSuccess] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePasswordError('');
    setChangePasswordSuccess('');

    if (newPassword !== confirmNewPassword) {
      setChangePasswordError('New passwords do not match.');
      return;
    }

    if (newPassword.length < 6) {
      setChangePasswordError('Password must be at least 6 characters long.');
      return;
    }

    setIsChangingPassword(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        // If they are in offline mode, we can show a simulated error or fallback
        throw new Error('Offline fallback mode active. To update live credentials, please authorize with a connection to the Firestore live database.');
      }

      const emailVal = user.email || 'admin@unimtech.edu.sl';

      // 1. Reauthenticate first to avoid requires-recent-login
      const credential = EmailAuthProvider.credential(emailVal, currentPasswordForChange);
      await reauthenticateWithCredential(user, credential);

      // 2. Update password
      await updatePassword(user, newPassword);

      setChangePasswordSuccess('Password updated successfully! Keep your credentials safe.');
      setCurrentPasswordForChange('');
      setNewPassword('');
      setConfirmNewPassword('');
      
      // Auto-close after 2.5 seconds
      setTimeout(() => {
        setShowChangePassword(false);
        setChangePasswordSuccess('');
      }, 2500);
    } catch (err: any) {
      console.error("Failed to change password:", err);
      if (err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setChangePasswordError('Invalid current password. Please re-type your current login password.');
      } else if (err.code === 'auth/requires-recent-login') {
        setChangePasswordError('This operation is sensitive and requires a recent login. Please sign out and sign in again.');
      } else {
        setChangePasswordError(err.message || 'Failed to change password. Please verify your current password and try again.');
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  // Live Database Push/Sync Status
  const [isPushingDemo, setIsPushingDemo] = useState(false);
  const [pushStatus, setPushStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handlePushDemoData = async () => {
    const confirmPush = window.confirm("Are you sure you want to push and overwrite remote Firestore collections with default scholarly records?");
    if (!confirmPush) return;

    try {
      setIsPushingDemo(true);
      setPushStatus('idle');
      await seedDatabase({
        publications: PUBLICATIONS,
        books: BOOKS,
        blogPosts: BLOG_POSTS,
        talkEvents: TALK_EVENTS,
        timelineItems: TIMELINE_EXPERIENCE,
        heroInfo: HERO_INFO,
        biographyDetails: BIOGRAPHY_DETAILS
      });
      setPublications(PUBLICATIONS);
      setBooks(BOOKS);
      setBlogPosts(BLOG_POSTS);
      setTalkEvents(TALK_EVENTS);
      setTimelineItems(TIMELINE_EXPERIENCE);
      setHeroInfo(HERO_INFO);
      setBiographyDetails(BIOGRAPHY_DETAILS);
      setPushStatus('success');
      setTimeout(() => setPushStatus('idle'), 3000);
    } catch (err) {
      console.error("Failed to seed database:", err);
      setPushStatus('error');
    } finally {
      setIsPushingDemo(false);
    }
  };

  // File repository simulation
  const digitalFiles = [
    { name: "cv_dr_sawaneh_full_dossier.pdf", size: "2.4 MB", type: "PDF / Curriculum", downloads: 1420 },
    { name: "disaster_policy_reduction_mediation_2025.pdf", size: "4.8 MB", type: "PDF / pre-print", downloads: 820 },
    { name: "role_of_cyber_security_postwar_sample.pdf", size: "1.6 MB", type: "PDF / book excerpt", downloads: 1250 },
    { name: "student_dissertation_dbms_unimtech_case.pdf", size: "3.2 MB", type: "PDF / pre-print", downloads: 640 }
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setLoginError('Please enter both email and password.');
      return;
    }

    // Automatically expand 'admin' shorthand to valid email format for Firebase Auth
    if (cleanEmail === 'admin') {
      cleanEmail = 'admin@unimtech.edu.sl';
    }

    setIsLoggingIn(true);
    setLoginError('');

    try {
      // 1. Attempt Firebase Authentication sign in
      await signInWithEmailAndPassword(auth, cleanEmail, cleanPassword);
    } catch (err: any) {
      console.warn("Firebase Auth sign in failed. Attempting auto-provisioning or fallback...", err);

      // 2. Self-provisioning behavior: If first time, automatically register admin credentials
      if (
        (cleanEmail === 'admin@unimtech.edu.sl' && cleanPassword === 'sawaneh2026') ||
        (cleanEmail === 'admin@unimtech.edu.sl' && cleanPassword === 'admin')
      ) {
        try {
          await createUserWithEmailAndPassword(auth, cleanEmail, cleanPassword);
          return; // Triggered by onAuthStateChanged
        } catch (createErr: any) {
          console.warn("Auto-provisioning failed, falling back to local administrative authentication:", createErr);
          setIsLoggedIn(true);
          sessionStorage.setItem('sawaneh_cms_isLoggedIn', 'true');
          sessionStorage.setItem('sawaneh_cms_login_type', 'local');
          setLoginError('');
          return;
        }
      }

      // Handle specific Auth error responses
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setLoginError('Invalid email or password. Please verify your admin credentials.');
      } else if (err.code === 'auth/invalid-email') {
        setLoginError('Please enter a valid academic email address.');
      } else {
        // Safe local authentication fallback in case client is offline or Auth domain blocked
        if (
          (cleanEmail === 'admin@unimtech.edu.sl' && cleanPassword === 'sawaneh2026') ||
          (cleanEmail === 'admin@unimtech.edu.sl' && cleanPassword === 'admin')
        ) {
          setIsLoggedIn(true);
          sessionStorage.setItem('sawaneh_cms_isLoggedIn', 'true');
          sessionStorage.setItem('sawaneh_cms_login_type', 'local');
        } else {
          if (err.code === 'auth/operation-not-allowed') setLoginError('Email/Password authentication is not enabled. Please enable it in the Firebase Console under Authentication -> Sign-in method.'); else setLoginError(err.message || 'Authentication error. Please try again.');
        }
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleEditClick = (item: any) => {
    setEditingId(item.id);
    window.scrollTo({ top: 300, behavior: 'smooth' });
    
    if (activeModel === 'publications') {
      setTitle(item.title || '');
      setAuthors(item.authors || '');
      setYear(item.year?.toString() || '2026');
      setCategory(item.category || 'journal-article');
      setDoi(item.doi || '');
      setPublisher(item.journal || '');
      setAbstract(item.abstract || '');
      setKeywords(item.keywords?.join(', ') || '');
      setLink(item.link || '');
    } else if (activeModel === 'books') {
      setTitle(item.title || '');
      setSubtitle(item.subtitle || '');
      setYear(item.year?.toString() || '2026');
      setPublisher(item.publisher || '');
      setIsbn(item.isbn || '');
      setSynopsis(item.synopsis || '');
      setWhyItMatters(item.whyItMatters || '');
      setTableOfContents(item.tableOfContents?.join(', ') || '');
      setLink(item.purchaseUrl || '');
    } else if (activeModel === 'blog') {
      setTitle(item.title || '');
      setCategory(item.category || 'Cybersecurity');
      setDate(item.date || '2026-07-04');
      setReadTime(item.readTime || '5 min read');
      setExcerpt(item.excerpt || '');
      setContent(item.content || '');
    } else if (activeModel === 'cv') {
      setYear(item.year || '2026');
      setTitle(item.title || '');
      setSubtitle(item.subtitle || '');
      setInstitution(item.institution || '');
      setCategory(item.category || 'appointment');
      setDescription(item.description || '');
    } else if (activeModel === 'talks') {
      setTitle(item.title || '');
      setType(item.type || 'Keynote');
      setEventName(item.eventName || '');
      setDate(item.date || '2026-07-04');
      setLocation(item.location || '');
      setRole(item.role || '');
      setDescription(item.summary || '');
      setLink(item.link || '');
    } else if (activeModel === 'gallery') {
      setImageUrl(item.url || '');
      setImageCaption(item.caption || '');
      setImageCategory(item.category || '');
      setImageOrder(item.order?.toString() || '0');
      setLocalPreviewUrl('');
    }
  };

  const handleDeleteClick = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this registry item?");
    if (!confirmDelete) return;

    try {
      if (activeModel === 'publications') {
        await deleteDocument('publications', id);
        setPublications(publications.filter(p => p.id !== id));
      } else if (activeModel === 'books') {
        await deleteDocument('books', id);
        setBooks(books.filter(b => b.id !== id));
      } else if (activeModel === 'blog') {
        await deleteDocument('blogPosts', id);
        setBlogPosts(blogPosts.filter(bp => bp.id !== id));
      } else if (activeModel === 'cv') {
        await deleteDocument('timelineItems', id);
        setTimelineItems(timelineItems.filter(ti => ti.id !== id));
      } else if (activeModel === 'talks') {
        await deleteDocument('talkEvents', id);
        setTalkEvents(talkEvents.filter(te => te.id !== id));
      } else if (activeModel === 'gallery') {
        await deleteDocument('galleryImages', id);
        setGalleryImages(galleryImages.filter(g => g.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete from Firestore database:", error);
      alert("Database Synchronization Error: Unable to perform remote deletion.");
    }
  };

  const clearForm = () => {
    if (activeModel === 'profile') {
      // Keep profile values intact
      return;
    }
    setEditingId(null);
    setTitle('');
    setSubtitle('');
    setAuthors('Sawaneh, I. A.');
    setYear('2026');
    setPublisher('');
    setIsbn('');
    setSynopsis('');
    setWhyItMatters('');
    setTableOfContents('');
    
    // Set appropriate categories
    if (activeModel === 'publications') setCategory('journal-article');
    else if (activeModel === 'cv') setCategory('appointment');
    else setCategory('Cybersecurity');

    setDoi('');
    setLink('');
    setAbstract('');
    setKeywords('');
    setDate('2026-07-04');
    setReadTime('5 min read');
    setExcerpt('');
    setContent('');
    setEventName('');
    setLocation('Freetown, Sierra Leone');
    setRole('Keynote Speaker');
    setInstitution('');
    setDescription('');
    setType('Keynote');
    setImageUrl('');
    setImageCaption('');
    setImageCategory('');
    setImageOrder('0');
    setLocalPreviewUrl('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Generate a temporary local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setLocalPreviewUrl(objectUrl);

    setIsUploading(true);
    try {
      const fileName = `gallery/${Date.now()}_${file.name}`;
      const url = await uploadFile(file, fileName);
      setImageUrl(url);
    } catch (error) {
      console.error("Upload failed", error);
      alert("Failed to upload image. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (activeModel === 'publications') {
        const keywordsArray = keywords ? keywords.split(',').map(k => k.trim()) : ["Engineering", "Sierra Leone"];
        const newPub: Publication = {
          id: editingId || `pub-dynamic-${Date.now()}`,
          title,
          authors,
          year: parseInt(year) || 2026,
          category: category as any,
          journal: publisher || "Journal of Contemporary West African Research",
          abstract,
          keywords: keywordsArray,
          doi: doi || undefined,
          link: link || (doi ? `https://doi.org/${doi}` : undefined)
        };

        await saveDocument('publications', newPub.id, newPub);

        if (editingId) {
          setPublications(publications.map(p => p.id === editingId ? newPub : p));
        } else {
          setPublications([newPub, ...publications]);
        }
      } 
      
      else if (activeModel === 'books') {
        const chaptersArray = tableOfContents ? tableOfContents.split(',').map(c => c.trim()) : ["Chapter 1: Security Foundation", "Chapter 2: Structural Controls"];
        const newBook: Book = {
          id: editingId || `book-dynamic-${Date.now()}`,
          title,
          subtitle: subtitle || undefined,
          year: parseInt(year) || 2026,
          publisher: publisher || "UNIMTECH Publishing",
          isbn: isbn || undefined,
          coverColor: "from-slate-900 to-slate-850",
          synopsis,
          whyItMatters: whyItMatters || "Crucial policy audit insights.",
          tableOfContents: chaptersArray,
          purchaseUrl: link || undefined
        };

        await saveDocument('books', newBook.id, newBook);

        if (editingId) {
          setBooks(books.map(b => b.id === editingId ? newBook : b));
        } else {
          setBooks([newBook, ...books]);
        }
      } 
      
      else if (activeModel === 'blog') {
        const newBlogPost: BlogPost = {
          id: editingId || `blog-dynamic-${Date.now()}`,
          title,
          category,
          date,
          readTime,
          excerpt,
          content: content || excerpt,
          imageColor: "from-editorial-navy to-slate-800",
          author: "Ing. Dr. Ibrahim A. Sawaneh"
        };

        await saveDocument('blogPosts', newBlogPost.id, newBlogPost);

        if (editingId) {
          setBlogPosts(blogPosts.map(bp => bp.id === editingId ? newBlogPost : bp));
        } else {
          setBlogPosts([newBlogPost, ...blogPosts]);
        }
      } 
      
      else if (activeModel === 'cv') {
        const newTimelineItem: TimelineItem = {
          id: editingId || `cv-dynamic-${Date.now()}`,
          year,
          title,
          subtitle,
          institution,
          category: category as any,
          description: description || undefined
        };

        await saveDocument('timelineItems', newTimelineItem.id, newTimelineItem);

        if (editingId) {
          setTimelineItems(timelineItems.map(ti => ti.id === editingId ? newTimelineItem : ti));
        } else {
          setTimelineItems([newTimelineItem, ...timelineItems]);
        }
      } 
      
      else if (activeModel === 'talks') {
        const newTalkEvent: TalkEvent = {
          id: editingId || `talk-dynamic-${Date.now()}`,
          title,
          type: type as any,
          eventName,
          date,
          location,
          role,
          summary: description,
          link: link || undefined
        };

        await saveDocument('talkEvents', newTalkEvent.id, newTalkEvent);

        if (editingId) {
          setTalkEvents(talkEvents.map(te => te.id === editingId ? newTalkEvent : te));
        } else {
          setTalkEvents([newTalkEvent, ...talkEvents]);
        }
      }
      else if (activeModel === 'gallery') {
        const newGalleryImage: GalleryImage = {
          id: editingId || `gal-dynamic-${Date.now()}`,
          url: imageUrl,
          caption: imageCaption,
          category: imageCategory,
          order: parseInt(imageOrder, 10) || 0
        };

        await saveDocument('galleryImages', newGalleryImage.id, newGalleryImage);

        if (editingId) {
          const updated = galleryImages.map(gi => gi.id === editingId ? newGalleryImage : gi);
          setGalleryImages(updated.sort((a, b) => (a.order || 0) - (b.order || 0)));
        } else {
          const updated = [newGalleryImage, ...galleryImages];
          setGalleryImages(updated.sort((a, b) => (a.order || 0) - (b.order || 0)));
        }
      }

      else if (activeModel === 'profile') {
        if (editingId === 'hero') {
          const updatedHero = {
            id: 'hero',
            name: profileName,
            titles: profileTitles.split(',').map(t => t.trim()).filter(Boolean),
            tagline: profileTagline,
            summary: profileSummary,
            avatarPlaceholder: profileAvatarPlaceholder,
            googleScholar: profileGoogleScholar,
            researchGate: profileResearchGate,
            orcid: profileOrcid,
            linkedin: profileLinkedin,
            email: profileEmail,
            phone: profilePhone,
            address: profileAddress
          };
          await saveDocument('profile', 'hero', updatedHero);
          setHeroInfo(updatedHero);
        } else if (editingId === 'biography') {
          const updatedBio = {
            id: 'biography',
            introduction: profileIntroduction,
            longForm: [profileLongForm], // Wrapped in array for backward compatibility
            vision: profileVision,
            mission: profileMission
          };
          await saveDocument('profile', 'biography', updatedBio);
          setBiographyDetails(updatedBio);
        }
      }

      setSuccessMsg(true);
      clearForm();
      setTimeout(() => setSuccessMsg(false), 3000);
    } catch (error) {
      console.error("Failed to save document to Firestore:", error);
      alert("Database Synchronization Error: Unable to save changes to the live database.");
    }
  };

  // Helper to render record titles for existing list
  const getActiveRecordsList = () => {
    switch (activeModel) {
      case 'publications': return publications;
      case 'books': return books;
      case 'blog': return blogPosts;
      case 'cv': return timelineItems;
      case 'talks': return talkEvents;
      case 'gallery': return galleryImages.map(gi => ({ ...gi, title: gi.caption }));
      case 'profile': return [
        { id: 'hero', title: 'Scholarly Hero Section Details', isProfile: true },
        { id: 'biography', title: 'Scholarly Biography & Vision', isProfile: true }
      ];
    }
  };

  // Render secure login gate if not logged in
  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh]">
        <div className="max-w-md w-full border border-editorial-border bg-white p-8 shadow-xl relative rounded-none">
          {/* Top Decorative Border */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A059]"></div>
          
          {/* Institutional Crest / Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center h-14 w-14 bg-editorial-navy text-white font-serif font-bold text-xl border-2 border-editorial-gold mb-3 shadow-sm select-none">
              IS
            </div>
            <h3 className="font-serif text-lg font-bold text-editorial-navy">Dr. Ibrahim A. Sawaneh</h3>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">Personal Scholarly Registry</p>
            <div className="mt-3.5 flex items-center justify-center">
              {isDbConnected ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  Live Database Active
                </span>
              ) : isDbLoading ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 border border-amber-200">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                  Syncing live registry...
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-50 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                  <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                  Offline registers
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-500 text-center leading-relaxed mb-6 font-sans">
            Please authenticate to manage publications, monographs, insights blog, CV timelines and media materials.
          </p>

          {/* Authorization Help Panel */}
          <div className="bg-amber-50/70 border border-amber-100 p-3.5 mb-5 font-mono text-[10px] text-amber-900 leading-relaxed rounded-none">
            <span className="font-bold block uppercase tracking-wider mb-1 text-editorial-gold flex items-center gap-1">
              <ShieldAlert className="h-3.5 w-3.5" />
              Demo Portal Access:
            </span>
            <div className="flex justify-between items-center bg-white/70 px-2 py-1 border border-amber-100/50 mt-1">
              <span>Email: <code className="font-bold text-editorial-navy">admin@unimtech.edu.sl</code></span>
            </div>
            <div className="flex justify-between items-center bg-white/70 px-2 py-1 border border-amber-100/50 mt-1">
              <span>Password: <code className="font-bold text-editorial-navy">sawaneh2026</code></span>
            </div>
          </div>

          {/* Login Error State */}
          {loginError && (
            <div className="bg-rose-50 border border-rose-100 p-3 mb-5 text-[11px] text-rose-700 font-sans font-medium flex items-start gap-2">
              <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-sans">
            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Academic Email</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <User className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  required
                  placeholder="admin@unimtech.edu.sl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-slate-800"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Portal Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                  <Lock className="h-4 w-4" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className={`w-full py-3 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none mt-6 border border-transparent shadow-sm ${isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoggingIn ? (
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-editorial-gold" />
              ) : (
                <Key className="h-3.5 w-3.5 text-editorial-gold" />
              )}
              {isLoggingIn ? 'Authorizing...' : 'Authorize Access'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 animate-in fade-in duration-300">
      {/* Page Title & Controls */}
      <div className="mb-12 border-b border-editorial-border pb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-editorial-gold">Admin Area / Decoupled CMS</span>
            {isDbConnected ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-700 border border-emerald-200 shadow-xs">
                <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Live Database Active
              </span>
            ) : isDbLoading ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 border border-amber-200 shadow-xs">
                <span className="h-1.5 w-1.5 bg-amber-500 rounded-full animate-pulse"></span>
                Syncing live registry...
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-50 text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 border border-slate-200">
                <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                Offline registers
              </span>
            )}
          </div>
          <h2 className="font-serif text-3xl font-extrabold tracking-tight text-editorial-navy sm:text-4xl mt-1">
            Personal Scholarly Registry & CMS
          </h2>
          <p className="mt-2 text-sm text-slate-500 font-mono">
            Manage, edit, delete, and publish peer-reviewed studies, textbooks, timeline events, and blog insights.
          </p>
        </div>

        {/* Admin Session Control Panel */}
        <div className="flex items-center justify-center md:justify-end gap-3 shrink-0 font-sans">
          <div className="text-right hidden sm:block font-mono text-[10px]">
            <span className="block text-slate-400 uppercase tracking-widest font-bold">Authorized Session</span>
            <span className="text-emerald-600 font-bold">admin@unimtech.edu.sl</span>
          </div>
          <button
            onClick={() => {
              setShowChangePassword(true);
              setChangePasswordError('');
              setChangePasswordSuccess('');
            }}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-editorial-border text-editorial-navy text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer transition-all rounded-none shadow-xs"
            title="Change Administrative Password"
          >
            <Key className="h-3.5 w-3.5 text-editorial-gold" />
            Change Password
          </button>
          <button
            onClick={async () => {
              try {
                await signOut(auth);
                setIsLoggedIn(false);
                setEmail('');
                setPassword('');
                setLoginError('');
                sessionStorage.removeItem('sawaneh_cms_isLoggedIn');
                sessionStorage.removeItem('sawaneh_cms_login_type');
              } catch (err: any) {
                console.error("Logout failed:", err);
              }
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 border border-slate-200 text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 cursor-pointer transition-all rounded-none shadow-xs"
            title="Log out from Administrative Session"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>

      {/* Model Category Selection Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
        {[
          { id: 'publications', name: 'Research papers', count: publications.length, icon: <Layers className="h-4 w-4" /> },
          { id: 'books', name: 'Authored books', count: books.length, icon: <BookOpen className="h-4 w-4" /> },
          { id: 'blog', name: 'Insights blog', count: blogPosts.length, icon: <FileText className="h-4 w-4" /> },
          { id: 'cv', name: 'CV Timeline', count: timelineItems.length, icon: <Briefcase className="h-4 w-4" /> },
          { id: 'talks', name: 'Speaking / Media', count: talkEvents.length, icon: <Presentation className="h-4 w-4" /> },
          { id: 'gallery', name: 'Visual Gallery', count: galleryImages.length, icon: <ImageIcon className="h-4 w-4" /> },
          { id: 'profile', name: 'Admin Profile', count: 2, icon: <User className="h-4 w-4" /> }
        ].map((model) => (
          <button
            key={model.id}
            onClick={() => {
              setActiveModel(model.id as any);
              clearForm();
              if (model.id === 'profile') {
                setEditingId('hero');
              }
            }}
            className={`p-4 border transition-all text-left flex flex-col justify-between h-24 cursor-pointer rounded-none relative ${
              activeModel === model.id
                ? 'bg-[#FBFBF9] border-editorial-navy shadow-xs ring-1 ring-editorial-navy/20'
                : 'bg-white border-editorial-border hover:border-editorial-gold'
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className={`p-1.5 ${activeModel === model.id ? 'bg-editorial-navy text-editorial-gold' : 'bg-slate-100 text-slate-500'}`}>
                {model.icon}
              </span>
              <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5">
                {model.count} records
              </span>
            </div>
            <div className="font-serif text-xs font-bold text-editorial-navy uppercase tracking-wide truncate w-full mt-2">
              {model.name}
            </div>
            {activeModel === model.id && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#C5A059]" />
            )}
          </button>
        ))}
      </div>

      {/* Grid: Schema Modeling & Dynamic Publish Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 font-sans">
        {/* Left Column: List of Existing Records of Selected Model */}
        <div className="lg:col-span-6 space-y-8">
          <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
            <div className="flex items-center justify-between border-b border-editorial-border-light pb-4 mb-4">
              <h3 className="font-serif text-sm font-bold text-editorial-navy uppercase tracking-widest flex items-center gap-2">
                <Database className="h-4 w-4 text-editorial-gold" />
                {activeModel === 'profile' ? 'Academic Profile Modules' : 'Existing Registry Records'}
              </h3>
              {activeModel !== 'profile' && (
                <button
                  onClick={clearForm}
                  className="px-2.5 py-1 text-[9px] font-mono bg-editorial-navy text-white border border-editorial-navy uppercase font-bold tracking-wider hover:bg-editorial-gold transition-colors cursor-pointer"
                >
                  + Add New Record
                </button>
              )}
            </div>

            {/* List Stream */}
            <div className="space-y-3.5 max-h-[550px] overflow-y-auto pr-2 divide-y divide-slate-100">
              {getActiveRecordsList().length > 0 ? (
                getActiveRecordsList().map((item: any, idx) => (
                  <div key={item.id} className="pt-3.5 first:pt-0 flex items-start justify-between gap-4 group">
                    <div className="space-y-1 overflow-hidden">
                      <h4 className="font-serif text-xs font-bold text-editorial-navy group-hover:text-editorial-gold transition-colors truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 truncate leading-relaxed">
                        {activeModel === 'publications' && `By ${item.authors} | Year: ${item.year}`}
                        {activeModel === 'books' && `Publisher: ${item.publisher} | ISBN: ${item.isbn || 'No ISBN'}`}
                        {activeModel === 'blog' && `Category: ${item.category} | Date: ${item.date}`}
                        {activeModel === 'cv' && `${item.subtitle} • ${item.institution} | Year: ${item.year}`}
                        {activeModel === 'talks' && `${item.eventName} | Date: ${item.date}`}
                        {activeModel === 'gallery' && `Category: ${item.category} | Order: ${item.order}`}
                        {activeModel === 'profile' && `Dynamic Administrative Content`}
                      </p>
                      {item.id === editingId && (
                        <span className="inline-block text-[8px] font-mono bg-amber-150 text-amber-900 px-1.5 py-0.5 rounded-none font-bold uppercase tracking-wider animate-pulse border border-amber-200">
                          Editing
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="p-1.5 bg-slate-50 hover:bg-editorial-navy hover:text-white text-slate-500 transition-colors border border-slate-100 cursor-pointer"
                        title="Edit registry entry"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                      {!item.isProfile && (
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="p-1.5 bg-slate-50 hover:bg-rose-500 hover:text-white text-slate-500 transition-colors border border-slate-100 cursor-pointer"
                          title="Delete registry entry"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-12 text-center text-slate-400 text-xs font-sans italic border border-dashed border-slate-200">
                  No records stored in this collection. Click "+ Add New Record" to enter one.
                </div>
              )}
            </div>
          </div>

          {/* Pre-print Asset Safe */}
          <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
            <h3 className="font-serif text-sm font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-4 flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-editorial-gold" />
              Pre-Print Documents Safe & Assets
            </h3>
            <div className="divide-y divide-editorial-border-light">
              {digitalFiles.map((file, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-start gap-2.5">
                    <div className="p-2 bg-[#F1F4F8] text-editorial-navy shrink-0 mt-0.5 rounded-none">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="block font-semibold text-slate-800 font-mono leading-tight">{file.name}</span>
                      <span className="text-[10px] text-slate-400 mt-1 block leading-none">{file.type} • size: {file.size}</span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-[9px] text-slate-400 uppercase tracking-wide font-bold">
                    <span className="block text-slate-700">{file.downloads} DLs</span>
                    <span className="text-[#C5A059]">MD5: validated</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic AI Discovery Hub for publications */}
          {activeModel === 'publications' && (
            <div className="border border-editorial-border bg-white p-6 shadow-xs rounded-none">
              <div className="flex items-center justify-between border-b border-editorial-border-light pb-3 mb-4">
                <h3 className="font-serif text-sm font-bold text-editorial-navy flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-editorial-gold" />
                  Scholarly Discovery Hub
                </h3>
                <button
                  onClick={handleDiscoverPublications}
                  disabled={isDiscovering}
                  className="px-3 py-1.5 bg-editorial-gold hover:bg-editorial-gold/95 disabled:bg-slate-150 text-editorial-navy disabled:text-slate-450 font-mono text-[9px] uppercase tracking-wider font-bold transition-all flex items-center gap-1.5 cursor-pointer rounded-none border border-editorial-gold/50"
                >
                  {isDiscovering ? (
                    <RefreshCw className="h-3 w-3 animate-spin" />
                  ) : (
                    <Search className="h-3 w-3" />
                  )}
                  {isDiscovering ? 'Searching...' : 'Scan Google Scholar'}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed mb-4">
                Leverage Google Scholar, IEEE Xplore, and academic databases via Gemini Search grounding to discover new publications by Ing. Dr. Ibrahim Abdulai Sawaneh. You can review, edit, discard, or directly publish them to his dynamic online registry.
              </p>

              {isDiscovering && (
                <div className="py-8 text-center space-y-3.5 border border-dashed border-slate-200 bg-slate-50/50">
                  <Loader2 className="h-6 w-6 animate-spin text-editorial-gold mx-auto" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-editorial-navy animate-pulse">Scholarly Agent Active</p>
                    <p className="text-[10px] font-mono text-slate-400">{discoveryStatus}</p>
                  </div>
                </div>
              )}

              {discoveryError && !isDiscovering && (
                <div className="p-4 bg-amber-50/80 border border-amber-250 text-amber-900 text-xs font-sans leading-relaxed rounded-none">
                  {discoveryError}
                </div>
              )}

              {!isDiscovering && discoveredPubs.length > 0 && (
                <div className="space-y-4">
                  <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider flex items-center justify-between">
                    <span>Discovered {discoveredPubs.length} Unindexed Papers</span>
                    <span className="text-emerald-600 font-bold">Awaiting Review</span>
                  </div>

                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1 divide-y divide-slate-100">
                    {discoveredPubs.map((pub, idx) => (
                      <div key={idx} className="pt-3 first:pt-0 space-y-2">
                        <div className="space-y-1">
                          <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                            {pub.category === 'journal-article' ? 'Journal Article' : pub.category === 'conference-paper' ? 'Conference Paper' : 'Academic Publication'}
                          </span>
                          <h4 className="font-serif text-xs font-bold text-editorial-navy leading-tight">
                            {pub.title}
                          </h4>
                          <p className="text-[10px] text-slate-500 leading-snug">
                            <span className="font-medium text-slate-600">Authors:</span> {pub.authors} <br />
                            <span className="font-medium text-slate-600">Venue:</span> {pub.journal} ({pub.year})
                          </p>
                          {pub.abstract && (
                            <p className="text-[10px] text-slate-400 italic bg-[#FDFDFB] p-2 border-l-2 border-editorial-gold/30 line-clamp-2">
                              {pub.abstract}
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between gap-2 pt-1.5">
                          {pub.link ? (
                            <a
                              href={pub.link}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="text-[10px] text-editorial-navy font-semibold hover:text-editorial-gold flex items-center gap-1 transition-colors"
                            >
                              <ExternalLink className="h-3 w-3" />
                              View Publisher Source
                            </a>
                          ) : (
                            <span className="text-[9px] text-slate-400 font-mono">No direct link found</span>
                          )}

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleEditDiscovered(pub)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-mono uppercase tracking-wide cursor-pointer transition-colors"
                              title="Load details into the Form to review or edit before publishing"
                            >
                              Edit Details
                            </button>
                            <button
                              onClick={() => handleDismissDiscovered(pub.title)}
                              className="px-2 py-1 bg-rose-550 hover:bg-rose-100 text-rose-750 text-[10px] font-mono uppercase tracking-wide cursor-pointer transition-colors"
                              title="Discard from pending review list"
                            >
                              Dismiss
                            </button>
                            <button
                              onClick={() => handlePublishDiscovered(pub)}
                              disabled={publishingId === pub.title}
                              className="px-2 py-1 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 text-white disabled:text-slate-550 text-[10px] font-mono uppercase tracking-wide font-bold cursor-pointer transition-colors flex items-center gap-1"
                              title="Directly publish to Ibrahim Abdulai Sawaneh's dynamic online registry"
                            >
                              {publishingId === pub.title ? (
                                <RefreshCw className="h-3 w-3 animate-spin" />
                              ) : (
                                <Check className="h-3 w-3" />
                              )}
                              Publish
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {discoveredSources.length > 0 && (
                    <div className="pt-3 border-t border-editorial-border-light space-y-1.5">
                      <span className="block text-[9px] font-mono uppercase text-slate-400 tracking-wider font-bold">Search Evidence Sources:</span>
                      <div className="flex flex-wrap gap-2">
                        {discoveredSources.slice(0, 4).map((source: any, sIdx: number) => (
                          <a
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            referrerPolicy="no-referrer"
                            className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-[#F1F4F8] hover:bg-slate-200 text-editorial-navy text-[9px] font-sans rounded-none transition-colors max-w-[200px] truncate"
                            title={source.title}
                          >
                            <Globe className="h-2.5 w-2.5" />
                            <span className="truncate">{source.title}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Column: Interactive Form Engine (Tailored specifically per active model!) */}
        <div className="lg:col-span-6">
          <div id="cms-form-section" className="border border-editorial-border bg-white p-6 shadow-xs rounded-none sticky top-20">
            <h3 className="font-serif text-sm font-bold text-editorial-navy border-b border-editorial-border-light pb-3 mb-4 flex items-center justify-between gap-2">
              <span className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4 text-editorial-gold" />
                {activeModel === 'profile' 
                  ? `Update Academic Profile: ${editingId === 'biography' ? 'Biography Narrative' : 'Hero & Social Links'}`
                  : editingId 
                    ? `Edit ${activeModel.slice(0, -1)}: ${title.slice(0, 20)}...` 
                    : `Create New ${activeModel.slice(0, -1)}`
                }
              </span>
              {editingId && activeModel !== 'profile' && (
                <button
                  onClick={clearForm}
                  className="text-[9px] font-mono text-rose-500 hover:underline uppercase font-bold"
                >
                  Cancel Edit
                </button>
              )}
            </h3>

            {successMsg ? (
              <div className="text-center py-8">
                <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-3.5 border border-emerald-200">
                  <Check className="h-6 w-6 animate-bounce" />
                </div>
                <h4 className="font-serif text-base font-bold text-slate-900 font-bold">Database Updated Instantly!</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto leading-relaxed">
                  The registry has been fully synchronized in client-state. These changes propagate in real time to the public academic views.
                </p>
                <button
                  onClick={() => setSuccessMsg(false)}
                  className="mt-6 px-4 py-2.5 bg-editorial-navy hover:bg-editorial-navy/90 text-white text-[10px] font-bold uppercase tracking-widest cursor-pointer rounded-none"
                >
                  Configure Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {/* 1. PUBLICATIONS FORM FIELDS */}
                {activeModel === 'publications' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Paper Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IoT Security in Sierra Leone"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Author String *</label>
                        <input
                          type="text"
                          required
                          value={authors}
                          onChange={(e) => setAuthors(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Year of Publication *</label>
                        <input
                          type="number"
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Category Type *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-semibold text-slate-800"
                        >
                          <option value="journal-article">Journal Article</option>
                          <option value="conference-paper">Conference Paper</option>
                          <option value="book-chapter">Book Chapter</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">DOI (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 10.1007/abc"
                          value={doi}
                          onChange={(e) => setDoi(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Journal / Proceeding Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. West African Scientific Journal"
                        value={publisher}
                        onChange={(e) => setPublisher(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Keywords (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Cybercrime, UNIMTECH, Policy"
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Abstract Summary *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Provide a comprehensive academic abstract summary..."
                        value={abstract}
                        onChange={setAbstract}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>
                  </>
                )}

                {/* 2. BOOKS FORM FIELDS */}
                {activeModel === 'books' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Book Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cybersecurity Paradigms in Sub-Saharan Africa"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Subtitle / Volume focus</label>
                      <input
                        type="text"
                        placeholder="e.g. Dynamic policy frameworks & network auditing protocols"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Publisher House *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. UNIMTECH Press"
                          value={publisher}
                          onChange={(e) => setPublisher(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Publication Year *</label>
                        <input
                          type="number"
                          required
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">ISBN-13 Code</label>
                        <input
                          type="text"
                          placeholder="e.g. 978-3-16-148410-0"
                          value={isbn}
                          onChange={(e) => setIsbn(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Acquisition / Library Link</label>
                        <input
                          type="text"
                          placeholder="e.g. https://amazon.com/..."
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Chapters outline (Comma separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Chapter 1: Introduction, Chapter 2: Methodology"
                        value={tableOfContents}
                        onChange={(e) => setTableOfContents(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Book Synopsis *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Write a clear book synopsis..."
                        value={synopsis}
                        onChange={setSynopsis}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Why This Book Matters *</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Why is this book vital for regional policy or student education?"
                        value={whyItMatters}
                        onChange={(e) => setWhyItMatters(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none resize-none"
                      />
                    </div>
                  </>
                )}

                {/* 3. BLOG POSTS FORM FIELDS */}
                {activeModel === 'blog' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Article Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mitigating Landslides with IoT Sensing"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Category Area *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-semibold text-slate-800"
                        >
                          <option value="Cybersecurity">Cybersecurity</option>
                          <option value="Education Technology">Education Technology</option>
                          <option value="Disaster Management">Disaster Management</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Estimated Read Time *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 5 min read"
                          value={readTime}
                          onChange={(e) => setReadTime(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Date of Release *</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Brief Excerpt *</label>
                      <input
                        type="text"
                        required
                        placeholder="Write a brief scannable description of the insight post..."
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Full Post Article Content *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Write full article here. Supports paragraphs..."
                        value={content}
                        onChange={setContent}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>
                  </>
                )}

                {/* 4. CV TIMELINE EXPERIENCE FORM FIELDS */}
                {activeModel === 'cv' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Chronology Year / Range *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. 2024 - Present or 2023"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Activity Category *</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-semibold text-slate-800"
                        >
                          <option value="appointment">Appointment / Mandate</option>
                          <option value="education">Education & Degree</option>
                          <option value="leadership">Academic Leadership</option>
                          <option value="award">Awards & Recipient</option>
                          <option value="research">Active Research Area</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Dossier / Position Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Director of Computer Systems"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Subtitle / Subdocket *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Senior Senate Governance Representative"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Affiliated Institution *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. UNIMTECH / University of Sierra Leone"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Role Description (Optional)</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Details of mandates, leadership outcomes, and tasks..."
                        value={description}
                        onChange={setDescription}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>
                  </>
                )}

                {/* 5. SPEAKING & TALKS FORM FIELDS */}
                {activeModel === 'talks' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Talk Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Mitigating Landslides with IoT Sensing Networks"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Presentation Type *</label>
                        <select
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-semibold text-slate-800"
                        >
                          <option value="Keynote">Keynote Lecture</option>
                          <option value="Guest Lecture">Guest Lecture</option>
                          <option value="Conference Presentation">Conference Presentation</option>
                          <option value="Panel Discussion">Panel Discussion</option>
                          <option value="Seminar">Academic Seminar</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Academic Summit/Event *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. National Cybersecurity Summit"
                          value={eventName}
                          onChange={(e) => setEventName(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Presentation Date *</label>
                        <input
                          type="date"
                          required
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Dr.'s Role *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Keynote Speaker"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Venue Location *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Freetown, Sierra Leone"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Resource / Slides Link</label>
                        <input
                          type="text"
                          placeholder="e.g. https://slideshare.net/..."
                          value={link}
                          onChange={(e) => setLink(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Summary Brief *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Write a clear summary of the speaking topic and outline..."
                        value={description}
                        onChange={setDescription}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>
                  </>
                )}

                {/* 6. GALLERY FORM FIELDS */}
                {activeModel === 'gallery' && (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Upload Image</label>
                        <div className="relative">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            disabled={isUploading}
                            className="hidden"
                            id="gallery-image-upload"
                          />
                          <label 
                            htmlFor="gallery-image-upload" 
                            className={`flex items-center justify-center gap-2 w-full p-4 border-2 border-dashed border-editorial-border bg-[#FBFBF9] cursor-pointer hover:bg-slate-50 transition-colors ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          >
                            {isUploading ? (
                              <>
                                <Loader2 className="w-5 h-5 animate-spin text-editorial-gold" />
                                <span className="font-mono text-xs font-bold text-slate-500">UPLOADING...</span>
                              </>
                            ) : (
                              <>
                                <Upload className="w-5 h-5 text-editorial-gold" />
                                <span className="font-mono text-xs font-bold text-slate-500">CLICK TO BROWSE FILES</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="h-px bg-editorial-border flex-1"></div>
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">OR</span>
                        <div className="h-px bg-editorial-border flex-1"></div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Image URL *</label>
                        <input
                          type="url"
                          required
                          placeholder="https://images.unsplash.com/... or a valid image URL"
                          value={imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setLocalPreviewUrl('');
                          }}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-sm"
                        />
                      </div>
                      {(localPreviewUrl || imageUrl) && (
                        <div className="mt-4 p-3 bg-white border border-editorial-border">
                          <div className="flex justify-between items-center mb-2">
                            <p className="text-[10px] font-mono text-slate-400 uppercase font-bold">Live Thumbnail Preview</p>
                            {isUploading && (
                              <span className="text-[10px] font-mono font-bold text-editorial-gold flex items-center gap-1 animate-pulse">
                                <Loader2 className="w-3 h-3 animate-spin" /> UPLOADING...
                              </span>
                            )}
                          </div>
                          <div className="relative w-full h-48 sm:h-64 bg-slate-100 overflow-hidden border border-editorial-border-light">
                            <img 
                              src={localPreviewUrl || imageUrl} 
                              alt="Thumbnail preview" 
                              className={`w-full h-full object-contain ${isUploading ? 'opacity-40 grayscale blur-sm' : 'opacity-100'}`} 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Image Caption *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Presenting at the International Academic Conference 2024"
                        value={imageCaption}
                        onChange={(e) => setImageCaption(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-serif font-bold text-editorial-navy"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Category *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Conferences, Teaching, Research"
                          value={imageCategory}
                          onChange={(e) => setImageCategory(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Display Order</label>
                        <input
                          type="number"
                          placeholder="0"
                          value={imageOrder}
                          onChange={(e) => setImageOrder(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-sm"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 7. PROFILE HERO FORM FIELDS */}
                {activeModel === 'profile' && editingId === 'hero' && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Scholarly Full Name *</label>
                        <input
                          type="text"
                          required
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Avatar Initials *</label>
                        <input
                          type="text"
                          required
                          maxLength={3}
                          value={profileAvatarPlaceholder}
                          onChange={(e) => setProfileAvatarPlaceholder(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Professional Titles (Comma separated) *</label>
                      <input
                        type="text"
                        required
                        value={profileTitles}
                        onChange={(e) => setProfileTitles(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Homepage Tagline *</label>
                      <input
                        type="text"
                        required
                        value={profileTagline}
                        onChange={(e) => setProfileTagline(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Biography Executive Summary *</label>
                      <textarea
                        required
                        rows={4}
                        value={profileSummary}
                        onChange={(e) => setProfileSummary(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none resize-none leading-relaxed"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Primary Email *</label>
                        <input
                          type="email"
                          required
                          value={profileEmail}
                          onChange={(e) => setProfileEmail(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Contact Phone *</label>
                        <input
                          type="text"
                          required
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Academic Institution / Address *</label>
                      <input
                        type="text"
                        required
                        value={profileAddress}
                        onChange={(e) => setProfileAddress(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Google Scholar URL</label>
                        <input
                          type="text"
                          value={profileGoogleScholar}
                          onChange={(e) => setProfileGoogleScholar(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">ResearchGate URL</label>
                        <input
                          type="text"
                          value={profileResearchGate}
                          onChange={(e) => setProfileResearchGate(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">ORCID Identifier Link</label>
                        <input
                          type="text"
                          value={profileOrcid}
                          onChange={(e) => setProfileOrcid(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">LinkedIn URL</label>
                        <input
                          type="text"
                          value={profileLinkedin}
                          onChange={(e) => setProfileLinkedin(e.target.value)}
                          className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* 7. BIOGRAPHY PROFILE FORM FIELDS */}
                {activeModel === 'profile' && editingId === 'biography' && (
                  <>
                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Scholarly Narrative Intro Paragraph *</label>
                      <textarea
                        required
                        rows={3}
                        value={profileIntroduction}
                        onChange={(e) => setProfileIntroduction(e.target.value)}
                        className="w-full p-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none resize-none leading-relaxed"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Long-Form Scholarly Biography (Paragraphs separated by blank line) *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        placeholder="Paste or write your multi-paragraph scholarly narrative."
                        value={profileLongForm}
                        onChange={setProfileLongForm}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Academic Vision Statement *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        value={profileVision}
                        onChange={setProfileVision}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Research Mission Statement *</label>
                      <ReactQuill
                        theme="snow"
                        modules={quillModules}
                        value={profileMission}
                        onChange={setProfileMission}
                        className="bg-[#FBFBF9] mb-4"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none mt-4"
                >
                  <PlusCircle className="h-4 w-4 text-editorial-gold" />
                  {activeModel === 'profile' 
                    ? "Update Academic Profile Module" 
                    : editingId 
                      ? "Update Registry Entry" 
                      : "Publish To Repository"
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* 8. CHANGE PASSWORD DIALOG MODAL */}
      {showChangePassword && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-editorial-border max-w-md w-full p-8 shadow-2xl relative rounded-none animate-in zoom-in-95 duration-250">
            {/* Top Gold Border */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#C5A059]"></div>
            
            {/* Close text-based button */}
            <button 
              onClick={() => {
                setShowChangePassword(false);
                setChangePasswordError('');
                setChangePasswordSuccess('');
              }}
              className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 hover:text-rose-600 transition-colors uppercase font-bold"
            >
              ✕ Close
            </button>

            <div className="mb-6">
              <div className="inline-flex items-center justify-center h-10 w-10 bg-editorial-navy text-white border border-editorial-gold mb-3">
                <Lock className="h-5 w-5 text-editorial-gold" />
              </div>
              <h3 className="font-serif text-lg font-bold text-editorial-navy">Update Account Password</h3>
              <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest mt-1">Institutional Portal Security</p>
            </div>

            {changePasswordError && (
              <div className="bg-rose-50 border border-rose-100 p-3 mb-4 text-[11px] text-rose-700 font-sans font-medium flex items-start gap-2">
                <ShieldAlert className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{changePasswordError}</span>
              </div>
            )}

            {changePasswordSuccess && (
              <div className="bg-emerald-50 border border-emerald-100 p-3 mb-4 text-[11px] text-emerald-800 font-sans font-medium flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{changePasswordSuccess}</span>
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4 text-xs font-sans">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Current Password *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Lock className="h-4 w-4 text-slate-300" />
                  </span>
                  <input
                    type={showCurrentPass ? "text" : "password"}
                    required
                    placeholder="Enter your current password"
                    value={currentPasswordForChange}
                    onChange={(e) => setCurrentPasswordForChange(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showCurrentPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">New Secure Password *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Key className="h-4 w-4 text-slate-300" />
                  </span>
                  <input
                    type={showNewPass ? "text" : "password"}
                    required
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showNewPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1 font-bold">Confirm New Password *</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                    <Key className="h-4 w-4 text-slate-300" />
                  </span>
                  <input
                    type={showConfirmPass ? "text" : "password"}
                    required
                    placeholder="Verify your new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 border border-editorial-border bg-[#FBFBF9] focus:outline-none focus:ring-1 focus:ring-editorial-navy rounded-none text-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPass(!showConfirmPass)}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showConfirmPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePassword(false);
                    setChangePasswordError('');
                    setChangePasswordSuccess('');
                  }}
                  className="w-1/2 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] uppercase tracking-widest transition-colors cursor-pointer rounded-none border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="w-1/2 py-2.5 bg-editorial-navy hover:bg-editorial-navy/95 text-white font-bold text-[10px] uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-none border border-transparent shadow-sm"
                >
                  {isChangingPassword ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin text-editorial-gold" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-editorial-gold" />
                  )}
                  {isChangingPassword ? 'Updating...' : 'Save New Pass'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
