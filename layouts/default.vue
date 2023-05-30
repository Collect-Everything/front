<template>
  <div class="text-black h-screen w-full">
    <div
      class="flex items-center justify-between py-1 px-4 border-b border-gray-300"
    >
      <div class="w-1/3">
        <fa-icon :icon="['fas', 'bars']" />
      </div>
      <div class="w-1/3 flex justify-center">
        <img src="@/assets/logo.png" alt="logo" @click="goHome()" />
      </div>
      <div class="w-1/3" />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    goHome() {
      this.$router.push('/')
    },
  },
}
</script>
