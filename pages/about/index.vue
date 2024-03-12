<template>
  <div class="flex flex-col items-center">
    <div class="flex flex-col w-4/5 items-start space-y-6">
      <div class="flex flex-col space-y-4">
        <span class="lg:text-2xl text-gray-700">
          {{ $t('about.about-us') }}
        </span>
        <span>
          {{ $t('about.about-us-description') }}
        </span>
      </div>
      <div class="flex flex-col space-y-4">
        <span class="lg:text-2xl text-gray-700">
          {{ $t('about.our-mission') }}
        </span>
        <span>
          {{ $t('about.our-mission-description') }}
        </span>
      </div>
    </div>
  </div>
</template>
