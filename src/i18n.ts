import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from './locales/en/common.json';
import commonZh from './locales/zh/common.json';
import commonJa from './locales/ja/common.json';

const resources = {
  en: {
    translation: commonEn,
  },
  zh: {
    translation: commonZh,
  },
  ja: {
    translation: commonJa,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'zh',
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;