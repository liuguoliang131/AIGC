<template>
  <div class="container">
    <TopTitleBar />
    <el-scrollbar
      style="
         {
          font-size: 0;
        }
      "
      @scroll="onScroll"
    >
      <div class="positionRelative">
        <video ref="video" class="coverVideo" autoplay muted loop playsinline>
          <source
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home1_video.mp4"
            type="video/mp4"
          />
        </video>
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home1_foreground.png"
          class="home1_fg"
        />
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home2.png"
          class="itemImage"
        />
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3_bg.png"
          class="itemImage"
        />
        <el-carousel class="carousel" autoplay arrow="never" height="500px">
          <el-carousel-item :key="1">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3_item1.png"
              class="carouselItem"
            />
          </el-carousel-item>
          <el-carousel-item :key="2">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3_item2.png"
              class="carouselItem"
            />
          </el-carousel-item>
          <el-carousel-item :key="3">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3_item3.png"
              class="carouselItem"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_bg.png"
          class="itemImage"
        />
        <div class="slideWrapper" @mouseleave="onMouseOut()">
          <div class="slideItem" @mouseenter="onMouseEnter(1)">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_item1.png"
              :class="[
                'slideImage',
                slideItemHover == 1 ? 'slideImageHover' : '',
              ]"
            />
            <div class="slideContent">
              <span
                :class="[
                  'slideTitle',
                  slideItemHover == 1 ? 'slideTitleHover' : '',
                ]"
                v-html="
                  slideItemHover == 1
                    ? '在线课程学习平台'
                    : '在线课程<br>学习平台'
                "
              ></span>
              <div
                :class="[
                  'slideLine',
                  slideItemHover == 1 ? 'slideLineHover' : '',
                ]"
              ></div>
              <span
                :class="[slideItemHover == 1 ? 'slideDespHover' : 'slideDesp']"
              >
                免费提供AI工具使用的在线课程，帮助您轻松上手使用AI工具。
              </span>
            </div>
          </div>
          <div class="slideItem" @mouseenter="onMouseEnter(2)">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_item2.png"
              :class="[
                'slideImage',
                slideItemHover == 2 ? 'slideImageHover' : '',
              ]"
            />
            <div class="slideContent">
              <span
                :class="[
                  'slideTitle',
                  slideItemHover == 2 ? 'slideTitleHover' : '',
                ]"
                v-html="
                  slideItemHover == 2
                    ? '定期在线直播培训'
                    : '定期在线<br>直播培训'
                "
              ></span>
              <div
                :class="[
                  'slideLine',
                  slideItemHover == 2 ? 'slideLineHover' : '',
                ]"
              ></div>
              <span
                :class="[slideItemHover == 2 ? 'slideDespHover' : 'slideDesp']"
              >
                定期免费提供在线直播培训，反馈培训效果，让企业拥有高质量的AI人才，提升企业效益。
              </span>
            </div>
          </div>
          <div class="slideItem" @mouseenter="onMouseEnter(3)">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_item3.png"
              :class="[
                'slideImage',
                slideItemHover == 3 ? 'slideImageHover' : '',
              ]"
            />
            <div class="slideContent">
              <span
                :class="[
                  'slideTitle',
                  slideItemHover == 3 ? 'slideTitleHover' : '',
                ]"
                v-html="
                  slideItemHover == 3
                    ? '企业定制培训调研'
                    : '企业定制<br>培训调研'
                "
              ></span>
              <div
                :class="[
                  'slideLine',
                  slideItemHover == 3 ? 'slideLineHover' : '',
                ]"
              ></div>
              <span
                :class="[slideItemHover == 3 ? 'slideDespHover' : 'slideDesp']"
              >
                免费为您提供AI培训调研服务，满足您企业的特定需求。
              </span>
            </div>
          </div>
          <div class="slideItem" @mouseenter="onMouseEnter(4)">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_item4.png"
              :class="[
                'slideImage',
                slideItemHover == 4 ? 'slideImageHover' : '',
              ]"
            />
            <div class="slideContent">
              <span
                :class="[
                  'slideTitle',
                  slideItemHover == 4 ? 'slideTitleHover' : '',
                ]"
                v-html="
                  slideItemHover == 4
                    ? '企业定制培训服务'
                    : '企业定制<br>培训服务'
                "
              ></span>
              <div
                :class="[
                  'slideLine',
                  slideItemHover == 4 ? 'slideLineHover' : '',
                ]"
              ></div>
              <span
                :class="[slideItemHover == 4 ? 'slideDespHover' : 'slideDesp']"
              >
                低折扣价为您提供企业定制AI培训服务，深入挖掘AI在您业务中的应用潜力。
              </span>
            </div>
          </div>
          <div class="slideItem" @mouseenter="onMouseEnter(5)">
            <img
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home4_item5.png"
              :class="[
                'slideImage',
                slideItemHover == 5 ? 'slideImageHover' : '',
              ]"
            />
            <div class="slideContent">
              <span
                :class="[
                  'slideTitle',
                  slideItemHover == 5 ? 'slideTitleHover' : '',
                ]"
                v-html="
                  slideItemHover == 5
                    ? '企业定制培训测验'
                    : '企业定制<br>培训测验'
                "
              ></span>
              <div
                :class="[
                  'slideLine',
                  slideItemHover == 5 ? 'slideLineHover' : '',
                ]"
              ></div>
              <span
                :class="[slideItemHover == 5 ? 'slideDespHover' : 'slideDesp']"
              >
                通过免费的测验和反馈，确保您的企业能够从定制AI培训中获得最大价值。
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home5.png"
          class="itemImage"
        />
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home6.png"
          class="itemImage"
        />
      </div>
      <div class="positionRelative">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home7.png"
          class="itemImage"
        />
        <div class="footer">
          <div class="footer-record">
            <a @click="handGoICP"
              >京ICP备19041918号-1京公网安备11010502039881号</a
            >
          </div>
          <div class="footer-record">
            <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="memberFeeWrapper">
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/tobe_memeber.png"
        style="
           {
            width: 200px;
            height: 360px;
          }
        "
      />
    </div>
    <my-dialog
      :show-close="false"
      :close-on-click-modal="true"
      v-model:visible="dialogVisible"
      @close="dialogVisible = false"
    >
      <div class="dialog_dia">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3.png"
          class="wecard"
        />
      </div>
    </my-dialog>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/TopTitleBar.vue";
import { nextTick, onMounted, ref } from "vue";
import MyDialog from "@/components/MyDialog.vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
import {
  ElScrollbar,
  ElButton,
  ElCarousel,
  ElCarouselItem,
} from "element-plus";
import { useRouter } from "vue-router";
const useRouterConfig = useRouterConfigStore();
const dialogVisible = ref(false);
const slideItemHover = ref(null);
const video = ref(null);
function onMouseEnter(index) {
  nextTick(() => {
    slideItemHover.value = index;
  });
}

function onMouseOut() {
  nextTick(() => {
    slideItemHover.value = null;
  });
}

function onScroll(event) {
  let { scrollTop } = event;
  if (scrollTop <= 0) {
    scrollTop = 0;
  } else if (scrollTop > 70) {
    scrollTop = 70;
  }
  useRouterConfig.titleBarOpacity = scrollTop / 70;
}
function handGoICP() {
  window.open(`https://beian.miit.gov.cn/`);
}
function showWeCard() {
  dialogVisible.value = true;
}
</script>

<style scoped lang="less">
.container {
  height: 100%;
  display: flex;

  .itemImage {
    width: 100vw;
    height: auto;
    display: block;
    object-fit: fill;
  }

  .memberFeeWrapper {
    position: absolute;
    right: 39px;
    bottom: 170px;
    display: flex;
    flex-direction: column;
  }

  .positionRelative {
    position: relative;

    .coverVideo {
      width: 100vw;
      height: 100vh;
      object-fit: cover;
    }

    .home1_fg {
      position: absolute;
      left: 50%;
      top: 42%;
      transform: translateX(-50%);
      width: 1212px;
      height: auto;
      pointer-events: none;
    }

    .carousel {
      position: absolute;
      top: 35%;
      left: 50%;
      width: 1244px;
      height: 500px;
      transform: translateX(-50%);

      /deep/.el-carousel__indicator--horizontal {
        padding-left: 6px;
        padding-right: 6px;
      }

      /deep/.el-carousel__indicator.is-active button {
        width: 35px;
      }

      /deep/.el-carousel__button {
        height: 6px;
        width: 6px;
        border-radius: 6px;
      }

      .carouselItem {
        width: 1244px;
        height: 500px;
        display: block;
        object-fit: fill;
      }
    }

    .slideWrapper {
      position: absolute;
      top: 26.7%;
      left: 50%;
      width: 1529px;
      height: 600px;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      justify-content: center;

      .slideItem {
        position: relative;
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }

        .slideImage {
          width: 250px;
          height: 600px;
          object-fit: cover;
          object-position: 100% 0%;
          border-radius: 12px;
          transition: width 0.2s ease;
        }

        .slideImageHover {
          width: 449px;
          border-radius: 0px;
        }

        &:not(:first-child) {
          margin-left: 20px;
        }

        .slideContent {
          position: absolute;
          top: 60px;
          left: 0;
          display: flex;
          flex-direction: column;

          .slideTitle {
            font-size: 30px;
            color: #126cfe;
            font-weight: 400;
            text-align: center;
            margin-left: 50px;
            margin-right: 50px;
          }

          .slideTitleHover {
            text-align: left;
            font-size: 36px;
            font-weight: 600;
            margin-left: 10.9%;
            margin-right: 40px;
          }

          .slideLine {
            margin-top: 27px;
            margin-left: 10.9%;
            width: 70px;
            height: 6px;
            border-radius: 6px;
            opacity: 0;
          }

          .slideLineHover {
            background-color: #126cfe;
            opacity: 1;
            transition: opacity 1s;
            width: 70px;
            height: 6px;
          }

          .slideDesp {
            opacity: 0;
          }

          .slideDespHover {
            opacity: 1;
            transition: opacity 1s;
            font-size: 25px;
            font-weight: 100;
            color: #126cfe;
            margin-top: 27px;
            margin-left: 10.9%;
            margin-right: 10.9%;
          }
        }
      }
    }

    .footer {
      color: #ffffff;
      text-align: center;
      font-family: PingFang SC;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      position: absolute;
      bottom: 32px;
      width: 100%;

      .footer-record {
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }

  .dialog_dia {
    display: flex;
    flex-direction: column;
    align-items: center;

    .wecard {
      width: 400px;
      height: 400px;
    }

    .dia_footer_1 {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 67px;

      .confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 464px;
        height: 52px;
        border-radius: 6px;
        background: #126cfe;
        color: #fff;
        text-align: center;
        font-family: PingFang SC;
        font-size: 19px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        cursor: pointer;

        &:active {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>