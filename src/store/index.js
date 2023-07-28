import { defineStore } from "pinia";

export const useSettingStore = defineStore({
  id: "setting",
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    setCollapse(val: boolean) {
      this.isCollapse = val;
    },
  },
});
