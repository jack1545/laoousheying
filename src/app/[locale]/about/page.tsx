'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function AboutPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isEnglish = locale === 'en';
  
  // 始终调用hook，不要条件调用
  const t = useTranslations('About');

  // 获取翻译文本的辅助函数
  const getTranslation = (key: string): string => {
    try {
      return t(key);
    } catch {
      // 如果翻译失败，返回默认文本
      const defaultTexts: { [key: string]: string } = {
        title: isEnglish ? 'About the Photographer' : '关于摄影师',
        subtitle: isEnglish ? 'Recording the changes of the times through the lens, interpreting humanistic feelings with light and shadow' : '用镜头记录时代变迁，用光影诠释人文情怀',
        photographerName: isEnglish ? 'Ou Weijian, China Photographers Association' : '中国摄影家协会欧伟建',
        description1: isEnglish ? 'Engaged in photography for more than 30 years, focusing on landscape and documentary photography. As a member of the China Photographers Association, my works are committed to recording the changes of the times through images and conveying humanistic feelings.' : '从事摄影工作30余年，专注于风光与纪实摄影领域。作为中国摄影家协会会员，我的作品致力于通过影像记录时代变迁，传递人文情怀。',
        description2: isEnglish ? 'Photography is not only a display of technology for me, but also an understanding of life and a witness to the times. Behind every photo is a story, and every moment carries unique emotions and memories.' : '摄影对我而言不仅是技术的展现，更是对生活的感悟和对时代的见证。每一张照片背后都有一个故事，每一个瞬间都承载着独特的情感与记忆。',
        description3: isEnglish ? 'Over the years, I have insisted on using the lens to record the great rivers and mountains of the motherland, and using light and shadow to interpret the lives of ordinary people. I hope that through my works, more people can feel the charm of photographic art and the pulse of the times.' : '多年来，我坚持用镜头记录祖国的大好河山，用光影诠释普通人的生活百态，希望通过我的作品能够让更多人感受到摄影艺术的魅力和时代发展的脉搏。',
        yearsExperience: isEnglish ? 'Years Experience' : '从业年限',
        personalExhibitions: isEnglish ? 'Personal Exhibitions' : '个人展览',
        awardWinningWorks: isEnglish ? 'Award-winning Works' : '获奖作品',
        creativeWorks: isEnglish ? 'Creative Works' : '创作作品',
        majorHonors: isEnglish ? 'Major Honors' : '主要荣誉',
        honorsSubtitle: isEnglish ? 'National and international important photography awards' : '国家级及国际重要摄影奖项',
        importantExhibitions: isEnglish ? 'Important Exhibitions' : '重要展览',
        exhibitionsSubtitle: isEnglish ? 'Exhibition experience in important domestic and foreign art galleries and art institutions' : '国内外重要美术馆及艺术机构展出经历',
        photographyPhilosophy: isEnglish ? 'Photography Philosophy' : '摄影理念',
        philosophy1: isEnglish ? 'Photography is not only a display of technology, but also an understanding of life and a witness to the times. Every photo should carry the photographer&apos;s emotions and thoughts.' : '摄影不仅是技术的展现，更是对生活的感悟和对时代的见证。每一张照片都应该承载着摄影师的情感和思考。',
        philosophy2: isEnglish ? 'I believe that the best photographic works come from real emotions and love for life. Whether it is magnificent mountains and rivers or ordinary life scenes, they all have their unique beauty and stories.' : '我相信最好的摄影作品来自于真实的情感和对生活的热爱。无论是壮丽的山河还是平凡的生活场景，都有其独特的美和故事。',
        philosophy3: isEnglish ? 'Through the lens, I hope to record the changes of this era, so that more people can feel the beauty of life and the pulse of the times through my works.' : '通过镜头，我希望能够记录下这个时代的变迁，让更多人通过我的作品感受到生活的美好和时代发展的脉搏。',
        lookingForward: isEnglish ? 'Looking Forward to Communication' : '期待与您交流',
        lookingForwardSubtitle: isEnglish ? 'Whether it&apos;s artistic exchange, commercial cooperation or photography guidance, you are welcome to contact me' : '无论是艺术交流、商业合作还是摄影指导，都欢迎与我联系',
        contactMe: isEnglish ? 'Contact Me' : '联系我'
      };
      return defaultTexts[key] || key;
    };
  }
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {getTranslation('title')}
            </h1>
            <p className="text-xl text-gray-600">
              {getTranslation('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src="/photographer-avatar.webp"
                    alt={getTranslation('photographerName')}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {getTranslation('photographerName')}
              </h2>
              
              <div className="prose prose-lg text-gray-600 mb-6">
                <p>
                  {getTranslation('description1')}
                </p>
                
                <p>
                  {getTranslation('description2')}
                </p>
                
                <p>
                  {getTranslation('description3')}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">40+</div>
                  <div className="text-sm text-gray-600">{getTranslation('yearsExperience')}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">20+</div>
                  <div className="text-sm text-gray-600">{getTranslation('personalExhibitions')}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">300+</div>
                  <div className="text-sm text-gray-600">{getTranslation('awardWinningWorks')}</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow">
                  <div className="text-2xl font-bold text-gray-900">5000+</div>
                  <div className="text-sm text-gray-600">{getTranslation('creativeWorks')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation('majorHonors')}</h2>
            <p className="text-gray-600">{getTranslation('honorsSubtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {[
                getTranslation('honor1'),
                getTranslation('honor2'),
                getTranslation('honor3'),
                getTranslation('honor4'),
                getTranslation('honor5')
              ].map((honor, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="font-semibold text-gray-900">{honor}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Exhibitions Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation('importantExhibitions')}</h2>
            <p className="text-gray-600">{getTranslation('exhibitionsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              getTranslation('exhibition1'),
              getTranslation('exhibition2'),
              getTranslation('exhibition3'),
              getTranslation('exhibition4')
            ].map((exhibition, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                <div className="font-semibold text-gray-900">{exhibition}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">{getTranslation('photographyPhilosophy')}</h2>
            <div className="text-xl leading-relaxed space-y-6">
              <p>
                &ldquo;{getTranslation('philosophy1')}&rdquo;
              </p>
              <p>
                &ldquo;{getTranslation('philosophy2')}&rdquo;
              </p>
              <p>
                &ldquo;{getTranslation('philosophy3')}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {getTranslation('lookingForward')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {getTranslation('lookingForwardSubtitle')}
          </p>
          <Link 
            href={`/${locale}/contact`}
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
          >
            {getTranslation('contactMe')}
          </Link>
        </div>
      </section>
    </div>
  );
}