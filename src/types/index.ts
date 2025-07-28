// 单张照片
export interface Photo {
  id: string;
  title: string;
  url: string;         // 高清图片地址
  thumbnailUrl: string; // 缩略图地址
  description?: string; // 图片描述
  date: string;        // 拍摄日期
  location?: string;    // 拍摄地点
}

// 作品集/系列
export interface Gallery {
  slug: string;        // 用于 URL, e.g., "huangshan-1998"
  title: string;
  description: string;
  coverPhotoUrl: string; // 封面图片
  photos: Photo[];     // 包含的照片
}

// 博客文章
export interface BlogPost {
  slug: string;
  title: string;
  publishDate: string;
  excerpt: string;       // 摘要
  content: string;       // Markdown/MDX 格式的内容
  featuredImageUrl: string;
  category?: string;
  order?: number;
  images?: string[];     // 教程相关图片数组
}

// 摄影师简介
export interface PhotographerProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  awards: string[];      // 获奖经历
  exhibitions: string[]; // 展览经历
}
