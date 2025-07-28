import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const publicDir = path.join(process.cwd(), 'public');
    const galleryDir = path.join(publicDir, 'gallery');
    
    // 检查目录是否存在
    const galleryExists = fs.existsSync(galleryDir);
    
    if (!galleryExists) {
      return NextResponse.json({ 
        error: 'Gallery directory does not exist',
        publicDir,
        galleryDir 
      }, { status: 404 });
    }
    
    // 列出所有子目录
    const subdirs = fs.readdirSync(galleryDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    // 检查每个子目录中的文件
    const result: {
      galleryDir: string;
      subdirs: Record<string, string[]>;
      testFiles: Record<string, { exists: boolean; path: string }>;
    } = {
      galleryDir,
      subdirs: {},
      testFiles: {}
    };
    
    for (const subdir of subdirs) {
      const subdirPath = path.join(galleryDir, subdir);
      const files = fs.readdirSync(subdirPath);
      result.subdirs[subdir] = files;
    }
    
    // 测试特定文件
    const testFiles = [
      'gallery/coastal-scenery/bohe-portpanorama.webp',
      'gallery/natural-scenery/meicheng-rainbow.webp',
      'gallery/cultural-heritage/makeup.webp',
      'gallery/sunset-twilight/sunset-fisherman.webp'
    ];
    
    for (const testFile of testFiles) {
      const filePath = path.join(publicDir, testFile);
      result.testFiles[testFile] = {
        exists: fs.existsSync(filePath),
        path: filePath
      };
    }
    
    return NextResponse.json(result);
    
  } catch (error) {
    return NextResponse.json({ 
      error: 'Server error', 
      message: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}