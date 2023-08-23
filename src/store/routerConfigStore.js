import { defineStore } from "pinia";

export const useRouterConfigStore = defineStore({
  id: "routerConfig",
  state: () => ({
    titleBar: false,
    titleBarOpacity: 0,
    currentPath: "/",
  }),
  actions: {
    saveConfig({ titleBar, currentPath }) {
      this.titleBar = titleBar;
      this.currentPath = currentPath;
      this.titleBarOpacity = 0;
    },
  },
});
