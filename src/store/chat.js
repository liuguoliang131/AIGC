import { defineStore } from "pinia";
import utils from '../common/utils'
const activeTagId = utils.getStorageSync('activeTagId')

export const useChatStore = defineStore({
  id: "chat",
  state: () => ({
    activeTagId: Number(activeTagId || 0), // 被选中的对话历史id
  }),
  actions: {
    saveActiveTagId(id) {
      this.activeTagId = id
      utils.setStorageSync('activeTagId', id)
    }
  },
});
