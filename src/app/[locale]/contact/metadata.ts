import { Metadata } from 'next';

export const contactMetadata: Metadata = {
  title: '联系合作 - 欧伟建摄影工作室',
  description: '联系中国摄影家协会欧伟建进行商业合作、艺术交流、摄影指导等服务。提供邮箱、电话、微信等多种联系方式，期待与您合作。',
  openGraph: {
    title: '联系合作 - 欧伟建摄影工作室',
    description: '联系国家级摄影师欧伟建，提供商业摄影、摄影培训、艺术合作等服务。',
    url: 'https://photographer-mingyuan.com/contact',
    images: [
      {
        url: '/og-contact.webp',
        width: 1200,
        height: 630,
        alt: '联系欧伟建摄影工作室',
      }
    ],
  },
};