import { defineStore } from "pinia";
import utils from "../common/utils";
const historyItem = utils.getStorageSync('drawHistoryItem', true)
export const useDrawStore = defineStore({
  id: "draw",
  state: () => ({
    // 绘画历史选中的图片信息
    historyItem: historyItem || {
      isFail: false,
      pictureId: null,
      pictureUrl: '',
      scrollTop: 0
    },
    // 当前生成图片详情信息
    pictureId: null,
  }),
  actions: {
    /* 暂存绘画历史列表中的一项,记录浏览位置 进入绘画详情后拿到图片数据时更新这个数据
      从绘画详情返回到列表时读取该项数据和浏览位置
      在详情页删除成功时要清空historyItem, 列表页读取historyItem如果不存在, 就需要重新拉列表数据
      重新加载列表页面时要清空historyItem
      
    */
    saveHistoryItem(data) {
      this.historyItem = data
      utils.setStorageSync('drawHistoryItem', data)
    },
    clearHistoryItem() {
      this.historyItem = {
        isFail: false,
        pictureId: null,
        pictureUrl: '',
        scrollTop: 0
      }
      utils.setStorageSync('drawHistoryItem', this.historyItem)
    }
  }
});
