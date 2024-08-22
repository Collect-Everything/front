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

function toBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

async function saveGlobalInfos(value: string) {
  const base64Logo = await toBase64(logo.value)

  await $fetch(
    `${config.public.API_GATEWAY_URL}/companies/${getUser.companyId}/configure-store`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getUser.accessToken}`,
      },
      body: {
        storeName: shopName.value,
        color: color.value,
        logo: base64Logo,
      },
    }
  )

  page.value = value
}

async function saveTexts(value: string) {
  await $fetch(
    `${config.public.API_GATEWAY_URL}/companies/${getUser.companyId}/configure-store`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getUser.accessToken}`,
      },
      body: {
        title: title.value,
        description: description.value,
        buttonText: buttonText.value,
        advantages: advantages.value,
        backgroundImage: backgroundImage.value,
      },
    }
  )

  page.value = value
}
</script>
