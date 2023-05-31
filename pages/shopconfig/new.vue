<template>
  <ShopConfigGlobalInfos
    v-if="page === 'globalInfos'"
    v-model:shopName="shopName"
    v-model:logo="logo"
    v-model:color="color"
    @change-page="page = $event"
  />
  <ShopConfigTexts
    v-else-if="page === 'texts'"
    v-model:title="title"
    v-model:description="description"
    v-model:buttonText="buttonText"
    v-model:advantages="advantages"
    v-model:backgroundImage="backgroundImage"
    @change-page="page = $event"
    @add-advantage="
      advantages.push({
        icon: '',
        title: '',
        description: '',
        index: advantages.length,
      })
    "
  />
</template>

<script lang="ts">
export default {
  data() {
    return {
      page: 'globalInfos',
      shopName: '',
      logo: {} as File,
      color: '#3C7E44',
      title: '',
      description: '',
      buttonText: '',
      advantages: [] as Array<{
        icon: string
        title: string
        description: string
        index: number
      }>,
      backgroundImage: {} as File,
    }
  },
}
</script>
