<template>
  <div>
    
  </div>
</template>

<script lang="ts">
  export default {
    async setup() {
      const config = useRuntimeConfig()
      const route = useRoute()
      const router = useRouter()
      const token = route.query.token

      if (!token) {
        throw new Error('Token is required')
      }

      const res = await $fetch(`${config.public.API_GATEWAY_URL}/email-validation/token/${token}`, {
        method: 'GET',
      })

      console.log('res', res)

      if (res.data.isValid) {
        router.push('/login').then(() => {
          console.log('Email confirmed')
          useNuxtApp().$toast.success('Email confirmé, vous pouvez vous connecter')
        })
      } else {
        router.push('/login').then(() => {
          console.log('Email confirmed')
          useNuxtApp().$toast.error('Email non confirmé, veuillez réessayer')
        })
      }
    }
  }

</script>
