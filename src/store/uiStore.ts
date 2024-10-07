import { create } from 'zustand'
import i18next from 'i18next'

type UIStore = {
  i18n: string
  setI18n: (i18n: string) => void
}

const useUIStore = create<UIStore>((set) => ({
  i18n: localStorage.getItem('i18n') || 'en',
  setI18n: (i18n) => {
    i18next.changeLanguage(i18n)
    localStorage.setItem('i18n', i18n)
    set({ i18n })
  }
}))

export default useUIStore
