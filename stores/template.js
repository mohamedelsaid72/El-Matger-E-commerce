export const useTemplateStore = defineStore("templateStore", {
  state: () => ({
    activeTemplate: localStorage.getItem("activeTemplate") || "templateOne",
  }),
  actions: {
    setActiveTemplate(template) {
      this.activeTemplate = template;
      localStorage.setItem("activeTemplate", template);
    },
  },
});
