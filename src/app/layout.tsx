import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '中国摄影家协会欧伟建 - 专业摄影作品集',
  description: '中国摄影家协会欧伟建的专业摄影作品集，涵盖风光摄影、纪实摄影、人像摄影等多个领域。30年摄影经验，中国摄影家协会会员。',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}