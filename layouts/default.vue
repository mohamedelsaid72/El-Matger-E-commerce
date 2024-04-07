<template>
  <div>
    <Navbar />
    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
const { locale } = useI18n();

const dir = ref("ltr");

onMounted(() => {
  dir.value = locale.value === "ar" ? "rtl" : "ltr";
  document.documentElement.setAttribute("dir", dir.value);
});

watch(locale, (newLocale) => {
  document.documentElement.setAttribute(
    "dir",
    newLocale === "ar" ? "rtl" : "ltr"
  );
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
