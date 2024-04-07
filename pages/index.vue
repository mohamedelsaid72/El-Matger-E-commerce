<template>
  <div>
    <ProductsList
      :products="products"
      :activeTemplate="activeTemplate"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import axios from "axios";

const { t } = useI18n();

useSeoMeta({
  description: "Nuxt 3 Ecommerce",
  ogTitle: "Elmatger",
  ogDescription: "Nuxt 3 Ecommerce",
});

useHead({
  title: t("Elmatger"),
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/ecommerceIcon.png",
    },
  ],
});

const templateStroe = useTemplateStore();
const products = ref([]);
const loading = ref(false);

const activeTemplate = computed(() => {
  return templateStroe.activeTemplate;
});

onMounted(async () => {
  if (localStorage.getItem("products")) {
    products.value = JSON.parse(localStorage.getItem("products"));
  } else {
    loading.value = true;
    try {
      const response = await axios.get("/api/store/products", {
        params: {
          page: 1,
        },
      });
      products.value = response.data.data;
      loading.value = false;
      await localStorage.setItem("products", JSON.stringify(products.value));
    } catch (error) {
      console.error(error);
      loading.value = false;
    }
  }
});
</script>
