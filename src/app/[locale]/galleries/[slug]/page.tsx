'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Gallery } from '@/types';
import ImageModal from '@/components/ImageModal';

// Import sample data
import galleriesData from '@/data/galleries.json';

interface PageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export default function GalleryPage({ params }: PageProps) {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title: string;
    description?: string;
  } | null>(null);

  const gallery: Gallery | undefined = galleriesData.find(
    (g) => g.slug === params.slug
  );

  const currentIndex = galleriesData.findIndex(g => g.slug === params.slug);
  const prevGallery = currentIndex > 0 ? galleriesData[currentIndex - 1] : null;
  const nextGallery = currentIndex < galleriesData.length - 1 ? galleriesData[currentIndex + 1] : null;

  if (!gallery) {
    notFound();
  }

  const handleImageClick = (photo: any) => {
    setSelectedImage({
      src: photo.url,
      alt: photo.title,
      title: photo.title,
      description: photo.description
    });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Gallery Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4">
            <Link href="/galleries" className="text-blue-600 hover:text-blue-800">
              作品集
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{gallery.title}</span>
          </nav>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {gallery.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              {gallery.description}
            </p>
            <div className="text-sm text-gray-500">
              共 {gallery.photos.length} 张作品
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {gallery.photos.map((photo) => (
              <div 
                key={photo.id} 
                className="group cursor-pointer"
                onClick={() => handleImageClick(photo)}
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end">
                    <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                      <p className="text-sm opacity-90">{photo.description}</p>
                      <div className="text-xs mt-2 opacity-75">
                        {photo.date} · {photo.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              {prevGallery && (
                <Link 
                  href={`/galleries/${prevGallery.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <div>
                    <div className="text-sm text-gray-500">上一个作品集</div>
                    <div className="font-medium">{prevGallery.title}</div>
                  </div>
                </Link>
              )}
            </div>
            
            <div className="flex-1 text-center">
              <Link 
                href="/galleries"
                className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                返回作品集
              </Link>
            </div>
            
            <div className="flex-1 text-right">
              {nextGallery && (
                <Link 
                  href={`/galleries/${nextGallery.slug}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <div className="text-right">
                    <div className="text-sm text-gray-500">下一个作品集</div>
                    <div className="font-medium">{nextGallery.title}</div>
                  </div>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={!!selectedImage}
          onClose={closeModal}
          imageSrc={selectedImage.src}
          imageAlt={selectedImage.alt}
          title={selectedImage.title}
          description={selectedImage.description}
        />
      )}
    </div>
  );
}