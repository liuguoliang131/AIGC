import { defineStore } from "pinia";
import utils from '../common/utils'


export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    activeTagId: 453, // 被选中的对话历史id
  }),
  actions: {
    saveActiveTagId(id) {
      this.activeHistory = id
    }
  },
});
