import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      user: null,
    }
  },
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
