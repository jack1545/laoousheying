#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import json

def check_image_paths():
    """检查所有 JSON 文件中的图片路径是否存在"""
    
    issues = []
    
    # 检查 tutorials.json
    tutorials_file = "src/data/tutorials.json"
    if os.path.exists(tutorials_file):
        with open(tutorials_file, 'r', encoding='utf-8') as f:
            tutorials = json.load(f)
        
        for tutorial in tutorials:
            # 检查 featuredImageUrl
            if 'featuredImageUrl' in tutorial:
                image_path = "public" + tutorial['featuredImageUrl']
                if not os.path.exists(image_path):
                    issues.append(f"Missing: {image_path}")
                else:
                    print(f"✓ Found: {image_path}")
            
            # 检查 images 数组
            if 'images' in tutorial:
                for image_url in tutorial['images']:
                    image_path = "public" + image_url
                    if not os.path.exists(image_path):
                        issues.append(f"Missing: {image_path}")
                    else:
                        print(f"✓ Found: {image_path}")
    
    # 检查 galleries.json
    galleries_file = "src/data/galleries.json"
    if os.path.exists(galleries_file):
        with open(galleries_file, 'r', encoding='utf-8') as f:
            galleries = json.load(f)
        
        for gallery in galleries:
            # 检查 coverPhotoUrl
            if 'coverPhotoUrl' in gallery:
                image_path = "public" + gallery['coverPhotoUrl']
                if not os.path.exists(image_path):
                    issues.append(f"Missing: {image_path}")
                else:
                    print(f"✓ Found: {image_path}")
            
            # 检查 photos 数组
            if 'photos' in gallery:
                for photo in gallery['photos']:
                    if 'url' in photo:
                        image_path = "public" + photo['url']
                        if not os.path.exists(image_path):
                            issues.append(f"Missing: {image_path}")
                        else:
                            print(f"✓ Found: {image_path}")
                    
                    if 'thumbnailUrl' in photo:
                        image_path = "public" + photo['thumbnailUrl']
                        if not os.path.exists(image_path):
                            issues.append(f"Missing: {image_path}")
                        else:
                            print(f"✓ Found: {image_path}")
    
    # 检查 photographer.json
    photographer_file = "src/data/photographer.json"
    if os.path.exists(photographer_file):
        with open(photographer_file, 'r', encoding='utf-8') as f:
            photographer = json.load(f)
        
        if 'avatarUrl' in photographer:
            image_path = "public" + photographer['avatarUrl']
            if not os.path.exists(image_path):
                issues.append(f"Missing: {image_path}")
            else:
                print(f"✓ Found: {image_path}")
    
    # 输出结果
    if issues:
        print(f"\n❌ 发现 {len(issues)} 个问题:")
        for issue in issues:
            print(f"  {issue}")
    else:
        print(f"\n✅ 所有图片路径都正确!")

if __name__ == "__main__":
    print("检查图片路径...")
    check_image_paths()