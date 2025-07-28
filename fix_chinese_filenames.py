#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import json
import re
from pathlib import Path

def create_english_filename(chinese_name):
    """将中文文件名转换为英文文件名"""
    
    # 常见中文词汇映射
    mapping = {
        # 基础词汇
        '第一课': 'lesson-01',
        '第二课': 'lesson-02', 
        '第三课': 'lesson-03',
        '第四课': 'lesson-04',
        '第五课': 'lesson-05',
        '第六课': 'lesson-06',
        '第七课': 'lesson-07',
        '第八课': 'lesson-08',
        
        # 摄影相关
        '摄影': 'photography',
        '相机': 'camera',
        '镜头': 'lens',
        '构图': 'composition',
        '曝光': 'exposure',
        '用光': 'lighting',
        '色彩': 'color',
        '作品': 'work',
        '效果': 'effect',
        '拍摄': 'shooting',
        
        # 技术词汇
        '数码': 'digital',
        '单反': 'slr',
        '微距': 'macro',
        '鱼眼': 'fisheye',
        '广角': 'wide-angle',
        '长焦': 'telephoto',
        '移轴': 'tilt-shift',
        '折返': 'reflex',
        '光圈': 'aperture',
        '快门': 'shutter',
        '感光度': 'iso',
        '景深': 'depth-of-field',
        '对焦': 'focus',
        '测光': 'metering',
        '白平衡': 'white-balance',
        
        # 构图相关
        '三分法': 'rule-of-thirds',
        '对角线': 'diagonal',
        '三角形': 'triangle',
        '框式': 'frame',
        '对称': 'symmetry',
        '引导线': 'leading-lines',
        '居中': 'center',
        '透视': 'perspective',
        '线条': 'lines',
        '虚实': 'depth',
        '明暗': 'light-dark',
        '大小': 'size',
        '奇数': 'odd-number',
        
        # 地名和场景
        '博贺港': 'bohe-port',
        '水东湾': 'shuidong-bay',
        '梅城': 'meicheng',
        '彩虹': 'rainbow',
        '晚霞': 'sunset',
        '日出': 'sunrise',
        '海边': 'seaside',
        '渔夫': 'fisherman',
        '渔港': 'fishing-port',
        '海湾': 'bay',
        '海滩': 'beach',
        '白鹭': 'egret',
        '觅食': 'foraging',
        
        # 文化相关
        '舞狮': 'lion-dance',
        '开渔节': 'fishing-festival',
        '庙': 'temple',
        '妆容': 'makeup',
        '旦角': 'female-role',
        '巡游': 'parade',
        
        # 其他
        '世界': 'world',
        '第一': 'first',
        '照片': 'photo',
        '原理': 'principle',
        '基础': 'basic',
        '发展': 'development',
        '历史': 'history',
        '现代': 'modern',
        '范畴': 'scope',
        '附件': 'accessories',
        '设置': 'settings',
        '功能': 'function',
        '各种': 'various',
        '种类': 'types',
        '传感器': 'sensor',
        '尺寸': 'size',
        '机型': 'model',
        '论述': 'theory',
        '示意图': 'diagram',
        '高速': 'high-speed',
        '慢速': 'slow-speed',
        '多重': 'multiple',
        '追踪': 'tracking',
        '对比': 'contrast',
        '正常': 'normal',
        '速度': 'speed',
        '放大': 'enlarged',
        '图例': 'example',
        '模式': 'mode',
        '内容': 'content',
        '说明': 'description',
        '立': 'immediate',
        '不正常': 'abnormal',
        '补偿': 'compensation',
        '白加': 'white-plus',
        '黑减': 'black-minus',
        '清晰': 'clear',
        '区域': 'area',
        '关系': 'relationship',
        '适合': 'suitable',
        '对象': 'subject',
        '单次': 'single',
        '伺服': 'servo',
        '连续': 'continuous',
        '手动': 'manual',
        '复杂': 'complex',
        '环境': 'environment',
        '位置': 'position',
        '认识': 'understanding',
        '太阳': 'sun',
        '天空': 'sky',
        '地景': 'landscape',
        '面部': 'face',
        '平价': 'average',
        '中央': 'center',
        '重点': 'weighted',
        '点': 'spot',
        '解说': 'explanation',
        '色温': 'color-temperature',
        '表': 'chart',
        '两种': 'two-types',
        '原图': 'original',
        '睛天': 'sunny',
        '阴天': 'cloudy',
        '技巧': 'techniques',
        '理论': 'theory',
        '形式': 'form',
        '九宫格': 'grid',
        '花絮': 'behind-scenes',
        '全景': 'panorama',
        '人像': 'portrait',
        '中景': 'medium-shot',
        '近景': 'close-up',
        '特写': 'close-up-detail',
        '俯拍': 'overhead',
        '平拍': 'eye-level',
        '仰拍': 'low-angle',
        '横': 'horizontal',
        '竖': 'vertical',
        '画幅': 'format',
        '方': 'square',
        '长轴': 'long-axis',
        '注意事项': 'notes',
        '案例': 'case-study',
        '资料': 'material',
        '艺术': 'art',
        '要素': 'elements',
        '强度': 'intensity',
        '质量': 'quality',
        '方向': 'direction',
        '顺光': 'front-light',
        '侧光': 'side-light',
        '逆光': 'back-light',
        '侧逆光': 'side-back-light',
        '冷暖': 'warm-cool',
        '室内': 'indoor',
        '布光': 'lighting-setup',
        '伦勃朗光': 'rembrandt-light',
        '蝴蝶光': 'butterfly-light',
        '三原色': 'primary-colors',
        '要素': 'elements',
        '色环': 'color-wheel',
        '色调': 'tone',
        '平衡': 'balance',
        '互补': 'complementary',
        '有色彩': 'colored',
        '无色彩': 'colorless',
        '花色': 'patterned',
        '纯色': 'solid-color',
        '面积': 'area',
        '聚焦': 'focus',
        '法则': 'rule',
        '同频': 'same-frequency',
        '六大': 'six-major',
        '基本': 'basic',
        '色相': 'hue',
        '属性': 'properties',
        '意义': 'meaning',
        '七大': 'seven-major',
        '正面': 'positive',
        '负面': 'negative',
        '感受': 'feeling',
        '纯': 'pure',
        '明': 'bright',
        '淡': 'light',
        '灰': 'gray',
        '暗': 'dark',
        '白': 'white',
        '黑': 'black'
    }
    
    # 移除文件扩展名
    name_without_ext = os.path.splitext(chinese_name)[0]
    ext = os.path.splitext(chinese_name)[1]
    
    # 替换中文词汇
    english_name = name_without_ext
    for chinese, english in mapping.items():
        english_name = english_name.replace(chinese, english)
    
    # 移除特殊字符和空格
    english_name = re.sub(r'[^\w\-.]', '-', english_name)
    english_name = re.sub(r'-+', '-', english_name)  # 合并多个连字符
    english_name = english_name.strip('-')  # 移除首尾连字符
    
    # 如果转换后为空或仍包含中文，使用数字编号
    if not english_name or re.search(r'[\u4e00-\u9fff]', english_name):
        english_name = f"image-{hash(name_without_ext) % 10000}"
    
    return english_name + ext

def rename_files_in_directory(directory):
    """重命名目录中的所有中文文件名"""
    renamed_files = {}
    
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.webp') and re.search(r'[\u4e00-\u9fff]', file):
                old_path = os.path.join(root, file)
                new_filename = create_english_filename(file)
                new_path = os.path.join(root, new_filename)
                
                # 避免文件名冲突
                counter = 1
                base_new_path = new_path
                while os.path.exists(new_path):
                    name, ext = os.path.splitext(base_new_path)
                    new_path = f"{name}-{counter}{ext}"
                    counter += 1
                
                try:
                    shutil.move(old_path, new_path)
                    # 记录重命名映射
                    old_relative = os.path.relpath(old_path, "public")
                    new_relative = os.path.relpath(new_path, "public")
                    renamed_files[f"/{old_relative.replace(os.sep, '/')}"] = f"/{new_relative.replace(os.sep, '/')}"
                    print(f"重命名: {file} -> {os.path.basename(new_path)}")
                except Exception as e:
                    print(f"重命名失败 {file}: {e}")
    
    return renamed_files

def update_json_files(renamed_files):
    """更新 JSON 文件中的路径引用"""
    
    # 更新 tutorials.json
    tutorials_file = "src/data/tutorials.json"
    if os.path.exists(tutorials_file):
        with open(tutorials_file, 'r', encoding='utf-8') as f:
            tutorials = json.load(f)
        
        for tutorial in tutorials:
            # 更新 featuredImageUrl
            if 'featuredImageUrl' in tutorial:
                old_url = tutorial['featuredImageUrl']
                if old_url in renamed_files:
                    tutorial['featuredImageUrl'] = renamed_files[old_url]
                    print(f"更新封面图片: {old_url} -> {renamed_files[old_url]}")
            
            # 更新 images 数组
            if 'images' in tutorial:
                for i, image_url in enumerate(tutorial['images']):
                    if image_url in renamed_files:
                        tutorial['images'][i] = renamed_files[image_url]
                        print(f"更新图片: {image_url} -> {renamed_files[image_url]}")
        
        with open(tutorials_file, 'w', encoding='utf-8') as f:
            json.dump(tutorials, f, ensure_ascii=False, indent=2)
        print(f"已更新 {tutorials_file}")
    
    # 更新 galleries.json
    galleries_file = "src/data/galleries.json"
    if os.path.exists(galleries_file):
        with open(galleries_file, 'r', encoding='utf-8') as f:
            galleries = json.load(f)
        
        for gallery in galleries:
            # 更新 coverPhotoUrl
            if 'coverPhotoUrl' in gallery:
                old_url = gallery['coverPhotoUrl']
                if old_url in renamed_files:
                    gallery['coverPhotoUrl'] = renamed_files[old_url]
                    print(f"更新封面图片: {old_url} -> {renamed_files[old_url]}")
            
            # 更新 photos 数组
            if 'photos' in gallery:
                for photo in gallery['photos']:
                    if 'url' in photo and photo['url'] in renamed_files:
                        old_url = photo['url']
                        photo['url'] = renamed_files[old_url]
                        print(f"更新图片: {old_url} -> {renamed_files[old_url]}")
                    
                    if 'thumbnailUrl' in photo and photo['thumbnailUrl'] in renamed_files:
                        old_url = photo['thumbnailUrl']
                        photo['thumbnailUrl'] = renamed_files[old_url]
                        print(f"更新缩略图: {old_url} -> {renamed_files[old_url]}")
        
        with open(galleries_file, 'w', encoding='utf-8') as f:
            json.dump(galleries, f, ensure_ascii=False, indent=2)
        print(f"已更新 {galleries_file}")

def main():
    print("开始重命名中文文件名...")
    
    # 重命名 public/images 目录中的所有中文文件
    renamed_files = rename_files_in_directory("public/images")
    
    if renamed_files:
        print(f"\n总共重命名了 {len(renamed_files)} 个文件")
        
        # 更新 JSON 文件中的引用
        print("\n更新 JSON 文件中的路径引用...")
        update_json_files(renamed_files)
        
        # 输出重命名映射
        print(f"\n重命名映射:")
        for old, new in renamed_files.items():
            print(f"  {old} -> {new}")
    else:
        print("没有找到需要重命名的中文文件")
    
    print("\n完成!")

if __name__ == "__main__":
    main()