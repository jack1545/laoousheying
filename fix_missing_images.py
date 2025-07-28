#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json

def fix_tutorials_json():
    """修复 tutorials.json 中缺失的图片引用"""
    
    tutorials_file = "src/data/tutorials.json"
    
    with open(tutorials_file, 'r', encoding='utf-8') as f:
        tutorials = json.load(f)
    
    for tutorial in tutorials:
        # 检查并修复 images 数组
        if 'images' in tutorial:
            valid_images = []
            for image_url in tutorial['images']:
                image_path = "public" + image_url
                if os.path.exists(image_path):
                    valid_images.append(image_url)
                else:
                    print(f"移除缺失的图片: {image_url}")
            tutorial['images'] = valid_images
    
    # 保存修复后的文件
    with open(tutorials_file, 'w', encoding='utf-8') as f:
        json.dump(tutorials, f, ensure_ascii=False, indent=2)
    
    print(f"已修复 {tutorials_file}")

if __name__ == "__main__":
    print("修复缺失的图片引用...")
    fix_tutorials_json()
    print("完成!")