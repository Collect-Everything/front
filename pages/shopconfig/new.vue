<template>
  <ShopConfigColors
    v-if="page === 'colors'"
    v-model:shopName="shopName"
    v-model:logo="logo"
    v-model:color="color"
  />
</template>

<script lang="ts">
export default {
  data() {
    return {
      page: 'colors',
      shopName: '',
      logo: {},
      color: '#3C7E44',
    }
  },
}
</script>
