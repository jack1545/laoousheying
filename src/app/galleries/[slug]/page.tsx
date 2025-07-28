import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function GallerySlugRedirect({ params }: PageProps) {
  // 重定向到默认语言的gallery页面
  redirect(`/zh/galleries/${params.slug}`);
}