<script setup>
import { onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { ElMessage, ElTooltip, ElDialog } from "element-plus";
import Sidebar from "@/components/Sidebar.vue";
import MyDialog from "@/components/MyDialog.vue";
import DataTab from "./components/DataTab.vue";
import DataHistory from "./components/DataHistory.vue";
import { useUserStore } from "@/store/user";
import request from "@/http/index";
import api from "@/http/api";
import data from "@/common/data";
import { saveAs } from "file-saver";

const userStore = useUserStore(); //用户信息

const loading = ref(false);
const removeVisible = ref(false);
const drawingVisible = ref(false);
const dataHistoryRef = ref(); // 右侧组件ref
const dataTabRef = ref(); //左侧组件ref
const madeDisabled = ref(false); // 控制左侧组件立即生成按钮是否禁止点击

const jokes = data.getJokeList();
const randomNumber = Math.floor(Math.random() * jokes.length);
const jokeIndex = ref(randomNumber);

const drawTips = data.getDrawTipList();
const randomDrawNumber = Math.floor(Math.random() * drawTips.length);
const drawTipsIndex = ref(randomDrawNumber);

const removeBuyVisible = ref(false);

const isExpandMode = ref(true);

// 选中的图片的id
const activeHistoryItem = reactive({
  active: {
    pictureId: null,
    createdAt: "",
    pictureUrl: "",
    isFail: false,
  },
});

// 图片详情信息
const detailData = ref({
  percentage: 0,
  pictureStatus: 0,
  pictureId: null,
  pictureIdea: null,
  pictureUrl: null,
  bgImageUrl: null,
  pictureRatio: null,
  picturePx: null,
  pictureStyle: null,
  pictureType: null,
  isFail: null,
});

// 清空选中图片信息
const clearActive = () => {
  console.log("clearActive");
  activeHistoryItem.active = {
    pictureId: null,
    createdAt: "",
    pictureUrl: "",
    isFail: false,
  };
  detailData.value = {
    pictureId: null,
    pictureIdea: null,
    pictureUrl: null,
    bgImageUrl: null,
    pictureRatio: null,
    picturePx: null,
    pictureStyle: null,
    pictureType: null,
    isFail: null,
  };
  madeDisabled.value = false;
};

let jokerTimer = null;
// 开始轮询详情
const openJokerTimer = () => {
  // console.log("openJokeTimer");

  const sideFn = () => {
    jokeIndex.value = (jokeIndex.value + 1) % jokes.length;
    // console.log('Joke', jokeIndex.value);
  };

  if (jokerTimer) {
    clearInterval(jokerTimer);
  }
  jokerTimer = null;

  jokerTimer = setInterval(() => {
    sideFn();
  }, 15000); //15秒查询一次

  sideFn();
};

// 停止轮询详情
const stopJokerTimer = () => {
  // console.log("stopJokeTimer");
  if (jokerTimer) {
    clearInterval(jokerTimer);
  }
  jokerTimer = null;
};

// 创建四格图片成功 data:{图片id}
const createSuccess = (data) => {
  console.log(data);
  activeHistoryItem.active = {
    ...data,
    pictureUrl: "",
    isFail: false,
  };
  madeDisabled.value = true;
  dataHistoryRef.value.handPutItem(activeHistoryItem.active); //向列表新增一个项
  openJokerTimer();
};

// 确认删除图片
const handConfirmRemove = async () => {
  removeVisible.value = false;
  loading.value = true;
  await dataHistoryRef.value.handRemoveItem(); //删除当前选中
  clearActive();
  loading.value = false;
};

// 生成单张大图
const madePicture1 = async (position, k) => {
  try {
    if (loading.value) return;
    const isUsed = detailData.value.PictureArea[k];
    if (isUsed) {
      return ElMessage({
        type: "warning",
        message: "此张图片已生成过单张大图",
      });
    }
    if (userStore.residuePictureQuantity == 0) {
      buyMember();
      return;
      // return ElMessage({
      //   type: "warning",
      //   message: "您的绘画次数已用尽，请联系客服购买。",
      // });
    }

    loading.value = true;
    const res = await request.post(api.picture_onePicture, {
      parentPictureId: activeHistoryItem.active.pictureId,
      pictureArea: position,
    });

    if (res.code !== 200) {
      loading.value = false;
      if (res.code === 50108) {
        buyMember();
        return;
      }
      return ElMessage({
        message: res.msg || res.message,
        type: "error",
      });
    }

    userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
    activeHistoryItem.active = {
      pictureId: res.data.pictureId,
      createdAt: res.data.createdAt,
      pictureUrl: "",
    };
    dataHistoryRef.value.handPutItem(activeHistoryItem.active); //向列表新增一个项
    loading.value = false;
    openJokerTimer();
  } catch (error) {
    loading.value = false;
    ElMessage(error.message);
    throw error;
  }
};

// 下载图片
const handDownload = () => {
  saveAs(detailData.value.pictureUrl, "picture");
};

// 接收详情信息
const onPostDetail = (data) => {
  detailData.value = data;
  console.log("接收详情信息", data);
  if (data.isFail) {
    madeDisabled.value = false;
    getResidueQuantity();
  } else {
    madeDisabled.value = data.pictureStatus == 2 || data.pictureStatus == 3 ? false : true;
  }
  if (data.pictureUrl) {
    stopJokerTimer();
  }
};

//重新生成绘画
const reloadDraw = async () => {
  if (loading.value) return;
  loading.value = true;

  const res = await request.post(api.picture_resetting, {
    pictureId: activeHistoryItem.active.pictureId,
  });
  if (res.code !== 200) {
    loading.value = false;
    return ElMessage({
      type: "error",
      message: res.msg || res.message,
    });
  }

  userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
  detailData.value.isFail = false;
  activeHistoryItem.active.isFail = false;
  dataHistoryRef.value.handUpdateItem(activeHistoryItem.active); //更新列表中选中的数据
  loading.value = false;
  openJokerTimer();
};

// 获取剩余绘画次数
const getResidueQuantity = () => {
  return new Promise(async (resolve) => {
    try {
      const res = await request.get(api.picture_residueQuantity, {});
      if (res.code !== 200) {
        resolve(false);
        return ElMessage({
          type: "error",
          message: res.msg,
        });
      }
      userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);
      resolve(true);
    } catch (error) {
      resolve(false);
      throw error;
    }
  });
};

function buyMember() {
  removeBuyVisible.value = true;;
}

function onOnPannelToggle(expanded) {
  isExpandMode.value = expanded;
}

onMounted(() => {
  getResidueQuantity();
});

onUnmounted(() => {
  stopJokerTimer();
});
</script>

<template>
  <div class="container">
    <sidebar @on-pannel-toggle="onOnPannelToggle">
      <div class="draw-side">
        <template v-if="isExpandMode">
          <div class="draw-title">AI绘画</div>
          <div class="draw-start" @click="clearActive">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="25" viewBox="0 0 16 25" fill="none">
              <g clip-path="url(#clip0_57_349)">
                <mask id="mask0_57_349" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16"
                  height="25">
                  <path d="M15.7178 0.095459H0.717773V25.0001H15.7178V0.095459Z" fill="white" />
                </mask>
                <g mask="url(#mask0_57_349)">
                  <path
                    d="M1.3203 16.0752C0.0891814 18.2086 1.08282 25.4022 1.34746 24.9478C3.48081 21.2511 6.75717 24.0254 9.04288 20.5354C10.274 18.402 9.545 15.6751 7.41165 14.4477C5.27831 13.2126 2.55142 13.9419 1.3203 16.0752Z"
                    fill="#C9E1FF" />
                </g>
                <mask id="mask1_57_349" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="16"
                  height="25">
                  <path d="M15.7178 0.095459H0.717773V25.0001H15.7178V0.095459Z" fill="white" />
                </mask>
                <g mask="url(#mask1_57_349)">
                  <path
                    d="M7.93398 13.5348C6.71312 12.8293 5.29884 12.7716 4.0813 13.2466L13.1062 0.649889C13.5232 0.0904693 14.3237 -0.0555959 14.9613 0.314038C15.5685 0.663469 15.85 1.37558 15.6297 2.00323L10.0537 16.4345C9.79275 15.2577 9.0601 14.1859 7.93398 13.5348Z"
                    fill="#C9E1FF" />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_57_349">
                  <rect width="15" height="24.9046" fill="white" transform="translate(0.717773 0.095459)" />
                </clipPath>
              </defs>
            </svg>
            <span>新建绘画</span>
          </div>
        </template>
        <template v-else>
          <img src="@/assets/add_chat_shrink.svg" alt="" class="newchat_shink_icon" @click="clearActive" />
        </template>
      </div>
    </sidebar>
    <div class="container-body-wrapper">
      <div class="body-top">
        <div class="tip_line">
          <span v-html="drawTips[drawTipsIndex]" v-if="userStore.residuePictureQuantity > 4"></span>
          <span v-else-if="userStore.residuePictureQuantity > 0">您的绘画次数即将用尽，<span class="tip_buyvip"
              @click="buyMember">购买会员</span>获取更多绘画次数~</span>
          <span v-else>您的绘画次数已用尽，<span class="tip_buyvip" @click="buyMember">购买会员</span>获取更多绘画次数~</span>
        </div>
        <div class="tip_btns">
          <div class="tip_times">
            <img class="tip_msg_icon" src="@/assets/icon_message_left.svg" alt="" />
            <span>{{ userStore.residuePictureQuantity }}次</span>
          </div>
          <div class="tip_buy" @click="buyMember">
            <span>购买会员</span>
          </div>
        </div>
      </div>

      <div class="container-body" v-loading="loading">
        <div class="left">
          <data-tab ref="dataTabRef" @create-success="createSuccess" :detailData="detailData"
          @buyMember="buyMember"
            v-model:madeDisabled="madeDisabled"></data-tab>
        </div>
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
                    <div class="showImageWrapper">
                      <img class="show_image-a" :src="detailData.pictureUrl + '?imageView2/2/format/jpg/q/90!'" alt="" />
                      <div class="image_loading" v-if="detailData.percentage != 100">{{ '图片绘制中 ' + detailData.percentage +
                        '%' }}</div>
                    </div>
                    <template v-if="detailData.pictureUrl && detailData.pictureStatus == 2">
                      <div class="show_image-b">
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
                        <div class="show_image-b-2">
                          <div class="dl" @click="handDownload">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="21" viewBox="0 0 25 21"
                              fill="none">
                              <g clip-path="url(#clip0_57_525)">
                                <mask id="mask0_57_525" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0"
                                  y="0" width="25" height="21">
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="30" viewBox="0 0 31 30"
                              fill="none">
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
                      <div class="show-image-c" v-if="detailData.pictureType === 1">
                        <el-tooltip popper-class="popper_style2" effect="dark" content="升级左侧上方图为单张大图"
                          placement="bottom-start">
                          <div :class="[
                            'u-btn',
                            detailData.PictureArea.upLeft
                              ? 'u-btn_disabled'
                              : '',
                          ]" @click="madePicture1(1, 'upLeft')">
                            U1
                          </div>
                        </el-tooltip>
                        <el-tooltip popper-class="popper_style2" effect="dark" content="升级右侧上方图为单张大图"
                          placement="bottom-start">
                          <div :class="[
                            'u-btn',
                            detailData.PictureArea.upRight
                              ? 'u-btn_disabled'
                              : '',
                          ]" @click="madePicture1(2, 'upRight')">
                            U2
                          </div>
                        </el-tooltip>
                        <el-tooltip popper-class="popper_style2" effect="dark" content="升级左侧下方图为单张大图"
                          placement="bottom-start">
                          <div :class="[
                            'u-btn',
                            detailData.PictureArea.downLeft
                              ? 'u-btn_disabled'
                              : '',
                          ]" @click="madePicture1(3, 'downLeft')">
                            U3
                          </div>
                        </el-tooltip>
                        <el-tooltip popper-class="popper_style2" effect="dark" content="升级右侧下方图为单张大图"
                          placement="bottom-start">
                          <div :class="[
                            'u-btn',
                            detailData.PictureArea.downRight
                              ? 'u-btn_disabled'
                              : '',
                          ]" @click="madePicture1(4, 'downRight')">
                            U4
                          </div>
                        </el-tooltip>
                      </div>
                    </template>
                  </div>
                </template>
                <!-- 生成中 -->
                <template v-else>
                  <div class="reloading">
                    <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/drawing-loading.gif" alt=""
                      class="drawing-img" />
                    <div class="joke" v-html="jokes[jokeIndex]"></div>
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
        <div class="right">
          <data-history ref="dataHistoryRef" v-model:active="activeHistoryItem.active"
            @post-detail="onPostDetail"></data-history>
        </div>
      </div>
    </div>

    <my-dialog :show-close="false" :close-on-click-modal="false" v-model:visible="removeVisible">
      <div class="dia_">
        <div class="dia_title">温馨提示</div>
        <div class="dia_text">是否要删除此绘画信息？</div>
        <div class="dia_footer">
          <div class="cancel" @click="removeVisible = false">取消</div>
          <div class="confirm" @click="handConfirmRemove">删除</div>
        </div>
      </div>
    </my-dialog>
    <my-dialog :show-close="false" :close-on-click-modal="false" v-model:visible="drawingVisible">
      <div class="dia_">
        <div class="dia_title">温馨提示</div>
        <div class="dia_text">AI绘画课程正在制作中～</div>
        <div class="dia_footer1" @click="drawingVisible = false">确认</div>
      </div>
    </my-dialog>
    <div class="custDialog">
      <el-dialog :show-close="false" :close-on-click-modal="false" v-model="removeBuyVisible">
        <div class="buyMember_dia">
          <img class="buyMemberBg" src="https://quanres.hanhoukeji.com/hanhou-ai-pc/buy_memeber_dialog.png" alt="" />
          <img class="buyMemberClose" src="@/assets/dialog_close.svg" alt="" @click="removeBuyVisible = false" />
          <span class="buyMemeberTitle">购买会员获得更多绘画次数</span>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<style lang="less">
.popper_style2 {
  background-color: rgba(0, 0, 0, 0.6) !important;
  border: none !important;
  font-family: PingFang SC !important;

  span {
    font-family: PingFang SC !important;
  }

  .el-popper__arrow::before {
    background-color: transparent !important;
    border: none !important;
  }
}
</style>
<style scoped lang="less">
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;

  .custDialog {
    /deep/.el-dialog {
      background-color: transparent;
      width: 1065px;
      height: 727px;
    }

    /deep/.el-dialog__header {
      display: none;
    }

    /deep/.el-dialog__body {
      width: 1065px;
      height: 727px;
      padding: 0px !important;

    }
  }

  .buyMember_dia {
    width: 1065px;
    height: 727px;

    .buyMemberBg {
      width: 1065px;
      height: 727px;
    }

    .buyMemberClose {
      position: absolute;
      right: 40px;
      top: 40px;
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    .buyMemeberTitle {
      color: #333;
      font-size: 40px;
      font-weight: 600;
      position: absolute;
      left: 50%;
      top: 60px;
      transform: translateX(-50%);
    }
  }

  .draw-side {
    height: 100%;
    overflow-y: scroll;
    text-align: center;

    .newchat_shink_icon {
      width: 53px;
      height: 53px;
      cursor: pointer;
    }

    .draw-title {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 266px;
      height: 46px;
      color: #fff;
      font-family: PingFang SC;
      font-size: 19px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      border-radius: 5px;
      background: #126cfe;
      margin: auto;
    }

    .draw-start {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 266px;
      height: 46px;
      margin: 22px auto;
      border-radius: 5px;
      border: 1px solid #5aa1f8;
      color: #c9e1ff;
      font-family: PingFang SC;
      font-size: 19px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      cursor: pointer;
      user-select: none;

      svg {
        width: 15px;
        height: 16.9px;
      }

      span {
        text-indent: 5.3px;
      }

      &:active {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }

  .container-body-wrapper {
    display: flex;
    flex-direction: column;
    flex: 1;

    .body-top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 68px;
      background-color: #1F211E;
      flex-direction: row;
      font-family: PingFang SC;



      .tip_line {
        margin-left: 28px;
        color: #E9E9E8;
        font-size: 20px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        flex: 1;

        .tip_buyvip {
          color: #FAE1C6;
          font-size: 20px;
          text-decoration: underline;
          cursor: pointer;
        }
      }

      .tip_btns {
        display: flex;
        flex-direction: row;
        height: 42px;

        .tip_times {
          display: flex;
          flex-direction: row;
          font-size: 20px;
          color: #FAE1C6;
          margin-right: 60px;
          align-items: center;
          justify-content: center;
          padding: 0 22px 0 6px;
          height: 42px;
          background-color: #3B3633;
          border-radius: 23.5px;

          .tip_msg_icon {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }

        .tip_buy {
          height: 42px;
          width: 124px;
          margin-right: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          outline: 1px solid #FAE1C6;
          background-color: #3B3633;
          border-radius: 23.5px;
          font-size: 20px;
          color: #FAE1C6;
          cursor: pointer;
        }
      }
    }

    .container-body {
      position: relative;
      flex: 1;
      height: 100%;
      overflow: hidden;
      background: #f1f2f6;

      .left {
        position: absolute;
        top: 0;
        left: 0;
        width: 381px;
        height: calc(100% - 32px);
        padding: 16px 0 16px 16px;
      }

      .center {
        width: calc(100% - 180px - 397px);
        height: 100%;
        padding-left: 397px;
        overflow: hidden;

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
            width: 850px;
            height: 850px;
            border: 1px dashed rgba(170, 170, 170, 1);
            border-radius: 5px;
            margin: 80px auto 80px auto;
            text-align: center;

            .none-img {
              position: relative;
              width: 320px;
              height: 320px;

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
            width: 850px;
            height: 850px;
            border-radius: 5px;
            margin: 60px auto 60px auto;
            text-align: center;

            .fail-img {
              width: 150px;
            }

            .fail-friendly {
              margin: 20.62px 0 11px 0;
              font-family: PingFang SC;
              font-size: 16px;
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
              font-size: 19px;
              font-weight: 600;
              border-radius: 5px;
              color: #ffff;

              &:active {
                opacity: 0.7;
              }
            }
          }

          .reloading {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 850px;
            height: 850px;
            border: 1px dashed rgba(170, 170, 170, 1);
            border-radius: 5px;
            margin: 60px auto 60px auto;
            text-align: center;

            .drawing-img {
              width: 320px;
              height: 320px;
            }

            .joke {
              position: absolute;
              top: 50%;
              left: 50%;
              max-width: 476px;
              margin-top: 245px;
              transform: translate(-50%, -50%);
              color: #aaaaaa;
              font-size: 14px;
              text-align: left;
            }
          }

          .show_image {
            width: 850px;
            margin: 60px auto 60px auto;
            text-align: center;

            .showImageWrapper {
              position: relative;

              .image_loading {
                position: absolute;
                top: 50%;
                left: 50%;
                padding: 0 34px;
                border-radius: 46px;
                transform: translate(-50%, -50%);
                display: flex;
                align-items: center;
                justify-content: center;
                background-color: rgba(0, 0, 0, 0.5);
                font-size: 18px;
                color: white;
                height: 46px;
              }

              .show_image-a {
                width: 850px;
                height: auto;
                margin: auto;
              }
            }

            .show_image-b {
              display: flex;
              align-items: center;
              justify-content: space-between;
              flex-wrap: wrap;
              margin-top: 15.57px;

              .show_image-b-1 {
                flex: 1;
                display: flex;
                align-items: center;
                color: #126cfe;
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

              .show_image-b-2 {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                color: #636363;
                font-family: PingFang SC;
                font-size: 16px;
                font-style: normal;
                font-weight: 400;
                line-height: normal;

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
                  }
                }
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
                width: 111px;
                height: 35px;
                margin-top: 16.53px;
                margin-right: 18.38px;
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
          }
        }
      }

      .right {
        position: absolute;
        top: 0;
        right: 0;
        width: 180px;
        height: calc(100% - 32px);
        padding: 16px 0;
      }
    }
  }

  .dia_ {
    .dia_title {
      margin-top: 33.7px;
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 30px;
      font-style: normal;
      font-weight: 600;
      line-height: 42px;
    }

    .dia_text {
      margin-top: 12px;
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: 28px;
    }

    .dia_footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;
      margin-bottom: 21.7px;

      .cancel {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 220px;
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

      .confirm {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 220px;
        height: 52px;
        flex-shrink: 0;
        border-radius: 6px;
        border: 1px solid #126cfe;
        background-color: #fff;
        color: #126cfe;
        text-align: center;
        font-family: PingFang SC;
        font-size: 19px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        cursor: pointer;

        &:active {
          opacity: 0.8;
        }
      }
    }

    .dia_footer1 {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 52px;
      margin: 67px 0 4.7px 0;
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
</style>
