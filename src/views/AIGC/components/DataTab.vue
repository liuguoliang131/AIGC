<template>
  <div class="data-tab">
    <div class="title">AI绘画</div>
    <div class="ipt">
      <textarea
        class="textarea"
        v-model="ipt"
        resize="none"
        maxlength="500"
        @keydown="sendByKey"
        :autosize="false"
        placeholder="请描述您想要的画面（目前仅支持中文、英文）。暂不支持Midjourney的参数填写。"
      ></textarea>
      <div class="limit">{{ ipt.length }}/500</div>
    </div>
    <div class="taketry">
      <span>随便试试</span>
    </div>
    <div class="title2">
      <span class="title2-n">参考图</span>
      <el-tooltip
        class="box-item"
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
      <file-upload v-model:value="cardData.bgImageUrl">
        <div class="upload">
          <div class="cover" v-if="cardData.bgImageUrl">
            <el-image
              style="width: 100%; height: 100%; border-radius: inherit"
              :src="cardData.bgImageUrl"
              fit="cover"
            />
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
            <div class="none-text">支持JPG、PNG 10M以内</div>
          </div>
        </div>
      </file-upload>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElDialog, ElInput, ElTooltip, ElImage } from "element-plus";
import FileUpload from "@/components/FileUpload.vue";

const { showClose, closeOnClickModal, visible } = defineProps({
  showClose: {
    default: false,
    type: Boolean,
    description: "是否显示关闭按钮",
  },
  closeOnClickModal: {
    default: false,
    type: Boolean,
    description: "点击遮罩层是否关闭弹窗",
  },
  visible: {
    default: false,
    type: Boolean,
    description: "打开/关闭",
  },
});

const emit = defineEmits(["close"]);

const ipt = ref("");

const cardData = reactive({
  bgImageUrl:
    "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg", //参考图(背景图cdn地址)
});
</script>
<style lang="less">
.is-dark {
  background-color: #666666 !important;
  border: none !important;
  .el-popper__arrow::before {
    background-color: #666666 !important;
    border: none !important;
  }
}
</style>
<style scoped lang="less">
.data-tab {
  height: 100%;
  padding: 17px;
  overflow-y: scroll;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  &::-webkit-scrollbar {
    display: none;
  }
  .title {
    margin-top: 12px;
    margin-bottom: 15.4px;
    color: #000;
    text-align: right;
    font-family: PingFang SC;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
  }
  .ipt {
    position: relative;
    width: calc(100% - 5px);
    height: 129.3px;
    padding: 7.7px 5px 26px 0;
    border-radius: 5px;
    border: 1px solid #e3e3e3;
    background: #fafafa;
    .limit {
      position: absolute;
      right: 6px;
      bottom: 0;
      height: 26px;
      text-align: right;
      color: rgba(0, 0, 0, 0.3);
      font-family: PingFang SC;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      line-height: 20px;
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
      resize: none; /*禁止拉伸*/
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
    margin-top: 30.49px;
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
    width: 89px;
    height: 89px;
    border: 1px dashed #e3e3e3;
    margin-top: 15.4px;
    background-color: #fafafa;
    border-radius: 5px;
    user-select: none;
    cursor: pointer;
    &:active {
      border: 1px dashed #5e9dfe;
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
        color: rgba(0, 0, 0, 0.3);
        text-align: center;
        font-family: PingFang SC;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: 12px; /* 120% */
        transform: scale(0.83);
      }
    }
    .cover {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>