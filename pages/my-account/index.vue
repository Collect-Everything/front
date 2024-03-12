<template>
  <div class="flex flex-col items-center space-y-4">
    <div class="flex flex-col w-4/5 space-y-4">
      <div class="flex justify-between items-center">
        <span class="title text-lg text-neutral-700">
          {{ $t('my-account.title') }}
        </span>
        <button class="btn-secondary">
          {{ $t('general.save') }}
        </button>
      </div>
      <div
        class="border border-neutral-200 p-2 rounded flex flex-col space-y-2"
      >
        <span class="text-neutral-700 font-semibold">{{ shopName }}</span>
        <span class="text-sm underline text-neutral-700">
          {{ $t('my-account.seeShop') }}
        </span>
      </div>
      <span class="text-neutral-700">
        {{ $t('my-account.subscriptionWarning', { nbDays: 14 }) }}
      </span>
      <a href="/prices" class="text-secondary underline text-sm">
        {{ $t('my-account.changeSubscription') }}
      </a>
      <div class="flex flex-col lg:md:w-2/5 w-full space-y-2">
        <span class="text-xl text-neutral-700">
          {{ $t('my-account.visual-identity') }}
        </span>
        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="shopName">{{ $t('shop.config.shopName') }}</label>
          <input id="shopName" v-model="shopName" type="text" class="input" />
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
              <span class="text-black">{{
                $t('shop.config.primaryColor')
              }}</span>
              <span>{{ color.toUpperCase() }}</span>
            </div>
          </div>
          <span>{{ $t('shop.config.colorsHint') }}</span>
        </div>
      </div>
    </div>
    <hr class="text-neutral-700 w-4/5" />
    <div class="flex w-4/5 flex-col lg:md:flex-row space-y-4 lg:md:space-y-0">
      <div
        class="flex flex-col w-full space-y-4 lg:md:border-r lg:md:border-neutral-200 pr-6"
      >
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
          <div class="absolute px-4">
            <div class="flex flex-col items-center space-y-4">
              <span v-if="title" class="text-2xl font-bold text-white">
                {{ title }}
              </span>
              <span v-if="description" class="text-lg text-center text-white">
                {{ description }}
              </span>
              <button v-if="buttonText" class="btn-secondary">
                {{ buttonText }}
              </button>
            </div>
          </div>
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
              {{
                backgroundImage.name || $t('shop.config.homePage.chooseImage')
              }}
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
            @input="setBackgroundImage"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="title">{{ $t('shop.config.homePage.title') }}</label>
          <input id="title" v-model="title" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="description">
            {{ $t('shop.config.homePage.description') }}
          </label>
          <textarea
            id="description"
            v-model="description"
            class="border border-gray-500 rounded-md h-20 px-4"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="buttonText">
            {{ $t('shop.config.homePage.buttonText') }}
          </label>
          <input
            id="buttonText"
            v-model="buttonText"
            type="text"
            class="input"
          />
        </div>
      </div>
      <div class="flex flex-col w-full lg:md:pl-6 space-y-6">
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
            <span class="text-neutral-500">{{ advantage.description }}</span>

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
              @change="setAdvantages($event, advantage.index, 'icon')"
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
              v-model="advantage.title"
              type="text"
              class="input"
              @input="setAdvantages($event, advantage.index, 'title')"
            />
          </div>

          <div class="flex flex-col space-y-1 text-gray-500">
            <label :for="`description-${advantage.index}`">
              {{ $t('shop.config.homePage.description') }}
            </label>
            <textarea
              :id="`description-${advantage.index}`"
              v-model="advantage.description"
              type="text"
              class="border border-gray-500 rounded-md h-20 px-4"
              @input="setAdvantages($event, advantage.index, 'description')"
            />
          </div>
        </div>
        <div class="flex flex-col space-y-1 text-gray-500 cursor-pointer">
          <div
            class="space-x-2 text-black text-sm text-center"
            @click="addAdvantage"
          >
            <fa-icon :icon="['fas', 'plus']" />
            <span>{{ $t('shop.config.homePage.addAdvantage') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      shopName: 'La cagette locale',
      logo: {} as File,
      color: '#3C7E44',
      backgroundImageURL: '',
      title: 'Bienvenue chez la cagette locale',
      description:
        'Découvrez notre sélection de produits de qualité, commandez en ligne et venez les récupérer dans notre magasin en un temps record',
      buttonText: 'Découvrez notre catalogue',
      backgroundImage: {} as File,
      advantages: [
        {
          index: 0,
          icon: 'shopping-cart',
          title: 'Commande en ligne',
          description:
            'Commandez vos produits en ligne et venez les récupérer en magasin',
        },
        {
          index: 1,
          icon: 'truck',
          title: 'Livraison à domicile',
          description: 'Faites-vous livrer vos produits à domicile',
        },
      ],
    }
  },
  methods: {
    setColor(color: string) {
      this.color = color
      this.$refs.colorDisplay.style.backgroundColor = color
    },
    setBackgroundImage(event: Event) {
      const input = event.target as HTMLInputElement
      if (input.files) {
        this.backgroundImage = input.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.backgroundImageURL = e.target?.result as string
        }
        reader.readAsDataURL(this.backgroundImage)
      }
    },
    setAdvantages(event: Event, index: number, subField: string) {
      const value = (event.target as HTMLInputElement).value
      const advantagesCopy = [...this.advantages]
      advantagesCopy[index!][subField!] = value
      this.advantages = advantagesCopy
    },
    removeAdvantage(index: number) {
      const advantagesCopy = [...this.advantages]
      advantagesCopy.splice(index, 1)
      this.advantages = advantagesCopy
    },
    addAdvantage() {
      this.advantages.push({
        index: this.advantages.length,
        icon: '',
        title: '',
        description: '',
      })
    },
  },
}
</script>
