'use client';

import { useState, useEffect } from 'react';
import { BlogPost } from '@/types';

interface BlogPostClientProps {
  post: BlogPost;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  // Generate table of contents for tutorials
  const [headings, setHeadings] = useState<Array<{id: string, text: string, level: number}>>([]);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (post.category === '摄影教程') {
      const headingElements = post.content.match(/^#{2,3}\s+(.+)$/gm) || [];
      const headingList = headingElements.map((heading, index) => {
        const level = heading.match(/^#{2,3}/)?.[0].length || 2;
        const text = heading.replace(/^#{2,3}\s+/, '');
        const id = `heading-${index}`;
        return { id, text, level };
      });
      setHeadings(headingList);
    }
  }, [post.content, post.category]);

  return (
    <>
      {/* Table of Contents (only for tutorials) */}
      {post.category === '摄影教程' && headings.length > 0 && (
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">课程目录</h3>
              <nav className="space-y-2">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    className={`block text-sm transition-colors ${
                      activeSection === heading.id
                        ? 'text-blue-600 font-medium'
                        : 'text-gray-600 hover:text-gray-900'
                    } ${
                      heading.level === 3 ? 'pl-4' : ''
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(heading.id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Excerpt */}
          <div className="text-xl text-gray-600 mb-8 leading-relaxed border-l-4 border-blue-600 pl-6">
            {post.excerpt}
          </div>
          
          <div className="prose prose-lg max-w-none">
            {post.content.split('\n').map((line, index) => {
              if (line.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold text-gray-900 mb-6">
                    {line.substring(2)}
                  </h1>
                );
              } else if (line.startsWith('## ')) {
                return (
                  <h2 key={index} id={`heading-${index}`} className="text-2xl font-semibold text-gray-800 mb-4 mt-8">
                    {line.substring(3)}
                  </h2>
                );
              } else if (line.startsWith('### ')) {
                return (
                  <h3 key={index} id={`heading-${index}`} className="text-xl font-medium text-gray-700 mb-3 mt-6">
                    {line.substring(4)}
                  </h3>
                );
              } else if (line.startsWith('- ')) {
                return (
                  <li key={index} className="mb-2">
                    {line.substring(2)}
                  </li>
                );
              } else if (line.trim() === '') {
                return <br key={index} />;
              } else {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {line}
                  </p>
                );
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
}