#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil

def rename_gallery_files():
    """重命名 gallery 文件夹中的中文文件名"""
    
    gallery_path = "public/images/gallery"
    
    # 文件重命名映射
    file_mapping = {
        "波澜不惊.webp": "calm-waters.webp",
        "海边风情.webp": "seaside-scenery.webp", 
        "看海去.webp": "going-to-sea.webp",
        "瞪.webp": "stare.webp",
        "资源共享.webp": "resource-sharing.webp",
        "非常态中的常态.webp": "normal-in-abnormal.webp"
    }
    
    for old_name, new_name in file_mapping.items():
        old_path = os.path.join(gallery_path, old_name)
        new_path = os.path.join(gallery_path, new_name)
        
        if os.path.exists(old_path):
            print(f"重命名文件: {old_path} -> {new_path}")
            shutil.move(old_path, new_path)
        else:
            print(f"文件不存在: {old_path}")

if __name__ == "__main__":
    print("开始重命名 gallery 文件...")
    rename_gallery_files()
    print("完成!")