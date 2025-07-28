#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import json

# 定义文件夹重命名映射
folder_mapping = {
    "1.第一课  摄影简史、相机的发展及现代摄影的范畴": "lesson-01-photography-history",
    "2.第二课  相机、附件及各种功能设置": "lesson-02-camera-settings",
    "3.第三课   摄影曝光原理（一）": "lesson-03-exposure-theory-1",
    "4..第四课  摄影曝光原理（二）": "lesson-04-exposure-theory-2",
    "5.第五课  摄影构图（一）": "lesson-05-composition-1",
    "6.第六课  摄影构图（二）": "lesson-06-composition-2",
    "7.第七课  摄影用光": "lesson-07-lighting",
    "8.第八课  摄影色彩的运用": "lesson-08-color-theory"
}

def rename_folders():
    base_path = "public/images"
    
    # 重命名主文件夹
    for old_name, new_name in folder_mapping.items():
        old_path = os.path.join(base_path, old_name)
        new_path = os.path.join(base_path, new_name)
        
        if os.path.exists(old_path):
            print(f"重命名: {old_path} -> {new_path}")
            shutil.move(old_path, new_path)
        else:
            print(f"文件夹不存在: {old_path}")

def update_json_files():
    """更新 JSON 文件中的路径引用"""
    
    # 更新 tutorials.json
    tutorials_file = "src/data/tutorials.json"
    if os.path.exists(tutorials_file):
        with open(tutorials_file, 'r', encoding='utf-8') as f:
            tutorials = json.load(f)
        
        # 更新路径
        for tutorial in tutorials:
            if 'featuredImageUrl' in tutorial:
                old_url = tutorial['featuredImageUrl']
                for old_name, new_name in folder_mapping.items():
                    if old_name in old_url:
                        tutorial['featuredImageUrl'] = old_url.replace(old_name, new_name)
                        break
            
            if 'images' in tutorial:
                for i, image_url in enumerate(tutorial['images']):
                    for old_name, new_name in folder_mapping.items():
                        if old_name in image_url:
                            tutorial['images'][i] = image_url.replace(old_name, new_name)
                            break
        
        # 保存更新后的文件
        with open(tutorials_file, 'w', encoding='utf-8') as f:
            json.dump(tutorials, f, ensure_ascii=False, indent=2)
        
        print(f"已更新 {tutorials_file}")

if __name__ == "__main__":
    print("开始重命名文件夹...")
    rename_folders()
    print("开始更新 JSON 文件...")
    update_json_files()
    print("完成!")