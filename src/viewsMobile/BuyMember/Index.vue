<template>
  <div class="container">
    <div class="navbar">
      <img
        class="nav-left"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-black-navleft1.png"
        alt=""
        @click="goback"
      />
      <span>购买会员</span>
    </div>
    <div class="container-body">
      <Arc
        v-model:activeIdx="activeIdx"
        v-model:moveX="moveX"
        @changeActive="changeActive"
      ></Arc>
      <div class="swiper">
        <div
          class="page"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div class="swiper-item" v-for="item in swiperList" :key="item.id">
            <img class="card" :src="item.img" alt="" />
          </div>
        </div>
      </div>
      <div class="box3" v-if="activeIdx === 0">
        <div class="codebox">
          <div class="box_border" :style="{ filter: `grayscale(100%)` }"></div>
          <img
            class="codeimg"
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMmber-yuecode.png"
            alt=""
          />
        </div>
        <div
          class="save"
          :style="{ filter: `grayscale(100%)` }"
          @click="handShow(0)"
        ></div>
      </div>
      <div class="box3" v-else-if="activeIdx === 1">
        <div class="codebox">
          <div class="box_border"></div>
          <img
            class="codeimg"
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMmber-niancode.png"
            alt=""
          />
        </div>
        <div class="save" @click="handShow(1)"></div>
      </div>
      <div class="footer">
        <p>
          <strong>充值提醒：</strong
          >购买完成后，预计一分内完成次数充值，您可以在AI对话或AI绘画
          页面查看最新次数。
        </p>
        <p>
          <strong>温馨提示：</strong
          >如果您需要购买多个账号，用于企业使用，请添加客服微信：<span
            >hanhou1130</span
          >
          或拨打客服电话：<span>19931249134</span> 进行咨询。
        </p>
        <p>
          <strong>问答次数有效期：</strong
          >月卡有效期30天，年卡有效期365天，AI对话次数及AI绘画
          次数等权益仅在月卡/年卡周期内有效，请及时使用。
        </p>
      </div>

      <van-overlay :show="visible">
        <div class="model" @click.stop>
          <div class="model-content">
            <img
              v-if="activeIdx === 0"
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-share1.jpg"
              alt=""
            />
            <img
              v-else-if="activeIdx === 1"
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-share2.jpg"
              alt=""
            />
          </div>
          <div class="model-close" @click="handHide"></div>
        </div>
      </van-overlay>
    </div>
  </div>
</template>

<script setup>
import Arc from "./components/Arc";
import { Overlay as VanOverlay } from "vant";
import utils from "@/common/utils";
import { ref } from "vue";
const swiperList = [
  {
    id: 1,
    name: "月卡",
    img: "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-yueka.png",
  },
  {
    id: 2,
    name: "年卡",
    img: "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-nianka.png",
  },
];
const loading = ref(null);
const activeIdx = ref(0); // 当前显示的卡片底标
const startX = ref(0); // 按住起始横向位置
const distanceX = ref(0); // 鼠标到盒子边缘横向距离
const moveX = ref(0); // 移动距离
const visible = ref(false);

// 获取元素实际宽度
const getWidth = (name) => {
  const dom = document.querySelector(name);
  const style = window.getComputedStyle(dom, null);
  const width = parseFloat(style.getPropertyValue("width"));
  return width;
};

// 触摸起始
const onTouchStart = (e) => {
  console.log(e, "start");
  startX.value = e.changedTouches[0].pageX;
  // 计算手指到元素边界距离
  const dom = document.querySelector(".page");
  distanceX.value = startX.value - dom.offsetLeft;
};
// 触摸移动
const onTouchMove = (e) => {
  // console.log(e, "move");
  const pageDom = document.querySelector(".page");
  pageDom.style.left = e.changedTouches[0].pageX - distanceX.value + "px";
  moveX.value = e.changedTouches[0].pageX - startX.value;
};
// 触摸抬起
const onTouchEnd = (e) => {
  clearTimeout(loading.value);
  console.log(e, "end");
  moveX.value = e.changedTouches[0].pageX - startX.value;
  const pageDom = document.querySelector(".page");
  pageDom.style.transition = "left 0.1s linear";
  const itemWidth = getWidth(".swiper-item");

  let num = 0;
  if (moveX.value > 0) {
    if (activeIdx.value === 0) {
      num = activeIdx.value;
    } else {
      num = activeIdx.value - 1;
    }
  } else if (moveX.value < 0) {
    if (activeIdx.value === swiperList.length - 1) {
      num = activeIdx.value;
    } else {
      num = activeIdx.value + 1;
    }
  } else {
    num = activeIdx.value;
  }
  pageDom.style.left = -num * itemWidth + "px";

  loading.value = setTimeout(() => {
    activeIdx.value = num;
    pageDom.style.transition = "none";
    moveX.value = 0;
    loading.value = null;
  }, 100);
};

// 移动swiper
const changeActive = (idx) => {
  clearTimeout(loading.value);

  const pageDom = document.querySelector(".page");
  pageDom.style.transition = "left 0.1s linear";
  const itemWidth = getWidth(".swiper-item");
  moveX.value = idx ? 0 - itemWidth : itemWidth;
  pageDom.style.left = -idx * itemWidth + "px";

  loading.value = setTimeout(() => {
    activeIdx.value = idx;
    pageDom.style.transition = "none";
    moveX.value = 0;
    loading.value = null;
  }, 100);
};

// 打开弹窗
const handShow = () => {
  visible.value = true;
};
// 关闭弹窗
const handHide = () => {
  visible.value = false;
};
// 退一步
const goback = () => {
  utils.goBack();
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding: 44px 0 0 0;
  overflow: hidden;
  background-color: #0a070e;
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 44px;
    text-align: center;
    line-height: 44px;
    color: #f0eef3;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    background-color: #0a070e;
    .nav-left {
      position: absolute;
      top: 50%;
      left: 16px;
      transform: translate(0, -50%);
      width: 22px;
      height: 22px;
    }
    span {
      margin: auto;
    }
  }
  .container-body {
    height: 100%;
    padding: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .swiper {
    width: 375px;
    height: 343.67px;
    position: relative;
    .page {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      .swiper-item {
        width: 375px;
        text-align: center;
        .card {
          width: 355px;
          height: 393.67px;
          margin: auto;
        }
      }
    }
  }

  .box3 {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .codebox {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .box_border {
        width: 157px;
        height: 157px;
        background: no-repeat
          url(https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-codebox.png)
          center/cover;
      }
      .codeimg {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 107px;
        height: 107px;
      }
    }
    .save {
      margin-top: 17px;
      width: 164px;
      height: 35.5px;
      border-radius: 12.5px;
      background: no-repeat
        url(https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-save.png)
        center/cover;
    }
  }
  .footer {
    width: 351px;
    padding: 17px 0;
    margin: auto;
    p {
      color: #858585;
      font-family: PingFang SC;
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }
    span {
      color: #858585;
      font-family: PingFang SC;
      font-size: 10px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }
  }

  .model {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .model-content {
      width: 315px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      img {
        width: 315px;
        height: 516px;
      }
    }
    .model-close {
      width: 28px;
      height: 28px;
      margin-top: 23px;
      border-radius: 50%;
      background: no-repeat
        url(https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-modelclose.svg)
        center/cover;
    }
  }
}
</style>