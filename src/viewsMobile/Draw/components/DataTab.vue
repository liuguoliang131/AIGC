<script setup>
import { ref, reactive, watch } from "vue";
import request from "@/http/index";
import api from "@/http/api";
import { ElTooltip, ElImage } from "element-plus";
import MyUpload from "@/components/MyUpload.vue";
import { useUserStore } from "@/store/user";
import { showToast, closeToast } from "vant";

const props = defineProps({
  detailData: {
    type: Object,
    description: "图片详情信息",
  },
  madeDisabled: {
    type: Boolean,
    description: "立即生成禁止点击",
  },
});

const emit = defineEmits(["create-success", "update:madeDisabled"]);

const userStore = useUserStore();

// 交互数据
const baseData = ref({
  pictureId: null,
  pictureIdea: "", //文本
  bgImageUrl: "", // 参考图
  pictureRatio: 1, // 图片比例
  picturePx: 1, // 图片品质
  pictureStyle: 1, // 绘画风格
});

// 绘画风格列表
const drawStyle = ref([
  {
    name: "默认风格",
    id: 1,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_mr.png",
  },
  {
    name: "2.5D风格",
    id: 2,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_dj.png",
  },
  {
    name: "赛博朋克",
    id: 3,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_sbpk.png",
  },
  {
    name: "二次元",
    id: 4,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_ecy.png",
  },
  {
    name: "插画风格",
    id: 5,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_ch.png",
  },
  {
    name: "水墨风格",
    id: 6,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_sm.png",
  },
  {
    name: "写实主义",
    id: 7,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_xs.png",
  },
  {
    name: "工业风格",
    id: 8,
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/drawstyle_gy.png",
  },
]);

// 图片品质
const pxOptions = ref([
  {
    id: 1,
    name: "普通",
  },
  {
    id: 2,
    name: "高清",
  },
  {
    id: 3,
    name: "超高清",
  },
]);

// 图片比例选项
const ratioOptions = ref([
  {
    id: 1,
    name: "1:1",
    desc: "适用头像",
  },
  {
    id: 2,
    name: "3:2",
    desc: "适用文章配图",
  },
  {
    id: 3,
    name: "4:3",
    desc: "适用文章配图",
  },
  {
    id: 4,
    name: "9:16",
    desc: "适用海报",
  },
  {
    id: 5,
    name: "16:9",
    desc: "适用电脑壁纸",
  },
]);

// 随便试试
const handRange = () => {
  const arr = [
    "欢快的小猫咪在追逐彩色气球",
    "魔幻森林和仙境般的奇幻世界",
    "充满活力和动感的音乐舞台",
    "具有象征意义的文化符号和传统元素",
    "赛博朋克风格的猫耳形状头戴式耳机",
    "Vibrant abstract patterns and shapes",
    "Harmonious color schemes and gradients",
    "Futuristic cityscape with advanced technology",
    "Bold and dynamic typography compositions",
    "Serene natural landscapes and breathtaking views",
  ];
  const idx = Math.floor(Math.random() * 10);

  baseData.value.pictureIdea = arr[idx];
};

// 点击开始生成 生成4图
const madePicture4 = async () => {
  try {
    if (props.madeDisabled) {
      return false;
    }
    if (!baseData.value.pictureIdea) {
      showToast("绘画描述不可为空。");
      return;
    }
    if (userStore.residuePictureQuantity == 0) {
      showToast("您的绘画次数已用尽，请联系客服购买。");
      return;
    }
    emit("update:madeDisabled", true);
    const params = {
      ...baseData.value,
    };
    delete params.pictureId;
    const res = await request.post(api.picture_fourPalaceGrid, params);
    if (res.code !== 200) {
      emit("update:madeDisabled", false);
      showToast(res.msg || res.message);
      return;
    }

    userStore.saveResiduePictureQuantity(res.data.residuePictureQuantity);

    emit("create-success", res.data);
  } catch (error) {
    emit("update:madeDisabled", false);
    showToast(error.message);
    throw error;
  }
};
</script>

<template>
  <div class="tabContainer">
    <div class="data-tab">
      <div class="ipt">
        <textarea
          class="textarea"
          v-model="baseData.pictureIdea"
          resize="none"
          maxlength="500"
          :autosize="false"
          placeholder="请描述您想要的画面"
        ></textarea>
        <div class="ipt_ass" v-if="baseData.pictureIdea.length">
          <div class="limit">
            <span class="weight">{{ baseData.pictureIdea.length }}</span
            >/500
          </div>
          <div class="vertical"></div>
          <div class="clear_input" @click="baseData.pictureIdea = ''">清空</div>
        </div>
        <div class="ipt_ass" v-else>
          <div class="limit">{{ baseData.pictureIdea.length }}/500</div>
        </div>
      </div>
      <div class="taketry">
        <span @click="handRange">随便试试</span>
      </div>
      <div class="title2">
        <span class="title2-n">参考图</span>
        <el-tooltip
          popper-class="popper_style"
          effect="dark"
          content="基于参考图生成作品"
          placement="right"
        >
          <div class="title2-t">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <mask
                id="mask0_57_258"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="12"
                height="13"
              >
                <path d="M11.9977 0H0V12.0164H11.9977V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_57_258)">
                <path
                  d="M5.9917 0.00939941C9.30195 0.00939941 11.9859 2.6933 11.9859 6.00355C11.9859 9.31379 9.30195 11.9977 5.9917 11.9977C2.68146 11.9977 -0.00244141 9.31379 -0.00244141 6.00355C-0.00244141 2.6933 2.68146 0.00939941 5.9917 0.00939941ZM5.9917 1.00842C3.23346 1.00842 0.996583 3.2453 0.996583 6.00355C0.996583 8.76179 3.23346 10.9987 5.9917 10.9987C8.74995 10.9987 10.9868 8.76179 10.9868 6.00355C10.9868 3.2453 8.74995 1.00842 5.9917 1.00842ZM6.09863 7.71633C6.51249 7.71633 6.8479 8.05194 6.8479 8.46559C6.8479 8.87945 6.51249 9.21486 6.09863 9.21486C5.68478 9.21486 5.34936 8.87945 5.34936 8.46559C5.34936 8.05194 5.68478 7.71633 6.09863 7.71633ZM6.06312 3.00647C6.33902 3.00647 6.56263 3.23008 6.56263 3.50598V6.36023C6.56263 6.63613 6.33902 6.85974 6.06312 6.85974C5.78722 6.85974 5.56361 6.63613 5.56361 6.36023V3.50598C5.56361 3.23008 5.78722 3.00647 6.06312 3.00647Z"
                  fill="#111111"
                  fill-opacity="0.3"
                />
              </g>
            </svg>
            <span class="tip_">选填</span>
          </div>
        </el-tooltip>
      </div>
      <div>
        <my-upload
          :type="['image/png', 'image/jpeg']"
          v-model:value="baseData.bgImageUrl"
          v-slot="slotProps"
        >
          <div class="upload">
            <template v-if="slotProps.loading">
              <div class="upload-loading">
                <img
                  class="loading-img"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/draw-default-static.png"
                  alt=""
                />
                <div class="loading-text">上传中</div>
              </div>
            </template>
            <template v-else>
              <div class="cover" v-if="baseData.bgImageUrl">
                <el-image
                  style="width: 100%; height: 100%; border-radius: inherit"
                  :src="baseData.bgImageUrl"
                  fit="cover"
                />
                <div class="clear_img" @click.stop="baseData.bgImageUrl = ''">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="5"
                    height="5"
                    viewBox="0 0 5 5"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_556_551)">
                      <path
                        d="M3.08163 2.48573L4.87667 0.710313C5.03979 0.549295 5.04109 0.286444 4.88007 0.123318C4.71905 -0.0398084 4.45588 -0.0411056 4.29308 0.119913L2.49561 1.8976L0.725541 0.122021C0.563225 -0.0402948 0.300861 -0.0411056 0.138546 0.12121C-0.0237698 0.283201 -0.0242562 0.54589 0.137735 0.708205L1.90521 2.48119L0.123141 4.24412C-0.0399851 4.40563 -0.0412824 4.66799 0.119736 4.83112C0.201137 4.91333 0.307834 4.95435 0.414855 4.95435C0.520255 4.95435 0.625655 4.91414 0.706731 4.83452L2.49139 3.06948L4.29048 4.87425C4.3714 4.95565 4.47777 4.99619 4.58447 4.99619C4.69068 4.99619 4.79656 4.95549 4.87748 4.87506C5.03979 4.71323 5.04028 4.45087 4.87829 4.28807L3.08163 2.48573Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_556_551">
                        <rect width="5" height="4.99643" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
              <div class="upload-none" v-else>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                >
                  <path
                    d="M1 7.59937H13.56"
                    stroke="#AFAFAF"
                    stroke-linecap="round"
                  />
                  <path
                    d="M7.20996 14.021L7.20996 1.461"
                    stroke="#AFAFAF"
                    stroke-linecap="round"
                  />
                </svg>
                <div class="none-text">支持JPG、PNG<br />10M以内</div>
              </div>
            </template>
          </div>
        </my-upload>
      </div>
      <div class="title2">
        <span class="title2-n">图片品质</span>
        <el-tooltip
          popper-class="popper_style"
          effect="dark"
          content="品质越高，绘制时间越长"
          placement="right"
        >
          <div class="title2-t">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
            >
              <mask
                id="mask0_57_258"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="12"
                height="13"
              >
                <path d="M11.9977 0H0V12.0164H11.9977V0Z" fill="white" />
              </mask>
              <g mask="url(#mask0_57_258)">
                <path
                  d="M5.9917 0.00939941C9.30195 0.00939941 11.9859 2.6933 11.9859 6.00355C11.9859 9.31379 9.30195 11.9977 5.9917 11.9977C2.68146 11.9977 -0.00244141 9.31379 -0.00244141 6.00355C-0.00244141 2.6933 2.68146 0.00939941 5.9917 0.00939941ZM5.9917 1.00842C3.23346 1.00842 0.996583 3.2453 0.996583 6.00355C0.996583 8.76179 3.23346 10.9987 5.9917 10.9987C8.74995 10.9987 10.9868 8.76179 10.9868 6.00355C10.9868 3.2453 8.74995 1.00842 5.9917 1.00842ZM6.09863 7.71633C6.51249 7.71633 6.8479 8.05194 6.8479 8.46559C6.8479 8.87945 6.51249 9.21486 6.09863 9.21486C5.68478 9.21486 5.34936 8.87945 5.34936 8.46559C5.34936 8.05194 5.68478 7.71633 6.09863 7.71633ZM6.06312 3.00647C6.33902 3.00647 6.56263 3.23008 6.56263 3.50598V6.36023C6.56263 6.63613 6.33902 6.85974 6.06312 6.85974C5.78722 6.85974 5.56361 6.63613 5.56361 6.36023V3.50598C5.56361 3.23008 5.78722 3.00647 6.06312 3.00647Z"
                  fill="#111111"
                  fill-opacity="0.3"
                />
              </g>
            </svg>
          </div>
        </el-tooltip>
      </div>

      <div class="quality">
        <div
          v-for="item in pxOptions"
          :key="item.id"
          :class="[
            baseData.picturePx === item.id
              ? 'quality-item_active'
              : 'quality-item',
          ]"
          @click="baseData.picturePx = item.id"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="title2">
        <span class="title2-n">图片比例</span>
      </div>
      <div class="scale">
        <div
          v-for="item in ratioOptions"
          :key="item.id"
          :class="[
            baseData.pictureRatio === item.id
              ? 'scale-item_active'
              : 'scale-item',
          ]"
          @click="baseData.pictureRatio = item.id"
        >
          <div class="t1">{{ item.name }}</div>
          <div class="t2">{{ item.desc }}</div>
        </div>
      </div>

      <div class="title2">
        <span class="title2-n">图片风格</span>
      </div>

      <div class="drawstyle">
        <div
          class="drawstyle-item"
          v-for="(item, index) in drawStyle"
          :key="index"
          @click="baseData.pictureStyle = item.id"
        >
          <img :src="item.path" alt="" />
          <div
            :class="[
              item.id === baseData.pictureStyle ? 'mask-active' : 'mask',
            ]"
          ></div>
          <div class="style_title">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="btnWrapper">
      <div
        v-if="props.madeDisabled"
        :class="['action-btn', 'action-btn_disabled']"
      >
        生成中
      </div>
      <div v-else :class="['action-btn']" @click="madePicture4">立即生成</div>
    </div>
  </div>
</template>

<style lang="less">
.popper_style {
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
    font-size: 10px;
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
.tabContainer {
  display: flex;
  flex-direction: column;
  height: 100%;

  .data-tab {
    box-sizing: border-box;
    height: 100%;
    padding: 16px 14px 107px 14px;
    overflow-y: scroll;
    border-radius: 5px;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
      display: none;
    }

    .ipt {
      position: relative;
      box-sizing: border-box;
      width: 100%;
      height: 166px;
      padding: 7.7px 5px 24px 0;
      border-radius: 5px;
      border: 1px solid #e3e3e3;
      background: #fafafa;

      .ipt_ass {
        position: absolute;
        right: 6px;
        bottom: 0;
        height: 26px;
        display: flex;
        justify-content: flex-end;
        text-align: right;
        color: rgba(0, 0, 0, 0.3);
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;

        .limit {
          color: rgba(0, 0, 0, 0.3);

          .weight {
            color: rgba(0, 0, 0, 0.7);
          }
        }

        .vertical {
          width: 1px;
          height: 7.2px;
          margin: 6.88px 8.27px;
          background: rgba(0, 0, 0, 0.3);
        }

        .clear_input {
          cursor: pointer;
          color: rgba(0, 0, 0, 0.7);

          &:active {
            opacity: 0.7;
          }
        }
      }

      .textarea {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 7.5px 0 12.5px;
        background: #fafafa;
        outline: none;
        color: #333;
        font-size: 16px;
        border: none;
        resize: none;

        /*禁止拉伸*/
        &::placeholder {
          color: rgba(0, 0, 0, 0.3);
          font-family: PingFang SC;
          font-size: 16px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        &::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-thumb {
          background-color: #0003;
          border-radius: 10px;
          transition: all 0.2s ease-in-out;
        }

        ::-webkit-scrollbar-track {
          border-radius: 10px;
        }
      }
    }

    .taketry {
      text-align: right;
      line-height: 19.28px;

      span {
        color: #126cfe;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        cursor: pointer;
        user-select: none;
      }
    }

    .title2 {
      margin-top: 24px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      color: #000;
      text-align: right;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: 28px;

      .title2-n {
        margin-right: 8px;
      }

      .title2-t {
        display: flex;
        align-items: center;

        svg {
          width: 12px;
          height: 12px;
        }

        .tip_ {
          margin-left: 7.3px;
          color: rgba(0, 0, 0, 0.3);
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
      }
    }

    .upload {
      width: 97px;
      height: 91px;
      border: 1px dashed #e3e3e3;
      background-color: #fafafa;
      border-radius: 5px;
      user-select: none;
      cursor: pointer;
      overflow: hidden;

      &:active {
        border: 3px dotted #5e9dfe;
      }

      .upload-loading {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        .loading-img {
          width: 59px;
          height: 59px;
        }

        .loading-text {
          position: absolute;
          top: 53.5px;
          left: 50%;
          width: calc(100% / 0.56);
          color: rgba(0, 0, 0, 0.3);
          text-align: center;
          font-family: PingFang SC;
          font-size: 18px;
          font-style: normal;
          font-weight: 400;
          transform: translate(-50%, 0) scale(0.56);
        }
      }

      .upload-none {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        svg {
          margin-top: 25px;
          margin-bottom: 15px;
        }

        .none-text {
          width: calc(100% / 0.67);
          color: rgba(0, 0, 0, 0.3);
          text-align: center;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
          /* 120% */
          transform: scale(0.67);
        }
      }

      .cover {
        position: relative;
        width: 100%;
        height: 100%;
        border-radius: 5px;

        .clear_img {
          position: absolute;
          top: -14.15px;
          right: -14.15px;
          display: flex;
          align-items: center;
          width: 28.3px;
          height: 28.3px;
          background-color: #464646;
          transform-origin: center;
          transform: rotate(-45deg);

          svg {
            width: 5px;
            height: 5px;
            transform-origin: center;
            transform: rotate(45deg) translate(50%, -50%);
          }
        }
      }
    }

    .quality {
      display: flex;
      justify-content: start;
      width: 100%;

      .quality-item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 91px;
        height: 31px;
        border-radius: 5px;
        border: 1px dashed #848484;
        color: #848484;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        user-select: none;
        cursor: pointer;
        &:not(:last-child) {
          margin-right: 16.32px;
        }
      }

      .quality-item_active {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 91px;
        height: 31px;
        border-radius: 5px;
        border: 0.7px solid #126cfe;
        color: #126cfe;
        font-family: PingFang SC;
        font-size: 14px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        user-select: none;
        &:not(:last-child) {
          margin-right: 16.32px;
        }
      }
    }

    .scale {
      display: grid;
      grid-template-rows: 31px;
      grid-template-columns: 91px 91px 91px;
      grid-row-gap: 16.05px;
      grid-column-gap: 16.32px;
      width: 100%;

      .scale-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 91px;
        height: 31px;
        border-radius: 5px;
        border: 1px dashed #848484;
        color: #848484;
        text-align: center;
        user-select: none;
        cursor: pointer;

        .t1 {
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
        }

        .t2 {
          width: 132px;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
          transform: scale(0.67);
        }
      }

      .scale-item_active {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 91px;
        height: 31px;
        border-radius: 5px;
        border: 0.7px solid #126cfe;
        color: #126cfe;
        text-align: center;
        user-select: none;

        .t1 {
          font-family: PingFang SC;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
        }

        .t2 {
          width: 132px;
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 12px;
          transform: scale(0.67);
        }
      }
    }

    .drawstyle {
      display: grid;
      grid-template-rows: 80px;
      grid-template-columns: 80px 80px 80px 80px;
      grid-row-gap: 5px;
      grid-column-gap: 7px;
      width: 100%;

      .drawstyle-item {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 5px;

        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .mask {
          z-index: 1;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          border-radius: 5px;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
          cursor: pointer;
          user-select: none;
        }

        .mask-active {
          z-index: 1;
          position: absolute;
          top: -1px;
          left: -1px;
          width: 82px;
          height: 82px;
          box-sizing: border-box;
          border: 3px solid rgba(18, 108, 254, 1);
          border-radius: 5px;
          background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.3));
        }

        .style_title {
          z-index: 2;
          position: absolute;
          bottom: 4px;
          left: 0;
          width: calc(100% / 0.67);
          text-align: center;
          font-family: PingFang SC;
          font-size: 18px;
          font-weight: 400;
          line-height: 25.37px;
          color: rgba(255, 255, 255, 1);
          transform-origin: left bottom;
          transform: scale(0.67);
          cursor: pointer;
          user-select: none;
        }
      }
    }
  }

  .btnWrapper {
    display: flex;
    position: absolute;
    width: 100%;
    bottom: 0;
    z-index: 8;
    align-items: center;
    justify-content: center;
    background-color: #f6f6f6;
    padding-top: 22px;
    padding-bottom: 22px;

    .action-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 343px;
      height: 46px;
      border-radius: 5px;
      background-color: rgba(18, 108, 254, 1);
      color: rgba(243, 243, 250, 1);
      font-family: PingFang SC;
      font-size: 19px;
      font-weight: 600;
      cursor: pointer;
      user-select: none;

      &:active {
        opacity: 0.7;
      }
    }

    .action-btn_disabled {
      opacity: 0.7;
      cursor: auto;
    }
  }
}
</style>