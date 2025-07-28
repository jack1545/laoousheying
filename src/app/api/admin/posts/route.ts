import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types';

const BLOG_DATA_PATH = path.join(process.cwd(), 'src/data/blog.json');
const TUTORIAL_DATA_PATH = path.join(process.cwd(), 'src/data/tutorials.json');

function readBlogData(): BlogPost[] {
  try {
    const data = fs.readFileSync(BLOG_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading blog data:', error);
    return [];
  }
}

function readTutorialData(): BlogPost[] {
  try {
    const data = fs.readFileSync(TUTORIAL_DATA_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading tutorial data:', error);
    return [];
  }
}

function writeBlogData(posts: BlogPost[]): boolean {
  try {
    fs.writeFileSync(BLOG_DATA_PATH, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing blog data:', error);
    return false;
  }
}

function writeTutorialData(posts: BlogPost[]): boolean {
  try {
    fs.writeFileSync(TUTORIAL_DATA_PATH, JSON.stringify(posts, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing tutorial data:', error);
    return false;
  }
}

// GET - 获取所有文章（博客+教程）
export async function GET() {
  try {
    const blogPosts = readBlogData().map(post => ({ ...post, type: 'blog' }));
    const tutorialPosts = readTutorialData().map(post => ({ ...post, type: 'tutorial' }));
    const allPosts = [...blogPosts, ...tutorialPosts];
    
    // 按发布日期排序
    allPosts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    return NextResponse.json(allPosts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

// POST - 创建新文章
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, featuredImageUrl, publishDate, category, order, images, type = 'blog' } = body;

    // 验证必填字段
    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const iseTutorial = type === 'tutorial' || category === '摄影教程';
    const blogPosts = readBlogData();
    const tutorialPosts = readTutorialData();
    
    // 检查slug是否已存在（在两个文件中都检查）
    if (blogPosts.some(post => post.slug === slug) || tutorialPosts.some(post => post.slug === slug)) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 400 }
      );
    }

    const newPost: BlogPost = {
      slug,
      title,
      publishDate: publishDate || new Date().toISOString().split('T')[0],
      excerpt,
      featuredImageUrl: featuredImageUrl || '',
      content,
      category: category || (iseTutorial ? '摄影教程' : '摄影手记'),
      ...(order && { order: parseInt(order) }),
      ...(images && { images }),
    };

    if (iseTutorial) {
      tutorialPosts.push(newPost);
      // 按order排序
      tutorialPosts.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      if (writeTutorialData(tutorialPosts)) {
        return NextResponse.json(newPost, { status: 201 });
      }
    } else {
      blogPosts.unshift(newPost); // 添加到数组开头（最新的在前面）
      
      if (writeBlogData(blogPosts)) {
        return NextResponse.json(newPost, { status: 201 });
      }
    }

    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}