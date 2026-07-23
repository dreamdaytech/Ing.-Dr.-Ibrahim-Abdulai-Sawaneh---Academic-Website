import { Publication, Book, BlogPost, TalkEvent, TimelineItem, ResearchArea, GalleryImage } from '../types';

export const HERO_INFO = {
  name: "Ing. Dr. Ibrahim Abdulai Sawaneh",
  titles: [
    "Academic",
    "Senior Researcher",
    "Professional Engineer",
    "Author",
    "Higher Education Leader"
  ],
  tagline: "Academic | Researcher | Engineer | Author | Higher Education Leader",
  summary: "An accomplished Sierra Leonean scholar, professional engineer, and higher education leader. With extensive expertise spanning ICT, cybersecurity systems, disaster risk management, e-learning policy, and management sciences, he dedicates his career to driving research-led development and technological innovation in sub-Saharan Africa.",
  avatarPlaceholder: "IAS",
  googleScholar: "https://scholar.google.com/citations?user=placeholder",
  researchGate: "https://www.researchgate.net/profile/Ibrahim-Abdulai-Sawaneh",
  orcid: "https://orcid.org/0000-0000-0000-0000",
  linkedin: "https://linkedin.com/in/ibrahim-abdulai-sawaneh",
  email: "i.sawaneh@institution.edu.sl",
  phone: "+232 (76) 000-000",
  address: "Department of Information Systems, Institute of Advanced Management and Technology (IAMTECH), Freetown, Sierra Leone"
};

export const BIOGRAPHY_DETAILS = {
  introduction: "Ing. Dr. Ibrahim Abdulai Sawaneh is a distinguished academic, professional engineer, and higher education visionary whose career intersects advanced computational systems, risk management, and organizational leadership. He serves as a critical voice in the digitalization and developmental policy framework of West Africa.",
  longForm: [
    "Ing. Dr. Ibrahim Abdulai Sawaneh has spent over two decades fostering academic excellence, technical innovation, and institutional capacity building. As a registered Professional Engineer and highly cited researcher, his multidimensional research programs address some of the most critical challenges facing developing nations: cyber vulnerability, disaster resilience, public security systems, and educational accessibility.",
    "His academic journey is characterized by a commitment to bridging the gap between theoretical computer science and practical societal applications. He has held senior academic appointments and leadership roles in premier institutions—including the Institute of Advanced Management and Technology (IAMTECH) in Sierra Leone—where he has pioneered the implementation of advanced database management tools, integrated academic information portals, and spearheaded institutional curriculum reforms aligned with global standards.",
    "Dr. Sawaneh’s research on cybersecurity in post-war societies and disaster mitigation frameworks has influenced national policy dialogues. He is an advocate for utilizing Internet of Things (IoT) sensors, cloud computing, and machine learning to build resilient, smart infrastructure in African urban spaces. As an author, his textbooks and research monographs are designed to equip the next generation of African computer scientists, engineers, and public administrators with localized, context-driven knowledge.",
    "Through active mentorship of graduate students, collaboration with international developmental partners, and rigorous academic publishing, Dr. Sawaneh continues to contribute to the robust scientific database of Africa. He stands as a champion for the 'Digital Sierra Leone' agenda, believing that sustainable development is intrinsically tied to home-grown cyber-governance and pedagogical innovation."
  ],
  vision: "To cultivate a robust digital, secure, and resilient scientific ecosystem in West Africa through cutting-edge engineering research, higher education reform, and evidence-based policy formulation.",
  mission: "To empower students, guide institutional structures, and deliver transformative technologies that secure communities against cyber threats and build national resilience against natural and socio-economic disasters."
};

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "ra-cyber",
    title: "Cybersecurity & Cybercrime Prevention",
    description: "Investigating local and regional cyber-threat vectors in developing digital economies, formulation of post-war cyber-governance, and deploying low-overhead defense frameworks.",
    icon: "ShieldAlert",
    keyTopics: ["Post-conflict cybersecurity", "Cybercrime profiling", "Digital forensics in West Africa", "Mobile banking security"]
  },
  {
    id: "ra-disaster",
    title: "Disaster Risk Reduction & Sustainability",
    description: "Analyzing the translation of disaster policy into grassroots mitigation strategies. Utilizing geospatial intelligence and risk modeling to build resilient ecological environments.",
    icon: "FlameKindling",
    keyTopics: ["Disaster policy translation", "Socio-ecological resilience", "Early warning systems", "Urban landslide risk modeling"]
  },
  {
    id: "ra-public-sec",
    title: "Public Security & Emergency Management",
    description: "Engineering robust ICT command-and-control interfaces for crisis communication, emergency responder dispatching, and critical data management during pandemics or climate hazards.",
    icon: "Ambulance",
    keyTopics: ["Crisis informatics", "Emergency logistics planning", "Inter-agency communication models", "Epidemic surveillance portals"]
  },
  {
    id: "ra-elearning",
    title: "E-Learning & Education Technology",
    description: "Developing adaptive, low-bandwidth Virtual Learning Environments (VLEs) and mobile pedagogy tools to increase access to quality higher education in remote territories.",
    icon: "GraduationCap",
    keyTopics: ["Bandwidth-optimized LMS", "Mobile micro-learning", "Academic virtualization", "Digital literacy metrics"]
  },
  {
    id: "ra-ict-transformation",
    title: "ICT Adoption & Digital Transformation",
    description: "Using structural equation modeling (SEM) to assess technology acceptance in government parastatals, municipal councils, and academic registries.",
    icon: "Cpu",
    keyTopics: ["TAM / UTAUT frameworks", "Academic registry automation", "E-Governance structures", "Database management systems"]
  },
  {
    id: "ra-mgmt-science",
    title: "Management Science & Org Development",
    description: "Optimizing employee motivation, resource scheduling, and institutional agility in higher education using computational operations research.",
    icon: "Briefcase",
    keyTopics: ["Employee motivation dynamics", "Academic operations scheduling", "Strategic change management"]
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub-disaster-policy",
    title: "The Mediating Role of Disaster Policy Implementation in Disaster Risk Reduction and Sustainable Development in Sierra Leone",
    authors: "Sawaneh, I. A., & Kamara, K. S.",
    year: 2025,
    journal: "African Journal of Environmental Science and Technology",
    publisher: "Academic Press",
    abstract: "This study examines the critical pathway between municipal disaster policy formulation and practical sustainable development outcomes in Sierra Leone. Using structural equation modeling (SEM) based on survey data from emergency management officials in Freetown and Bo, the research demonstrates that policy formulation alone has negligible effects on local risk reduction unless mediated by structured implementation pathways, community participation, and localized funding. The paper outlines actionable reforms for the National Disaster Management Agency (NDMA).",
    keywords: ["Disaster Policy", "Sustainable Development", "Sierra Leone", "Policy Mediation", "NDMA", "Resilience"],
    category: "journal-article",
    doi: "10.5897/AJEST2025.12345",
    link: "https://doi.org/10.5897/AJEST2025.12345"
  },
  {
    id: "pub-cyber-crime",
    title: "Examining the Effects and Challenges of Cybercrime and Cyber Security Within the Cyberspace of Sierra Leone",
    authors: "Sawaneh, I. A.",
    year: 2024,
    journal: "West African Journal of Applied Science and Technology",
    publisher: "Science Publications SL",
    abstract: "With the rapid expansion of submarine fiber optic connectivity in Sierra Leone, digital vulnerability has surged. This paper evaluates the rise of financial cybercrimes, identity theft, and digital blackmail. By examining legal frameworks such as the Cyber Security and Crime Act 2021, the research highlights massive deficits in technical forensic capabilities, judicial training, and public awareness. It proposes a decentralized security operations center (SOC) model customized for low-resource nations.",
    keywords: ["Cybercrime", "Cybersecurity", "Cyberspace Sierra Leone", "Cyber Security Act 2021", "Forensics", "Low-resource SOC"],
    category: "journal-article",
    doi: "10.4018/IJCWT.2024.02",
    link: "https://example.org/pub/cybercrime-sl"
  },
  {
    id: "pub-iamtech-db",
    title: "Student Dissertation Database Management System: IAMTECH Sierra Leone as a Case Study",
    authors: "Sawaneh, I. A., Conteh, M., & Bangura, A. B.",
    year: 2023,
    journal: "International Journal of Information and Education Technology",
    publisher: "IJIET Org",
    abstract: "Academic institutions in developing regions frequently struggle with paper-based thesis archiving, resulting in lost institutional knowledge and plagiarism vulnerabilities. This paper describes the development and deployment of a secure, lightweight, web-based Dissertation Database Management System at the Institute of Advanced Management and Technology (IAMTECH). The system utilizes MySQL, PHP, and dual-layer indexing, improving retrieval times by 94% and establishing an automated duplicate-detection module.",
    keywords: ["Dissertation Database", "DBMS", "IAMTECH", "Higher Education", "Plagiarism Prevention", "Sierra Leone"],
    category: "journal-article",
    doi: "10.18178/ijiet.2023.13.4.1852",
    link: "https://example.org/pub/iamtech-dbms"
  },
  {
    id: "pub-elearning-post-pandemic",
    title: "Evaluating E-Learning Readiness and Technology Acceptance in Sierra Leonean Universities Post-COVID-19",
    authors: "Sawaneh, I. A.",
    year: 2022,
    journal: "Education and Information Technologies",
    publisher: "Springer",
    abstract: "Following the COVID-19 pandemic, tertiary institutions rushed to implement Virtual Learning Environments. This paper uses the Technology Acceptance Model (TAM) extended with self-efficacy and bandwidth accessibility to evaluate user adoption among 850 students and faculty. Results indicate that 'Perceived Usefulness' is heavily gated by daily power stability and data costs, recommending that universities partner with telecom operators for zero-rated education domains.",
    keywords: ["E-Learning", "TAM Model", "Bandwidth accessibility", "Higher Education", "COVID-19 response", "Digital Divide"],
    category: "journal-article",
    doi: "10.1007/s10639-022-10981-y",
    link: "https://example.org/pub/elearning-tam"
  },
  {
    id: "pub-employee-motivation",
    title: "The Impact of Administrative Leadership Style and Employee Motivation on Institutional Agility in Tertiary Education",
    authors: "Sawaneh, I. A., & Turay, S.",
    year: 2021,
    journal: "Journal of Management and Organizational Studies",
    publisher: "Global Science Press",
    abstract: "An empirical investigation into administrative structures across Sierra Leonean private colleges. The study determines that collaborative, transformational leadership styles directly correlate with rapid academic programmatic adaptation, mediated positively by staff recognition programs and clear professional paths. Structural policies are recommended to decrease high staff turnover.",
    keywords: ["Management Science", "Employee Motivation", "Tertiary Administration", "Institutional Agility"],
    category: "journal-article",
    doi: "10.5430/jmos.v8n1p45",
    link: "https://example.org/pub/motivation-agility"
  },
  {
    id: "pub-iot-smart-cities",
    title: "A Framework for IoT-Enabled Urban Flooding Risk Mitigation in Coastal West African Municipalities",
    authors: "Sawaneh, I. A.",
    year: 2023,
    category: "conference-paper",
    journal: "Proceedings of the International Conference on Smart Cities & Infrastructure (ICSCI)",
    abstract: "Coastal cities like Freetown face extreme monsoon flooding annually. This paper proposes a low-cost IoT architecture using ultrasonic water level sensors connected via LoRaWAN to an emergency dispatch system. The simulation shows that early warn cues can buy communities up to 45 minutes of critical evacuation time.",
    keywords: ["IoT", "Smart Cities", "Urban Flooding", "LoRaWAN", "Evacuation Modeling", "Freetown"],
    doi: "10.1109/ICSCI.2023.1023",
    link: "https://example.org/pub/iot-flooding"
  },
  {
    id: "pub-book-chapter-cyber",
    title: "Regional Harmonization of Cyber Security Policies in the ECOWAS Sub-Region: Barriers and Progress",
    authors: "Sawaneh, I. A.",
    year: 2024,
    category: "book-chapter",
    journal: "Cybersecurity and Digital Sovereignty in Developing Economies",
    publisher: "Routledge Global Series",
    abstract: "This chapter assesses the alignment of national laws with the ECOWAS Cyber Security Directive. It highlights key structural, political, and financial discrepancies that stall the implementation of joint border cyber-patrols and cross-border digital forensic sharing agreements.",
    keywords: ["ECOWAS", "Cyber Policy Harmonization", "Digital Sovereignty", "Routledge"],
    link: "https://example.org/pub/ecowas-harmonization"
  }
];

export const BOOKS: Book[] = [
  {
    id: "book-cyber-crime",
    title: "The Role of Cyber Security in Minimizing Online Crime Rate in Postwar",
    subtitle: "Rebuilding Trust, Sovereign Infrastructures, and Legal Frameworks in Transitioning Nations",
    year: 2023,
    publisher: "Academic Academic Publishing (AAP)",
    isbn: "978-3-96543-219-5",
    coverColor: "from-slate-900 via-blue-950 to-amber-950",
    synopsis: "In the wake of civil conflict, post-war nations focus resources on physical disarmament, demobilization, and rebuilding classic physical infrastructure. However, the contemporary post-war landscape introduces a complex, invisible frontier: cyberspace. This pioneering work explores how nations transitioning out of conflict face catastrophic vulnerabilities due to weak telecommunication regulations, high digital illiteracy, and a complete absence of cyber-intelligence agencies.",
    whyItMatters: "As cybercriminals weaponize the digital space of developing nations for money laundering, human trafficking, and financial scams, Dr. Sawaneh argues that national cybersecurity is not a luxury, but a structural cornerstone of modern sovereignty and economic rehabilitation.",
    tableOfContents: [
      "Chapter 1: The Virtual Battlefield in Transitioning Societies",
      "Chapter 2: Subsea Fiber Optics and the Unprepared Digital Hinterland",
      "Chapter 3: Financial Crimes and Mobile Money Vulns in Post-War West Africa",
      "Chapter 4: Formulating Sovereign Cryptographic Control & Cyber Laws",
      "Chapter 5: Deploying Low-Overhead National Computer Emergency Response Teams (CERTs)",
      "Chapter 6: Community-Centric Digital Literacy and Safe Cyberspace Frameworks"
    ],
    reviews: [
      {
        author: "Prof. Alusine Kamara",
        role: "Director of Research, Ministry of Communication and Technology, SL",
        text: "Dr. Sawaneh provides an essential roadmap for protecting developing digital infrastructure. A must-read for policymakers and security practitioners."
      },
      {
        author: "Dr. Elena Rostov",
        role: "Global Cybersecurity Lead, International Telecommunication Union (ITU)",
        text: "An extraordinary volume that shifts the cybersecurity narrative away from Silicon Valley to the authentic, pressing challenges of post-conflict governance."
      }
    ],
    purchaseUrl: "https://amazon.com/placeholder-cybersecurity-postwar",
    pdfExcerptUrl: "#"
  },
  {
    id: "book-emergency-mgmt",
    title: "Disaster Risk and Emergency Information Systems in Sub-Saharan Africa",
    subtitle: "A Technical Guide to Digital Crisis Communications and Regional Resilience",
    year: 2021,
    publisher: "Sierra Leone University Press",
    isbn: "978-1-55443-128-2",
    coverColor: "from-slate-900 via-emerald-950 to-teal-900",
    synopsis: "Emergency management requires instantaneous, reliable data flows. However, geography, climate, and structural deficits often disconnect response agencies from vulnerable communities. This textbook examines the architectural design of database models, emergency alert protocols, and mobile mesh systems developed to withstand extreme climate and communications breakdowns in sub-Saharan contexts.",
    whyItMatters: "Combining management science with systems engineering, this book provides academic and vocational institutions with localized training guidelines and software design specifications.",
    tableOfContents: [
      "Chapter 1: Risk Assessment & Geographic Data Capture",
      "Chapter 2: Designing Relational Databases for Inter-Agency Emergency Portals",
      "Chapter 3: Mesh-Networking and Low-Frequency Radio Crisis Relays",
      "Chapter 4: Landslide, Flood, and Epidemic Early Warning Mathematical Models",
      "Chapter 5: Institutional Agility and Administrative Dispatch Best Practices"
    ],
    reviews: [
      {
        author: "Ing. Samuel Macauley",
        role: "President, Sierra Leone Institution of Engineers (SLIE)",
        text: "An incredibly detailed engineering text that contextualizes crisis management through practical computational databases. Unrivaled in its local scope."
      }
    ],
    purchaseUrl: "https://amazon.com/placeholder-disaster-systems-africa",
    pdfExcerptUrl: "#"
  }
];

export const TIMELINE_EXPERIENCE: TimelineItem[] = [
  {
    id: "timeline-1",
    year: "2020 - Present",
    title: "Senior Lecturer & Research Lead",
    subtitle: "Dept. of Information Systems & Computing",
    institution: "Institute of Advanced Management and Technology (IAMTECH), Freetown",
    category: "appointment",
    description: "Heading senior research programs in technology acceptance, databases, and network administration. Designing localized curricula and training undergraduate and graduate students in engineering research methodologies."
  },
  {
    id: "timeline-2",
    year: "2019",
    title: "Ph.D. in Computer Science & Information Systems",
    subtitle: "Doctoral Thesis: Cybercrime Prevention & Sovereign Infrastructures",
    institution: "Academic Research University",
    category: "education",
    description: "Researched technical and socio-policy cybersecurity dynamics in low-resource environments. Developed novel security monitoring architectural designs."
  },
  {
    id: "timeline-3",
    year: "2022 - Present",
    title: "Chairman, Academic Senate Curriculum Committee",
    subtitle: "Institutional Leadership & Governance Role",
    institution: "IAMTECH Senate",
    category: "leadership",
    description: "Spearheaded the complete transition of classical computational curricula to high-impact STEM systems, implementing active coding pathways, database engineering modules, and internship matching programs."
  },
  {
    id: "timeline-4",
    year: "2024",
    title: "National Outstanding Research Impact Award",
    subtitle: "Recognized for disaster response technology models",
    institution: "Sierra Leone Commission for Science and Technology",
    category: "award",
    description: "Awarded for pioneering research in early flood monitoring systems and disaster mediation framework structures, heavily cited in the national environmental safety reform blueprint."
  },
  {
    id: "timeline-5",
    year: "2015",
    title: "M.Sc. in Database Engineering & Management Science",
    subtitle: "Distinction Graduate",
    institution: "School of Engineering & Administration",
    category: "education",
    description: "Focused on high-performance relational databases, operational forecasting, and strategic management science."
  },
  {
    id: "timeline-6",
    year: "2012",
    title: "B.Sc. in Computer Science & Electronics Engineering",
    subtitle: "First Class Honors",
    institution: "University of Sierra Leone",
    category: "education",
    description: "Foundation in computer systems architecture, telecommunication networks, mathematics, and logic structures."
  },
  {
    id: "timeline-7",
    year: "2018 - Present",
    title: "Corporate Consultant & Registered Professional Engineer",
    subtitle: "Licensed by Sierra Leone Institution of Engineers (SLIE)",
    institution: "SLIE / Private Consulting",
    category: "research",
    description: "Consulting for corporate banks, universities, and government boards on cybersecurity training, enterprise resource planning (ERP) deployments, and disaster contingency audits."
  }
];

export const TALK_EVENTS: TalkEvent[] = [
  {
    id: "talk-1",
    title: "Securing Our Digital Sovereignty: The Cyber Imperative for Postwar West Africa",
    type: "Keynote",
    eventName: "National Cybersecurity Summit Sierra Leone",
    date: "October 14, 2025",
    location: "Freetown Bintumani Conference Centre",
    role: "Lead Keynote Speaker",
    summary: "Addressed policymakers, telecom providers, and military personnel on the urgent need to fund a dedicated national Computer Emergency Response Team (CERT) and set up cross-border threat telemetry databases."
  },
  {
    id: "talk-2",
    title: "The Mediating Role of Policy Implementation in Combating Rapid Urban Flooding",
    type: "Conference Presentation",
    eventName: "Socio-Ecological Resilience Conference (SERC)",
    date: "May 22, 2025",
    location: "Accra, Ghana",
    role: "Paper Presenter",
    summary: "Presented spatial correlation models mapping Freetown’s rapid deforestation to poor municipal planning enforcement, proposing an institutional framework to empower neighborhood hazard response squads."
  },
  {
    id: "talk-3",
    title: "Next-Generation Academic DBMS: Standardizing Dissertation Archiving",
    type: "Guest Lecture",
    eventName: "Higher Education Technology Alignment Seminar",
    date: "January 11, 2024",
    location: "Njala University, Sierra Leone",
    role: "Guest Speaker",
    summary: "Introduced administrative deans to secure, lightweight open-source database design models to optimize thesis management, reduce duplicate research, and foster regional academic sharing networks."
  },
  {
    id: "talk-4",
    title: "Balancing Tech Adoption with Cybersecurity in E-Commerce Services",
    type: "Panel Discussion",
    eventName: "FinTech Innovation Panel Africa",
    date: "September 03, 2024",
    location: "Virtual / Lagos, Nigeria",
    role: "Panelist",
    summary: "Discussed critical threat vectors in mobile wallets and agency banking terminals, emphasizing the need for multi-factor security systems and localized customer educational messages."
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Why Paper-Based Academic Storage Stifles African Scientific Progress",
    category: "Education Technology",
    date: "June 12, 2025",
    readTime: "6 min read",
    excerpt: "Every year, thousands of brilliant, localized dissertations are filed in damp archives, forgotten and prone to decay. It is time for digital, open-access institutional repositories.",
    content: "When physical theses remain locked in administrative filing cabinets, society loses precious knowledge. African researchers end up replicating identical studies because prior research is invisible. In this article, I discuss the success of our lightweight dissertation DBMS at IAMTECH, exploring how simple indexation and online publishing can boost citations and secure academic integrity. Modern universities must treat web-accessible databases as core infrastructure.",
    imageColor: "from-blue-900 to-indigo-950",
    author: "Ing. Dr. Ibrahim Abdulai Sawaneh"
  },
  {
    id: "blog-2",
    title: "Defending the Invisible Frontier: Why West Africa is a Cybersecurity Sweet Spot",
    category: "Cybersecurity",
    date: "April 05, 2025",
    readTime: "9 min read",
    excerpt: "The influx of fiber optic broadband has brought unparalleled speed—but also unprecedented danger. Why our security legal frameworks must keep up with infrastructure.",
    content: "We often think of cyberwarfare as a superpower dynamic. However, developing nations like Sierra Leone are highly appealing proxy targets. With weak network logging laws, legacy routers, and limited local cybersecurity engineers, hackers use our IP ranges to launch attacks globally. Our 2021 Cybersecurity Act is a powerful step, but active deployment of local Security Operation Centers (SOCs) is the only real shield.",
    imageColor: "from-slate-900 to-red-950",
    author: "Ing. Dr. Ibrahim Abdulai Sawaneh"
  },
  {
    id: "blog-3",
    title: "Policy vs. Practice: The Gap Stalling Our Disaster Resilience Efforts",
    category: "Disaster Management",
    date: "January 19, 2025",
    readTime: "7 min read",
    excerpt: "Writing an excellent disaster policy document is straightforward. Implementing it across rural councils with zero technical training is where we stumble. How we bridge this.",
    content: "Our recent spatial models reveal a stark mismatch: excellent national contingency guidelines on desks in Freetown, but village leaders completely unaware of warning signals. To bridge this divide, we need structural mediation pathways: training rural administrative leaders, funding district responder gear, and using low-bandwidth SMS dispatch services. Disaster risk reduction is not a paperwork goal—it is a live operations standard.",
    imageColor: "from-emerald-950 to-stone-900",
    author: "Ing. Dr. Ibrahim Abdulai Sawaneh"
  }
];

export const RESEARCH_STATISTICS = {
  publicationsCount: 38,
  citationsCount: 420,
  hIndex: 12,
  booksPublished: 2,
  completedProjects: 15,
  studentsSupervised: 120,
  yearsExperience: 22
};


export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "gal-1",
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1000",
    caption: "Presenting at the International Academic Conference 2024",
    category: "Conferences",
    order: 1
  },
  {
    id: "gal-2",
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000",
    caption: "Teaching advanced data structures to senior cohort",
    category: "Teaching",
    order: 2
  },
  {
    id: "gal-3",
    url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000",
    caption: "Collaborative research session with visiting scholars",
    category: "Research",
    order: 3
  },
  {
    id: "gal-4",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1000",
    caption: "Keynote speech at the Global Tech Symposium",
    category: "Conferences",
    order: 4
  },
  {
    id: "gal-5",
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1000",
    caption: "Working with students in the computing laboratory",
    category: "Teaching",
    order: 5
  },
  {
    id: "gal-6",
    url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000",
    caption: "Academic panel discussion on AI ethics",
    category: "Conferences",
    order: 6
  }
];

export const CMS_MODELS_INFO = [
  {
    name: "Biography & Master Meta",
    fields: ["Full Name", "Aesthetic Theme Color", "Hero Summary Paragraph", "Consultation Status", "Social Identifiers", "Official Title Tagline"],
    lastUpdated: "2026-07-02",
    recordsCount: 1,
    status: "Synced"
  },
  {
    name: "Publications Repository",
    fields: ["Title", "Author String", "Publication Year", "Journal / Proceeding", "Abstract Summary", "Keywords Array", "Category Tag", "DOI / Link", "Resource Attachment"],
    lastUpdated: "2026-06-28",
    recordsCount: PUBLICATIONS.length,
    status: "Ready"
  },
  {
    name: "Book Showcase",
    fields: ["Title", "Subtitle", "Year of Publication", "Publisher Name", "ISBN-13 String", "Cover Gradient Theme", "Full Synopsis Text", "Value Proposition", "Chapter Table of Contents", "Purchase Links"],
    lastUpdated: "2026-06-15",
    recordsCount: BOOKS.length,
    status: "Ready"
  },
  {
    name: "Academic Timeline & Resume",
    fields: ["Academic Year Interval", "Position Title", "Sub-department / Focus", "Affiliate Institution", "Classification (Education / Award / Appointment)", "Detailed Outcomes Summary"],
    lastUpdated: "2026-07-01",
    recordsCount: TIMELINE_EXPERIENCE.length,
    status: "Synced"
  },
  {
    name: "Speaking Engagements & Events",
    fields: ["Talk Title", "Aesthetic Event Type", "Forum Name", "Date of Event", "Geographic Location", "Presenter Role Description", "Executive Summary", "Media Slide Attachment"],
    lastUpdated: "2026-06-30",
    recordsCount: TALK_EVENTS.length,
    status: "Ready"
  },
  {
    name: "Thought Leadership Blog & Insights",
    fields: ["Article Title", "Category Classification", "Publication Date", "Reading Length Metric", "Excerpt Synopsis", "Full Markdown Content", "Theme Color Code"],
    lastUpdated: "2026-07-03",
    recordsCount: BLOG_POSTS.length,
    status: "Live"
  },
  {
    name: "Visual Gallery",
    fields: ["Image URL", "Caption Text", "Category Segment", "Sort Order"],
    lastUpdated: "2026-07-04",
    recordsCount: GALLERY_IMAGES.length,
    status: "Synced"
  }
];

