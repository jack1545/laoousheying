'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const isEnglish = locale === 'en';
  
  // 始终调用hook，不要条件调用
  const t = useTranslations('Contact');

  // 获取翻译文本的辅助函数
  const getTranslation = (key: string): string => {
    try {
      return t(key);
    } catch {
      // 如果翻译失败，返回默认文本
      const defaultTexts: { [key: string]: string } = {
        title: isEnglish ? 'Contact & Collaboration' : '联系合作',
        subtitle: isEnglish ? 'Whether it\'s commercial cooperation, artistic exchange, or photography guidance, feel free to contact me' : '无论是商业合作、艺术交流，还是摄影指导，都欢迎与我联系',
        contactInfo: isEnglish ? 'Contact Information' : '联系方式',
        email: isEnglish ? 'Email' : '邮箱',
        studioAddress: isEnglish ? 'Studio Address' : '工作室地址',
        phone: isEnglish ? 'Phone' : '电话',
        wechat: isEnglish ? 'WeChat' : '微信',
        socialMedia: isEnglish ? 'Social Media' : '社交媒体',
        messageForm: isEnglish ? 'Message Form' : '留言咨询',
        name: isEnglish ? 'Name' : '姓名',
        subject: isEnglish ? 'Subject' : '主题',
        messageContent: isEnglish ? 'Message Content' : '留言内容',
        messagePlaceholder: isEnglish ? 'Please describe your needs or questions in detail...' : '请详细描述您的需求或问题...',
        sending: isEnglish ? 'Sending...' : '发送中...',
        sendMessage: isEnglish ? 'Send Message' : '发送留言',
        thankYouMessage: isEnglish ? 'Thank you for your message! I will reply to you as soon as possible.' : '感谢您的留言！我会尽快回复您。',
        services: isEnglish ? 'Services' : '服务项目',
        servicesSubtitle: isEnglish ? 'Professional photography-related services' : '提供专业的摄影相关服务',
        commercialPhotography: isEnglish ? 'Commercial Photography' : '商业摄影',
        commercialDesc: isEnglish ? 'Professional photography services for corporate image, product shooting, commercial advertising, etc.' : '企业形象、产品拍摄、商业广告等专业摄影服务',
        photographyTraining: isEnglish ? 'Photography Training' : '摄影培训',
        trainingDesc: isEnglish ? 'One-on-one guidance, group training, special workshops and other teaching services' : '一对一指导、小组培训、专题工作坊等教学服务',
        artisticCollaboration: isEnglish ? 'Artistic Collaboration' : '艺术合作',
        artisticDesc: isEnglish ? 'Art exhibitions, work collections, cross-border cooperation and other art projects' : '艺术展览、作品收藏、跨界合作等艺术项目',
        copyrightNotice: isEnglish ? 'Copyright Notice' : '版权声明',
        copyrightDesc1: isEnglish ? 'All photographic works on this site are original works by Ou Weijian and are protected by the Copyright Law of the People\'s Republic of China.' : '本站所有摄影作品均为欧伟建的原创作品，受《中华人民共和国著作权法》保护。',
        copyrightDesc2: isEnglish ? 'Without permission, no one may use, copy, distribute, modify, perform or display any works on this site without authorization. If you need to use them, please obtain authorization through the above contact information.' : '未经许可，任何人不得擅自使用、复制、传播、修改、表演或展示本站的任何作品。如需使用，请通过上述联系方式获得授权。',
        copyrightDesc3: isEnglish ? 'Legal liability will be pursued for infringement.' : '对于侵权行为，将依法追究其法律责任。'
      };
      return defaultTexts[key] || key;
    }
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(getTranslation('thankYouMessage'));
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

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

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('contactInfo')}</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('email')}</h3>
                    <a href="mailto:photographer@example.com" className="text-blue-600 hover:text-blue-800">
                      2863649353@qq.com
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('studioAddress')}</h3>
                    <p className="text-gray-600">
                      {isEnglish ? 'Foshan Nanhai District Photographers Association, Guangdong Province' : '广东省佛山市南海区摄影家协会'}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('phone')}</h3>
                    <a href="tel:+8613800138000" className="text-blue-600 hover:text-blue-800">
                      +86 186 7659 3468
                    </a>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{getTranslation('wechat')}</h3>
                    <p className="text-gray-600">
                      {isEnglish ? 'WeChat ID: ou154586079' : '微信号：ou154586079'}
                    </p>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-900 mb-4">{getTranslation('socialMedia')}</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">微博</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">微博</span>
                      </div>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">微信</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">微信</span>
                      </div>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-gray-600">
                      <span className="sr-only">抖音</span>
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs">抖音</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{getTranslation('messageForm')}</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {getTranslation('name')} *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {getTranslation('email')} *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('subject')} *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {getTranslation('messageContent')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={getTranslation('messagePlaceholder')}
                    />
                  </div>
                  
                  {submitMessage && (
                    <div className="p-4 bg-green-100 text-green-700 rounded-md">
                      {submitMessage}
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? getTranslation('sending') : getTranslation('sendMessage')}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{getTranslation('services')}</h2>
            <p className="text-gray-600">{getTranslation('servicesSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm">{isEnglish ? 'Commercial' : '商业'}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('commercialPhotography')}</h3>
              <p className="text-gray-600">
                {getTranslation('commercialDesc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm">{isEnglish ? 'Training' : '培训'}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('photographyTraining')}</h3>
              <p className="text-gray-600">
                {getTranslation('trainingDesc')}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-gray-600 text-sm">{isEnglish ? 'Art' : '艺术'}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{getTranslation('artisticCollaboration')}</h3>
              <p className="text-gray-600">
                {getTranslation('artisticDesc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Copyright Notice */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{getTranslation('copyrightNotice')}</h3>
            <p className="text-gray-600 mb-4">
              {getTranslation('copyrightDesc1')}
            </p>
            <p className="text-gray-600 mb-4">
              {getTranslation('copyrightDesc2')}
            </p>
            <p className="text-sm text-gray-500">
              {getTranslation('copyrightDesc3')}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}