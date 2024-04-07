<template>
  <div class="container mx-auto mt-[10%]">
    <div v-if="activeTemplate === 'templateOne'" class="templateOne">
      <div class="home-title text-center mb-10 px-5">
        <p class="text-xl md:text-3xl mb-2">
          {{ $t("productRecommendation") }}
        </p>
        <p>{{ $t("youCanChooseWhatOurRecommendationProduct") }}</p>
      </div>
      <div
        class="products-container flex items-center flex-wrap gap-6 max-w-[1170px] mx-auto justify-center"
      >
        <div v-if="loading" v-for="i in 9" :key="i">
          <ProductCardSkeleton />
        </div>
        <ProductCard
          v-else
          v-for="product in products"
          :key="product"
          :product="product"
          :aria-label="`Product: ${product.name}`"
        />
      </div>
      <div class="max-w-[1170px] mx-auto mt-[10%]">
        <FeaturedProducts :products="products" />
      </div>
    </div>
    <div v-if="activeTemplate === 'templateTwo'" class="templateTwo">
      <div class="home-title text-center mb-10 px-5">
        <p class="text-xl md:text-3xl mb-2">
          {{ $t("productRecommendation") }}
        </p>
        <p>{{ $t("youCanChooseWhatOurRecommendationProduct") }}</p>
      </div>
      <div
        class="products-container flex items-center flex-wrap gap-6 max-w-[1170px] mx-auto justify-center"
      >
        <div v-if="loading" v-for="i in 9" :key="i">
          <ProductRowSkeleton />
        </div>
        <ProductRow
          v-else
          v-for="product in products"
          :key="product"
          :product="product"
          :dashboard="false"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCardSkeleton from "@/components/ui/productCardSkeleton.vue";
import ProductRowSkeleton from "@/components/ui/productRowSkeleton.vue";

const props = defineProps({
  products: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  activeTemplate: {
    type: String,
    default: "templateOne",
  },
});
</script>
