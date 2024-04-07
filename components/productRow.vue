<template>
  <div
    class="product-row flex items-center gap-1 shadow-md px-3 py-2 md:p-4 rounded-md gap-5 md:max-w-[45%] w-[90%]"
  >
    <div
      class="product-image w-[100px] h-[100px] md:w-[120px] flex items-center"
    >
      <img
        v-if="dashboard"
        :src="
          'https://freestore.ezeestock.com/api/media/120x120/' +
          product.brand.image
        "
        @error="handleProductImageError"
        alt="Product Image"
      />
      <img
        v-else
        :src="
          'https://freestore.ezeestock.com/api/media/120x120/' +
          product.category.image
        "
        @error="handleProductImageError"
        alt="Product Image"
      />
    </div>
    <div class="product-info my-5 w-full">
      <p class="product-brand text-[#1da599]">
        {{ dashboard ? product.brand.name : product.name }}
      </p>
      <p class="product-description text-lg md:text-xl my-1 min-h-[50px]">
        {{ product.description }}
      </p>
      <div
        class="flex items-center justify-between w-full py-1 flex-wrap gap-1"
      >
        <p class="product-price text-[#de3618]">{{ product.price }} L.E</p>
        <button
          @click="toggleProductInCart(product)"
          class="add-to-cart pa-3 md:w-[183px] h-[38px] rounded-md p-2"
        >
          {{
            cartStore.isInCart(product)
              ? `${$t("removeFromCart")}`
              : `${$t("addToCart")}`
          }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
  },
  dashboard: {
    type: Boolean,
    default: true,
  },
});
const cartStore = useCartStore();
const userLoggedIn = ref(false);

onMounted(() => {
  if (localStorage.getItem("userLoggedIn")) {
    userLoggedIn.value = true;
  } else {
    userLoggedIn.value = false;
  }
});

const handleProductImageError = (event) => {
  event.target.src = "https://via.placeholder.com/174x174.png?text=No+Image";
};

const toggleProductInCart = (product) => {
  if (userLoggedIn.value) {
    cartStore.toggleProductInCart(product);
  } else {
    navigateTo(`/${locale.value}/login`);
  }
};
</script>
