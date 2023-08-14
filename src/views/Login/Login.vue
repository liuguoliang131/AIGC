<template>
  <div class="container" v-loading="loading">
    <div class="background"></div>
    <div class="logo-view">
      <img src="@/assets/logo.png" class="logo" @click="goHome" />
    </div>
    <div></div>
    <div class="login-box">
      <div class="login-title">一起探索AIGC的无限可能</div>
      <div class="input-box">
        <div class="input-group">
          <input
            type="tel"
            id="phone"
            maxlength="11"
            v-model="phone"
            placeholder="请输入手机号"
            class="input-phone"
            @input="handlePhoneInput"
          />
        </div>
        <div class="input-group">
          <input
            type="tel"
            id="code"
            maxlength="4"
            v-model="code"
            placeholder="请输入验证码"
            class="input-verCode"
            @input="handleCodeInput"
            @keyup.enter="login"
          />
          <button class="code-btn" @click="sendCode" :disabled="timer !== null">
            {{ timer ? countDown : "获取验证码" }}
          </button>
        </div>
      </div>
      <!-- <button class="login-btn" :disabled="!isValid" @click="login">登录</button> -->
      <button class="login-btn" @click="login">登录</button>
      <div class="agreement">
        <!-- <input v-model="agree" type="checkbox" class="checkbox"> -->
        <!-- <label for="agree">我同意相关协议</label> -->
        登录即代表您已同意
        <span class="policy" @click="handGoAgree(1)"
          >《服务协议和隐私政策》</span
        >
        和
        <span class="policy" @click="handGoAgree(2)">《安全协议》</span>
      </div>
    </div>
    <div class="footer">
      <div class="footer-record">
        <a @click="handGoICP">京ICP备19041918号-1京公网安备11010502039881号</a>
      </div>
      <div class="footer-record">
        <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import api, { sendVerifyCode, userLogin } from "./api";
import utils from "@/common/utils";
import { mapStores } from "pinia";
import { useUserStore } from "@/store/user";
export default {
  data() {
    return {
      phone: "",
      code: "",
      countDown: 60,
      timer: null,
      loading: false,
      getCodeLoading: false,
    };
  },
  computed: {
    ...mapStores(useUserStore),
  },

  methods: {
    goHome() {
      this.$router.push({
        path: "/",
      });
    },
    sendCode() {
      if (this.phone.length == 0) {
        return ElMessage({
          message: "请输入手机号",
          type: "warning",
        });
      } else if (!/^[1]{1}[0-9]{10}$/.test(this.phone)) {
        return ElMessage({
          message: "手机号格式错误",
          type: "warning",
        });
      }

      // 发送验证码的逻辑
      if (this.getCodeLoading) return;
      this.getCodeLoading = true;
      sendVerifyCode(this.phone).then((res) => {
        this.getCodeLoading = false;
        if (res.code == 200) {
          this.timer = setInterval(() => {
            if (this.countDown > 1) {
              this.countDown--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
              this.countDown = 60;
            }
          }, 1000);
        } else {
          ElMessage({
            message: res.msg || res.message,
            type: "error",
          });
        }
      });
    },
    login() {
      if (this.phone.length == 0) {
        return ElMessage({
          message: "请输入手机号",
          type: "warning",
        });
      } else if (!/^[1]{1}[0-9]{10}$/.test(this.phone)) {
        return ElMessage({
          message: "手机号格式错误",
          type: "warning",
        });
      }

      if (this.code.length == 0) {
        return ElMessage({
          message: "请输入验证码",
          type: "warning",
        });
      } else if (!/^\d{4}$/.test(this.code)) {
        return ElMessage({
          message: "验证码格式错误",
          type: "warning",
        });
      }

      this.loading = true;
      userLogin(this.phone, this.code).then((res) => {
        if (res.code == 200) {
          this.loading = false;
          this.userStore.loginBackPage(res.data);
        } else {
          this.loading = false;
          ElMessage({
            message: res.msg || res.message,
            type: "error",
          });
        }
      });
    },

    // 去往工信部网站
    handGoICP() {
      window.open(`https://beian.miit.gov.cn/`);
    },

    // 去查看协议
    handGoAgree(type) {
      this.$router.push({
        path: "/agreement",
        query: {
          type,
        },
      });
    },

    handlePhoneInput(event) {
      // 使用正则表达式来限制输入框只能输入数字
      let value = event.target.value.replace(/[^\d]/g, "");
      this.phone = value;
    },
    handleCodeInput(event) {
      let value = event.target.value.replace(/[^\d]/g, "");
      this.code = value;
    },
  },
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/login_bg2.png");
  background-size: cover;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/login_bg2.png");
  background-size: cover;
  opacity: 0.5;
  z-index: -1;
}

.logo-view {
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  height: 70px;
}

.logo {
  width: 239px;
  height: 40px;
  margin-left: 22px;
  cursor: pointer;
}

.logo-name {
  color: #333;
  /* text-align: center; */
  font-family: PingFang SC;
  font-size: 28px;
  font-style: normal;
  font-weight: 600;
}

.login-box {
  background-color: #ffffff;
  border-radius: 18px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  float: right;
  margin-right: 200px;
  padding: 75px 90px;
}

.login-title {
  color: #333;
  text-align: center;
  font-family: PingFang SC;
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  line-height: 47.6px;
}

.input-box {
  /* margin-bottom: 20px; */
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  input {
    width: 100%;
  }
}

/* input[type='tel'],
input[type='text'] {
  flex: 1;
  width: 420px;
  height: 52px;
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #F6F6FA;

} */

input::-webkit-input-placeholder,
input:-ms-input-placeholder,
input::placeholder {
  color: #9b9ab9;
  font-family: PingFang SC;
  font-size: 19px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.input-phone {
  margin-top: 30px;
  width: 390px;
  height: 52px;
  border: 1px solid #fff;
  color: #9b9ab9;
  font-size: 19px;
  border-radius: 10px;
  background-color: #f6f6fa;
  padding-left: 30px;
  outline: none;
}

.input-verCode {
  margin-top: 24px;
  width: 390px;
  height: 52px;
  border: 1px solid #fff;
  color: #9b9ab9;
  font-size: 19px;
  border-radius: 10px;
  background-color: #f6f6fa;
  padding-left: 30px;
  outline: none;
}

.code-btn {
  width: 120px;
  height: 40px;
  border: none;
  position: absolute;
  right: 27px;
  top: 33px;
  background-color: transparent;
  color: #126cfe;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  cursor: pointer;
}

.code-btn:disabled {
  background-color: transparent;
  color: #999;
  text-align: right;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  /* font-weight: 500; */
  line-height: normal;
}

.login-btn {
  margin-top: 40px;
  width: 100%;
  height: 52px;
  border: none;
  border-radius: 10px;
  background: #126cfe;
  color: #ffffff;
  font-size: 19px;
  cursor: pointer;
  font-weight: 500;
  line-height: normal;
  font-family: PingFang SC;
}

.login-btn:disabled {
  background-color: #cccccc;
}

.agreement {
  display: flex;
  align-items: center;
  color: #999;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  margin-top: 16rpx;
}

.policy {
  color: #999;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  cursor: pointer;
}

.footer {
  color: #666;
  text-align: center;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  position: absolute;
  bottom: 76px;
  width: 100%;
}

.footer-record {
  margin-top: 16px;
  cursor: pointer;
}
</style>