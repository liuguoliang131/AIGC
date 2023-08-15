<template>
  <div class="container">
    <div class="container-body" @scroll="onScroll">
      <div class="content1">
        <div class="left">
          <div class="player">
            <video class="real" width="1200" height="675" controls>
              <source
                src="https://quanres.hanhoukeji.com/hanhou-ai-pc/fbdd5c098e6ce3876d157b0e8c1ec013.mp4"
                type="video/mp4"
              />
              您的浏览器不支持H5视频播放。
            </video>
          </div>
          <div class="actitle">
            数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...
          </div>
        </div>
        <div class="right">
          <div class="title">课程列表</div>
          <div class="list">
            <template v-for="(item, idx) in playList" :key="idx">
              <div v-if="active.id === item.id" class="item item_active nowrap">
                <img
                  class="active_img"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/player_list_active.svg"
                  alt=""
                />
                <span class="nowrap">{{ item.name }}</span>
              </div>
              <div v-else class="item nowrap" @click="handActive(item)">
                <span class="nowrap">{{ item.name }}</span>
              </div>
            </template>
          </div>
        </div>
      </div>

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
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouterConfigStore } from "@/store/routerConfigStore";
const routerConfig = useRouterConfigStore();

const active = ref({
  id: "",
  path: "",
});

const playList = ref([
  {
    id: 1,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fbdd5c098e6ce3876d157b0e8c1ec013.mp4",
  },
  {
    id: 2,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f4616c54582682860fe8cb7a9670480c.mp4",
  },
  {
    id: 3,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fcfc2e2f5133ca521419db0cdc4caca9.mp4",
  },
  {
    id: 4,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fd51aa58026c0310b1b384140750fc7c.mp4",
  },
  {
    id: 33,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f97bc7a8397a6ea5758b9b9fdfd822c3.mp4",
  },
  {
    id: 5,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f8943658b510e99ddf621837f8695005.mp4",
  },
  {
    id: 6,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/player_list_active.svg",
  },
  {
    id: 22,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fbdd5c098e6ce3876d157b0e8c1ec013.mp4",
  },
  {
    id: 34,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f4616c54582682860fe8cb7a9670480c.mp4",
  },
  {
    id: 45,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fcfc2e2f5133ca521419db0cdc4caca9.mp4",
  },
  {
    id: 46,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fd51aa58026c0310b1b384140750fc7c.mp4",
  },
  {
    id: 35,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f97bc7a8397a6ea5758b9b9fdfd822c3.mp4",
  },
  {
    id: 55,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f8943658b510e99ddf621837f8695005.mp4",
  },
  {
    id: 56,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/player_list_active.svg",
  },
  {
    id: 57,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fbdd5c098e6ce3876d157b0e8c1ec013.mp4",
  },
  {
    id: 58,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f4616c54582682860fe8cb7a9670480c.mp4",
  },
  {
    id: 59,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fcfc2e2f5133ca521419db0cdc4caca9.mp4",
  },
  {
    id: 60,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/fd51aa58026c0310b1b384140750fc7c.mp4",
  },
  {
    id: 61,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f97bc7a8397a6ea5758b9b9fdfd822c3.mp4",
  },
  {
    id: 62,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/f8943658b510e99ddf621837f8695005.mp4",
  },
  {
    id: 63,
    name: "数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中的AI字母的概念数据中数字大脑的概念数据中心中功能性人工智能的抽象信息流通过它大脑中...",
    path: "https://quanres.hanhoukeji.com/hanhou-ai-pc/player_list_active.svg",
  },
]);

// 页面滚动时设置tapBar组件背景颜色为白色
const onScroll = (e) => {
  routerConfig.titleBarOpacity = Math.min(1, e.target.scrollTop / 70);
};

const handActive = (item) => {
  active.value = item;
};

const handGoICP = () => {
  window.open(`https://beian.miit.gov.cn/`);
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  height: calc(100% - 70px);
  padding-top: 70px;
  background-color: #fff;
  background-image: url("https://quanres.hanhoukeji.com/hanhou-ai-pc/index-background1.png");
  background-size: cover;
  .container-body {
    padding-top: 50px;
    height: calc(100% - 50px);
    overflow-y: scroll;
    .content1 {
      display: flex;
      justify-content: center;
      .left {
        width: 1200px;
        margin-right: 47px;
        border-radius: 10px;

        .player {
          width: 1200px;
          height: 675px;
          border-radius: 10px;
          background-color: rgba(0, 0, 0, 0.2);
          .real {
            width: 100%;
            height: 100%;
          }
        }
        .actitle {
          width: 1200px;
          margin-top: 28px;
          color: #000;
          font-family: PingFang SC;
          font-size: 26px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          text-align: left;
        }
      }
      .right {
        width: 429px;
        height: 675px;
        border-radius: 10px;
        text-align: center;
        box-sizing: border-box;
        background: #fff;
        box-shadow: 1px 1px 6px 3px rgba(0, 0, 0, 0.1);
        .title {
          display: flex;
          align-items: center;
          width: 360px;
          height: 95px;
          border-bottom: 1px solid #a4a4a4;
          margin: auto;
          color: #1e1e1e;
          text-align: center;
          font-family: PingFang SC;
          font-size: 28px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .list {
          // width: 384px;
          height: 579px;
          // margin-left: 35px;
          overflow-x: hidden;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 4px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: rgba(223, 223, 223, 1);

            border-radius: 10px;
            transition: all 0.2s ease-in-out;
            border-radius: 11px;
          }
          &::-webkit-scrollbar-track {
            border-radius: 10px;
          }
          &::-webkit-scrollbar-track-piece {
            border-radius: 11px;
          }

          .item {
            display: flex;
            align-items: center;
            box-sizing: border-box;
            width: 100%;
            height: 50px;
            padding: 0 35px;
            color: rgba(0, 0, 0, 0.6);
            text-align: left;
            font-family: PingFang SC;
            font-size: 20px;
            font-style: normal;
            font-weight: 400;
            line-height: 50px;
            cursor: pointer;
          }
          .item_active {
            color: rgba(18, 108, 254, 1);
            background-color: rgb(219, 233, 255);
            font-weight: 600;
            .active_img {
              width: 25px;
              height: 30.446px;
              margin-right: 30px;
            }
          }
        }
      }
    }
    .footer {
      padding-top: 100px;
      padding-bottom: 32px;
      width: 100%;
      color: #666666;
      text-align: center;
      font-family: PingFang SC;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      .footer-record {
        margin-top: 4px;
        cursor: pointer;
      }
    }
  }
}
</style>