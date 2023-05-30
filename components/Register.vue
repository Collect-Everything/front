<template>
  <div class="flex flex-col items-center w-full space-y-6">
    <div class="flex flex-col items-center space-y-4 w-5/6">
      <span class="text-xl font-bold">{{ $t('login.register') }}</span>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="companyName">{{ $t('login.companyName') }}</label>
        <input
          id="companyName"
          type="text"
          class="input"
          :value="companyName"
          @input="update('companyName', $event)"
        />
      </div>

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
        <label for="phone">{{ $t('login.phone') }}</label>
        <input
          id="phone"
          type="text"
          class="input"
          :value="phone"
          @input="update('phone', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="address">{{ $t('login.address') }}</label>
        <input
          id="address"
          type="text"
          class="input"
          :value="address"
          @input="update('address', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="zipcode">{{ $t('login.zipcode') }}</label>
        <input
          id="zipcode"
          type="text"
          class="input"
          :value="zipcode"
          @input="update('zipcode', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="city">{{ $t('login.city') }}</label>
        <input
          id="city"
          type="text"
          class="input"
          :value="city"
          @input="update('city', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="password">{{ $t('login.password') }}</label>
        <div class="input flex items-center justify-between h-10">
          <input
            id="password"
            ref="password"
            type="password"
            :value="password"
            :placeholder="$t('login.passwordPlaceholder')"
            :minlength="8"
            @input="update('password', $event)"
          />
          <fa-icon
            :icon="['fas', 'eye']"
            @click="
              ;($refs.password as HTMLInputElement).type =
                ($refs.password as HTMLInputElement).type === 'password'
                  ? 'text'
                  : 'password'
            "
          />
        </div>
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="passwordConfirm">{{ $t('login.passwordConfirm') }}</label>
        <div class="input flex items-center justify-between h-10">
          <input
            id="passwordConfirm"
            ref="passwordConfirm"
            type="password"
            :value="passwordConfirm"
            :minlength="8"
            @input="update('passwordConfirm', $event)"
          />
          <fa-icon
            :icon="['fas', 'eye']"
            @click="
              ;($refs.passwordConfirm as HTMLInputElement).type =
                ($refs.passwordConfirm as HTMLInputElement).type === 'password'
                  ? 'text'
                  : 'password'
            "
          />
        </div>
      </div>

      <span
        v-if="!passwordEquals && password.length >= 8"
        class="text-sm text-red-600"
      >
        {{ $t('login.differentPasswords') }}
      </span>
    </div>

    <button class="btn-primary w-5/6" @click="register()">
      <fa-icon :icon="['fas', 'sign-in-alt']" />
      <span>{{ $t('login.register') }}</span>
    </button>

    <div class="flex items-center space-x-1">
      <span class="text-sm text-gray-500">{{ $t('login.account') }}</span>
      <span
        class="text-sm font-semibold"
        @click="$emit('change-page', 'login')"
      >
        {{ $t('login.login') }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RegisterComponent',
  props: {
    companyName: {
      type: String,
      default: '',
    },
    email: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      default: '',
    },
    zipcode: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    password: {
      type: String,
      default: '',
    },
    passwordConfirm: {
      type: String,
      default: '',
    },
  },
  emits: [
    'update:companyName',
    'update:email',
    'update:phone',
    'update:address',
    'update:zipcode',
    'update:city',
    'update:password',
    'update:passwordConfirm',
    'change-page',
  ],
  computed: {
    passwordEquals(): boolean {
      return this.password === this.passwordConfirm
    },
  },
  methods: {
    update(
      field:
        | 'companyName'
        | 'email'
        | 'phone'
        | 'address'
        | 'zipcode'
        | 'city'
        | 'password'
        | 'passwordConfirm',
      event: Event
    ) {
      this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
    register() {
      // TODO
    },
  },
}
</script>
