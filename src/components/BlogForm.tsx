'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import { BlogPost } from '@/types';

interface BlogFormProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    featuredImageUrl: initialData?.featuredImageUrl || '',
    publishDate: initialData?.publishDate || new Date().toISOString().split('T')[0],
    category: initialData?.category || '摄影手记',
    order: initialData?.order?.toString() || '',
    images: initialData?.images?.join('\n') || '',
  });

  // 自动生成slug
  useEffect(() => {
    if (!isEdit && formData.title && !formData.slug) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title, isEdit, formData.slug]);

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleContentChange = (content: string) => {
    setFormData(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.excerpt) {
      alert('请填写标题、摘要和内容');
      return;
    }

    // 如果是教程且没有设置order，提醒用户
    if (formData.category === '摄影教程' && !formData.order) {
      if (!confirm('教程没有设置课程顺序，将放在最后。是否继续？')) {
        return;
      }
    }

    setLoading(true);

    try {
      const url = isEdit ? `/api/admin/posts/${initialData?.slug}` : '/api/admin/posts';
      const method = isEdit ? 'PUT' : 'POST';

      // 处理images字段
      const images = formData.images.trim() ? formData.images.split('\n').map(img => img.trim()).filter(Boolean) : undefined;

      const requestData = {
        ...formData,
        order: formData.order ? parseInt(formData.order) : undefined,
        images,
        type: formData.category === '摄影教程' ? 'tutorial' : 'blog',
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        alert(isEdit ? '文章更新成功！' : '文章创建成功！');
        router.push('/admin');
      } else {
        const error = await response.text();
        alert(`操作失败: ${error}`);
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('操作失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const isTutorial = formData.category === '摄影教程';

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {isEdit ? '编辑文章' : '新建文章'}
        </h1>

        {/* 分类选择 */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            文章分类 *
          </label>
          <select
            id="category"
            value={formData.category}
            onChange={handleInputChange('category')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="摄影手记">摄影手记</option>
            <option value="摄影教程">摄影教程</option>
          </select>
        </div>

        {/* 标题 */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            文章标题 *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange('title')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入文章标题"
            required
          />
        </div>

        {/* Slug */}
        <div className="mb-4">
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            URL别名 (Slug) *
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={handleInputChange('slug')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="url-slug"
            required
            disabled={isEdit}
          />
          <p className="text-sm text-gray-500 mt-1">
            用于生成文章链接，只能包含字母、数字和连字符
          </p>
        </div>

        {/* 课程顺序（仅教程显示） */}
        {isTutorial && (
          <div className="mb-4">
            <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
              课程顺序
            </label>
            <input
              type="number"
              id="order"
              value={formData.order}
              onChange={handleInputChange('order')}
              className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1"
              min="1"
            />
            <p className="text-sm text-gray-500 mt-1">
              设置教程的课程顺序，数字越小越靠前
            </p>
          </div>
        )}

        {/* 摘要 */}
        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            文章摘要 *
          </label>
          <textarea
            id="excerpt"
            value={formData.excerpt}
            onChange={handleInputChange('excerpt')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="简要描述文章内容，将显示在文章列表中"
            required
          />
        </div>

        {/* 特色图片URL */}
        <div className="mb-4">
          <label htmlFor="featuredImageUrl" className="block text-sm font-medium text-gray-700 mb-2">
            特色图片URL
          </label>
          <input
            type="url"
            id="featuredImageUrl"
            value={formData.featuredImageUrl}
            onChange={handleInputChange('featuredImageUrl')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="/images/blog/example.jpg"
          />
        </div>

        {/* 相关图片（仅教程显示） */}
        {isTutorial && (
          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700 mb-2">
              相关图片 URL
            </label>
            <textarea
              id="images"
              value={formData.images}
              onChange={handleInputChange('images')}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="/images/tutorials/example1.jpg
/images/tutorials/example2.jpg"
            />
            <p className="text-sm text-gray-500 mt-1">
              每行一个图片URL，用于教程相关图片展示
            </p>
          </div>
        )}

        {/* 发布日期 */}
        <div className="mb-6">
          <label htmlFor="publishDate" className="block text-sm font-medium text-gray-700 mb-2">
            发布日期
          </label>
          <input
            type="date"
            id="publishDate"
            value={formData.publishDate}
            onChange={handleInputChange('publishDate')}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
      </div>

      {/* 内容编辑器 */}
      <div className="bg-white p-6 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          文章内容 *
        </label>
        <RichTextEditor
          value={formData.content}
          onChange={handleContentChange}
          placeholder="在这里编写文章内容..."
        />
      </div>

      {/* 操作按钮 */}
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          disabled={loading}
        >
          取消
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? '保存中...' : (isEdit ? '更新文章' : '发布文章')}
        </button>
      </div>
    </form>
  );
}