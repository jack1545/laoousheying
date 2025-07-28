#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
import json
import re

def create_chinese_to_english_mapping():
    """创建中英文映射字典"""
    return {
        # 目录名映射
        '各种胶片单反相机（附件1）': 'various-film-slr-cameras-attachment1',
        '旁轴和傻瓜胶片相机（附件2）': 'rangefinder-point-shoot-cameras-attachment2', 
        '湿板摄影法的操作过程（附件3）': 'wet-plate-photography-process-attachment3',
        '数码相机': 'digital-cameras',
        
        # 文件名映射
        '湿版摄影法.mp4': 'wet-plate-photography.mp4',
        'Screenshot_20200202-213218.webp': 'screenshot-20200202-213218.webp',
        
        # 通用中文词汇
        '各种': 'various',
        '胶片': 'film',
        '单反': 'slr',
        '相机': 'camera',
        '附件': 'attachment',
        '旁轴': 'rangefinder',
        '傻瓜': 'point-shoot',
        '湿板': 'wet-plate',
        '摄影法': 'photography',
        '操作': 'operation',
        '过程': 'process',
        '数码': 'digital',
        '湿版': 'wet-plate'
    }

def sanitize_filename(filename, mapping):
    """清理文件名，将中文转换为英文"""
    # 首先检查是否有直接映射
    if filename in mapping:
        return mapping[filename]
    
    # 如果没有直接映射，尝试逐词替换
    result = filename
    for chinese, english in mapping.items():
        if chinese in result:
            result = result.replace(chinese, english)
    
    # 清理特殊字符
    result = re.sub(r'[（）()]', '', result)
    result = re.sub(r'[\s\-_]+', '-', result)
    result = result.strip('-')
    
    return result

def rename_directories_and_files(root_dir):
    """递归重命名目录和文件"""
    mapping = create_chinese_to_english_mapping()
    renamed_items = []
    
    # 从最深层开始处理，避免路径问题
    for root, dirs, files in os.walk(root_dir, topdown=False):
        # 重命名文件
        for file in files:
            old_path = os.path.join(root, file)
            new_filename = sanitize_filename(file, mapping)
            
            if new_filename != file:
                new_path = os.path.join(root, new_filename)
                try:
                    os.rename(old_path, new_path)
                    renamed_items.append({
                        'type': 'file',
                        'old': old_path,
                        'new': new_path
                    })
                    print(f"文件重命名: {old_path} -> {new_path}")
                except Exception as e:
                    print(f"重命名文件失败 {old_path}: {e}")
        
        # 重命名目录
        for dir_name in dirs:
            old_dir_path = os.path.join(root, dir_name)
            new_dir_name = sanitize_filename(dir_name, mapping)
            
            if new_dir_name != dir_name:
                new_dir_path = os.path.join(root, new_dir_name)
                try:
                    os.rename(old_dir_path, new_dir_path)
                    renamed_items.append({
                        'type': 'directory',
                        'old': old_dir_path,
                        'new': new_dir_path
                    })
                    print(f"目录重命名: {old_dir_path} -> {new_dir_path}")
                except Exception as e:
                    print(f"重命名目录失败 {old_dir_path}: {e}")
    
    return renamed_items

def update_json_references(renamed_items):
    """更新JSON文件中的路径引用"""
    json_files = ['src/data/tutorials.json', 'src/data/galleries.json']
    
    for json_file in json_files:
        if os.path.exists(json_file):
            try:
                with open(json_file, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # 将数据转换为字符串进行替换
                data_str = json.dumps(data, ensure_ascii=False, indent=2)
                
                # 替换路径引用
                for item in renamed_items:
                    old_path = item['old'].replace('\\', '/')
                    new_path = item['new'].replace('\\', '/')
                    
                    # 移除 public/ 前缀进行匹配
                    if old_path.startswith('public/'):
                        old_path = old_path[7:]
                    if new_path.startswith('public/'):
                        new_path = new_path[7:]
                    
                    data_str = data_str.replace(old_path, new_path)
                
                # 写回文件
                updated_data = json.loads(data_str)
                with open(json_file, 'w', encoding='utf-8') as f:
                    json.dump(updated_data, f, ensure_ascii=False, indent=2)
                
                print(f"已更新 {json_file}")
                
            except Exception as e:
                print(f"更新 {json_file} 失败: {e}")

def main():
    """主函数"""
    print("开始处理剩余的中文目录名和文件名...")
    
    # 处理 public/images 目录
    images_dir = "public/images"
    if os.path.exists(images_dir):
        renamed_items = rename_directories_and_files(images_dir)
        
        if renamed_items:
            print(f"\n总共重命名了 {len(renamed_items)} 个项目")
            
            # 更新JSON文件引用
            print("\n更新JSON文件中的路径引用...")
            update_json_references(renamed_items)
            
            print("\n✅ 所有剩余的中文名称已处理完成！")
        else:
            print("\n✅ 没有发现需要重命名的中文名称")
    else:
        print(f"错误: {images_dir} 目录不存在")

if __name__ == "__main__":
    main()