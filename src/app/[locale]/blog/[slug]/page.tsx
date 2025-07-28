import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPost } from '@/types';
import BlogPostClient from './BlogPostClient';

// Import data
import blogData from '@/data/blog.json';
import tutorialData from '@/data/tutorials.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // Merge blog and tutorial data
  const allPosts = [...blogData, ...tutorialData];
  const post: BlogPost | undefined = allPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found.'
    };
  }

  return {
    title: `${post.title} - 欧伟建摄影手记`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: ['欧伟建'],
      tags: post.category ? [post.category] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    keywords: post.category ? [post.category, '摄影', '教程', '技巧'] : ['摄影', '教程', '技巧'],
  };
}

export default function BlogPostPage({ params }: PageProps) {
  // Merge blog and tutorial data
  const allPosts = [...blogData, ...tutorialData];
  const post: BlogPost | undefined = allPosts.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    notFound();
  }

  // Get related tutorials (previous and next)
  const getRelatedTutorials = () => {
    if (post.category !== '摄影教程' || !post.order) return { prev: null, next: null };
    
    const tutorials = tutorialData.sort((a, b) => (a.order || 0) - (b.order || 0));
    const currentIndex = tutorials.findIndex(t => t.slug === post.slug);
    
    return {
      prev: currentIndex > 0 ? tutorials[currentIndex - 1] : null,
      next: currentIndex < tutorials.length - 1 ? tutorials[currentIndex + 1] : null
    };
  };
  
  const { prev, next } = getRelatedTutorials();

  return (
    <>
      {/* Post Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-4">
            <Link href="/zh/blog" className="text-blue-600 hover:text-blue-800">
              摄影手记
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-600">{post.title}</span>
          </nav>
          
          <div className="max-w-6xl mx-auto">
            {/* Featured Image */}
            <div className="relative h-96 bg-gradient-to-br from-gray-400 to-gray-600 rounded-lg mb-8">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-2xl font-semibold">
                  {post.title}
                </span>
              </div>
            </div>
            
            {/* Post Meta */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {post.title}
              </h1>
              <div className="text-gray-600">
                {new Date(post.publishDate).toLocaleDateString('zh-CN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex gap-8">
              <BlogPostClient post={post} />
            </div>
            
            {/* Tutorial Navigation */}
            {post.category === '摄影教程' && (prev || next) && (
              <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">课程导航</h3>
                <div className="flex justify-between">
                  {prev ? (
                    <Link
                      href={`/zh/blog/${prev.slug}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <div>
                        <div className="text-sm text-gray-500">上一课</div>
                        <div className="font-medium">{prev.title}</div>
                      </div>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                  
                  {next ? (
                    <Link
                      href={`/zh/blog/${next.slug}`}
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors text-right"
                    >
                      <div>
                        <div className="text-sm text-gray-500">下一课</div>
                        <div className="font-medium">{next.title}</div>
                      </div>
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            )}
            
            {/* Back to Blog */}
            <div className="mt-8 text-center">
              <Link 
                href="/zh/blog"
                className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                返回博客列表
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}