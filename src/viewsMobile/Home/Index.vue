<template>
  <div class="container">
    <top-title-bar />
    <m-menu></m-menu>
    <vip-model></vip-model>
    <div class="container-body">
      <div class="page1">
        <video
          id="video1"
          class="coverVideo"
          autoplay
          loop
          playsinline
          muted
          poster="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page1-bg.png"
        >
          <source
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile_ai_home.mp4"
            type="video/mp4"
          />
        </video>
        <div class="up">
          <div class="row1">AI赋能计划</div>
          <div class="row2">
            在AI新时代下，行业巨头纷纷斥资搭建AI模型，进行产业升级，这让中小企业压力更大、AI人才炙手可热！
            <br />
            憨猴公司致力于让AI智慧赋能全国中小企业与员工，现推出<span>AI赋能计划</span>！
          </div>
        </div>
      </div>
      <div class="page2">
        <div class="row1">加入AI赋能计划</div>
        <div class="row2">
          享受会员福利 用AI为企业降本增收 免费培训员工 让企业拥有高级AI人才
        </div>
        <div class="row3" v-for="(item, idx) in list" :key="idx">
          <div class="round">{{ item.round }}</div>
          <div class="content">
            <div class="t1">{{ item.t1 }}</div>
            <div class="t2">{{ item.t2 }}</div>
          </div>
        </div>
      </div>
      <div class="page3">
        <div class="row1">我们为加入的中小企业与员工提供多项会员福利</div>
        <van-swipe class="my-swipe" :autoplay="8000" indicator-color="white">
          <van-swipe-item v-for="(path, idx) in page3SwipeList" :key="idx">
            <img :src="path" alt="" />
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">
              <div
                v-for="(item, idx) in total"
                :key="idx"
                :class="[
                  'indicator-item',
                  active === idx ? 'indicator-item-active' : '',
                ]"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="page4">
        <div class="row1">AI知识分享与培训服务</div>
        <van-swipe class="my-swipe" :autoplay="8000" indicator-color="white">
          <van-swipe-item v-for="(path, idx) in page4SwipeList" :key="idx">
            <img :src="path" alt="" />
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">
              <div
                v-for="(item, idx) in total"
                :key="idx"
                :class="[
                  'indicator-item',
                  active === idx ? 'indicator-item-active' : '',
                ]"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="page5">
        <div class="row1">AI工具分享与交流活动</div>
        <van-swipe class="my-swipe" :autoplay="8000" indicator-color="white">
          <van-swipe-item v-for="(path, idx) in page5SwipeList" :key="idx">
            <img :src="path" alt="" />
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">
              <div
                v-for="(item, idx) in total"
                :key="idx"
                :class="[
                  'indicator-item',
                  active === idx ? 'indicator-item-active' : '',
                ]"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="page6">
        <div class="row1">AI模型开发与算力支持</div>
        <div class="row2">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page6-row1.png"
            alt=""
          />
        </div>
        <div class="row2">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page6-row2.png"
            alt=""
          />
        </div>
        <div class="row2">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page6-row3.png"
            alt=""
          />
        </div>
      </div>
      <div class="page8">
        <van-swipe class="my-swipe" :autoplay="8000" indicator-color="white">
          <van-swipe-item v-for="(item, idx) in page8SwipeList" :key="idx">
            <div class="s-item-box">
              <div class="box-title" v-text="item.title"></div>
              <img :src="item.img" alt="" />
            </div>
          </van-swipe-item>
          <template #indicator="{ active, total }">
            <div class="custom-indicator">
              <div
                v-for="(item, idx) in total"
                :key="idx"
                :class="[
                  'indicator-item',
                  active === idx ? 'indicator-item-active' : '',
                ]"
              ></div>
            </div>
          </template>
        </van-swipe>
      </div>
      <div class="page7">
        <div class="row1">
          AI赋能计划不仅是<br />您智慧战略的伙伴<br />更是您商业增长的助手！
        </div>
        <div class="row2">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page7-code2.png"
            alt=""
            class="code2"
          />
          <div class="text1">扫码咨询专属客服</div>
        </div>
        <div class="footer" @click="handGoICP">
          <div>京ICP备19041919号-2京公网安备11010502039881号</div>
          <div>网络经营许可证京网文[2020]4683-870号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/mobile/TopTitleBar.vue";
import MMenu from "@/components/mobile/MMenu.vue";
import VipModel from "@/components/mobile/VipModel.vue";
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem, showToast } from "vant";

import { onMounted, ref } from "vue";
import utils from "@/common/utils";

const list = ref([
  {
    round: "多",
    t1: "10大贴心服务",
    t2: "为中小企业与员工量身定制！",
  },
  {
    round: "快",
    t1: "10分钟学会快速上手",
    t2: "1天内提升企业效益！",
  },
  {
    round: "好",
    t1: "保姆式贴心服务模式",
    t2: "教会0基础员工运用AI工具！",
  },
  {
    round: "省",
    t1: "免费提供多项福利",
    t2: "AI工具、AI课程以及AI活动！",
  },
]);

const page3SwipeList = ref([
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page3-swipe1.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page3-swipe2.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page3-swipe3.png",
]);
const page4SwipeList = ref([
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-swipe1.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-swipe2.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-swipe3.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-swipe4.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-swipe5.png",
]);
const page5SwipeList = ref([
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page5-swipe1.png",
  "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page5-swipe2.png",
]);
const page8SwipeList = ref([
  {
    title: "月卡权益介绍",
    img: "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page8-swipe1.png",
  },
  {
    title: "年卡权益介绍",
    img: "https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page8-swipe2.png",
  },
]);

// 去工信部备案网址
const handGoICP = () => {
  window.open(`https://beian.miit.gov.cn/`);
};

const setWechatVideoAutoPlay = () => {
  const result = utils.isWechat();
  if (!result) return;

  try {
    document.addEventListener(
      "WeixinJSBridgeReady",
      function () {
        document.getElementById("video1").play();
      },
      false
    );
  } catch (error) {}
};

onMounted(() => {
  setWechatVideoAutoPlay();
});
</script>

<style scoped lang="less">
.container {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  .container-body {
    height: calc(100% - 44px);
    overflow-y: scroll;
    .page1 {
      position: relative;
      height: 100%;
      overflow: hidden;
      text-align: center;
      .coverVideo {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, 0);
        height: 100%;
        background: no-repeat
          url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page2-bg.png")
          0 0 / cover;
      }
      .up {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .row1 {
          color: #fff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 30px;
          font-style: normal;
          font-weight: 400;
          line-height: 36px; /* 120% */
        }
        .row2 {
          width: 298px;
          margin: 20px auto;
          color: #fff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 22px; /* 157.143% */
          span {
            color: #8febff;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 600;
            line-height: 22px;
          }
        }
      }
    }
    .page2 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page2-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row1 {
        color: #126cfe;
        font-family: PingFang SC;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 120% */
        text-align: center;
      }
      .row2 {
        width: 298px;
        margin: 20px auto 28px auto;
        color: #02040b;
        text-align: center;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        text-align: center;
      }
      .row3 {
        display: flex;
        align-items: center;
        width: 297px;
        height: 65px;
        margin: 10px auto;
        border-radius: 10px;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 6px 24px 0px #a5b9da;
        .round {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          margin: 0 19px 0 30px;
          border-radius: 50%;
          font-family: PingFang SC;
          font-size: 26px;
          font-style: normal;
          font-weight: 600;
          line-height: 42px;
          background: #2a7bfa;
          color: #fff;
        }
        .content {
          flex: 1;
          .t1 {
            color: #000;
            font-family: PingFang SC;
            font-size: 16px;
            font-style: normal;
            font-weight: 600;
            line-height: 20px; /* 112.5% */
          }
          .t2 {
            color: #000;
            font-family: PingFang SC;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 18px;
          }
        }
      }
    }

    .page3 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page3-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row1 {
        width: 302px;
        margin-bottom: 25px;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 27px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 133.333% */
      }
      .my-swipe {
        position: relative;
        width: 100%;
        padding-bottom: 20px;
      }
      .my-swipe .van-swipe-item {
        box-sizing: border-box;
        padding: 0 27px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .custom-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .indicator-item {
          width: 6px;
          height: 6px;
          margin: 0 6px;
          border-radius: 3px;
          background: #999ca1;
          transition: 0.5s width;
        }
        .indicator-item-active {
          width: 54px;
          background: #fff;
        }
      }
    }

    .page4 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page4-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row1 {
        margin-bottom: 33px;
        color: #126cfe;
        text-align: center;
        font-family: PingFang SC;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 120% */
      }
      .my-swipe {
        position: relative;
        width: 100%;
        padding-bottom: 20px;
      }
      .my-swipe .van-swipe-item {
        box-sizing: border-box;
        width: 100%;
        padding: 0 27px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .custom-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .indicator-item {
          width: 6px;
          height: 6px;
          margin: 0 6px;
          border-radius: 3px;
          background: #a6c7ff;
          transition: 0.5s width;
        }
        .indicator-item-active {
          width: 54px;
          background: #126cfe;
        }
      }
    }
    .page5 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page3-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row1 {
        margin-bottom: 33px;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 120% */
      }
      .my-swipe {
        position: relative;
        width: 100%;
        padding-bottom: 40px;
      }
      .my-swipe .van-swipe-item {
        box-sizing: border-box;
        padding: 0 39px;
        img {
          width: 100%;
          height: auto;
        }
      }
      .custom-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 34px;
        .indicator-item {
          width: 6px;
          height: 6px;
          margin: 0 6px;
          border-radius: 3px;
          background: #999ca1;
          transition: 0.5s width;
        }
        .indicator-item-active {
          width: 54px;
          background: #fff;
        }
      }
    }
    .page6 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page6-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .row1 {
        margin-bottom: 30px;
        color: #126cfe;
        text-align: center;
        font-family: PingFang SC;
        font-size: 30px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 120% */
      }
      .row2 {
        text-align: center;
        margin: 9px 0;
        img {
          width: 298px;
          height: 104px;
          margin: auto;
          pointer-events: none;
        }
      }
    }
    .page7 {
      position: relative;
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page7-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .row1 {
        margin-bottom: 17px;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 27px;
        font-style: normal;
        font-weight: 600;
        line-height: 36px; /* 133.333% */
      }
      .row2 {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 297px;
        height: 392px;
        background: no-repeat
          url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page7-element1.png")
          0 0 / contain;
        .code2 {
          width: 160px;
          height: 160px;
        }
        .text1 {
          color: #fff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 26px; /* 185.714% */
        }
      }
      .footer {
        position: absolute;
        bottom: 10px;
        left: 0;
        width: 750px;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 18px;
        font-style: normal;
        font-weight: 400;
        line-height: 30px;
        text-align: center;
        transform-origin: bottom left;
        transform: scale(0.5);
        &:active {
          opacity: 0.7;
        }
      }
    }
    .page8 {
      height: 100%;
      overflow: hidden;
      background: no-repeat
        url("https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-page8-bg.png") 0
        0 / cover;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .my-swipe {
        position: relative;
        width: 100%;
        padding-bottom: 20px;
        &::-webkit-scrollbar {
          display: none;
        }
      }
      .my-swipe .van-swipe-item {
        box-sizing: border-box;
        width: 100%;
        padding: 0 20px 0 34px;
        .s-item-box {
          position: relative;
          .box-title {
            width: 100%;
            margin-bottom: 30px;
            color: #126cfe;
            text-align: center;
            font-family: PingFang SC;
            font-size: 30px;
            font-style: normal;
            font-weight: 600;
            line-height: 36px; /* 120% */
          }
          img {
            width: 100%;
            height: auto;
          }
        }
      }
      .custom-indicator {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        .indicator-item {
          width: 6px;
          height: 6px;
          margin: 0 6px;
          border-radius: 3px;
          background: #a6c7ff;
          transition: 0.5s width;
        }
        .indicator-item-active {
          width: 54px;
          background: #126cfe;
        }
      }
    }
  }
}
</style>