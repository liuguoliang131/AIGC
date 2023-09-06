<template>
  <div class="container">
    <top-title-bar></top-title-bar>
    <div class="container-body">
      <div class="form">
        <div class="title">一起探索AI的无限可能</div>
        <div class="form-item">
          <input
            type="tel"
            id="phone"
            maxlength="11"
            v-model="formData.phone"
            placeholder="请输入手机号"
            @focus="() => (showMenu = false)"
            @blur="() => (showMenu = true)"
            @input="handlePhoneInput"
          />
        </div>
        <div class="form-item">
          <input
            type="tel"
            id="code"
            maxlength="4"
            v-model="formData.code"
            placeholder="请输入验证码"
            class="input-verCode"
            @focus="() => (showMenu = false)"
            @blur="() => (showMenu = true)"
            @input="handleCodeInput"
            @keyup.enter="login"
          />
          <div class="code-btn" @click="sendCode">
            {{ timer ? countDown : "获取验证码" }}
          </div>
        </div>
        <div class="submit" @click="login">登录并注册</div>
        <div class="desc">
          登录即代表您已同意<span @click="handGoAgree(1)"
            >《服务协议和隐私政策》</span
          >和<span @click="handGoAgree(2)">《安全协议》</span>
        </div>
      </div>
    </div>
    <m-menu v-show="showMenu"></m-menu>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/mobile/TopTitleBar.vue";
import MFooter from "@/components/mobile/MFooter.vue";
import MMenu from "@/components/mobile/MMenu.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

import { sendVerifyCode, userLogin } from "./api";
import utils from "@/common/utils";
import { useUserStore } from "@/store/user";
import { showToast, showLoadingToast, closeToast } from "vant";

const router = useRouter();
const userStore = useUserStore();

const formData = ref({
  phone: "",
  code: "",
});
const timer = ref(null);
const countDown = ref(60);

// 是否显示悬浮的菜单组件
const showMenu = ref(true);

const handlePhoneInput = (event) => {
  // 使用正则表达式来限制输入框只能输入数字
  let value = event.target.value.replace(/[^\d]/g, "");
  formData.value.phone = value;
};
const handleCodeInput = (event) => {
  let value = event.target.value.replace(/[^\d]/g, "");
  formData.value.code = value;
};

const sendCode = () => {
  if (timer.value !== null) return;
  if (formData.value.phone.length == 0) {
    return showToast("请输入手机号");
  } else if (!/^[1]{1}[0-9]{10}$/.test(formData.value.phone)) {
    return showToast("手机号格式错误");
  }

  showLoadingToast({
    duration: 0,
    message: "加载中...",
    forbidClick: true,
  });
  sendVerifyCode(formData.value.phone).then((res) => {
    closeToast();
    if (res.code == 200) {
      timer.value = setInterval(() => {
        if (countDown.value > 1) {
          countDown.value--;
        } else {
          clearInterval(timer.value);
          timer.value = null;
          countDown.value = 60;
        }
      }, 1000);
    } else {
      showToast(res.msg || res.message);
    }
  });
};
const login = () => {
  if (formData.value.phone.length == 0) {
    return showToast("请输入手机号");
  } else if (!/^[1]{1}[0-9]{10}$/.test(formData.value.phone)) {
    return showToast("手机号格式错误");
  }

  if (formData.value.code.length == 0) {
    return showToast("请输入验证码");
  } else if (!/^\d{4}$/.test(formData.value.code)) {
    return showToast("验证码格式错误");
  }

  showLoadingToast({
    duration: 0,
    message: "加载中...",
    forbidClick: true,
  });
  userLogin(formData.value.phone, formData.value.code).then((res) => {
    if (res.code == 200) {
      closeToast();
      userStore.loginBackPage(res.data);
    } else {
      closeToast();
      showToast(res.msg || res.message);
    }
  });
};

// 去查看协议
const handGoAgree = (type) => {
  router.push({
    path: "/agreement",
    query: {
      type,
    },
  });
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  .container-body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100% - 44px);
    overflow-y: scroll;
    background: no-repeat
      url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-login-bg.png") 0 0 /
      cover;
    text-align: center;
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 300px;
      height: 300px;
      border-radius: 10px;
      background-color: rgba(255, 255, 255, 0.95);
      .title {
        margin-top: 36px;
        color: #333;
        text-align: center;
        font-family: PingFang SC;
        font-size: 20px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
      .form-item {
        position: relative;
        width: 255px;
        height: 40px;
        margin-top: 12px;

        input {
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          flex-shrink: 0;
          border-radius: 5px;
          background: #f6f6fa;
          outline: none;
          border: none;
          color: #9b9ab9;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          padding: 0 12px;
        }
        .code-btn {
          position: absolute;
          right: 0;
          top: 50%;
          padding: 0 12px;
          color: #126cfe;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 600;
          line-height: 17px;
          transform: translate(0, -50%);
        }
      }
      .submit {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 255px;
        height: 40px;
        margin-top: 36px;
        flex-shrink: 0;
        border-radius: 5px;
        background: #126cfe;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        &:active {
          opacity: 0.7;
        }
      }
      .desc {
        width: 200%;
        margin-top: 8px;
        color: #999;
        font-family: PingFang SC;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 26px;
        transform-origin: top center;
        transform: scale(0.5);
        span {
          text-decoration-line: underline;
          &:active {
            opacity: 0.7;
            outline: auto;
          }
        }
      }
    }
  }
}
</style>