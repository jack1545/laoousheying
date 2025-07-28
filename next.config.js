const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // 允许优化所有图片
    unoptimized: false,
    // 图片域名配置（如果需要外部图片）
    domains: [],
    // 图片加载器配置
    loader: 'default',
  },
  
  // 静态文件配置
  assetPrefix: '',
  basePath: '',
  trailingSlash: false,
  poweredByHeader: false,
  
  // 确保静态资源正确处理
  async rewrites() {
    return [
      {
        source: '/gallery/:path*',
        destination: '/gallery/:path*',
      },
    ];
  },
  
  // Vercel 部署不需要 standalone 输出
  // output: 'standalone',
  
  // 实验性功能
  experimental: {
    optimizePackageImports: ['next-intl'],
  },
};

module.exports = withNextIntl(nextConfig);