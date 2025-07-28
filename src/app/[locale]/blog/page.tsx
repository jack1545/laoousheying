'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { BlogPost } from '@/types';

// Import sample data
import blogData from '@/data/blog.json';
import blogConfig from '@/data/blog-config.json';

// Note: metadata moved to layout.tsx for client component

interface ExtendedBlogPost extends BlogPost {
  category?: string;
  order?: number;
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isEnglish = locale === 'en';
  
  // 始终调用hook，不要条件调用
  const t = useTranslations('Blog');

  // 获取翻译文本的辅助函数
  const getTranslation = (key: string): string => {
    try {
      return t(key);
    } catch {
      // 如果翻译失败，返回默认文本
      const defaultTexts: { [key: string]: string } = {
        title: isEnglish ? 'Photography Notes & Tutorials' : '摄影手记与教程',
        subtitle: isEnglish ? 'Sharing stories behind photography, recording thoughts and insights during the creative process' : '分享摄影背后的故事，记录创作过程中的思考与感悟',
        allCategories: isEnglish ? 'All' : '全部',
        photographyNotes: isEnglish ? 'Photography Notes' : '摄影手记',
        photographyTutorials: isEnglish ? 'Photography Tutorials' : '摄影教程',
        readMore: isEnglish ? 'Read More →' : '阅读全文 →',
        noContent: isEnglish ? 'No content available in this category' : '该分类下暂无内容'
      };
      return defaultTexts[key] || key;
    }
  };
  const [selectedCategory, setSelectedCategory] = useState<string>(getTranslation('allCategories'));
  
  // Only use blog posts since tutorials are removed
  const allPosts: ExtendedBlogPost[] = [
    ...blogData.map(post => ({ ...post, category: getTranslation('photographyNotes') }))
  ];

  // Get unique categories
  const categories = [getTranslation('allCategories'), ...Array.from(new Set(allPosts.map(post => post.category).filter((cat): cat is string => Boolean(cat))))];

  // Filter posts by category
  const filteredPosts = selectedCategory === getTranslation('allCategories') 
    ? allPosts 
    : allPosts.filter(post => post.category === selectedCategory);

  // Sort posts by date (newest first) or by order for tutorials
  const sortedPosts = filteredPosts.sort((a, b) => {
    if (a.category === getTranslation('photographyTutorials') && b.category === getTranslation('photographyTutorials')) {
      return (a.order || 0) - (b.order || 0);
    }
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Custom Image */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={blogConfig.heroImage.url}
            alt={blogConfig.heroImage.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {getTranslation('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8">
            {getTranslation('subtitle')}
          </p>
        </div>
      </section>

      {/* Category Filter Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {sortedPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{getTranslation('noContent')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedPosts.map((post) => (
                <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  {/* Featured Image */}
                  <div className="relative h-48">
                    {post.featuredImageUrl ? (
                      <img
                        src={post.featuredImageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="bg-gradient-to-br from-gray-400 to-gray-600 h-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {post.title.substring(0, 20)}...
                        </span>
                      </div>
                    )}
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        post.category === getTranslation('photographyTutorials') 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {post.category}
                        {post.category === getTranslation('photographyTutorials') && post.order && (
                          <span className="ml-1">#{post.order}</span>
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(post.publishDate).toLocaleDateString(isEnglish ? 'en-US' : 'zh-CN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <Link 
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      {getTranslation('readMore')}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}