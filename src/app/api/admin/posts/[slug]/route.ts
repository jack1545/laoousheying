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

function findPostInBothFiles(slug: string): { post: BlogPost | null, isTutorial: boolean, index: number } {
  const blogPosts = readBlogData();
  const tutorialPosts = readTutorialData();
  
  const blogIndex = blogPosts.findIndex(p => p.slug === slug);
  if (blogIndex !== -1) {
    return { post: blogPosts[blogIndex], isTutorial: false, index: blogIndex };
  }
  
  const tutorialIndex = tutorialPosts.findIndex(p => p.slug === slug);
  if (tutorialIndex !== -1) {
    return { post: tutorialPosts[tutorialIndex], isTutorial: true, index: tutorialIndex };
  }
  
  return { post: null, isTutorial: false, index: -1 };
}

// GET - 获取单篇文章
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { post } = findPostInBothFiles(slug);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error in GET /api/admin/posts/[slug]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT - 更新文章
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { title, excerpt, content, featuredImageUrl, publishDate, category, order, images } = body;

    // 验证必填字段
    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const { post: existingPost, isTutorial, index } = findPostInBothFiles(slug);

    if (!existingPost || index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    // 更新文章，保持原有的slug
    const updatedPost: BlogPost = {
      ...existingPost,
      title,
      excerpt,
      content,
      featuredImageUrl: featuredImageUrl || '',
      publishDate: publishDate || existingPost.publishDate,
      category: category || existingPost.category,
      ...(order && { order: parseInt(order) }),
      ...(images && { images }),
    };

    if (isTutorial) {
      const tutorialPosts = readTutorialData();
      tutorialPosts[index] = updatedPost;
      // 重新排序
      tutorialPosts.sort((a, b) => (a.order || 0) - (b.order || 0));
      
      if (writeTutorialData(tutorialPosts)) {
        return NextResponse.json(updatedPost);
      }
    } else {
      const blogPosts = readBlogData();
      blogPosts[index] = updatedPost;
      
      if (writeBlogData(blogPosts)) {
        return NextResponse.json(updatedPost);
      }
    }

    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - 删除文章
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const { post, isTutorial, index } = findPostInBothFiles(slug);

    if (!post || index === -1) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    if (isTutorial) {
      const tutorialPosts = readTutorialData();
      tutorialPosts.splice(index, 1);
      
      if (writeTutorialData(tutorialPosts)) {
        return NextResponse.json({ message: 'Tutorial deleted successfully' });
      }
    } else {
      const blogPosts = readBlogData();
      blogPosts.splice(index, 1);
      
      if (writeBlogData(blogPosts)) {
        return NextResponse.json({ message: 'Blog post deleted successfully' });
      }
    }

    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}