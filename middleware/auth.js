export default defineNuxtRouteMiddleware((to) => {
  const requiresAuth = to.meta.requiresAuth;
  const locale = localStorage.getItem("locale") || "en";
  const token = JSON.parse(localStorage.getItem("admin"))?.access_token;

  if (requiresAuth && !token) {
    return navigateTo(`/${locale}/dashboard/login`);
  }
});
