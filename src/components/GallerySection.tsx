import React, { useState } from 'react';
import { X, ZoomIn, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryImage } from '../types';
import { GALLERY_IMAGES as DEFAULT_GALLERY } from '../data/academicData';

interface GallerySectionProps {
  galleryImages?: GalleryImage[];
}

export default function GallerySection({ galleryImages = DEFAULT_GALLERY }: GallerySectionProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(galleryImages.map(img => img.category)))];
  
  const filteredImages = activeCategory === 'All' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mt-16">
      <div className="mb-12 border-b border-editorial-border-light pb-6">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-editorial-navy mb-4">
          Visual Gallery
        </h1>
        <p className="text-slate-600 font-sans max-w-3xl leading-relaxed">
          A visual record of academic engagements, conference presentations, teaching moments, and collaborative research initiatives.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors ${
              activeCategory === category
                ? 'bg-editorial-navy text-white'
                : 'bg-white border border-editorial-border text-slate-600 hover:border-editorial-gold hover:text-editorial-navy'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredImages.map((image) => (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            key={image.id}
            className="group relative cursor-pointer overflow-hidden border border-editorial-border-light bg-white"
            onClick={() => setSelectedImage(image)}
          >
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img
                src={image.url}
                alt={image.caption}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-editorial-navy/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
              <ZoomIn className="text-white h-8 w-8" />
            </div>
            <div className="p-4 border-t border-editorial-border-light">
              <p className="text-[10px] font-mono text-editorial-gold uppercase tracking-wider mb-2">
                {image.category}
              </p>
              <p className="text-sm font-sans text-slate-700 line-clamp-2">
                {image.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-editorial-navy/95 p-4 sm:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative max-h-full max-w-5xl w-full flex flex-col items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.caption}
                className="max-h-[75vh] w-auto object-contain border-4 border-white/10"
              />
              <div className="w-full max-w-3xl mt-6 text-center">
                <span className="inline-block px-3 py-1 bg-editorial-gold/20 text-editorial-gold text-[10px] font-mono uppercase tracking-widest mb-3">
                  {selectedImage.category}
                </span>
                <p className="text-white font-sans text-lg md:text-xl">
                  {selectedImage.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
