import { Metadata } from 'next';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: '博客管理后台 - 欧伟建摄影工作室',
  description: '博客文章管理系统',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">博客管理后台</h1>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="ml-3">文章列表</span>
                </a>
              </li>
              <li>
                <a
                  href="/admin/new"
                  className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <span className="ml-3">新建文章</span>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}