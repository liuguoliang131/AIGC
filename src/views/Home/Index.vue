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
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home1.png"
        class="itemImage"
      />
      <img
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home2.png"
        class="itemImage"
      />
      <div class="wrapperFooter">
        <img
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_home3.png"
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
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/TopTitleBar.vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
import { ElScrollbar } from "element-plus";
import { useRouter } from "vue-router";
const useRouterConfig = useRouterConfigStore();

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

  .wrapperFooter {
    position: relative;
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
  }

  .footer-record {
    margin-top: 4px;
    cursor: pointer;
  }
}
</style>