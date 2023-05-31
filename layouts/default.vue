<template>
  <div class="text-black h-screen w-full">
    <div
      class="flex items-center justify-between border-b border-gray-300 w-full"
    >
      <div class="w-1/3 flex items-center">
        <fa-icon
          :icon="['fas', 'bars']"
          class="p-4 text-2xl"
          @click="showNav = !showNav"
        />
      </div>
      <div class="w-1/3 flex justify-center">
        <NuxtLink to="/">
          <img src="@/assets/logo.png" alt="logo" class="h-20" />
        </NuxtLink>
      </div>
      <div class="w-1/3" />
    </div>
    <slot v-if="!showNav" />
    <div
      v-else
      class="flex flex-col items-center justify-center space-y-6 pt-6 divide-y divide-gray-300 w-full"
    >
      <NuxtLink to="/" class="flex items-center justify-center space-x-2">
        <fa-icon :icon="['fas', 'home']" />
        <span>{{ $t('general.home') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showNav: false,
    }
  },
}
</script>
