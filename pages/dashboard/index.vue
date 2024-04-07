<template>
  <div class="dashboard container mx-auto my-10">
    <div
      class="dashboard-title-container flex items-center justify-between px-4 md:px-10"
    >
      <div class="dashboard-title text-lg md:text-2xl font-bold">
        {{ $t("dashboard") }}
      </div>
      <div class="dashboard-template-switcher flex items-center gap-1 md:gap-5">
        <div class="tepmlate-one">
          <button
            type="button"
            class="template-one-title p-2 md:p-3 rounded-md md:text-lg text-[12px]"
            :class="{
              'bg-[#1da599] text-white': activeTemplate === 'templateOne',
            }"
            @click="toggleActiveTemplate('templateOne')"
          >
            {{ $t("templateOne") }}
          </button>
        </div>
        <div class="tepmlate-two">
          <button
            type="button"
            class="template-two-title p-2 md:p-3 rounded-md md:text-lg text-sm"
            :class="{
              'bg-[#1da599] text-white': activeTemplate === 'templateTwo',
            }"
            @click="toggleActiveTemplate('templateTwo')"
          >
            {{ $t("templateTwo") }}
          </button>
        </div>
      </div>
    </div>

    <div
      class="dashboard-body flex items-center flex-wrap gap-6 justify-center mt-10 p-5"
    >
      <ProductRowSkeleton v-if="loading" v-for="i in 10" :key="i" />
      <ProductRow v-else :product="product" v-for="product in products" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import ProductRowSkeleton from "@/components/ui/productRowSkeleton.vue";
const { t } = useI18n();

useHead({
  title: t("dashboard"),
  meta: [{ name: "description", content: t("dashboard") }],
});

definePageMeta({
  middleware: "auth",
  requiresAuth: true,
});

const loading = ref(false);

const store = useTemplateStore();
const activeTemplate = computed(() => store.activeTemplate);

const toggleActiveTemplate = (template) => {
  store.setActiveTemplate(template);
};

const products = ref([]);

onMounted(async () => {
  loading.value = true;
  if (localStorage.getItem("dashboard products")) {
    loading.value = false;
    products.value = JSON.parse(localStorage.getItem("dashboard products"));
  } else {
    try {
      const response = await axios.get("/api/dashboard/products", {
        params: {
          page: 12,
        },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("admin")).access_token
          }`,
        },
      });

      products.value = response.data.data;
      localStorage.setItem(
        "dashboard products",
        JSON.stringify(products.value)
      );
      loading.value = false;
    } catch (error) {
      console.log(error);
      loading.value = false;
    }
  }
});
</script>
