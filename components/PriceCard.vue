<template>
  <div
    class="flex flex-col justify-between rounded border border-green-600 bg-neutral-100 w-1/3"
  >
    <div class="flex flex-col p-4 w-full border-b border-gray-200 space-y-4">
      <span class="text-green-600 text-2xl">{{ title }}</span>
      <span>{{ subtitle }}</span>
      <hr />
      <div class="flex items-end space-x-2">
        <span class="text-4xl">{{ price }} €</span>
        <span class="text-sm">{{ isMonthly ? 'par mois' : 'par an' }}</span>
      </div>
    </div>
    <div class="flex flex-col p-4 w-full space-y-4">
      <span>Tous les avantages :</span>
      <div class="flex flex-col space-y-2">
        <div
          v-for="advantage in advantages"
          :key="advantage"
          class="flex items-center space-x-2"
        >
          <fa-icon :icon="['fas', 'check']" class="text-green-600" />
          <span>{{ advantage }}</span>
        </div>
      </div>
      <button class="btn-secondary" @click="btnAction">
        {{ btnText }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    advantages: {
      type: Array<String>,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    btnAction: {
      type: Function,
      required: true,
    },
    isMonthly: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
