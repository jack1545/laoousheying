'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Gallery } from '@/types';

// Import sample data
import galleriesData from '@/data/galleries.json';

export default function GalleriesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isEnglish = locale === 'en';
  
  // 尝试获取翻译，如果失败则使用默认文本
  let t: any;
  try {
    t = useTranslations('Galleries');
  } catch (error) {
    // 如果没有翻译上下文，使用默认文本
    t = (key: string) => {
      const defaultTexts: { [key: string]: string } = {
        title: isEnglish ? 'Photography Portfolio' : '摄影作品集',
        subtitle: isEnglish ? 'Every photo is a story, every series is a journey' : '每一张照片都是一个故事，每一个系列都是一段旅程',
        photosCount: isEnglish ? 'photos' : '张作品',
        viewGallery: isEnglish ? 'View Gallery →' : '查看作品集 →'
      };
      return defaultTexts[key] || key;
    };
  }
  const galleries: Gallery[] = galleriesData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {t('title')}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Galleries Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {galleries.map((gallery) => (
              <Link 
                key={gallery.slug} 
                href={`/${locale}/galleries/${gallery.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                  <Image
                    src={gallery.coverPhotoUrl}
                    alt={gallery.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  
                  {/* 渐变遮罩 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* 悬停时的额外遮罩 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
                  
                  {/* 嵌入的文字信息 */}
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                      {gallery.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-white/90 text-lg font-medium drop-shadow-md">
                        {gallery.photos.length} {t('photosCount')}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-white text-lg font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
                          {t('viewGallery')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 点击放大预览指示器 */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 border border-white/30">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}