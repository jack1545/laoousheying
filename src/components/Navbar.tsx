'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // 检测当前语言
  const isEnglish = pathname.startsWith('/en');
  const currentLocale = isEnglish ? 'en' : 'zh';
  
  const t = useTranslations('Navbar');

  const navItems = [
      { href: isEnglish ? '/en' : '/', label: t('home') },
      { href: `/${currentLocale}/galleries`, label: t('galleries') },
      { href: `/${currentLocale}/blog`, label: t('blog') },
      { href: `/${currentLocale}/about`, label: t('about') },
      { href: `/${currentLocale}/contact`, label: t('contact') },
    ];
  
  // 生成语言切换链接
  const getLanguageSwitchUrl = () => {
    if (pathname === '/') {
      return '/en';
    }
    if (pathname.startsWith('/en')) {
      return pathname.replace('/en', '') || '/';
    }
    if (pathname.startsWith('/zh')) {
      return pathname.replace('/zh', '/en');
    }
    return '/en';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-2xl font-bold text-gray-800">
            <Link href="/">老欧摄影</Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
            
            {/* Language Switch Button */}
            <Link
              href={getLanguageSwitchUrl()}
              className="flex items-center space-x-1 px-3 py-1 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
            >
              <span className="text-sm font-medium">
                {isEnglish ? '中文' : 'EN'}
              </span>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="space-y-1">
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
              <div className="w-6 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            
            {/* Mobile Language Switch */}
            <Link
              href={getLanguageSwitchUrl()}
              className="block py-2 mt-2 pt-4 border-t border-gray-200 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="flex items-center space-x-2">
                <span>🌐</span>
                <span>{isEnglish ? '切换到中文' : 'Switch to English'}</span>
              </span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}