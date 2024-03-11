<template>
  <div class="flex flex-col space-y-2">
    <div
      class="flex justify-between items-center bg-gray-100 p-2 rounded-md cursor-pointer"
      @click="$emit('open', question.id)"
    >
      <span class="lg:text-lg font-semibold">{{ question.question }}</span>
      <fa-icon :icon="['fas', 'caret-down']" />
    </div>
    <span v-if="question.isOpen" class="text-md ms-5">
      {{ question.answer }}
    </span>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    question: {
      type: Object as () => {
        id: number
        question: string
        answer: string
        isOpen: boolean
      },
      required: true,
    },
  },
  emits: ['open'],
}
</script>
