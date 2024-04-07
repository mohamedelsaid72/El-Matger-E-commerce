<template>
  <div class="login bg-[#f5f5f5] flex items-center justify-center">
    <div
      class="max-w-[500px] max-h-[500px] w-[500px] h-[500px] bg-[#fff] p-10 rounded-md mx-5"
    >
      <div class="text-2xl font-bold mb-5 text-center text-[#de3618]">
        {{ $t("signInToElmatger") }}
      </div>
      <div class="form flex flex-col gap-5 mt-10">
        <form @submit.prevent="login" class="flex flex-col gap-5">
          <label for="email">
            {{ $t("emailOrUsername") }}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            class="w-full h-[40px] rounded-md border border-[#eeeeee] px-4"
            :placeholder="$t('emailOrUsername')"
            required
            v-model="username"
          />

          <label for="password">
            {{ $t("password") }}
          </label>
          <input
            type="password"
            name="password"
            id="password"
            class="w-full h-[40px] rounded-md border border-[#eeeeee] px-4"
            :placeholder="$t('password')"
            required
            v-model="password"
          />

          <button
            type="submit"
            class="w-full h-[40px] bg-[#de3618] text-[#fff] rounded-md flex items-center justify-center font-bold"
          >
            <span class="loader" v-if="loading"></span>
            <span v-else> {{ $t("signIn") }}</span>
          </button>
        </form>

        <transition name="fade">
          <div v-if="showError" class="error">
            {{ $t(`${error}`) }}
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
const { t } = useI18n();

useHead({ title: t("signInToElmatger") });

const { locale } = useI18n();

const username = ref("");
const password = ref("");
const error = ref(null);
const showError = ref(false);

const loading = ref(false);

const login = async () => {
  loading.value = true;
  try {
    const response = await axios.post("/api/login", {
      provider: "customer",
      username: username.value,
      password: password.value,
    });
    if (response.data.status === 200) {
      localStorage.setItem("userLoggedIn", true);
      username.value = "";
      password.value = "";
      navigateTo(`/${locale.value}`);
    } else if (response.data.status === 203) {
      showError.value = true;
      error.value = "loginError";
      setTimeout(() => {
        showError.value = false;
      }, 3000);
    }

    loading.value = false;
  } catch (err) {
    showError.value = true;
    error.value = "errorWhileLogin";
    loading.value = false;

    setTimeout(() => {
      showError.value = false;
    }, 4000);
  }
};
</script>
