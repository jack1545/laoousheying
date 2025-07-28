'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BlogPost } from '@/types';

interface ExtendedBlogPost extends BlogPost {
  type?: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<ExtendedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('确定要删除这篇文章吗？')) return;

    try {
      const response = await fetch(`/api/admin/posts/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPosts(posts.filter(post => post.slug !== slug));
        alert('文章删除成功！');
      } else {
        alert('删除失败！');
      }
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('删除失败！');
    }
  };

  // 过滤文章
  const filteredPosts = posts.filter(post => {
    if (categoryFilter === 'all') return true;
    if (categoryFilter === 'blog') return post.category === '摄影手记';
    if (categoryFilter === 'tutorial') return post.category === '摄影教程';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">加载中...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">博客与教程管理</h1>
        <Link
          href="/admin/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          新建文章
        </Link>
      </div>

      {/* 分类过滤器 */}
      <div className="mb-6">
        <div className="flex space-x-4">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoryFilter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            全部 ({posts.length})
          </button>
          <button
            onClick={() => setCategoryFilter('blog')}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoryFilter === 'blog'
                ? 'bg-green-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            摄影手记 ({posts.filter(p => p.category === '摄影手记').length})
          </button>
          <button
            onClick={() => setCategoryFilter('tutorial')}
            className={`px-4 py-2 rounded-md transition-colors ${
              categoryFilter === 'tutorial'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            摄影教程 ({posts.filter(p => p.category === '摄影教程').length})
          </button>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                标题
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                分类
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                发布日期
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                摘要
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <tr key={post.slug} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                        {post.category === '摄影教程' && post.order && (
                          <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            第{post.order}课
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        {post.slug}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    post.category === '摄影教程'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {post.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(post.publishDate).toLocaleDateString('zh-CN')}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs truncate">
                    {post.excerpt}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="space-x-2">
                    <Link
                      href={`/admin/edit/${post.slug}`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      编辑
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="text-red-600 hover:text-red-900"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              {categoryFilter === 'all' ? '暂无文章' : `暂无${
                categoryFilter === 'blog' ? '摄影手记' : '摄影教程'
              }`}
            </div>
            <Link
              href="/admin/new"
              className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              创建第一篇文章
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}