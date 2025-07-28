'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Gallery } from '@/types';
import galleries from '@/data/galleries.json';

// 注意：由于使用了客户端组件，metadata 需要在 layout.tsx 中设置

// 获取更多画廊作为精选作品
const featuredGalleries = galleries.slice(0, 12);

// 从所有画廊中提取单张作品
const featuredPhotos = galleries.flatMap(gallery =>
  gallery.photos.slice(0, 2).map(photo => ({
    ...photo,
    galleryTitle: gallery.title,
    gallerySlug: gallery.slug
  }))
).slice(0, 18); // 显示18张单张作品

// 瀑布流组件
function MasonryGrid({ galleries, isSinglePhoto = false, getTranslation, currentLocale }: { galleries: Gallery[]; isSinglePhoto?: boolean; getTranslation: (key: string) => string; currentLocale: string }) {
  const [imageHeights, setImageHeights] = useState<{ [key: string]: number }>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (gallerySlug: string, img: HTMLImageElement) => {
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    // 基础宽度为300px，计算对应高度，保持原始比例
    const baseWidth = 300;
    const calculatedHeight = Math.round(baseWidth * aspectRatio);

    setImageHeights(prev => ({
      ...prev,
      [gallerySlug]: calculatedHeight
    }));
  };

  useEffect(() => {
    // 当所有图片高度都计算完成后，标记为已加载
    if (Object.keys(imageHeights).length === galleries.length) {
      setIsLoaded(true);
    }
  }, [imageHeights, galleries.length]);

  return (
    <>
      <div
        ref={gridRef}
        className={`columns-2 gap-6 space-y-6 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
      >
        {galleries.map((gallery, index) => {
          const height = imageHeights[gallery.slug] || 300; // 默认高度

          return (
            <div
              key={gallery.slug}
              className="group break-inside-avoid mb-6"
            >
              {isSinglePhoto ? (
                // 单张图片：点击放大
                <div
                  className="block h-full cursor-pointer"
                  onClick={() => setSelectedImage(gallery.coverPhotoUrl)}
                >
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={gallery.coverPhotoUrl}
                      alt={gallery.title}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        handleImageLoad(gallery.slug, img);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold mb-1">{gallery.title}</h3>
                        <p className="text-gray-200 text-sm overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {gallery.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-300">
                          {getTranslation('featuredPhotos.clickToEnlarge')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // 图集：点击进入图集页面
                <Link href={`/${currentLocale}/galleries/${gallery.slug}`} className="block">
                  <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <img
                      src={gallery.coverPhotoUrl}
                      alt={gallery.title}
                      className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                      onLoad={(e) => {
                        const img = e.target as HTMLImageElement;
                        handleImageLoad(gallery.slug, img);
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-lg font-bold mb-1">{gallery.title}</h3>
                        <p className="text-gray-200 text-sm overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                          {gallery.description}
                        </p>
                        <div className="mt-2 text-xs text-gray-300">
                          {gallery.photos.length} {getTranslation('featuredGalleries.photosCount')}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          );
        })}
      </div>

      {/* 图片放大模态框 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            <img
              src={selectedImage}
              alt="放大图片"
              className="object-contain max-w-full max-h-full"
            />
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const currentLocale = locale;
  const isEnglish = locale === 'en';

  // 始终调用hook，不要条件调用
  const t = useTranslations('Homepage');

  // 获取翻译文本的辅助函数
  const getTranslation = (key: string): string => {
    try {
      return t(key);
    } catch {
      // 如果翻译失败，返回默认文本
      const defaultTexts: { [key: string]: string } = {
        'hero.title': isEnglish ? 'Capturing Time Through the Lens' : '用镜头记录时代',
        'hero.subtitle': isEnglish ? 'Ou Weijian, Member of China Photographers Association, 30 years of light and shadow journey, interpreting humanistic feelings through images, witnessing the changes of the times through the lens' : '中国摄影家协会欧伟建，30年光影历程，用影像诠释人文情怀，用镜头见证时代变迁',
        'hero.galleryButton': isEnglish ? 'Gallery' : '作品集',
        'hero.aboutButton': isEnglish ? 'About Me' : '关于我',
        'featuredPhotos.title': isEnglish ? 'Featured Single Works' : '精选单张作品',
        'featuredPhotos.subtitle': isEnglish ? 'Each photograph is a unique moment, carrying different stories and emotions' : '每一张照片都是独特的瞬间，承载着不同的故事和情感',
        'featuredPhotos.clickToEnlarge': isEnglish ? 'Click to enlarge' : '点击放大查看',
        'featuredPhotos.viewMore': isEnglish ? 'View More Works →' : '查看更多作品 →',
        'featuredGalleries.title': isEnglish ? 'Featured Galleries' : '精选作品集',
        'featuredGalleries.subtitle': isEnglish ? 'Explore my photographic world, each gallery has its unique theme and style' : '探索我的摄影世界，每个作品集都有其独特的主题和风格',
        'featuredGalleries.photosCount': isEnglish ? 'photos' : '张照片',
        'featuredGalleries.viewAll': isEnglish ? 'View All Galleries →' : '查看全部作品集 →',
        'about.title': isEnglish ? 'About the Photographer' : '关于摄影师',
        'about.description1': isEnglish ? 'National-level photographer Zhang Mingyuan, engaged in photography for more than 30 years, specializing in landscape and documentary photography. His works have been exhibited at the National Art Museum of China, Beijing 798 Art District and other places, and have won many honors including the China Photography Golden Image Award.' : '中国国家家协会欧伟建，从事摄影工作30余年，专注于风光与纪实摄影。作品曾在中国美术馆、北京798艺术区等地展出，荣获中国摄影金像奖等多项荣誉。',
        'about.description2': isEnglish ? 'Using the lens to record the changes of the times, interpreting humanistic feelings with light and shadow, committed to conveying Chinese stories through images.' : '用镜头记录时代变迁，用光影诠释人文情怀，致力于通过影像传递中国故事。',
        'about.learnMore': isEnglish ? 'Learn More' : '了解更多',
        'about.photographerWorkPhoto': isEnglish ? 'Photographer at work' : '摄影师工作照',
        'blog.title': isEnglish ? 'Photography Notes' : '摄影手记',
        'blog.subtitle': isEnglish ? 'Sharing stories behind photography, recording thoughts and insights during the creative process' : '分享摄影背后的故事，记录创作过程中的思考与感悟',
        'blog.blogPost': isEnglish ? 'Photography Notes' : '摄影手记',
        'blog.readMore': isEnglish ? 'Read Full Article →' : '阅读全文 →',
        'blog.viewAllPosts': isEnglish ? 'View All Notes' : '查看全部手记',
        'cta.title': isEnglish ? "Let's Capture Beautiful Moments Together" : '让我们一起记录美好时光',
        'cta.subtitle': isEnglish ? "Whether it's commercial cooperation, artistic exchange, or photography guidance, feel free to contact me" : '无论是商业合作、艺术交流，还是摄影指导，都欢迎与我联系',
        'cta.contactButton': isEnglish ? 'Contact for Collaboration' : '联系合作'
      };
      return defaultTexts[key] || key;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <div
            className="h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url("/blog/huangshan-notes.webp")',
              backgroundBlendMode: 'overlay'
            }}
          >
            <div className="bg-gradient-to-r from-black/60 via-black/40 to-black/60 h-full" />
          </div>
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {getTranslation('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {getTranslation('hero.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${currentLocale}/galleries`}
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {getTranslation('hero.galleryButton')}
            </Link>
            <Link
              href={`/${currentLocale}/about`}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              {getTranslation('hero.aboutButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Single Photos */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{getTranslation('featuredPhotos.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getTranslation('featuredPhotos.subtitle')}
            </p>
          </div>

          {/* 单张作品瀑布流布局 */}
          {featuredPhotos && featuredPhotos.length > 0 ? (
            <MasonryGrid
              galleries={featuredPhotos.map(photo => ({
                slug: `${photo.gallerySlug}-${photo.id}`,
                title: photo.title || photo.galleryTitle,
                description: photo.description || `来自《${photo.galleryTitle}》`,
                coverPhotoUrl: photo.url,
                photos: [photo]
              }))}
              isSinglePhoto={true}
              getTranslation={getTranslation}
              currentLocale={currentLocale}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无单张作品展示</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href={`/${currentLocale}/galleries`}
              className="inline-flex items-center text-gray-900 font-semibold hover:text-gray-700 transition-colors"
            >
              {getTranslation('featuredPhotos.viewMore')}
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Galleries */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{getTranslation('featuredGalleries.title')}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {getTranslation('featuredGalleries.subtitle')}
            </p>
          </div>

          {/* 作品集瀑布流布局 */}
          {featuredGalleries && featuredGalleries.length > 0 ? (
            <MasonryGrid galleries={featuredGalleries} getTranslation={getTranslation} currentLocale={currentLocale} />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">暂无作品集展示</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href={`/${currentLocale}/galleries`}
              className="inline-flex items-center text-gray-900 font-semibold hover:text-gray-700 transition-colors"
            >
              {getTranslation('featuredGalleries.viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getTranslation('about.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {getTranslation('about.description1')}
              </p>
              <p className="text-lg text-gray-600 mb-8">
                {getTranslation('about.description2')}
              </p>
              <Link
                href={`/${currentLocale}/about`}
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                {getTranslation('about.learnMore')}
              </Link>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <img
                src="/photographer-avatar.webp"
                alt={getTranslation('about.photographerWorkPhoto')}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">{getTranslation('blog.title')}</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {getTranslation('blog.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: 1,
                image: '/blog/huangshan-notes.webp',
                title: isEnglish ? 'Huangshan Photography Notes' : '黄山摄影手记',
                description: isEnglish ? 'Sharing the experience and techniques of shooting in Huangshan...' : '分享在黄山拍摄的经验和技巧...'
              },
              {
                id: 2,
                image: '/blog/street-photography.webp',
                title: isEnglish ? 'Street Photography Insights' : '街头摄影心得',
                description: isEnglish ? 'Exploring the art of capturing life on the streets...' : '探索街头生活捕捉的艺术...'
              },
              {
                id: 3,
                image: '/blog/huangshan-notes.webp',
                title: isEnglish ? 'Light and Shadow Techniques' : '光影技巧分享',
                description: isEnglish ? 'Understanding the interplay of light and shadow in photography...' : '理解摄影中光影的相互作用...'
              }
            ].map((post) => (
              <div key={post.id} className="bg-gray-800 rounded-lg overflow-hidden group hover:transform hover:scale-105 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-300 mb-4">
                    {post.description}
                  </p>
                  <Link
                    href={`/${currentLocale}/blog`}
                    className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200"
                  >
                    {getTranslation('blog.readMore')}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${currentLocale}/blog`}
              className="inline-flex items-center text-white border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
            >
              {getTranslation('blog.viewAllPosts')}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation('cta.title')}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {getTranslation('cta.subtitle')}
          </p>
          <Link
            href={`/${currentLocale}/contact`}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {getTranslation('cta.contactButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}