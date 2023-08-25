<template>
  <div class="container">
    <TopTitleBar />
    <el-scrollbar
      style="
         {
          font-size: 0;
        }
      " @scroll="onScroll">
      <div class="positionRelative">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home1.png" class="itemImage" />
        <div class="memberWrapper">
          <el-button type="primary" @click="showWeCard" class="memberBtn">成为会员</el-button>
        </div>
      </div>
      <div class="positionRelative">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home2.png" class="itemImage" />
        <div class="footer">
          <el-button type="primary" @click="showWeCard" class="memberBtn">成为会员</el-button>
        </div>
      </div>
      <div class="positionRelative">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3.png" class="itemImage" />
        <div class="footer">
          <div class="footer-record">
            <a @click="handGoICP">京ICP备19041918号-1京公网安备11010502039881号</a>
          </div>
          <div class="footer-record">
            <a @click="handGoICP">网络经营许可证京网文[2020]4683-870号</a>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="memberFeeWrapper">
        <span><el-button type="primary" @click="showWeCard">成为会员</el-button></span>
        <span><el-button type="primary" @click="showWeCard">成为会员</el-button></span>
      </div>
    <my-dialog :show-close="false" :close-on-click-modal="true" v-model:visible="dialogVisible"
      @close="dialogVisible = false">
      <div class="dialog_dia">
        <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3.png" class="wecard" />
      </div>
    </my-dialog>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/TopTitleBar.vue";
import {
  ref,
} from "vue";
import MyDialog from "@/components/MyDialog.vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
import { ElScrollbar, ElButton } from "element-plus";
import { useRouter } from "vue-router";
const useRouterConfig = useRouterConfigStore();
const dialogVisible = ref(false);

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
    right: 20px;
    bottom: 20px;
    display: flex;
    flex-direction: column;
  }

  .positionRelative {
    position: relative;

    .memberWrapper {
      position: absolute;
      top: 50%;
      left: 10%;

      .memberBtn {
        width: 300px;
        height: 100px;
      }
    }


    .footer {
      color: #666666;
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