<template>
  <Login
    v-if="page === 'login'"
    v-model:email="email"
    v-model:password="password"
    @change-page="page = $event"
  />
  <Register
    v-else-if="page === 'register'"
    v-model:companyName="companyName"
    v-model:email="email"
    v-model:phone="phone"
    v-model:address="address"
    v-model:zipcode="zipcode"
    v-model:city="city"
    v-model:password="password"
    v-model:passwordConfirm="passwordConfirm"
    @change-page="page = $event"
  />
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
      page: 'login',
    }
  },
}
</script>
