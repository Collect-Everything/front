import { defineStore } from 'pinia'

interface User {
  payload: {
    id: string
    email: string
    firstname: string
    lastname: string
    role: string
    companyId: string
  }
  accessToken: string
  refreshToken: string
}

export const useMainStore = defineStore({
  id: 'main-store',
  state: () => {
    const user: User | null = JSON.parse(localStorage.getItem('user') || 'null')
    return {
      user,
    }
  },
  getters: {
    getUser(): User | null {
      return this.user || JSON.parse(localStorage.getItem('user') || 'null')
    },
  },
  actions: {
    setUser(user: any) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout() {
      this.user = null
      localStorage.removeItem('user')
    },
  },
})
