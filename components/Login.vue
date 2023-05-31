<template>
  <div class="flex flex-col items-center center-component w-full space-y-6 p-6">
    <div class="flex flex-col items-center space-y-4 w-full">
      <span class="text-xl font-bold">{{ $t('login.login') }}</span>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="email">{{ $t('login.email') }}</label>
        <input
          id="email"
          type="email"
          class="input"
          :value="email"
          @input="update('email', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="password">{{ $t('login.password') }}</label>
        <input
          id="password"
          type="password"
          class="input"
          :value="password"
          @input="update('password', $event)"
        />
        <span class="text-xs text-black text-right" @click="forgotPassword()">
          {{ $t('login.forgotPassword') }}
        </span>
      </div>
    </div>

    <button class="btn-primary w-full" @click="login()">
      <fa-icon :icon="['fas', 'sign-in-alt']" />
      <span>{{ $t('login.login') }}</span>
    </button>

    <div class="flex items-center space-x-2 w-full">
      <div class="border-b w-full border-gray-500" />
      <span class="text-gray-500">{{ $t('general.or') }}</span>
      <div class="border-b w-full border-gray-500" />
    </div>

    <button class="btn-skeleton-primary w-full" @click="oauthLogin()">
      <fa-icon :icon="['fab', 'google']" />
      <span>{{ $t('login.oauthLogin') }}</span>
    </button>

    <div class="border-b w-full border-gray-300" />

    <div class="flex items-center space-x-1">
      <span class="text-sm text-gray-500">{{ $t('login.noAccount') }}</span>
      <span
        class="text-sm font-semibold"
        @click="$emit('change-page', 'register')"
      >
        {{ $t('login.register') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LoginComponent',
  props: {
    email: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
  },
  emits: ['update:email', 'update:password', 'change-page'],
  methods: {
    forgotPassword() {
      // TODO
    },
    login() {
      // TODO
    },
    oauthLogin() {
      // TODO
    },
    update(field: 'email' | 'password', event: Event) {
      this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
  },
}
</script>
