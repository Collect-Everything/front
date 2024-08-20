<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/2 space-y-6">
      <span class="text-xl font-bold">{{ $t('login.register') }}</span>

      <div
        v-if="page === 'company'"
        class="flex flex-col items-center space-y-4 w-full"
      >
        <span class="text-md font-semibold">{{ $t('login.companyInfo') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="companyName">{{ $t('login.companyName') }}</label>
          <input
            id="companyName"
            v-model="company.name"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="emailCompany">{{ $t('login.email') }}</label>
          <input
            id="emailCompany"
            v-model="company.email"
            type="email"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="phone">{{ $t('login.phone') }}</label>
          <input id="phone" v-model="company.phone" type="text" class="input" />
        </div>

        <div class="flex space-x-4 w-full">
          <div class="flex flex-col space-y-1 text-gray-500">
            <label for="address">{{ $t('login.streetNumber') }}</label>
            <input
              id="address"
              v-model="company.streetNumber"
              type="text"
              class="input"
            />
          </div>

          <div class="flex flex-col space-y-1 text-gray-500 w-11/12">
            <label for="address">{{ $t('login.street') }}</label>
            <input
              id="address"
              v-model="company.street"
              type="text"
              class="input"
            />
          </div>
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="zipcode">{{ $t('login.zipcode') }}</label>
          <input
            id="zipcode"
            v-model="company.postalCode"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="city">{{ $t('login.city') }}</label>
          <input id="city" v-model="company.city" type="text" class="input" />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="country">{{ $t('login.country') }}</label>
          <input
            id="country"
            v-model="company.country"
            type="text"
            class="input"
          />
        </div>
      </div>

      <div v-else class="flex flex-col items-center space-y-4 w-full">
        <span class="text-md font-semibold">{{ $t('login.userInfo') }}</span>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="firstname">{{ $t('login.firstname') }}</label>
          <input
            id="firstname"
            v-model="admin.firstname"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="lastname">{{ $t('login.lastname') }}</label>
          <input
            id="lastname"
            v-model="admin.lastname"
            type="text"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="emailUser">{{ $t('login.email') }}</label>
          <input
            id="emailUser"
            v-model="admin.email"
            type="email"
            class="input"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="password">{{ $t('login.password') }}</label>
          <div class="input flex items-center justify-between h-10">
            <input
              id="password"
              ref="password"
              v-model="admin.password"
              type="password"
              class="w-full"
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
              class="w-full"
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
          v-if="!passwordEquals && admin.password.length >= 8"
          class="text-sm text-red-600"
        >
          {{ $t('login.differentPasswords') }}
        </span>
      </div>

      <button
        v-if="page === 'company'"
        class="btn-secondary w-full"
        :disabled="!canContinue"
        @click="page = 'user'"
      >
        <fa-icon :icon="['fas', 'arrow-right']" />
        <span>{{ $t('general.continue') }}</span>
      </button>
      <div v-else class="flex space-x-4 w-full" @click="page = 'company'">
        <button class="btn bg-gray-400 w-full">
          <fa-icon :icon="['fas', 'arrow-left']" />
          <span>{{ $t('login.back') }}</span>
        </button>
        <button
          class="btn-secondary w-full"
          :disabled="!canRegister"
          @click="register"
        >
          <fa-icon :icon="['fas', 'sign-in-alt']" />
          <span>{{ $t('login.register') }}</span>
        </button>
      </div>

      <div v-if="page === 'company'" class="flex items-center space-x-1">
        <span class="text-sm text-gray-500">{{ $t('login.account') }}</span>
        <span
          class="text-sm font-semibold cursor-pointer text-secondary"
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
      page: 'company',
      passwordConfirm: '',
      company: {
        name: '',
        phone: '',
        email: '',
        addressLabel: '',
        street: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        country: '',
      },
      admin: {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
      },
    }
  },
  computed: {
    passwordEquals(): boolean {
      return this.admin.password === this.passwordConfirm
    },
    canContinue(): boolean {
      return (
        this.company.name.trim().length > 0 &&
        this.company.phone.trim().length > 0 &&
        this.company.email.trim().length > 0 &&
        this.company.street.trim().length > 0 &&
        this.company.streetNumber.trim().length > 0 &&
        this.company.postalCode.trim().length > 0 &&
        this.company.city.trim().length > 0 &&
        this.company.country.trim().length > 0
      )
    },
    canRegister(): boolean {
      return (
        this.admin.firstname.trim().length > 0 &&
        this.admin.lastname.trim().length > 0 &&
        this.admin.email.trim().length > 0 &&
        this.admin.password.trim().length > 0 &&
        this.passwordEquals &&
        this.canContinue
      )
    },
  },
  watch: {
    'company.street'() {
      this.company.addressLabel = `${this.company.street} ${this.company.streetNumber}`
    },
    'company.streetNumber'() {
      this.company.addressLabel = `${this.company.street} ${this.company.streetNumber}`
    },
  },
  methods: {
    async register() {
      await $fetch('http://localhost:3100/api/v1/companies/create', {
        method: 'POST',
        body: {
          company: this.company,
          admin: this.admin,
        },
      })
    },
  },
}
</script>
