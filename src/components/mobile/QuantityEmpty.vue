<template>
  <van-overlay :show="visible" @click="close">
    <div class="quantity_empty" v-if="from">
      <img
        class="qe1"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-qe-1.png"
        alt=""
      />
      <div class="tips_1">您的次数已用尽</div>
      <div class="tips_2">购买会员获取更多问答次数</div>
      <div class="bottom">
        <div class="cancel" @click="close">
          <div class="before">以后再说</div>
        </div>
        <div class="confirm" @click="handGoBuyMember">购买会员</div>
      </div>
    </div>
    <div class="quantity_empty" v-else>
      <img
        class="qe2"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-qe-2.png"
        alt=""
      />
      <div class="tips_1">您的次数已用尽</div>
      <div class="tips_2">购买会员获取更多绘画次数</div>
      <div class="bottom">
        <div class="cancel" @click="close">
          <div class="before">以后再说</div>
        </div>
        <div class="confirm" @click="handGoBuyMember">购买会员</div>
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
// 次数用尽提示框
import { Overlay as VanOverlay } from "vant";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const props = defineProps(["visible"]);
const emit = defineEmits(["update:visible"]);
const from = route.path.includes("/chat"); // true对话 false绘画

const close = () => {
  emit("update:visible", false);
};

const handGoBuyMember = () => {
  router.push({
    path: "/buy_member",
  });
};
</script>

<style scoped lang="less">
.quantity_empty {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 295px;
  height: 300px;
  border-radius: 10px;
  background: #fff;
  .qe1 {
    width: 130px;
    height: 108px;
    margin-top: 38px;
    margin-bottom: 19px;
  }
  .qe2 {
    width: 109px;
    height: 122px;
    margin-top: 31px;
    margin-bottom: 12px;
  }
  .tips_1 {
    color: #333;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }
  .tips_2 {
    color: #333;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 22px;
  }
  .bottom {
    position: absolute;
    bottom: 25px;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    width: 100%;
    padding: 0 20px;
    .cancel {
      position: relative;
      box-sizing: border-box;
      width: 118px;
      height: 44px;
      background: linear-gradient(135.6deg, #8321f5 6.09%, #044fe6 97.08%),
        linear-gradient(5.58deg, #ffffff -38.54%, rgba(255, 255, 255, 0) 4.21%);
      font-family: PingFang SC;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: center;
      border-radius: 22px;
      color: #000000;
      .before {
        position: absolute;
        top: 50%;
        left: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 116px;
        height: 42px;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 21px;
      }
    }
    .confirm {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 118px;
      height: 44px;
      background: linear-gradient(135.6deg, #8321f5 6.09%, #044fe6 97.08%),
        linear-gradient(5.58deg, #ffffff -38.54%, rgba(255, 255, 255, 0) 4.21%);
      font-family: PingFang SC;
      font-size: 15px;
      font-weight: 500;
      line-height: 21px;
      letter-spacing: 0px;
      text-align: center;
      border-radius: 22px;
      color: #ffffff;
    }
  }
}
</style>