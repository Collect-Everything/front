import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    return {
      user: null,
    }
  },
  getters: {
    getUser(): any {
      return this.user || JSON.parse(localStorage.getItem('user') || 'null')
    },
  },
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
  },
})
