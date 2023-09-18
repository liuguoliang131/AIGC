<template>
  <div class="container">
    <nav-bar title="AI绘图" showGoHome="true"></nav-bar>
    <!-- <div class="navbar">
      <img @click="slideVisible = true" class="call_left"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-navmenu.svg" alt="" />
      <div @click="visible = true">AI绘图</div>
      <img @click="handGoHome" src="@/assets/logo.png" alt="" class="go_home" />
    </div> -->
    <div class="center">
      <div class="center-view">
        <!-- 选中 -->
        <template v-if="detailData.pictureId">
          <!-- 生成失败 -->
          <template v-if="detailData.isFail">
            <div class="fail-status">
              <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/draw-fail-status.png" alt="" class="fail-img" />
              <div class="fail-friendly">绘画的人太多啦～</div>
              <div class="regenerate-btn" @click="reloadDraw">重新生成</div>
            </div>
          </template>
          <!-- 生成中/生成完成 -->
          <template v-else>
            <!-- 生成完成 -->
            <template v-if="detailData.pictureUrl">
              <div class="show_image">
                <img class="show_image-a" :src="detailData.pictureUrl" alt="" />
                <template v-if="detailData.pictureUrl && !detailData.isFail">
                  <div class="show_image-b">
                    <div class="show_image-b-2">
                      <div class="dl" @click="handDownload">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21" fill="none">
                          <g clip-path="url(#clip0_57_525)">
                            <mask id="mask0_57_525" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0"
                              width="25" height="21">
                              <path d="M25 0.394531H0.00366211V20.6053H25V0.394531Z" fill="white" />
                            </mask>
                            <g mask="url(#mask0_57_525)">
                              <path
                                d="M19.9812 7.89521C19.9812 3.7569 16.6264 0.402466 12.4881 0.402466C8.3498 0.402466 4.99506 3.7569 4.99506 7.89521C2.23669 7.89521 0 10.1316 0 12.8906C0 15.6495 2.23669 17.8859 4.99537 17.8859H7.49305V15.888H4.99537C3.34285 15.888 1.99827 14.5434 1.99827 12.8909C1.99827 11.2381 3.34285 9.89378 4.99537 9.89378H6.99333V7.89551C6.99333 4.86549 9.45808 2.40043 12.4881 2.40043C15.5181 2.40043 17.9829 4.86549 17.9829 7.89551V9.89378H19.9809C21.6337 9.89378 22.978 11.2381 22.978 12.8909C22.978 14.5437 21.6337 15.888 19.9809 15.888H17.4832V17.8859H19.9809C22.7392 17.8859 24.9762 15.6495 24.9762 12.8906C24.9762 10.1316 22.7398 7.89521 19.9812 7.89521Z"
                                fill="#636363" />
                            </g>
                            <path
                              d="M12.4735 20.576L17.8707 14.7702L16.299 13.3067L13.5967 16.2148V8.00677H11.3488V16.2139L8.64619 13.307L7.07446 14.7705L12.4735 20.576Z"
                              fill="#636363" />
                          </g>
                          <defs>
                            <clipPath id="clip0_57_525">
                              <rect width="25" height="20.2107" fill="white" transform="translate(0 0.394531)" />
                            </clipPath>
                          </defs>
                        </svg>
                        下载原图
                      </div>
                      <div class="dl" @click="removeVisible = true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30" fill="none">
                          <path
                            d="M7.09957 9.58141C7.34094 9.58141 7.57243 9.67781 7.74311 9.84941C7.91379 10.021 8.00968 10.2537 8.00968 10.4964V23.3741C8.00968 23.6099 8.0559 23.8435 8.1457 24.0614C8.23551 24.2794 8.36714 24.4774 8.53307 24.6442C8.699 24.8109 8.89598 24.9432 9.11277 25.0334C9.32956 25.1237 9.5619 25.1701 9.79653 25.17H20.5829C21.0566 25.17 21.511 24.9808 21.846 24.644C22.181 24.3072 22.3692 23.8504 22.3692 23.3741V10.4964C22.3692 10.2537 22.4651 10.021 22.6358 9.84941C22.8065 9.67781 23.038 9.58141 23.2793 9.58141C23.5207 9.58141 23.7522 9.67781 23.9229 9.84941C24.0936 10.021 24.1895 10.2537 24.1895 10.4964V23.3741C24.1895 24.3357 23.8095 25.258 23.1331 25.938C22.4567 26.618 21.5394 27 20.5829 27H9.79603C8.8395 27 7.92216 26.618 7.24579 25.938C6.56943 25.258 6.18945 24.3357 6.18945 23.3741V10.4964C6.18945 10.2537 6.28534 10.021 6.45602 9.84941C6.6267 9.67781 6.85819 9.58141 7.09957 9.58141ZM11.819 7.54095C12.0604 7.54095 12.2919 7.44455 12.4626 7.27295C12.6332 7.10136 12.7291 6.86862 12.7291 6.62595C12.7291 6.39006 12.7752 6.15647 12.8649 5.93852C12.9547 5.72056 13.0863 5.52252 13.2521 5.3557C13.418 5.18887 13.615 5.05654 13.8317 4.96625C14.0485 4.87597 14.2808 4.8295 14.5155 4.8295H15.8634C16.0981 4.82943 16.3305 4.87585 16.5473 4.96611C16.7641 5.05636 16.9611 5.18869 17.1271 5.35552C17.293 5.52235 17.4246 5.72041 17.5144 5.9384C17.6042 6.15638 17.6504 6.39002 17.6503 6.62595C17.6503 6.86862 17.7462 7.10136 17.9169 7.27295C18.0875 7.44455 18.319 7.54095 18.5604 7.54095C18.8018 7.54095 19.0333 7.44455 19.204 7.27295C19.3746 7.10136 19.4705 6.86862 19.4705 6.62595C19.4706 5.67242 19.0971 4.75724 18.4309 4.07859C17.7646 3.39993 16.8593 3.01243 15.911 3H14.4684C13.5201 3.01256 12.6149 3.40011 11.9487 4.07873C11.2825 4.75736 10.9089 5.67246 10.9089 6.62595C10.9089 6.86862 11.0048 7.10136 11.1755 7.27295C11.3461 7.44455 11.5776 7.54095 11.819 7.54095Z"
                            fill="#636363" />
                          <path
                            d="M4.18945 7.90189C4.18945 7.66269 4.28514 7.43329 4.45548 7.26416C4.62581 7.09502 4.85683 7 5.09771 7H25.2812C25.5221 7 25.7531 7.09502 25.9234 7.26416C26.0938 7.43329 26.1895 7.66269 26.1895 7.90189C26.1895 8.14108 26.0938 8.37048 25.9234 8.53962C25.7531 8.70876 25.5221 8.80378 25.2812 8.80378H5.09771C4.85683 8.80378 4.62581 8.70876 4.45548 8.53962C4.28514 8.37048 4.18945 8.14108 4.18945 7.90189ZM12.4985 11.1752C12.7394 11.1752 12.9704 11.2703 13.1407 11.4394C13.3111 11.6085 13.4067 11.8379 13.4067 12.0771V22.0981C13.4067 22.3373 13.3111 22.5667 13.1407 22.7358C12.9704 22.905 12.7394 23 12.4985 23C12.2576 23 12.0266 22.905 11.8563 22.7358C11.6859 22.5667 11.5902 22.3373 11.5902 22.0981V12.0771C11.5902 11.8379 11.6859 11.6085 11.8563 11.4394C12.0266 11.2703 12.2576 11.1752 12.4985 11.1752ZM17.8809 11.1752C18.1218 11.1752 18.3528 11.2703 18.5232 11.4394C18.6935 11.6085 18.7892 11.8379 18.7892 12.0771V22.0981C18.7892 22.3373 18.6935 22.5667 18.5232 22.7358C18.3528 22.905 18.1218 23 17.8809 23C17.64 23 17.409 22.905 17.2387 22.7358C17.0684 22.5667 16.9727 22.3373 16.9727 22.0981V12.0771C16.9727 11.8379 17.0684 11.6085 17.2387 11.4394C17.409 11.2703 17.64 11.1752 17.8809 11.1752Z"
                            fill="#636363" />
                        </svg>
                        删除
                      </div>
                    </div>
                  </div>
                  <div class="show_image-b-1" v-if="detailData.pictureType === 1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="26" viewBox="0 0 21 26" fill="none">
                      <g clip-path="url(#clip0_57_513)">
                        <path
                          d="M10.5 22.1646C11.0021 22.1646 11.4091 22.5715 11.4091 23.0737V24.8918C11.4091 25.394 11.0021 25.8009 10.5 25.8009C9.99787 25.8009 9.59091 25.394 9.59091 24.8918V23.0737C9.59091 22.5715 9.99787 22.1646 10.5 22.1646ZM14.1364 22.1646C14.6385 22.1646 15.0455 22.5715 15.0455 23.0737V24.8918C15.0455 25.394 14.6381 25.8009 14.1364 25.8009C13.6342 25.8009 13.2273 25.394 13.2273 24.8918V23.0737C13.2273 22.5715 13.6342 22.1646 14.1364 22.1646ZM6.86364 22.1646C7.36577 22.1646 7.77273 22.5715 7.77273 23.0737V24.8918C7.77273 25.394 7.36577 25.8009 6.86364 25.8009C6.36151 25.8009 5.95455 25.394 5.95455 24.8918V23.0737C5.95455 22.5715 6.36151 22.1646 6.86364 22.1646ZM10.5 0.337158C14.1044 0.337158 17.6783 3.92629 17.6783 10.6227V10.7537C19.4237 11.6291 20.5 13.34 20.5 15.2693C20.5 17.1202 19.63 18.601 17.8899 19.7111C17.6591 19.8585 17.3736 19.894 17.1136 19.8077C16.8537 19.721 16.6463 19.5222 16.5497 19.2658L16.4332 18.9565C16.3263 18.6717 16.0827 18.46 15.7852 18.3943C15.4879 18.3283 15.1776 18.4171 14.9602 18.6305L13.7564 19.8123C13.4165 20.1454 12.9595 20.3315 12.4837 20.3315H8.51811C8.03977 20.3315 7.58097 20.1429 7.24077 19.807L6.04723 18.628C5.83487 18.4181 5.52947 18.3311 5.23828 18.3979C4.94709 18.4646 4.70987 18.6756 4.61009 18.9572L4.50533 19.2509C4.413 19.5101 4.20774 19.7136 3.9478 19.8041C3.68786 19.8947 3.40057 19.8624 3.16726 19.7164C1.3892 18.6046 0.5 17.1227 0.5 15.269C0.5 13.3499 1.56712 11.5999 3.23615 10.7526V10.6209C3.23615 3.11521 6.8956 0.337158 10.5 0.337158ZM10.5 2.15534C7.31108 2.15534 5.05469 4.85349 5.05469 10.6209V11.8681L4.0593 12.3734C3 12.9107 2.31818 14.0346 2.31818 15.269C2.31818 16.1774 2.63104 16.9199 3.3299 17.5698C3.80611 16.9732 4.51314 16.6067 5.27486 16.5616C6.03693 16.5165 6.78232 16.797 7.32528 17.3333L8.51882 18.5122H12.4844L13.6879 17.3315C14.2351 16.7945 14.9833 16.5137 15.7482 16.5577C16.5135 16.6017 17.2244 16.9668 17.706 17.563C18.3789 16.9174 18.6815 16.1756 18.6815 15.2686C18.6815 14.036 18.0014 12.9497 16.8633 12.3787L15.8597 11.8759V10.6223C15.8601 5.35527 13.38 2.15534 10.5 2.15534ZM10.5 4.88261C12.5053 4.88261 14.1364 6.51365 14.1364 8.51898C14.1364 10.5247 12.5053 12.1553 10.5 12.1553C8.49432 12.1553 6.86364 10.5243 6.86364 8.51898C6.86364 6.51365 8.49432 4.88261 10.5 4.88261ZM10.5 6.7008C9.49822 6.7008 8.68182 7.5172 8.68182 8.51898C8.68182 9.52075 9.49822 10.3372 10.5 10.3372C11.5018 10.3372 12.3182 9.52075 12.3182 8.51898C12.3182 7.5172 11.5018 6.7008 10.5 6.7008Z"
                          fill="#126CFE" />
                      </g>
                      <defs>
                        <clipPath id="clip0_57_513">
                          <rect width="20" height="25.4638" fill="white" transform="translate(0.5 0.337158)" />
                        </clipPath>
                      </defs>
                    </svg>
                    升级图片，完美细节并生成单张大图
                  </div>
                  <div class="show-image-c" v-if="detailData.pictureType === 1">
                    <div :class="[
                      'u-btn',
                      detailData.PictureArea.upLeft ? 'u-btn_disabled' : '',
                    ]" @click="madePicture1(1, 'upLeft')">
                      U1
                    </div>
                    <div :class="[
                      'u-btn',
                      detailData.PictureArea.upRight
                        ? 'u-btn_disabled'
                        : '',
                    ]" @click="madePicture1(2, 'upRight')">
                      U2
                    </div>
                    <div :class="[
                      'u-btn',
                      detailData.PictureArea.downLeft
                        ? 'u-btn_disabled'
                        : '',
                    ]" @click="madePicture1(3, 'downLeft')">
                      U3
                    </div>
                    <div :class="[
                      'u-btn',
                      detailData.PictureArea.downRight
                        ? 'u-btn_disabled'
                        : '',
                    ]" @click="madePicture1(4, 'downRight')">
                      U4
                    </div>
                  </div>
                  <div class="newDraw" @click="handNewDraw">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <rect y="6" width="14" height="2" fill="white" />
                      <rect x="6" y="14" width="14" height="2" transform="rotate(-90 6 14)" fill="white" />
                    </svg>
                    <span>新建绘画</span>
                  </div>
                </template>
              </div>
            </template>
            <!-- 生成中 -->
            <template v-else>
              <div class="reloading">
                <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-drawing-loading.gif" alt=""
                  class="drawing-img" />
              </div>
            </template>
          </template>
        </template>
        <!-- 未选中 -->
        <template v-else>
          <div class="none-status">
            <div class="none-img">
              <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/draw-default-static.png" alt="" />
              <div class="none-desc">快来创建你的AI绘画作品吧~</div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <transition>
      <slide-bar v-model:visible="slideVisible"></slide-bar>
    </transition>
    <my-dialog v-model:show="removeVisible" title="温馨提示" message="是否要删除此绘画信息？" showCancelButton confirm-button-text="删除"
      @confirm="handConfirmRemove">
    </my-dialog>
  </div>
</template>

<script setup>
import NavBar from "@/components/mobile/NavBar.vue";
import { showToast, closeToast } from "vant";
import { useRouter } from "vue-router";
import { useDrawStore } from "@/store/draw.js";
import { useUserStore } from "@/store/user";
import { onMounted, onUnmounted, ref, watch } from "vue";
import SlideBar from "@/components/mobile/SlideBar.vue";
import MyDialog from "@/components/mobile/MyDialog.vue";
import request from "@/http/index";
import api from "@/http/api";
import utils from "@/common/utils";

const router = useRouter();
const visible = ref(false);
const slideVisible = ref(false); // 菜单页是否显示
const removeVisible = ref(false);
const userStore = useUserStore();
const drawStore = useDrawStore();

// 图片详情信息
const detailData = ref({
  pictureId: null,
  pictureIdea: null,
  pictureUrl: null,
  bgImageUrl: null,
  pictureRatio: null,
  picturePx: null,
  pictureStyle: null,
  pictureType: null,
  isFail: null,
  PictureArea: {
    upLeft: false,
    upRight: false,
    downLeft: false,
    downRight: false,
  },
});

const handGoHome = () => {
  router.push({
    path: "/",
  });
};

// 去创建
const handNewDraw = () => {
  router.push({
    path: "/draw",
  });
};

// 确认删除图片
const handConfirmRemove = async () => {
  removeVisible.value = false;
  showToast({
    duration: 0,
    forbidClick: true,
    type: "loading",
    message: "加载中",
  });

  request
    .post(api.picture_delPicture, { pictureId: detailData.value.pictureId })
    .then((res) => {
      closeToast();
      if (res.code !== 200) {
        return showToast(res.msg);
      }

      //如果从列表页进入详情页  则返回前清空列表选中数据 刷新
      drawStore.clearHistoryItem();
      router.go(-1);
    });
};

let timer = null;
// 开始轮询详情
const openTimer = (pictureId) => {
  // return console.log("openTimer");

  const sideFn = (pictureId) => {
    getDetail(pictureId).then((result) => {
      if (result === null) {
        clearInterval(timer);
      } else {
        // activeItem.pictureUrl = result.pictureUrl;
        // activeItem.isFail = result.isFail;
        if (result.isFail) {
          return clearInterval(timer);
        }
        if (result.pictureUrl) {
          console.log("if (result.pictureUrl) 关闭定时器");
          return clearInterval(timer);
        }
      }
    });
  };

  clearInterval(timer);

  timer = setInterval(() => {
    sideFn(pictureId);
  }, 20000); //20秒查询一次

  sideFn(pictureId);
};

// 停止轮询详情
const stopTimer = () => {
  clearInterval(timer);
};

// 获取图片详情
const getDetail = async (pictureId) => {
  try {
    const res = await request.get(api.picture_pictureDetail, {
      pictureId: pictureId,
    });
    if (res.code !== 200) {
      showToast(res.msg);
      return;
    }
    detailData.value = res.data;
    const historyItem = {
      ...drawStore.historyItem,
      isFail: detailData.value.isFail,
      pictureId: detailData.value.pictureId,
      pictureUrl: detailData.value.pictureUrl,
    };
    drawStore.saveHistoryItem(historyItem);
    return res.data;
  } catch (error) {
    showToast(error.message);
    throw error;
  }
};

//重新生成绘画
const reloadDraw = async () => {
  showToast({
    duration: 0,
    forbidClick: true,
    type: "loading",
    message: "加载中",
  });

  const res = await request.post(api.picture_resetting, {
    pictureId: drawStore.historyItem.pictureId,
  });

  closeToast();
  if (res.code !== 200) {
    showToast(res.msg || res.message);
    return;
  }

  userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
  detailData.value.isFail = false;

  //更新列表中选中的数据
  const historyItem = {
    ...drawStore.historyItem,
    pictureId: detailData.value.pictureId,
    pictureUrl: detailData.value.pictureUrl,
    isFail: detailData.value.isFail,
  };
  drawStore.saveHistoryItem(historyItem);
};

// 下载图片
const handDownload = () => {
  showToast("请长按图片保存");
  // saveAs(detailData.value.pictureUrl, "picture");
};

// 生成单张大图
const madePicture1 = async (position, k) => {
  try {
    const isUsed = detailData.value.PictureArea[k];
    if (isUsed) {
      showToast("此张图片已生成过单张大图");
      return;
    }
    if (userStore.residuePictureQuantity == 0) {
      showToast("您的绘画次数已用尽，请联系客服购买。");
      return;
    }

    showToast({
      duration: 0,
      forbidClick: true,
      type: "loading",
      message: "加载中",
    });
    const res = await request.post(api.picture_onePicture, {
      parentPictureId: drawStore.historyItem.pictureId,
      pictureArea: position,
    });
    closeToast();

    if (res.code !== 200) {
      showToast(res.msg || res.message);
      return;
    }
    // 更新绘画剩余次数
    userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
    // 更新列表项
    const historyItem = {
      isFail: res.data.isFail,
      pictureId: res.data.pictureId,
      pictureUrl: res.data.pictureUrl,
      scrollTop: 0,
    };
    drawStore.saveHistoryItem(historyItem);
    if (drawStore.historyItem.pictureId != null) {
      openTimer(drawStore.historyItem.pictureId);
    }
  } catch (error) {
    closeToast();
    showToast(error.message);
    throw error;
  }
};

onMounted(() => {
  const historyItem = drawStore.historyItem;
  if (historyItem.pictureId !== null) {
    openTimer(historyItem.pictureId);
  } else {
    utils.goBack();
  }
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style lang="less">
.el-popper {
  background-color: #666666 !important;
  border: none !important;
  font-family: PingFang SC !important;
  line-height: 19px !important;
  height: 19px;
  align-items: center;
  padding: 4px 10px;
  display: flex;

  span {
    font-family: PingFang SC !important;
    font-size: 12px;
  }

  .el-popper__arrow::before {
    width: 12px;
    height: 12px;
    background-color: #666666 !important;
    border: none !important;
    left: -5.2px;
    top: -5px;
  }
}
</style>

<style scoped lang="less">
.container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  overflow: hidden;
  background: #f6f6f6;

  .navbar {
    position: relative;
    z-index: 8;
    width: 100%;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #14181f;
    text-align: center;
    font-family: PingFang SC;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;

    .call_left {
      position: absolute;
      left: 16px;
      top: 50%;
      transform: translate(0, -50%);
      width: 24px;
    }

    .go_home {
      position: absolute;
      right: 16px;
      top: 50%;
      transform: translate(0, -50%);
      width: 26px;
    }
  }

  .center {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .count {
      width: 100%;
      height: 56px;
      color: #141414;
      text-align: center;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 56px;
      background: #dae0f5;
      box-shadow: 0px 4px 8px 0px #efefef;
    }

    .center-view {
      width: 100%;
      height: calc(100% - 56px);
      overflow-y: scroll;
      text-align: center;

      &::-webkit-scrollbar {
        display: none;
      }

      // 未选中任何
      .none-status {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 343px;
        height: 343px;
        // border: 1px dashed rgba(170, 170, 170, 1);
        border-radius: 5px;
        margin: 16px;
        text-align: center;

        .none-img {
          position: relative;
          width: 343px;
          height: 343px;
          transform-origin: center;
          transform: scale(0.58);

          img {
            width: 100%;
            height: 100%;
          }

          .none-desc {
            position: absolute;
            bottom: 60px;
            left: 50%;
            transform: translate(-50%, 0);
            width: 100%;
            color: #999;
            text-align: center;
            font-family: PingFang SC;
            font-size: 18px;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
          }
        }
      }

      // 生成失败
      .fail-status {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 343px;
        height: 343px;
        border-radius: 5px;
        margin: 60px auto 60px auto;
        text-align: center;

        .fail-img {
          width: 110px;
        }

        .fail-friendly {
          margin: 4px 0 11px 0;
          font-family: PingFang SC;
          font-size: 16px;
          color: #858585;
          font-weight: 400;
          line-height: 22px;
          letter-spacing: 0em;
          text-align: center;
        }

        .regenerate-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 190px;
          height: 46px;
          background: rgba(18, 108, 254, 1);
          font-family: PingFang SC;
          font-size: 15px;
          font-weight: 600;
          border-radius: 5px;
          color: #ffff;

          &:active {
            opacity: 0.7;
          }
        }
      }

      .reloading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 343px;
        height: 343px;
        // border: 1px dashed rgba(170, 170, 170, 1);
        border-radius: 5px;
        text-align: center;
        margin: 16px;

        .drawing-img {
          width: 200px;
          height: 200px;
        }
      }

      .show_image {
        width: 343px;
        margin: 16px;
        text-align: center;

        .show_image-a {
          width: 343px;
          height: auto;
          margin: auto;
        }

        .show_image-b {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;

          .show_image-b-2 {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            color: #636363;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            margin-top: 3px;

            .dl {
              display: flex;
              align-items: center;
              margin-left: 17.75px;
              cursor: pointer;
              user-select: none;

              &:active {
                color: #126cfe;
              }

              svg {
                margin-right: 10px;
                width: 19px;
                height: 19px;
              }
            }
          }
        }

        .show_image-b-1 {
          flex: 1;
          display: flex;
          align-items: center;
          color: #126cfe;
          margin-top: 14px;
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          text-align: left;

          svg {
            margin-right: 8.5px;
          }
        }

        .show-image-c {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 60px;

          .u-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 70px;
            height: 30px;
            margin-top: 16px;
            margin-right: 4px;
            border-radius: 5px;
            background: #126cfe;
            color: #fff;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            cursor: pointer;
            user-select: none;

            &:active {
              opacity: 0.7;
            }
          }

          .u-btn_disabled {
            background-color: rgba(0, 34, 89, 1);
          }
        }

        .newDraw {
          position: fixed;
          bottom: 21px;
          left: 50%;
          transform: translate(-50%, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          width: 335px;
          height: 40px;
          color: #fff;
          font-family: PingFang SC;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          border-radius: 5px;
          background: #126cfe;
          margin: auto;
          cursor: pointer;

          svg {
            width: 14px;
            height: 14px;
          }

          span {
            margin-left: 7px;
          }

          &:active {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>