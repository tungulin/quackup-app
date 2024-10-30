import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationENG from './lang/ENG.json';

i18next.use(initReactI18next).init({
  resources: {
    eng: {
      translation: translationENG,
    },
  },
});

export default i18next;
