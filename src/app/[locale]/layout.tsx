import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: '中国国家家协会欧伟建 - 专业摄影作品集',
    template: '%s | 欧伟建摄影工作室'
  },
  description: '国家级摄影师欧伟建的专业摄影作品集，涵盖风光摄影、纪实摄影、人像摄影等多个领域。30年摄影经验，中国摄影家协会会员。',
  keywords: ['摄影师', '欧伟建', '风光摄影', '纪实摄影', '人像摄影', '摄影作品', '中国摄影家协会', '国家级摄影师'],
  authors: [{ name: '欧伟建' }],
  creator: '欧伟建摄影工作室',
  publisher: '欧伟建摄影工作室',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://photographer-mingyuan.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/',
      'en': '/en',
    },
  },
  openGraph: {
    title: '中国国家家协会欧伟建 - 专业摄影作品集',
    description: '国家级摄影师欧伟建的专业摄影作品集，30年摄影经验，中国摄影家协会会员，专注于风光与纪实摄影。',
    url: 'https://photographer-mingyuan.com',
    siteName: '欧伟建摄影工作室',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: '中国国家家协会欧伟建摄影作品展示',
      }
    ],
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '中国国家家协会欧伟建 - 专业摄影作品集',
    description: '国家级摄影师欧伟建的专业摄影作品集，30年摄影经验，中国摄影家协会会员。',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <NextIntlClientProvider messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
