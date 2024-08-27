<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/3 space-y-6">
      <span class="text-xl font-bold">
        {{ $t('shop.config.title') }}
      </span>

      <span class="text-gray-500">
        {{ $t('shop.config.productsInfos') }}
      </span>

      <div class="border-b w-full border-gray-300" />

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <span class="text-black font-semibold">
          {{ $t('shop.config.addProduct') }}
        </span>
        <label for="productName">{{ $t('shop.config.productName') }}</label>
        <input
          id="productName"
          type="text"
          class="input"
          @input="update('productName', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productCategory">
          {{ $t('shop.config.productCategory') }}
        </label>
        <select
          id="productCategory"
          class="input"
          @change="update('productCategory', $event)"
        >
          <option
            v-for="category in categories.map((category) => category._props)"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productPrice">{{ $t('shop.config.productPrice') }}</label>
        <input
          id="productPrice"
          type="number"
          class="input"
          min="0"
          @input="update('productPrice', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productDescription">
          {{ $t('shop.config.productDescription') }}
        </label>
        <input
          id="productDescription"
          type="text"
          class="input"
          @input="update('productDescription', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productStock">{{ $t('shop.config.productStock') }}</label>
        <input
          id="productStock"
          type="number"
          class="input"
          min="0"
          @input="update('productStock', $event)"
        />
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productConditioning">
          {{ $t('shop.config.productConditioning') }}
        </label>
        <select
          id="productConditioning"
          class="input"
          @change="update('productConditioning', $event)"
        >
          <option
            v-for="conditioning in ['unit']"
            :key="conditioning"
            :value="conditioning"
          >
            {{ conditioning }}
          </option>
        </select>
      </div>

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productUnity">{{ $t('shop.config.productUnity') }}</label>
        <select
          id="productUnity"
          class="input"
          @change="update('productUnity', $event)"
        >
          <option
            v-for="unity in ['kg', 'g', 'L', 'ml', 'unit']"
            :key="unity"
            :value="unity"
          >
            {{ unity }}
          </option>
        </select>
      </div>

      <button
        class="btn-secondary w-full"
        @click="
          $emit('create', {
            name: productName,
            category: productCategory,
            price: productPrice,
            description: productDescription,
            stock: productStock,
            conditioning: productConditioning,
            unity: productUnity,
          })
        "
      >
        {{ $t('general.save') }}
      </button>

      <div class="border-b w-full border-gray-300" />

      <div class="flex flex-col space-y-1 w-full">
        <span class="text-black font-semibold">
          {{ $t('shop.config.products') }}
        </span>

        <div class="flex flex-col space-y-2">
          <div
            v-for="(product, index) in products"
            :key="product._props.id"
            class="flex flex-col space-y-2"
          >
            <div class="flex justify-between items-center">
              <input
                :value="product._props.name"
                :disabled="!product._props.edit"
                class="input"
              />

              <button
                v-if="!product._props.edit"
                class="btn-secondary"
                @click="product._props.edit = !product._props.edit"
              >
                {{ $t('general.edit') }}
              </button>
              <button
                v-else
                class="btn-secondary"
                @click="
                  $emit('saveProduct', {
                    id: product._props.id,
                    name: product._props.name,
                  })
                "
              >
                {{ $t('general.save') }}
              </button>
              <button
                class="btn-danger"
                @click="
                  $emit('deleteProduct', {
                    id: product._props.id,
                  })
                "
              >
                {{ $t('general.delete') }}
              </button>
            </div>

            <div
              v-if="index !== products.length - 1"
              class="border-b w-full border-gray-300"
            />
          </div>

          <div v-if="products.length === 0">
            <span>{{ $t('shop.config.noProducts') }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ShopConfigProducts',
  props: {
    productName: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      required: true,
    },
    productPrice: {
      type: Number,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    productStock: {
      type: Number,
      required: true,
    },
    productConditioning: {
      type: String,
      required: true,
    },
    productUnity: {
      type: String,
      required: true,
    },
    products: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },
  emits: [
    'update:productName',
    'update:productCategory',
    'update:productPrice',
    'update:productDescription',
    'update:productStock',
    'update:productConditioning',
    'update:productUnity',
    'create',
    'saveProduct',
    'deleteProduct',
  ],
  mounted() {
    this.$emit('update:productCategory', this.categories[0]._props.id)
    this.$emit('update:productConditioning', 'unit')
    this.$emit('update:productUnity', 'unit')
  },
  methods: {
    update(
      field:
        | 'productName'
        | 'productCategory'
        | 'productPrice'
        | 'productDescription'
        | 'productStock'
        | 'productConditioning'
        | 'productUnity',
      event: Event
    ) {
      this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
  },
}
</script>
