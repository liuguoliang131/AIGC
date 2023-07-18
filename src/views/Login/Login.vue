<template>
  <div class="container">
    <div class="background"></div>
    <div class="logo-view">
      <div class="logo"></div>
      <div class="logo-name">Hanhou·AIGC</div>
    </div>
    <div></div>
    <div class="login-box">
      <div class="login-title">一起探索AIGC的无限可能</div>
      <div class="input-box">
        <div class="input-group">
          <input type="tel" id="phone" v-model="phone" placeholder="请输入手机号" class="input-phone">
        </div>
        <div class="input-group">
          <input type="text" id="code" v-model="code" placeholder="请输入验证码" class="input-verCode">
          <button class="code-btn" @click="sendCode" :disabled="isSending">{{ buttonText }}</button>
        </div>
      </div>
      <!-- <button class="login-btn" :disabled="!isValid" @click="login">登录</button> -->
      <button class="login-btn" @click="login">登录</button>
      <div class="agreement">
        <!-- <input v-model="agree" type="checkbox" class="checkbox"> -->
        <!-- <label for="agree">我同意相关协议</label> -->
        登录即代表您已同意
        <a class="policy" href="https://baidu.com">《服务协议和隐私政策》</a>
        和
        <a class="policy" href="https://element-plus.org/en-US/component/message.html#basic-usage">《安全协议》</a>
      </div>
    </div>
    <div class="footer">
      <div class="footer-record">京ICP备19041919号-2京公网安备11010502039881号</div>
      <div class="footer-record">网络经营许可证京网文[2020]4683-870号</div>
    </div>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import http from "../../http/index";
import api from "./api";

export default {
  data() {
    return {
      phone: '',
      code: '',
      isSending: false,
      isCounting: false,
      countDown: 60,
      timer: null
    };
  },
  computed: {
    isValid() {
      // return this.phone && this.code;
    },
    buttonText() {
      if (this.isCounting) {
        return `${this.countDown}秒`
      } else {
        return '获取验证码'
      }
    }

  },
  methods: {
    sendCode() {
      // if (phone.value.length == 0) {
      //   return ElMessage('请输入手机号')

      // } else if (phone.value.length != 11) {
      //   return ElMessage('手机号格式错误')
      // }

      // 发送验证码的逻辑
      this.isSending = true;
      this.buttonText = '发送中...';
      this.isCounting = true
      http.get(api.send_verfyCode, {
        tel: this.phone.value,
        // mock: 156
      }).then((res) => {
        if (res.code == 200) {
          this.timer = setInterval(() => {
            if (this.countDown > 1) {
              this.countDown--
            } else {
              this.isCounting = false
              this.isSending = false;
              this.countDown = 60
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)

        } else {
          ElMessage({
            message: res.message,
            type: "error",
          });

        }
      })

    },
    login() {
      // 登录的逻辑
      if (phone.value.length == 0) {
        ElMessage('请输入手机号')
        retrun
      } else if (phone.value.length != 11) {
        ElMessage('手机号格式错误')
        retrun
      } else if (code.value.length == 0) {
        ElMessage('请输入验证码')
        retrun
      } else if (code.value.length != 4) {
        ElMessage('‘验证码错误，请重新提交')
        retrun
      }

      console.log('手机号：' + this.phone);
      console.log('验证码：' + this.code);
      http.post(api.user_login, {
        tel: this.phone.value,
        code: this.code.value
      }).then((res) => {
        if (res.code == 200) {
        }
        else {
          ElMessage({
            message: res.message,
            type: "error",
          });
        }
      })
    }
  }
};
</script>

<style scoped>
.container {
  height: 100%;
  background-image: url('../../assets/login/login_bg.png');
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
  background-image: url('../../assets/login/login_bg.png');
  background-size: cover;
  opacity: 0.5;
  z-index: -1;
}

.logo-view {
  display: flex;
  align-items: center;
  position: absolute;
  top: 13px;
  left: 22px;


}

.logo {
  width: 40px;
  height: 30.025px;
  background-image: url('../../assets/login/login_logo.png');
  background-size: contain;
  background-repeat: no-repeat;
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
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  float: right;
  margin-right: 200px;
  padding: 90px 70px;

}

.login-title {
  color: #333;
  text-align: center;
  font-family: PingFang SC;
  font-size: 34px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.input-box {
  /* margin-bottom: 20px; */
}

.input-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  /* margin-bottom: 10px; */
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
  color: #9B9AB9;
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
  border: 1px solid #FFF;
  color: #9B9AB9;
  font-size: 19px;
  border-radius: 10px;
  background-color: #F6F6FA;
  padding-left: 30px;
  outline: none;
}

.input-verCode {
  margin-top: 24px;
  width: 390px;
  height: 52px;
  border: 1px solid #FFF;
  color: #9B9AB9;
  font-size: 19px;
  border-radius: 10px;
  background-color: #F6F6FA;
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
  color: #126CFE;
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
  width: 420px;
  height: 52px;
  border: none;
  border-radius: 10px;
  background: #126CFE;
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
}
</style>