<template>
  <ShopConfigGlobalInfos
    v-if="page === 'globalInfos'"
    v-model:shopName="shopName"
    v-model:logo="logo"
    v-model:color="color"
    @change-page="saveGlobalInfos($event)"
  />
  <ShopConfigTexts
    v-else-if="page === 'texts'"
    v-model:title="title"
    v-model:description="description"
    v-model:buttonText="buttonText"
    v-model:advantages="advantages"
    v-model:backgroundImage="backgroundImage"
    @add-advantage="
      advantages.push({
        icon: '',
        title: '',
        description: '',
        index: advantages.length,
      })
    "
    @change-page="saveTexts($event)"
  />
</template>

<script setup lang="ts">
import { useMainStore } from '~/store'

const config = useRuntimeConfig()
const { getUser } = useMainStore()

const page = ref('globalInfos')
const shopName = ref('')
const logo = ref({} as File)
const color = ref('#3C7E44')
const title = ref('')
const description = ref('')
const buttonText = ref('')
const advantages = ref(
  [] as Array<{
    icon: string
    title: string
    description: string
    index: number
  }>
)
const backgroundImage = ref({} as File)

async function saveGlobalInfos(value: string) {
  const formData = new FormData()

  formData.append('logo', logo.value)
  formData.append(
    'body',
    JSON.stringify({ storeName: shopName.value, color: color.value })
  )
  await $fetch(
    `${config.public.API_GATEWAY_URL}/companies/${getUser?.payload.companyId}/configure-store`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
      },
      body: formData,
    }
  )

  page.value = value
}

async function saveTexts(value: string) {
  const formData = new FormData()

  formData.append('image', backgroundImage.value)
  formData.append(
    'body',
    JSON.stringify({
      title: title.value,
      description: description.value,
      button: buttonText.value,
      advantages: advantages.value,
    })
  )
  await $fetch(
    `${config.public.API_GATEWAY_URL}/companies/${getUser?.payload.companyId}/configure-store`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
      },
      body: formData,
    }
  )

  page.value = value
}
</script>
