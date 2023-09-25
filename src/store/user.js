import { defineStore } from "pinia";
import utils from '../common/utils'

console.log('user store.js')
const userInfo = utils.getUserInfo() || null
const token = utils.getToken() || ''
let residueQAQuantity
if (utils.getStorageSync('residueQAQuantity')) {
  residueQAQuantity = Number(utils.getStorageSync('residueQAQuantity'))
} else {
  residueQAQuantity = userInfo ? userInfo.residueQAQuantity : 0
}
export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo,
    token,
    residuePictureQuantity: 0,  //绘画剩余次数
    residueQAQuantity,  //对话剩余次数
  }),
  actions: {
    // 清空数据
    clearLog() {
      this.userInfo = ''
      this.token = ''
      utils.setToken('')
      utils.setUserInfo('')
    },
    // 跳转登录页 记录当前路由
    goLoginPage() {
      utils.goLogin()
    },
    // 登陆成功 返回上一级
    loginBackPage(data) {
      this.userInfo = data
      this.token = data.token
      utils.loginAfter(data)
    },
    // 修改userInfo
    saveUserInfo(data) {
      this.userInfo = data
      utils.setUserInfo(data)
    },

    // 修改绘画剩余次数
    saveResiduePictureQuantity(count) {
      this.residuePictureQuantity = count
    },

    // 修改对话剩余次数
    saveResidueQAQuantity(count) {
      this.residueQAQuantity = count
      utils.setStorageSync('residueQAQuantity', this.residueQAQuantity)
    }
  },
});


window.piniaStore = {
  ...window.piniaStore,
  useUserStore
}
