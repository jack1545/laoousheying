'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import BlogForm from '@/components/BlogForm';
import { BlogPost } from '@/types';

export default function EditPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        alert('文章不存在');
      }
    } catch (error) {
      console.error('Failed to fetch post:', error);
      alert('加载文章失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500">文章不存在</div>
      </div>
    );
  }

  return (
    <div>
      <BlogForm initialData={post} isEdit={true} />
    </div>
  );
}