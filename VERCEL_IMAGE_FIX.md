# Vercel 图片显示问题修复

## 问题描述
- 本地图片正常显示
- Vercel 部署后 `public/images` 目录下的图片无法显示
- 只有 `public/梅城彩虹.webp` 可以正常显示

## 问题原因
Git 将中文文件名存储为 URL 编码格式，导致 Vercel 部署时路径不匹配。

## 已执行的修复步骤

### 1. 清理文件
- 删除了所有 JPG 文件 (节省 22.4MB)
- 删除了 NEF 原始文件 (节省 44MB)
- 删除了重复的图片文件
- 总共节省了 72.84MB 空间

### 2. 重命名文件夹
- 将中文文件夹名改为英文：
  - `1.第一课 摄影简史...` → `lesson-01-photography-history`
  - `2.第二课 相机、附件...` → `lesson-02-camera-settings`
  - 等等...

### 3. 更新引用
- 更新了 `tutorials.json` 中的路径引用
- 修复了缺失的图片引用

### 4. Git 编码修复
- 执行了 `git rm -r --cached public/images`
- 设置了 `git config core.quotepath false`
- 重新添加了文件

## 当前状态
- 所有文件已重新提交到 Git
- 路径引用已更新
- 等待 Vercel 重新部署验证

## 验证方法
1. 检查 Vercel 部署日志
2. 访问网站查看图片是否正常显示
3. 检查浏览器开发者工具的网络请求

## 备注
如果问题仍然存在，可能需要：
1. 检查 Vercel 的构建设置
2. 确认 Next.js 的图片优化配置
3. 考虑使用 CDN 或外部图片存储服务