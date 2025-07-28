#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import shutil
from pathlib import Path

def cleanup_public_directory():
    """清理 public 目录，移除重复文件和 jpg 文件"""
    
    public_path = Path("public")
    removed_files = []
    saved_space = 0
    
    print("开始清理 public 目录...")
    
    # 1. 移除所有 .jpg 和 .jpeg 文件
    print("\n1. 移除所有 JPG 文件...")
    for jpg_file in public_path.rglob("*.jpg"):
        file_size = jpg_file.stat().st_size
        print(f"删除 JPG: {jpg_file} ({file_size:,} bytes)")
        jpg_file.unlink()
        removed_files.append(str(jpg_file))
        saved_space += file_size
    
    for jpeg_file in public_path.rglob("*.jpeg"):
        file_size = jpeg_file.stat().st_size
        print(f"删除 JPEG: {jpeg_file} ({file_size:,} bytes)")
        jpeg_file.unlink()
        removed_files.append(str(jpeg_file))
        saved_space += file_size
    
    # 2. 移除非图片文件
    print("\n2. 移除非图片文件...")
    
    # 移除 .NEF 文件（RAW 格式）
    for nef_file in public_path.rglob("*.NEF"):
        file_size = nef_file.stat().st_size
        print(f"删除 NEF: {nef_file} ({file_size:,} bytes)")
        nef_file.unlink()
        removed_files.append(str(nef_file))
        saved_space += file_size
    
    # 移除 .txt 文件
    for txt_file in public_path.rglob("*.txt"):
        # 保留 robots.txt
        if txt_file.name != "robots.txt":
            file_size = txt_file.stat().st_size
            print(f"删除 TXT: {txt_file} ({file_size:,} bytes)")
            txt_file.unlink()
            removed_files.append(str(txt_file))
            saved_space += file_size
    
    # 3. 查找并移除重复的图片文件
    print("\n3. 查找重复的图片文件...")
    
    # 创建文件名到路径的映射
    file_map = {}
    duplicates = []
    
    for webp_file in public_path.rglob("*.webp"):
        file_name = webp_file.name
        if file_name in file_map:
            # 发现重复文件
            existing_file = file_map[file_name]
            duplicates.append((existing_file, webp_file))
            print(f"发现重复文件: {file_name}")
            print(f"  原文件: {existing_file}")
            print(f"  重复文件: {webp_file}")
        else:
            file_map[file_name] = webp_file
    
    # 移除重复文件（保留第一个，删除后续的）
    for original, duplicate in duplicates:
        file_size = duplicate.stat().st_size
        print(f"删除重复文件: {duplicate} ({file_size:,} bytes)")
        duplicate.unlink()
        removed_files.append(str(duplicate))
        saved_space += file_size
    
    # 4. 移除空目录
    print("\n4. 移除空目录...")
    for root, dirs, files in os.walk(public_path, topdown=False):
        for dir_name in dirs:
            dir_path = Path(root) / dir_name
            try:
                if not any(dir_path.iterdir()):  # 检查目录是否为空
                    print(f"删除空目录: {dir_path}")
                    dir_path.rmdir()
            except OSError:
                pass  # 目录不为空或其他错误，跳过
    
    # 输出清理结果
    print(f"\n清理完成!")
    print(f"删除了 {len(removed_files)} 个文件")
    print(f"节省空间: {saved_space:,} bytes ({saved_space / 1024 / 1024:.2f} MB)")
    
    if removed_files:
        print(f"\n删除的文件列表:")
        for file in removed_files:
            print(f"  - {file}")

def get_directory_size(path):
    """获取目录大小"""
    total_size = 0
    for root, dirs, files in os.walk(path):
        for file in files:
            file_path = os.path.join(root, file)
            if os.path.exists(file_path):
                total_size += os.path.getsize(file_path)
    return total_size

if __name__ == "__main__":
    # 清理前的大小
    before_size = get_directory_size("public")
    print(f"清理前 public 目录大小: {before_size:,} bytes ({before_size / 1024 / 1024:.2f} MB)")
    
    cleanup_public_directory()
    
    # 清理后的大小
    after_size = get_directory_size("public")
    print(f"\n清理后 public 目录大小: {after_size:,} bytes ({after_size / 1024 / 1024:.2f} MB)")
    print(f"总共节省: {before_size - after_size:,} bytes ({(before_size - after_size) / 1024 / 1024:.2f} MB)")