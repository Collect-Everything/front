<template>
  <div class="flex justify-center w-full">
    <div class="flex flex-col items-center sm:w-full md:lg:w-1/3 space-y-6">
      <span class="text-xl font-bold">
        {{ $t('shop.config.products') }}
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
            v-for="conditioning in ['unit', 'pack', 'box']"
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

      <div class="flex flex-col space-y-1 text-gray-500 w-full">
        <label for="productImage">{{ $t('shop.config.productImage') }}</label>
        <input
          id="productImage"
          type="file"
          accept="image/*"
          @input="update('productImage', $event)"
        />
      </div>

      <button class="btn-secondary w-full" @click="$emit('create')">
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
            :key="product.id"
            class="flex flex-col space-y-2"
          >
            <div class="flex justify-between items-center">
              <input :value="product.name" disabled class="input" />

              <button class="btn-secondary" @click="showEdit(product)">
                {{ $t('general.edit') }}
              </button>
              <button
                class="btn-danger"
                @click="
                  $emit('deleteProduct', {
                    id: product.id,
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

    <Modal v-if="showModalEdit" :class="'w-1/3'" @close="showModalEdit = false">
      <template #body>
        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <span class="text-black font-semibold">
            {{ $t('shop.config.editProduct') }}
          </span>
          <label for="productName">{{ $t('shop.config.productName') }}</label>
          <input
            id="productName"
            v-model="selectedProduct.name"
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
            v-model="selectedProduct.category"
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
            v-model="selectedProduct.price"
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
            v-model="selectedProduct.description"
            type="text"
            class="input"
            @input="update('productDescription', $event)"
          />
        </div>

        <div class="flex flex-col space-y-1 text-gray-500 w-full">
          <label for="productStock">{{ $t('shop.config.productStock') }}</label>
          <input
            id="productStock"
            v-model="selectedProduct.stock"
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
            v-model="selectedProduct.conditioning"
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
            v-model="selectedProduct.unity"
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
      </template>

      <template #footer="{ slotScope }">
        <div class="flex justify-center mt-5 items-center space-x-5">
          <button class="btn-danger w-20" @click="slotScope()">
            {{ $t('general.cancel') }}
          </button>
          <button
            class="btn-secondary"
            @click="$emit('saveProduct', selectedProduct)"
          >
            {{ $t('general.save') }}
          </button>
        </div>
      </template>
    </Modal>
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
    productImage: {
      type: Object,
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
    'update:productImage',
    'create',
    'saveProduct',
    'deleteProduct',
  ],
  data() {
    return {
      showModalEdit: false,
      selectedProduct: {
        name: '',
        category: '',
        price: 0,
        description: '',
        stock: 0,
        conditioning: 'unit',
        unity: 'kg',
      },
    }
  },
  watch: {
    categories() {
      if (this.categories.length > 0)
        this.$emit('update:productCategory', this.categories[0]._props.id)
    },
  },
  mounted() {
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
        | 'productUnity'
        | 'productImage',
      event: Event
    ) {
      if (field === 'productImage')
        this.$emit(
          `update:${field}`,
          (event.target as HTMLInputElement).files[0]
        )
      else
        this.$emit(`update:${field}`, (event.target as HTMLInputElement).value)
    },
    showEdit(product: any) {
      this.selectedProduct = { ...product }
      this.showModalEdit = true
    },
  },
}
</script>
