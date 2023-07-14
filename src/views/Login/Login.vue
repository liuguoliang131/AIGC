<template>
  <div class="login">
    <div class="container">
      <img src="../../assets/login/login_logo.png" class="logo">
      <div class="name">憨猴·人工智能研究中心</div>
      <input v-model="phone" type="tel" placeholder="输入手机号码" class="input-phone">

      <div class="verify">
        <input v-model="code" type="text" placeholder="输入验证码" class="input">
        <button @click="sendVerificationCode" class="verifcode-send">发送验证码</button>
      </div>

      <button @click="logIn" class="login-submit">登录</button>

      <div class="agreement">
        <!-- <input v-model="agree" type="checkbox" class="checkbox"> -->
        <!-- <label for="agree">我同意相关协议</label> -->
        登录即代表您已同意
        <a class="policy" href="https://baidu.com">《服务协议和隐私政策》</a>
        和
        <a class="policy" href="https://element-plus.org/en-US/component/message.html#basic-usage">《安全协议》</a>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  setup() {
    const phone = ref('')
    const code = ref('')
    const agree = ref(false)

    // 发送验证码
    const sendVerificationCode = () => {
      if (phone.value.length == 0) {
        ElMessage('请输入手机号')
      } else if (phone.value.length != 11) {
        ElMessage('手机号格式错误')
      }


    }
    // 登录
    const logIn = () => {
      if (phone.value.length == 0) {
        ElMessage('请输入手机号')
      } else if (phone.value.length != 11) {
        ElMessage('手机号格式错误')
      } else if (code.value.length == 0) {
        ElMessage('请输入验证码')
      } else if (code.value.length != 4) {
        ElMessage('‘验证码错误，请重新提交')
      }
      // if (!agree.value) {
      //   alert('您需要同意相关协议')
      //   return
      // }
    }

    return {
      phone,
      code,
      agree,
      sendVerificationCode,
      logIn
    }
  }
}
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url('../../assets/login/login_bg.png');
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo {
  width: 104px;
  height: 78px;
}

.name {
  margin-top: 41px;
  color: #FFF;
  text-align: center;
  font-family: PingFang SC;
  font-size: 60px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.input {
  margin-top: 37px;
  width: 345px;
  height: 52px;
  border: 1px solid #FFF;
  color: #FFF;
  font-size: 19px;
  border-radius: 5px;
  background-color: transparent;
  padding-left: 30px;
  outline: none;
}

.input-phone {
  margin-top: 37px;
  width: 500px;
  height: 52px;
  border: 1px solid #FFF;
  color: #FFF;
  font-size: 19px;
  border-radius: 5px;
  background-color: transparent;
  padding-left: 30px;
  outline: none;
}

input::-webkit-input-placeholder,
input:-ms-input-placeholder,
input::placeholder {
  color: #FFF;
  font-size: 19px;

}

.verifcode-send {
  width: 144px;
  height: 52px;
  margin-left: 13px;
  border-radius: 10px;
  color: #126CFE;
  border: 2px solid rgba(18, 108, 254, 0.58);
  background: rgba(255, 255, 255, 0.50);
  font-family: PingFang SC;
  font-size: 19px;
  font-style: normal;
  font-weight: 500;
  outline: none;
}

.login-submit {
  width: 500px;
  height: 52px;
  border-radius: 10px;
  margin-top: 52px;
  background-color: #126CFE;
  border: 2px solid rgba(18, 108, 254, 0.58);
  color: #FFF;
  font-size: 19px;
  font-family: PingFang SC;
  font-style: normal;
  font-weight: 500;
}

.agreement {
  display: flex;
  align-items: center;
  color: #FFF;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  margin-top: 20rpx;
}

.policy {
  color: #FFF;
  font-family: PingFang SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;

}
</style>