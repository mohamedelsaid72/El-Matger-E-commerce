<template>
  <div class="featured-products">
    <div class="title flex items-center justify-between py-5">
      <div class="flex items-center gap-5">
        <div class="text-xl font-bold">{{ $t("featuredProducts") }}</div>
        <p class="text-[#1da599]">
          {{ $t("allOffers") }}
        </p>
      </div>
      <div class="pagination-arrows flex items-center gap-5">
        <button
          type="button"
          @click="prevPage"
          :disabled="currentPage === 1"
          class="arrow w-[40px] h-[40px] rounded-full border border-[#eeeeee] flex items-center justify-center cursor-pointer"
        >
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.847656 4.28516C0.601562 4.55859 0.601562 4.96875 0.847656 5.21484L4.56641 8.93359C4.83984 9.20703 5.25 9.20703 5.49609 8.93359L6.125 8.33203C6.37109 8.05859 6.37109 7.64844 6.125 7.40234L3.47266 4.75L6.125 2.125C6.37109 1.87891 6.37109 1.44141 6.125 1.19531L5.49609 0.566406C5.25 0.320312 4.83984 0.320312 4.56641 0.566406L0.847656 4.28516Z"
              fill="#1B1D21"
            />
          </svg>
        </button>
        <button
          type="button"
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="arrow w-[40px] h-[40px] rounded-full border border-[#eeeeee] flex items-center justify-center cursor-pointer"
        >
          <svg
            width="7"
            height="10"
            viewBox="0 0 7 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.125 5.21484C6.37109 4.96875 6.37109 4.55859 6.125 4.28516L2.40625 0.566406C2.13281 0.320312 1.72266 0.320312 1.47656 0.566406L0.847656 1.19531C0.601562 1.46875 0.601562 1.87891 0.847656 2.125L3.5 4.77734L0.847656 7.40234C0.601562 7.64844 0.601562 8.05859 0.847656 8.33203L1.47656 8.93359C1.72266 9.20703 2.13281 9.20703 2.40625 8.93359L6.125 5.21484Z"
              fill="#1B1D21"
            />
          </svg>
        </button>
      </div>
    </div>

    <div
      class="products-container flex items-center justify-center flex-wrap gap-6"
    >
      <transition-group name="fade">
        <ProductCard
          v-for="product in currentProducts"
          :key="product"
          :product="product"
          :recommended="false"
        />
      </transition-group>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  products: {
    type: Array,
  },
});

const currentPage = ref(1);
const itemsPerPage = ref(4);
const totalPages = computed(() =>
  Math.ceil(props.products.length / itemsPerPage.value)
);

const currentProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.products.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
</script>

<style scoped>
.arrow[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
