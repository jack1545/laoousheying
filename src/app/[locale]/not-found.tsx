import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-2">
            {t('title')}
          </h2>
          <p className="text-gray-500 text-lg">
            {t('description')}
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            {t('homeButton')}
          </Link>
          
          <div className="flex justify-center space-x-4 mt-6">
            <Link 
              href="/galleries" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('galleries')}
            </Link>
            <span className="text-gray-400">•</span>
            <Link 
              href="/blog" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('blog')}
            </Link>
            <span className="text-gray-400">•</span>
            <Link 
              href="/contact" 
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}