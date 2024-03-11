<template>
  <div class="flex flex-col items-center space-y-6">
    <div class="w-4/5 flex flex-col space-y-4">
      <span class="text-2xl text-gray-700 text-center">
        {{ $t('prices.title') }}
      </span>
      <span class="text-6xl text-center font-semibold title">
        {{ $t('prices.subtitle') }}
      </span>
      <span class="text-xl text-center">
        {{ $t('prices.description') }}
      </span>
    </div>

    <div class="flex items-center space-x-2 justify-center">
      <label class="switch">
        <input id="switch" v-model="isMonthly" type="checkbox" />
        <span class="slider round" />
      </label>
      <label for="switch" class="text-sm select-none">
        {{ $t('prices.monthlyPrices') }}
      </label>
    </div>

    <div class="flex space-x-4 justify-center w-full">
      <PriceCard
        v-for="subscription in subscriptions"
        :key="subscription.title"
        :title="subscription.title"
        :subtitle="subscription.subtitle"
        :price="isMonthly ? subscription.price : subscription.price * 12"
        :advantages="subscription.advantages"
        :btn-text="subscription.btnText"
        :btn-action="subscription.btnAction"
        :is-monthly="isMonthly"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isMonthly: true,
      subscriptions: [
        {
          title: 'Formule classique',
          subtitle:
            'Créez une boutique, ajoutez vos produits et encaissez les paiements de vos clients',
          price: 30,
          advantages: ['1 utilisateur', '1 projet'],
          btnText: 'Essayer gratuitement',
          btnAction: () => this.$router.push('/register'),
        },
      ],
    }
  },
}
</script>
