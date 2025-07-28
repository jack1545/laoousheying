import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['zh', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'zh'
});
 
export const config = {
  // Skip all paths that should not be internationalized
  // 只对 /zh 和 /en 开头的路径应用国际化中间件
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};