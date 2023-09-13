import { defineStore } from "pinia";
import utils from "../common/utils";

export const useDrawStore = defineStore({
  id: "draw",
  state: () => ({
    // 图片详情信息
    active: {
      pictureId: null,
      createdAt: "",
      pictureUrl: "",
      isFail: false
    }
  }),
  actions: {}
});
