import { create } from 'zustand'

type PropertyStore = {
  step: number
  setStep: (step: number) => void
  resetStep: () => void
  isReset: boolean
  setIsReset: (isReset: boolean) => void,
  resetStepAndForm: () => void
}

const usePropertyStore = create<PropertyStore>((set) => ({
  step: 0,
  setStep: (step) => set({ step }),
  resetStep: () => set({ step: 0 }),
  isReset: false,
  setIsReset: (isReset) => set({ isReset }),
  resetStepAndForm: () => {
    set({ isReset: true, step: 0 })
  }
}))

export default usePropertyStore
