import utils from '../common/utils'
import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    userInfo: utils.getUserInfo() || '',
    token:utils.getToken() || '',
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
    }
  },
});
