import { User } from '~/types/user'
const runtimeConfig = useRuntimeConfig()

export default defineNuxtPlugin((nuxtApp: any) => {
  return {
    provide: {
      $auth: {
        login: async (username: string, password: string) => {
          const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          })

          const { user, token } = await res.json()

          return { user, token }
        },
        logout: async () => {
          await fetch(`${runtimeConfig.API_GATEWAY_URL}/logout`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
        },
        register: async (username: string, email: string, password: string) => {
          const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
          })

          const { user, token } = await res.json()

          return { user, token }
        },
        user: async () => {
          const res = await fetch(`${runtimeConfig.API_GATEWAY_URL}/user`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          })
          const { user } = await res.json()

          return user
        },
      },
    },
  }
})
