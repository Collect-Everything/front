<template>
  <div
    v-if="page === 'login'"
    class="flex flex-col items-center center-component w-full space-y-6"
  >
    <div class="flex flex-col items-center space-y-4 w-5/6">
      <span class="text-xl font-bold">Se connecter</span>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="email">{{ $t('login.email') }}</label>
        <input id="email" v-model="email" type="email" />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="password">{{ $t('login.password') }}</label>
        <input id="password" v-model="password" type="password" />
        <span class="text-xs text-black text-right" @click="forgotPassword()">
          {{ $t('login.forgotPassword') }}
        </span>
      </div>
    </div>

    <button class="btn-primary w-5/6" @click="login()">
      <fa-icon :icon="['fas', 'sign-in-alt']" />
      <span>{{ $t('login.login') }}</span>
    </button>

    <div class="flex items-center space-x-2 w-5/6">
      <div class="border-b w-full border-gray-500" />
      <span class="text-gray-500">{{ $t('general.or') }}</span>
      <div class="border-b w-full border-gray-500" />
    </div>

    <button class="btn-skeleton-primary w-5/6" @click="oauthLogin()">
      <fa-icon :icon="['fab', 'google']" />
      <span>{{ $t('login.oauthLogin') }}</span>
    </button>

    <div class="border-b w-5/6 border-gray-300" />

    <div class="flex items-center space-x-1">
      <span class="text-sm text-gray-500">{{ $t('login.noAccount') }}</span>
      <span class="text-sm font-semibold" @click="page = 'register'">
        {{ $t('login.register') }}
      </span>
    </div>
  </div>
  <div
    v-else-if="page === 'register'"
    class="flex flex-col items-center center-component w-full space-y-6"
  ></div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      page: 'login',
    }
  },
  methods: {
    forgotPassword() {
      // TODO
    },
    register() {
      // TODO
    },
    login() {
      // TODO
    },
    oauthLogin() {
      // TODO
    },
  },
}
</script>
