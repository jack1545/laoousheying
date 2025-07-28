'use client';

import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

const currentYear = new Date().getFullYear();

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith('/en');
  const currentLocale = isEnglish ? 'en' : 'zh';
  
  const t = useTranslations('Footer');
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('brandName')}</h3>
            <p className="text-gray-400 text-sm">
              {t('brandTagline')}
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href={`/${currentLocale}/galleries`} className="hover:text-white transition-colors">{t('galleries')}</a></li>
              <li><a href={`/${currentLocale}/about`} className="hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href={`/${currentLocale}/blog`} className="hover:text-white transition-colors">{t('blog')}</a></li>
              <li><a href={`/${currentLocale}/contact`} className="hover:text-white transition-colors">{t('contact')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">{isEnglish ? 'Copyright Information' : '版权信息'}</h4>
            <p className="text-sm text-gray-400">
              &copy; {currentYear} {t('copyright')}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {t('rightsReserved')}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>{t('builtBy')}</p>
        </div>
      </div>
    </footer>
  );
}