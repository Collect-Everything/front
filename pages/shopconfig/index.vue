<template>
  <div class="flex flex-col space-y-6">
    <div class="flex justify-center space-x-4">
      <button
        :class="{
          'btn-secondary': page === 'globalInfos',
          'btn-skeleton-secondary': page !== 'globalInfos',
        }"
        @click="page = 'globalInfos'"
      >
        {{ $t('shop.config.globalInfos') }}
      </button>
      <button
        :class="{
          'btn-secondary': page === 'texts',
          'btn-skeleton-secondary': page !== 'texts',
        }"
        @click="page = 'texts'"
      >
        {{ $t('shop.config.texts.title') }}
      </button>
      <button
        :class="{
          'btn-secondary': page === 'categories',
          'btn-skeleton-secondary': page !== 'categories',
        }"
        @click="page = 'categories'"
      >
        {{ $t('shop.config.categories') }}
      </button>
      <button
        :class="{
          'btn-secondary': page === 'products',
          'btn-skeleton-secondary': page !== 'products',
        }"
        @click="page = 'products'"
      >
        {{ $t('shop.config.products') }}
      </button>
    </div>

    <div class="border-b w-full border-gray-300" />

    <ShopConfigGlobalInfos
      v-if="page === 'globalInfos'"
      v-model:shopName="shopName"
      v-model:logo="logo"
      v-model:color="color"
      @save="saveGlobalInfos()"
    />
    <ShopConfigTexts
      v-else-if="page === 'texts'"
      v-model:title="title"
      v-model:description="description"
      v-model:buttonText="buttonText"
      v-model:advantages="advantages"
      v-model:backgroundImage="backgroundImage"
      @add-advantage="
        advantages.push({
          icon: '',
          title: '',
          description: '',
          index: advantages.length,
        })
      "
      @save="saveTexts()"
    />
    <ShopConfigCategories
      v-else-if="page === 'categories'"
      v-model:categoryName="categoryName"
      :categories="categories"
      @create="createCategory()"
      @save-category="saveCategory($event)"
      @delete-category="deleteCategory($event)"
    />
    <ShopConfigProducts
      v-else-if="page === 'products'"
      v-model:productName="productName"
      v-model:productCategory="productCategory"
      v-model:productPrice="productPrice"
      v-model:productDescription="productDescription"
      v-model:productStock="productStock"
      v-model:productConditioning="productConditioning"
      v-model:productUnity="productUnity"
      v-model:productImage="productImage"
      :products="products"
      :categories="categories"
      @create="createProduct()"
      @save-product="saveProduct($event)"
      @delete-product="deleteProduct($event)"
    />
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '~/store'
import * as Sentry from '@sentry/nuxt'

const config = useRuntimeConfig()
const { getUser } = useMainStore()
const router = useRouter()

const route = useRoute()

if (!route.query.tab) router.push({ query: { tab: 'globalInfos' } })
else router.push({ query: { tab: route.query.tab } })

const page = ref(route.query.tab as string)

// Infos générales
const shopName = ref('')
const logo = ref({} as File)
const color = ref('#000000')
// Textes
const title = ref('')
const description = ref('')
const buttonText = ref('')
const advantages = ref(
  [] as Array<{
    icon: string
    title: string
    description: string
    index: number
  }>
)
const backgroundImage = ref({} as File)
// Catégories
const categories = ref([] as Array<{ id: string; name: string }>)
const categoryName = ref('')
// Produits
const products = ref([] as Array<{ id: string; name: string }>)
const productCategory = ref('')
const productName = ref('')
const productPrice = ref(0)
const productDescription = ref('')
const productStock = ref(0)
const productConditioning = ref('')
const productUnity = ref('')
const productImage = ref({} as File)

onMounted(() => {
  fetchCompanyInfos()
  fetchCategories()
  fetchProducts()
})

watch(
  page,
  () => {
    if (!page.value) page.value = 'globalInfos'

    router.push({ query: { tab: page.value } })
  },
  { immediate: true }
)

async function fetchCompanyInfos() {
  try {
    const { data } = await $fetch(
      `${config.public.API_GATEWAY_URL}/companies/${getUser?.payload.companyId}`
    )

    const storeConfiguration = data.result.value.storeConfiguration

    shopName.value = storeConfiguration.storeName
    color.value = storeConfiguration.color
    title.value = storeConfiguration.title
    description.value = storeConfiguration.description
    buttonText.value = storeConfiguration.button
    advantages.value = storeConfiguration.advantages.map(
      (advantage: any) => advantage.props
    )
    backgroundImage.value = storeConfiguration.image
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function saveGlobalInfos() {
  try {
    const formData = new FormData()

    formData.append('logo', logo.value)
    formData.append(
      'body',
      JSON.stringify({ storeName: shopName.value, color: color.value })
    )

    await $fetch(
      `${config.public.API_GATEWAY_URL}/companies/${getUser?.payload.companyId}/configure-store`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
        body: formData,
      }
    )
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function saveTexts() {
  try {
    const formData = new FormData()

    formData.append('image', backgroundImage.value)
    formData.append(
      'body',
      JSON.stringify({
        title: title.value,
        description: description.value,
        button: buttonText.value,
        advantages: advantages.value,
      })
    )

    await $fetch(
      `${config.public.API_GATEWAY_URL}/companies/${getUser?.payload.companyId}/configure-store`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
        body: formData,
      }
    )
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function fetchCategories() {
  try {
    const { data } = await $fetch(
      `${config.public.API_GATEWAY_URL}/products/categories`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
      }
    )

    categories.value = data.value
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function createCategory() {
  try {
    await $fetch(`${config.public.API_GATEWAY_URL}/products/categories`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
      },
      body: {
        name: categoryName.value,
        companyId: getUser?.payload.companyId,
      },
    })

    categoryName.value = ''

    fetchCategories()
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function saveCategory(category: Object) {
  try {
    await $fetch(
      `${config.public.API_GATEWAY_URL}/products/categories/${category.id}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
        body: {
          name: category.name,
        },
      }
    )

    fetchCategories()
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function deleteCategory(category: Object) {
  try {
    await $fetch(
      `${config.public.API_GATEWAY_URL}/products/categories/${category.id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
      }
    )

    fetchCategories()
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function fetchProducts() {
  try {
    const { data } = await $fetch(
      `${config.public.API_GATEWAY_URL}/products?companyId=${getUser?.payload.companyId}&page=1&limit=200`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${getUser?.accessToken}`,
        },
      }
    )

    products.value = data.data
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function createProduct() {
  try {
    const formData = new FormData()

    formData.append('image', productImage.value)
    formData.append(
      'body',
      JSON.stringify({
        name: productName.value,
        categoryId: productCategory.value,
        price: Number(productPrice.value),
        description: productDescription.value,
        stock: Number(productStock.value),
        conditioning: productConditioning.value,
        unity: productUnity.value,
      })
    )

    await $fetch(`${config.public.API_GATEWAY_URL}/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
        ContentType: 'multipart/form-data',
      },
      body: formData,
    })

    productCategory.value = ''
    productName.value = ''
    productPrice.value = 0
    productDescription.value = ''
    productStock.value = 0
    productConditioning.value = ''
    productUnity.value = ''
    productImage.value = {} as File

    fetchProducts()
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function saveProduct(product: Object) {
  try {
    await $fetch(`${config.public.API_GATEWAY_URL}/products/${product.id}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
      },
      body: {
        product,
      },
    })

    fetchProducts()
  } catch (error) {
    Sentry.captureException(error)
  }
}

async function deleteProduct(product: Object) {
  try {
    await $fetch(`${config.public.API_GATEWAY_URL}/products/${product.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${getUser?.accessToken}`,
      },
    })

    fetchProducts()
  } catch (error) {
    Sentry.captureException(error)
  }
}
</script>
