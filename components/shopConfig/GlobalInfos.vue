<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/3 space-y-6">
      <span class="text-xl font-bold">
        {{ $t('shop.config.title') }}
      </span>

      <span class="text-gray-500">
        {{ $t('shop.config.text') }}
      </span>

      <div class="border-b w-full border-gray-300" />

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="shopName">{{ $t('shop.config.shopName') }}</label>
        <input
          id="shopName"
          type="text"
          class="input"
          @input="update('shopName', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="logo">{{ $t('shop.config.logo') }}</label>
        <button
          class="input text-left space-x-2 text-black"
          @click="$refs.logo.click()"
        >
          <fa-icon :icon="['fas', 'upload']" />
          <span>{{ logo.name || $t('shop.config.chooseLogo') }}</span>
          <span v-if="logo.size" class="text-gray-500">
            ({{ (logo.size / 1024 / 1024).toFixed(2) }} MB)
          </span>
        </button>
        <input
          id="logo"
          ref="logo"
          type="file"
          class="hidden"
          accept="image/*"
          @input="update('logo', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="color">{{ $t('shop.config.colors') }}</label>
        <div class="flex space-x-2">
          <div
            ref="colorDisplay"
            class="h-14 w-14 rounded-md bg-[#3C7E44]"
            @click="$refs.colorInput.click()"
          />
          <input
            id="color"
            ref="colorInput"
            type="color"
            class="opacity-0 w-0 h-0"
            @input="setColor($event.target.value)"
          />
          <div class="flex flex-col space-y-1">
            <span class="text-black">{{ $t('shop.config.primaryColor') }}</span>
            <span>{{ color.toUpperCase() }}</span>
          </div>
        </div>
        <span>{{ $t('shop.config.colorsHint') }}</span>
      </div>

      <button class="btn-primary w-full" @click="$emit('changePage', 'texts')">
        {{ $t('general.continue') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopConfigGlobalInfos',
  props: {
    shopName: {
      type: String,
      required: true,
    },
    logo: {
      type: Object,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
  },
  emits: ['update:shopName', 'update:logo', 'update:color', 'changePage'],
  methods: {
    update(field: 'shopName' | 'logo' | 'color', event: Event) {
      if (field === 'logo')
        this.$emit(
          `update:${field}`,
          (event.target as HTMLInputElement).files[0]
        )
      else
        this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
    setColor(color: string) {
      this.$emit('update:color', color)
      this.$refs.colorDisplay.style.backgroundColor = color
    },
  },
}
</script>
