import { User } from '~/types/user'
const runtimeConfig = useRuntimeConfig()

export default defineNuxtPlugin((nuxtApp: any) => {
  nuxtApp.vueApp.config.globalProperties.$auth = {
    async login(
      username: string,
      password: string
    ): Promise<{ user: User; token: string }> {
      const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const { user, token } = await res.json()

      nuxtApp.vueApp.config.globalProperties.$auth.user = user
      nuxtApp.vueApp.config.globalProperties.$auth.token = token

      return { user, token }
    },
    async logout(): Promise<void> {
      await fetch(`${runtimeConfig.API_GATEWAY_URL}/logout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })

      nuxtApp.vueApp.config.globalProperties.$auth.user = null
      nuxtApp.vueApp.config.globalProperties.$auth.token = null
    },
    async register(
      username: string,
      email: string,
      password: string
    ): Promise<{ user: User; token: string }> {
      const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      })

      const { user, token } = await res.json()

      nuxtApp.vueApp.config.globalProperties.$auth.user = user
      nuxtApp.vueApp.config.globalProperties.$auth.token = token

      return { user, token }
    },
    async getUser(): Promise<User> {
      const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const { user } = await res.json()

      nuxtApp.vueApp.config.globalProperties.$auth.user = user

      return user
    },
  }
})
