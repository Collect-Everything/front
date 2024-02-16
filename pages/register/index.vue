<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/2 space-y-6">
      <div
        v-if="!showBankingInfos"
        class="flex flex-col items-center space-y-4 w-full"
      >
        <span class="text-xl font-bold">{{ $t('login.register') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="companyName">{{ $t('login.companyName') }}</label>
          <input
            id="companyName"
            v-model="companyName"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="email">{{ $t('login.email') }}</label>
          <input id="email" v-model="email" type="email" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="phone">{{ $t('login.phone') }}</label>
          <input id="phone" v-model="phone" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="address">{{ $t('login.address') }}</label>
          <input id="address" v-model="address" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="zipcode">{{ $t('login.zipcode') }}</label>
          <input id="zipcode" v-model="zipcode" type="number" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="city">{{ $t('login.city') }}</label>
          <input id="city" v-model="city" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="input flex items-center justify-between h-10">
            <input
              id="password"
              ref="password"
              v-model="password"
              type="password"
              :placeholder="$t('login.passwordPlaceholder')"
              :minlength="8"
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
              v-model="passwordConfirm"
              type="password"
              :minlength="8"
            />
            <fa-icon
              :icon="['fas', 'eye']"
              @click="
                ;($refs.passwordConfirm as HTMLInputElement).type =
                  ($refs.passwordConfirm as HTMLInputElement).type ===
                  'password'
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

      <div v-else class="flex flex-col items-center space-y-4 w-full">
        <span class="text-xl font-bold">{{ $t('login.bankingInfos') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="cardHolder">{{ $t('login.cardHolder') }}</label>
          <input
            id="cardHolder"
            v-model="cardHolder"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="cardNumber">{{ $t('login.cardNumber') }}</label>
          <input
            id="cardNumber"
            v-model="cardNumber"
            type="text"
            class="input"
          />
        </div>

        <div class="flex justify-between w-full">
          <div class="flex flex-col space-y-1 text-gray-500 w-2/5">
            <label for="expDate">{{ $t('login.expDate') }}</label>
            <input id="expDate" v-model="expDate" type="month" class="input" />
          </div>

          <div class="flex flex-col space-y-1 text-gray-500 w-2/5">
            <label for="cvc">{{ $t('login.cvc') }}</label>
            <input id="cvc" v-model="cvc" type="number" class="input" />
          </div>
        </div>
      </div>

      <button
        v-if="!showBankingInfos"
        class="btn-primary w-full"
        :disabled="!passwordEquals || password.length < 8"
        @click="showBankingInfos = true"
      >
        {{ $t('general.continue') }}
      </button>
      <button v-else class="btn-primary w-full" @click="register">
        <fa-icon :icon="['fas', 'sign-in-alt']" />
        <span>{{ $t('login.register') }}</span>
      </button>

      <div v-if="!showBankingInfos" class="flex items-center space-x-1">
        <span class="text-sm text-gray-500">{{ $t('login.account') }}</span>
        <span
          class="text-sm font-semibold cursor-pointer"
          @click="$router.push('/login')"
        >
          {{ $t('login.login') }}
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      companyName: '',
      phone: '',
      address: '',
      zipcode: '',
      city: '',
      cardHolder: '',
      cardNumber: '',
      expDate: '',
      cvc: '',
      page: 'login',
      showBankingInfos: false,
    }
  },
  computed: {
    passwordEquals(): boolean {
      return this.password === this.passwordConfirm
    },
  },
  methods: {
    async register() {
      await $fetch('http://localhost:3100/api/v1/admins/register', {
        method: 'POST',
        body: {
          companyName: this.companyName,
          email: this.email,
          phone: this.phone,
          address: this.address,
          zipcode: this.zipcode,
          city: this.city,
          password: this.password,
          cardHolder: this.cardHolder,
          cardNumber: this.cardNumber,
          expDate: this.expDate,
          cvc: this.cvc,
        },
      })
    },
  },
}
</script>
