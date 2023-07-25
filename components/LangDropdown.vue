<template>
  <div class="relative">
    <button
      class="flex items-center justify-center"
      @click="showDropdown = !showDropdown"
    >
      <img :src="`/flags/${$i18n.locale}.png`" alt="flag" class="h-6" />
    </button>
    <div
      v-if="showDropdown"
      class="absolute top-8 -right-2 w-10 rounded-md bg-white shadow-black shadow-xl z-10 space-y-4 p-2"
    >
      <div
        v-for="locale in $i18n.availableLocales.filter(
          (locale) => locale !== $i18n.locale
        )"
        :key="locale"
      >
        <button
          class="flex items-center justify-center"
          @click="setLocale(locale)"
        >
          <img :src="`/flags/${locale}.png`" alt="flag" class="h-6" />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      showDropdown: false,
    }
  },
  methods: {
    setLocale(locale: string) {
      this.$i18n.locale = locale
      this.showDropdown = false
    },
  },
}
</script>
