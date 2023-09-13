import { defineStore } from "pinia";
import utils from "../common/utils";

export const useDrawStore = defineStore({
  id: "draw",
  state: () => ({
    // 当前生成图片详情信息
    pictureId: null,
  }),
  actions: {}
});
