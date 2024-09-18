import { User } from '@/models/user.type.ts'
import { create } from 'zustand'

type AuthStore = {
  user: User | null
  token: string | null
  loginSuccess: (user: User, token: string) => void
  logout: () => void
  updateProfile: (user: User) => void
  updateUserBalance: (amount: number) => void
  haveDeleteReviewPrivilege: boolean
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  loginSuccess: (user, token) => {
    const haveDeleteReviewPrivilege = user.roles.includes('ROLE_ADMIN') || user.authorities.includes('review:delete')
    set({ user, token, haveDeleteReviewPrivilege })
  },
  logout: () => set({ user: null, token: null }),
  updateProfile: (user) => set({ user }),
  updateUserBalance: (amount) =>
    set((state) => {
      if (state.user) {
        return { user: { ...state.user, balance: state.user.balance + amount } }
      }
      return state
    }),
  haveDeleteReviewPrivilege: false
}))

export default useAuthStore
