import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  // 如果locale为undefined，默认使用'zh'
  const validLocale = locale || 'zh';
  
  // 使用静态导入来避免webpack动态导入解析问题
  let messages;
  if (validLocale === 'en') {
    messages = (await import('../../messages/en.json')).default;
  } else {
    messages = (await import('../../messages/zh.json')).default;
  }
  
  return {
    locale: validLocale,
    messages
  };
});