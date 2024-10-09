import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en_common from '@/utils/i18n/locales/en/common.json'
import en_post_property from '@/utils/i18n/locales/en/post-property.json'

import vi_common from '@/utils/i18n/locales/vi/common.json'
import vi_post_property from '@/utils/i18n/locales/vi/post-property.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: en_common,
    postProperty: en_post_property
  },
  vi: {
    common: vi_common,
    postProperty: vi_post_property
  }
} as const

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: localStorage.getItem('i18n') || 'en',
  fallbackLng: ['en', 'vi'],
  ns: ['common', 'postProperty'],
  interpolation: {
    escapeValue: false
  }
})

export default i18n
