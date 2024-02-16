<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/3 space-y-4">
      <span class="text-xl font-bold">
        {{ $t('shop.config.texts.title') }}
      </span>

      <span class="text-gray-500">
        {{ $t('shop.config.texts.text') }}
      </span>

      <div class="border-b w-full border-gray-300" />

      <div class="w-full">
        <span class="font-bold">
          {{ $t('shop.config.texts.homePage.mainSection') }}
        </span>
      </div>

      <div
        v-if="backgroundImageURL"
        class="bg-black w-full max-h-96 relative flex items-center justify-center"
      >
        <img
          :src="backgroundImageURL"
          alt="test"
          class="opacity-40 h-96 object-cover"
        />
        <div class="absolute">
          <div class="flex flex-col items-center space-y-4">
            <span v-if="title" class="text-4xl font-bold text-white">
              {{ title }}
            </span>
            <span v-if="description" class="text-2xl text-white">
              {{ description }}
            </span>
            <button v-if="buttonText" class="btn-primary">
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="title">{{ $t('shop.config.homePage.title') }}</label>
        <input
          id="title"
          type="text"
          class="input"
          @input="update('title', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="description">
          {{ $t('shop.config.homePage.description') }}
        </label>
        <textarea
          id="description"
          class="border border-gray-500 rounded-md h-20 px-4"
          @input="update('description', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="buttonText">
          {{ $t('shop.config.homePage.buttonText') }}
        </label>
        <input
          id="buttonText"
          type="text"
          class="input"
          @input="update('buttonText', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="backgroundImage">
          {{ $t('shop.config.homePage.backgroundImage') }}
        </label>
        <button
          class="input text-left space-x-2 text-black"
          @click="$refs.backgroundImage.click()"
        >
          <fa-icon :icon="['fas', 'upload']" />
          <span>
            {{ backgroundImage.name || $t('shop.config.homePage.chooseImage') }}
          </span>
          <span v-if="backgroundImage.size" class="text-gray-500">
            ({{ (backgroundImage.size / 1024 / 1024).toFixed(2) }} MB)
          </span>
        </button>
        <input
          id="backgroundImage"
          ref="backgroundImage"
          type="file"
          class="hidden"
          accept="image/*"
          @input="update('backgroundImage', $event)"
        />
      </div>

      <div class="w-full">
        <span class="font-bold">
          {{ $t('shop.config.texts.homePage.advantages') }}
        </span>
      </div>

      <div
        v-for="advantage in advantages"
        :key="advantage.index"
        class="w-full space-y-4"
      >
        <div
          class="bg-gray-200 w-full h-40 flex flex-col items-center justify-around relative"
        >
          <fa-icon v-if="advantage.icon" :icon="['fas', advantage.icon]" />
          <span class="font-semibold">{{ advantage.title }}</span>
          <span>{{ advantage.description }}</span>

          <button
            class="text-white px-2 py-1 bg-red-500 rounded-full absolute -top-2 -right-2"
            @click="removeAdvantage(advantage.index)"
          >
            <fa-icon :icon="['fas', 'trash-alt']" />
          </button>
        </div>

        <div class="flex flex-col space-y-1 text-gray-500">
          <label :for="`icon-${advantage.index}`">
            {{ $t('shop.config.homePage.icon') }}
          </label>
          <select
            :id="`icon-${advantage.index}`"
            class="input"
            @change="update('advantages', $event, advantage.index, 'icon')"
          >
            <option value="">
              {{ $t('shop.config.homePage.chooseIcon') }}
            </option>
            <option
              v-for="faIcon in fontawesomeIcons"
              :key="faIcon"
              :value="faIcon"
            >
              {{ faIcon }}
            </option>
          </select>
        </div>

        <div class="flex flex-col space-y-1 text-gray-500">
          <label :for="`title-${advantage.index}`">
            {{ $t('shop.config.homePage.title') }}
          </label>
          <input
            :id="`title-${advantage.index}`"
            type="text"
            class="input"
            @input="update('advantages', $event, advantage.index, 'title')"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500">
          <label :for="`description-${advantage.index}`">
            {{ $t('shop.config.homePage.description') }}
          </label>
          <textarea
            :id="`description-${advantage.index}`"
            type="text"
            class="border border-gray-500 rounded-md h-20 px-4"
            @input="
              update('advantages', $event, advantage.index, 'description')
            "
          />
        </div>
      </div>

      <div class="flex flex-col space-y-1 text-gray-500">
        <div
          class="space-x-2 text-black text-sm text-center"
          @click="$emit('addAdvantage')"
        >
          <fa-icon :icon="['fas', 'plus']" />
          <span>{{ $t('shop.config.homePage.addAdvantage') }}</span>
        </div>
      </div>

      <div class="flex space-x-4 w-full">
        <button
          class="btn-skeleton-primary w-full"
          @click="$emit('changePage', 'globalInfos')"
        >
          {{ $t('general.back') }}
        </button>
        <button
          class="btn-primary w-full"
          @click="$emit('changePage', 'contactInfos')"
        >
          {{ $t('general.continue') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopConfigTexts',
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    advantages: {
      type: Array<{
        icon: string
        title: string
        description: string
        index: number
      }>,
      required: true,
    },
    backgroundImage: {
      type: Object,
      required: true,
    },
  },
  emits: [
    'update:title',
    'update:description',
    'update:buttonText',
    'update:advantages',
    'update:backgroundImage',
    'addAdvantage',
    'changePage',
  ],
  data() {
    return {
      fontawesomeIcons: ['sun', 'bolt'],
      backgroundImageURL: '',
    }
  },
  methods: {
    update(
      field:
        | 'title'
        | 'description'
        | 'buttonText'
        | 'advantages'
        | 'backgroundImage',
      event: Event,
      index?: number,
      subField?: string
    ) {
      if (field === 'backgroundImage') {
        this.$emit(
          `update:${field}`,
          (event.target as HTMLInputElement).files[0]
        )
        this.backgroundImageURL = URL.createObjectURL(
          (event.target as HTMLInputElement).files[0]
        )
      } else if (field === 'advantages') {
        const value = (event.target as HTMLInputElement).value
        const advantagesCopy = [...this.advantages]
        advantagesCopy[index!][subField!] = value
        this.$emit(`update:${field}`, advantagesCopy)
      } else
        this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
    removeAdvantage(index: number) {
      const advantagesCopy = [...this.advantages]
      advantagesCopy.splice(index, 1)
      this.$emit('update:advantages', advantagesCopy)
    },
  },
}
</script>
