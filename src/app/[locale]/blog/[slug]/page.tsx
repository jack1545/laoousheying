import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogPost } from '@/types';
import BlogPostClient from './BlogPostClient';

// Import data
import blogData from '@/data/blog.json';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post: BlogPost | undefined = blogData.find(
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
  const post: BlogPost | undefined = blogData.find(
    (p) => p.slug === params.slug
  );

  if (!post) {
    notFound();
  }

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