<template>
  <div class="flex flex-col items-center space-y-6">
    <div
      class="flex items-center justify-between flex-col w-full space-y-4 px-4 lg:flex-row lg:w-4/5 lg:space-x-4"
    >
      <div class="flex flex-col space-y-6">
        <span class="text-2xl lg:text-5xl title font-semibold">
          {{ $t('home.title') }}
        </span>
        <span class="text-xl text-neutral-600">
          {{ $t('home.subtitle') }}
        </span>
        <button class="btn-secondary w-fit" @click="$router.push('/about')">
          {{ $t('home.learnMore') }}
        </button>
      </div>

      <img src="@/assets/images/BrowserWindow.png" alt="Browser Window" />
    </div>

    <div class="bg-[#124E4A] text-white flex justify-center w-full p-6">
      <div class="flex flex-col items-center space-y-6 w-full lg:w-1/3">
        <span class="text-xl title text-center">
          {{ $t('home.newsletter') }}
        </span>
        <span class="text-center">
          {{ $t('home.newsletterDescription') }}
        </span>

        <div class="flex flex-col items-center space-y-2 w-full">
          <div class="flex items-center space-x-2 w-full">
            <input
              type="email"
              placeholder="Entrez votre e-mail"
              class="input w-2/3"
            />
            <button class="btn-secondary w-1/3">
              {{ $t('home.subscribe') }}
            </button>
          </div>
          <span class="text-sm">
            {{ $t('home.joinNow') }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
