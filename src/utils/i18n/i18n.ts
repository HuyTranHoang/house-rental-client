import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en_common from '@/utils/i18n/locales/en/common.json'
import en_propertyDetail from '@/utils/i18n/locales/en/propertyDetail.json'
import en_contact from '@/utils/i18n/locales/en/contact.json'
import en_membership from '@/utils/i18n/locales/en/membership.json'
import en_post_property from '@/utils/i18n/locales/en/post-property.json'
import en_profile from '@/utils/i18n/locales/en/profile.json'
import en_recharge from '@/utils/i18n/locales/en/recharge.json'

import vi_common from '@/utils/i18n/locales/vi/common.json'
import vi_propertyDetail from '@/utils/i18n/locales/vi/propertyDetail.json'
import vi_contact from '@/utils/i18n/locales/vi/contact.json'
import vi_membership from '@/utils/i18n/locales/vi/membership.json'
import vi_post_property from '@/utils/i18n/locales/vi/post-property.json'
import vi_profile from '@/utils/i18n/locales/vi/profile.json'
import vi_recharge from '@/utils/i18n/locales/vi/recharge.json'

export const defaultNS = 'common'
export const resources = {
  en: {
    common: en_common,
    propertyDetail : en_propertyDetail,
    postProperty: en_post_property,
    contact: en_contact,
    membership: en_membership,
    recharge: en_recharge,
    profile: en_profile
  },
  vi: {
    common: vi_common,
    propertyDetail : vi_propertyDetail,
    postProperty: vi_post_property,
    contact: vi_contact,
    membership: vi_membership,
    recharge: vi_recharge,
    profile: vi_profile
  }
} as const

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: localStorage.getItem('i18n') || 'en',
  fallbackLng: ['en', 'vi'],
  ns: [
    'common',
    'propertyDetail',
  ],
  ns: ['common', 'postProperty', 'contact', 'membership', 'recharge', 'profile', 'propertyDetail'],
  interpolation: {
    escapeValue: false
  }
})

export default i18n
