#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json
from pathlib import Path

def update_tutorials_cover_images():
    """更新 tutorials.json 中的封面图片引用"""
    
    tutorials_file = "src/data/tutorials.json"
    
    with open(tutorials_file, 'r', encoding='utf-8') as f:
        tutorials = json.load(f)
    
    # 为每个教程找到合适的封面图片
    for tutorial in tutorials:
        lesson_path = Path("public") / tutorial['featuredImageUrl'][1:]  # 移除开头的 /
        
        if not lesson_path.exists():
            # 如果封面图片不存在，使用该课程文件夹中的第一张图片作为封面
            lesson_dir = lesson_path.parent
            
            if lesson_dir.exists():
                # 查找该目录下的第一张 webp 图片
                webp_files = list(lesson_dir.glob("*.webp"))
                if webp_files:
                    # 使用第一张图片作为封面
                    new_cover = "/" + str(webp_files[0].relative_to(Path("public"))).replace("\\", "/")
                    tutorial['featuredImageUrl'] = new_cover
                    print(f"更新 {tutorial['title']} 的封面图片: {new_cover}")
                else:
                    print(f"警告: {tutorial['title']} 没有找到合适的封面图片")
    
    # 保存更新后的文件
    with open(tutorials_file, 'w', encoding='utf-8') as f:
        json.dump(tutorials, f, ensure_ascii=False, indent=2)
    
    print(f"已更新 {tutorials_file}")

if __name__ == "__main__":
    print("更新教程封面图片...")
    update_tutorials_cover_images()
    print("完成!")