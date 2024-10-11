import { User } from '@/types/user.type.ts'
import { create } from 'zustand'

type AuthStore = {
  user: User | null
  token: string | null
  loginSuccess: (user: User, token: string) => void
  logout: () => void
  updateProfile: (user: User) => void
  incrementUserBalance: (amount: number) => void
  deincrementUserBalance: (amount: number) => void
  haveDeleteCommentPrivilege: boolean
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loginSuccess: (user, token) => {
    const haveDeleteCommentPrivilege = user.roles.includes('Super Admin') || user.authorities.includes('review:delete')
    set({ user, token, haveDeleteCommentPrivilege })
  },
  logout: () => set({ user: null, token: null }),
  updateProfile: (user) => set({ user }),
  incrementUserBalance: (amount) =>
    set((state) => {
      if (state.user) {
        return { user: { ...state.user, balance: state.user.balance + amount } }
      }
      return state
    }),
  deincrementUserBalance: (amount) =>
    set((state) => {
      if (state.user) {
        return { user: { ...state.user, balance: state.user.balance - amount } }
      }
      return state
    }),
  haveDeleteCommentPrivilege: false
}))

export default useAuthStore
