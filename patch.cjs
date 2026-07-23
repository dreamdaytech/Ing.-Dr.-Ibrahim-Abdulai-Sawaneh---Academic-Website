const fs = require('fs');
const content = fs.readFileSync('src/data/academicData.ts', 'utf-8');

const galleryImages = `
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

export const CMS_MODELS_INFO = [`;

const updatedContent = content.replace('export const CMS_MODELS_INFO = [', galleryImages);
fs.writeFileSync('src/data/academicData.ts', updatedContent);
