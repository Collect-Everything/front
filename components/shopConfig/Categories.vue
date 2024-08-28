<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/3 space-y-6">
      <span class="text-xl font-bold">
        {{ $t('shop.config.categories') }}
      </span>

      <span class="text-gray-500">
        {{ $t('shop.config.categoriesInfos') }}
      </span>

      <div class="border-b w-full border-gray-300" />

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <span class="text-black font-semibold">
          {{ $t('shop.config.addCategory') }}
        </span>
        <label for="categoryName">{{ $t('shop.config.categoryName') }}</label>
        <input
          id="categoryName"
          type="text"
          class="input"
          @input="update('categoryName', $event)"
        />
      </div>

      <button class="btn-secondary w-full" @click="$emit('create')">
        {{ $t('general.save') }}
      </button>

      <div class="border-b w-full border-gray-300" />

      <div class="flex flex-col space-y-1 w-full">
        <span class="text-black font-semibold">
          {{ $t('shop.config.categories') }}
        </span>

        <div class="flex flex-col space-y-2">
          <div
            v-for="(category, index) in categories"
            :key="category._props.id"
            class="flex flex-col space-y-2"
          >
            <div class="flex justify-between items-center">
              <input
                v-model="category._props.name"
                :disabled="!category._props.edit"
                class="input"
              />

              <button
                v-if="!category._props.edit"
                class="btn-secondary"
                @click="category._props.edit = !category._props.edit"
              >
                {{ $t('general.edit') }}
              </button>
              <button
                v-else
                class="btn-secondary"
                @click="saveCategory(category)"
              >
                {{ $t('general.save') }}
              </button>
              <button
                class="btn-danger"
                @click="
                  $emit('deleteCategory', {
                    id: category._props.id,
                  })
                "
              >
                {{ $t('general.delete') }}
              </button>
            </div>

            <div
              v-if="index !== categories.length - 1"
              class="border-b w-full border-gray-300"
            />
          </div>

          <div v-if="categories.length === 0">
            <span>{{ $t('shop.config.noCategories') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopConfigCategories',
  props: {
    categoryName: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: ['update:categoryName', 'create', 'saveCategory', 'deleteCategory'],
  methods: {
    update(field: 'categoryName', event: Event) {
      this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
    saveCategory(category) {
      category._props.edit = !category._props.edit

      this.$emit('saveCategory', {
        id: category._props.id,
        name: category._props.name,
      })
    },
  },
}
</script>
