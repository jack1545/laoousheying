import { redirect } from 'next/navigation';

export default function GalleriesRedirect() {
  // 重定向到默认语言的galleries页面
  redirect('/zh/galleries');
}