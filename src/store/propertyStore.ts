import { create } from 'zustand'

type PropertyStore = {
  name: string,
  setName: (name: string) => void
}

const usePropertyStore = create<PropertyStore>((set) => ({
  name: 'Chi tiết bài đăng',
  setName: (name) => set({ name })
}))

export default usePropertyStore