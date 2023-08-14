import { defineStore } from "pinia";
import utils from '../common/utils'

console.log('user store.js')

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: utils.getUserInfo() || null,
    token: utils.getToken() || '',
    residuePictureQuantity: 0  //绘画剩余次数
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
    saveUserInfo(data){
      this.userInfo = data
      utils.setUserInfo(data)
    },

    // 修改绘画剩余次数
    saveResiduePictureQuantity(count) {
      this.residuePictureQuantity = count
    }
  },
});
