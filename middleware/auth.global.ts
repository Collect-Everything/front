import { useMainStore } from '~/store'

export default defineNuxtRouteMiddleware((to) => {
  const user = useMainStore().user

  if (!user) {
    const userFromCookies = JSON.parse(localStorage.getItem('user') || 'null')
    if (userFromCookies) useMainStore().setUser(userFromCookies)
    else if (to.path !== '/login') {
      return navigateTo('/login')
    }
  }
})
