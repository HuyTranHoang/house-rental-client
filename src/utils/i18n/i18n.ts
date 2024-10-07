import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en_common from '@/utils/i18n/locales/en/common.json'

import vi_common from '@/utils/i18n/locales/vi/common.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: en_common
  },
  vi: {
    common: vi_common
  }
} as const

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: localStorage.getItem('i18n') || 'en',
  fallbackLng: ['en', 'vi'],
  ns: ['common'],
  interpolation: {
    escapeValue: false
  }
})

export default i18n
