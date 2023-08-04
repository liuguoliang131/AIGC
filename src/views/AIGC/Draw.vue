<script setup>
import { ref } from "vue";
import Sidebar from "./components/Sidebar.vue";
import MyDialog from "@/components/MyDialog.vue";
import DataTab from "./components/DataTab.vue";
import DataHistory from "./components/DataHistory.vue";
const visible = ref(false);
</script>

<template>
  <div class="container">
    <sidebar>
      <div class="draw-side">
        <div class="draw-title">AI绘画</div>
        <div class="draw-start">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="25"
            viewBox="0 0 16 25"
            fill="none"
          >
            <g clip-path="url(#clip0_57_349)">
              <mask
                id="mask0_57_349"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="25"
              >
                <path
                  d="M15.7178 0.095459H0.717773V25.0001H15.7178V0.095459Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_57_349)">
                <path
                  d="M1.3203 16.0752C0.0891814 18.2086 1.08282 25.4022 1.34746 24.9478C3.48081 21.2511 6.75717 24.0254 9.04288 20.5354C10.274 18.402 9.545 15.6751 7.41165 14.4477C5.27831 13.2126 2.55142 13.9419 1.3203 16.0752Z"
                  fill="#C9E1FF"
                />
              </g>
              <mask
                id="mask1_57_349"
                style="mask-type: luminance"
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="16"
                height="25"
              >
                <path
                  d="M15.7178 0.095459H0.717773V25.0001H15.7178V0.095459Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask1_57_349)">
                <path
                  d="M7.93398 13.5348C6.71312 12.8293 5.29884 12.7716 4.0813 13.2466L13.1062 0.649889C13.5232 0.0904693 14.3237 -0.0555959 14.9613 0.314038C15.5685 0.663469 15.85 1.37558 15.6297 2.00323L10.0537 16.4345C9.79275 15.2577 9.0601 14.1859 7.93398 13.5348Z"
                  fill="#C9E1FF"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_57_349">
                <rect
                  width="15"
                  height="24.9046"
                  fill="white"
                  transform="translate(0.717773 0.095459)"
                />
              </clipPath>
            </defs>
          </svg>
          <span>开始绘画</span>
        </div>
      </div>
    </sidebar>
    <div class="container-body">
      <div class="left">
        <data-tab></data-tab>
      </div>
      <div class="center">
        <div class="count">您的剩余绘画总次数：50次</div>
        <div class="center-view">scroll</div>
      </div>
      <div class="right">
        <data-history></data-history>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  .draw-side {
    height: 100%;
    overflow-y: scroll;
    text-align: center;
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

      span {
        text-indent: 5.3px;
      }
      &:active {
        background: rgba(0, 0, 0, 0.3);
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
        &::-webkit-scrollbar {
          display: none;
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
</style>