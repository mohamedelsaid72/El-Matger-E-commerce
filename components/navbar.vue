<template>
  <nav class="h-[48px] flex items-center px-4 md:px-10">
    <div
      class="navbar-container mx-auto flex items-center gap-10 h-full justify-between"
    >
      <div class="flex items-center h-full gap-6 lg:flex-1">
        <div class="navbar-brand text-lg md:text-4xl">
          <nuxt-link :to="localePath('/')">{{ $t("Elmatger") }}</nuxt-link>
        </div>
        <div class="languages-container h-full flex items-center">
          <ul class="flex items-center">
            <li class="cursor-pointer">
              <img loading="lazy" src="/en.png" alt="en language" />
              <button @click="setLocale('en')" type="button">English</button>
            </li>
            <li class="cursor-pointer">
              <img loading="lazy" src="/ar.png" alt="ar language" />
              <button @click="setLocale('ar')" type="button">العربية</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="call-us lg:flex-1 hidden lg:flex justify-center">
        {{ $t("callUs") }} (000) 000-0000
      </div>
      <div class="flex items-center justify-end lg:flex-1">
        <div class="cart flex gap-4 items-center justify-center">
          <div class="icon-container flex items-center">
            <svg
              width="28"
              height="25"
              viewBox="0 0 28 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27.43 5.48098C27.1852 5.07931 26.8347 4.74458 26.4126 4.50944C25.9905 4.2743 25.5113 4.14678 25.0217 4.13931H6.88836L6.06669 1.10715C5.98367 0.814445 5.79846 0.556987 5.54122 0.376705C5.28397 0.196422 4.96985 0.103937 4.65002 0.114312H1.81669C1.44097 0.114312 1.08063 0.255666 0.814956 0.507277C0.54928 0.758889 0.400024 1.10015 0.400024 1.45598C0.400024 1.81181 0.54928 2.15307 0.814956 2.40468C1.08063 2.65629 1.44097 2.79765 1.81669 2.79765H3.57336L7.48336 16.5631C7.56637 16.8558 7.75159 17.1133 8.00883 17.2936C8.26608 17.4739 8.58019 17.5664 8.90002 17.556H21.65C21.9116 17.5552 22.1679 17.4859 22.3905 17.3556C22.613 17.2254 22.7931 17.0393 22.9109 16.8181L27.5575 8.01673C27.7589 7.61693 27.8527 7.17614 27.8304 6.73367C27.8082 6.29121 27.6706 5.86084 27.43 5.48098ZM20.7717 14.8726H9.97669L7.66752 6.82265H25.0217L20.7717 14.8726Z"
                fill="white"
              />
              <path
                d="M8.19196 24.2644C9.36556 24.2644 10.317 23.3634 10.317 22.2519C10.317 21.1404 9.36556 20.2394 8.19196 20.2394C7.01835 20.2394 6.06696 21.1404 6.06696 22.2519C6.06696 23.3634 7.01835 24.2644 8.19196 24.2644Z"
                fill="white"
              />
              <path
                d="M22.3583 24.2644C23.5319 24.2644 24.4833 23.3634 24.4833 22.2519C24.4833 21.1404 23.5319 20.2394 22.3583 20.2394C21.1847 20.2394 20.2333 21.1404 20.2333 22.2519C20.2333 23.3634 21.1847 24.2644 22.3583 24.2644Z"
                fill="white"
              />
            </svg>
            <div
              :class="{
                'items-number-ltr': $i18n.locale === 'en',
                'items-number-rtl': $i18n.locale === 'ar',
              }"
              class="items-number flex items-center justify-center"
            >
              <div>{{ cartItemsLength }}</div>
            </div>
          </div>

          <div class="hidden md:flex items-center h-full">{{ $t("cart") }}</div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script setup>
const nuxtApp = useNuxtApp();
const localePath = useLocalePath();

const cartStore = useCartStore();
const cartItemsLength = computed(() => {
  return cartStore.cartItems.length;
});

const setLocale = (locale) => {
  nuxtApp.$i18n.setLocale(locale);
  localStorage.setItem("locale", locale);
};
</script>
