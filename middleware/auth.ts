export default defineNuxtRouteMiddleware(() => {
  const { $auth } = useNuxtApp() as any

  if (!$auth.user) {
    return navigateTo('/login')
  }
})
