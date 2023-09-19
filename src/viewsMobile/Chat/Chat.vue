<template>
  <div class="container">
    <div class="navbar">
      <img
        @click="handShowSlide"
        class="call_left"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-navmenu.svg"
        alt=""
      />
      <div class="center" @click="visible = true">AI对话</div>
      <img
        @click="handGoHome"
        src="~@/assets/logo.png"
        alt=""
        class="go_home"
      />
    </div>
    <div class="container-body" @scroll="onScroll" ref="chatScrollView">
      <div :class="['chat-list']" ref="chatScrollPage">
        <div class="listloading" v-show="chatList.loading">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-listloading-icon.png"
            alt=""
          />
          <span>加载中</span>
        </div>
        <template v-for="(item, idx) in chatList.list" :key="idx">
          <div
            class="question chat-item"
            v-if="item.type === 1"
            :data-id="item.id"
          >
            <div class="q-view">
              <div class="timestamp">{{ item.createdAt }}</div>
              <div class="message">
                {{ item.description }}
                <img
                  class="copy_icon"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-copy-icon.svg"
                  alt=""
                  @click="handCopyText(item.description)"
                />
              </div>
            </div>
            <img
              class="avatar"
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mine-avatar.png"
              alt=""
            />
          </div>
          <div
            class="answer chat-item"
            v-else-if="item.type === 2"
            :data-id="item.id"
          >
            <img
              class="avatar"
              src="https://quanres.hanhoukeji.com/hanhou-ai-pc/hhrobot-avatar.png"
              alt=""
            />
            <div class="a-view">
              <div class="timestamp">{{ item.createdAt }}</div>
              <template v-if="item.outputing">
                <div v-if="item.outputing === '0'" class="message_state0">
                  <div class="round light1"></div>
                  <div class="round light2"></div>
                  <div class="round light3"></div>
                  <div class="round light4"></div>
                </div>
                <div v-else-if="item.outputing === '1'" class="message_state1">
                  {{ item.description }}
                </div>
                <div v-else-if="item.outputing === '2'" class="message_state2">
                  {{ item.description }}
                  <img
                    class="copy_icon"
                    src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-copy-icon1.png"
                    alt=""
                    @click="handCopyText(item.description)"
                  />
                  <img
                    class="remove_icon"
                    src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-removemsg-icon.svg"
                    alt=""
                    @click="handShowRemove(item)"
                  />
                </div>
                <div v-else-if="item.outputing === '3'" class="message_state3">
                  咨询的人太多了，重新试试吧。
                </div>
              </template>
              <template v-else>
                <div class="message_state2">
                  {{ item.description }}
                  <img
                    class="copy_icon"
                    src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-copy-icon1.png"
                    alt=""
                    @click="handCopyText(item.description)"
                  />
                  <img
                    class="remove_icon"
                    src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-chat-removemsg-icon.svg"
                    alt=""
                    @click="handShowRemove(item)"
                  />
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
      <div class="new_question">
        <el-input
          resize="none"
          :autosize="{ minRows: 1, maxRows: 6 }"
          type="textarea"
          class="ipt"
          placeholder="问点什么吧～"
          maxlength="800"
          v-model="newQuestion"
        />
        <div
          :class="[
            'send',
            userStore.residueQAQuantity == 0 || sendLoading
              ? 'send-disabled'
              : '',
          ]"
          @click="onSend"
        >
          发送
        </div>
      </div>
    </div>

    <transition>
      <slide-bar v-model:visible="slideVisible"></slide-bar>
    </transition>
    <my-dialog
      v-model:show="removeMsgVisible"
      title="温馨提示"
      message="是否要删除此对话消息？"
      showCancelButton
      @confirm="confirmRemoveMsg"
    >
    </my-dialog>
    <my-dialog
      v-model:show="dialogVisible"
      title="敏感词提醒"
      :message="tipMessage"
      confirm-button-text="确认"
      @confirm="confirmRemoveLastMsg"
    >
    </my-dialog>
    <my-clipboard
      ref="myClip"
      @success="copySuccess"
      @fail="copyFail"
    ></my-clipboard>
  </div>
</template>

<script setup>
import {
  nextTick,
  onUpdated,
  watch,
  reactive,
  ref,
  onMounted,
  onUnmounted,
} from "vue";
import { useRouter } from "vue-router";
import SlideBar from "@/components/mobile/SlideBar.vue";
import MyDialog from "@/components/mobile/MyDialog.vue";
import MyClipboard from "@/components/MyClipboard.vue";
import { ElInput } from "element-plus";
import { showToast, closeToast } from "vant";
import { EventSourcePolyfill } from "event-source-polyfill";
import request from "@/http/index";
import api from "@/http/api";
import { _getSign } from "@/http/sign";
import { useUserStore } from "@/store/user";
import { useChatStore } from "@/store/chat";
import dayjs from "dayjs";

const router = useRouter();

const userStore = useUserStore(); // 用户信息
const chatStore = useChatStore(); // ai对话store

const slideVisible = ref(false); // 菜单页是否显示
const newQuestion = ref(""); // 新的提问内容
const myClip = ref(); // 复制文字组件
const chatList = reactive({
  list: [],
  lastId: 0,
  loading: false,
  finish: false,
});
const sendLoading = ref(false); // 发送时loading
const tipMessage = ref(""); // 敏感提示信息
const dialogVisible = ref(false); // 敏感词提示窗开关
const removeMsgVisible = ref(false); // 删除消息弹窗开关
const msgId = ref(null); // 要删除的消息的id
// 记录当前动作状态是1加载列表 2发送新问题 3接收答案中
let actionState = "1";
// 聊天窗口scroll元素
const chatScrollView = ref();
// 聊天窗口scroll内子元素
const chatScrollPage = ref(null);
// 聊天列表高度
const scrollPageHeight = ref(0);

// 过滤换行符方法  使用``包裹的换行符不会被替换
const reString = (str) => {
  try {
    const outputString = str.replace(/<br\s*\/?>/gi, "\n");
    return outputString;
  } catch (error) {
    return str;
  }
};
// 复制文字
const handCopyText = (text) => {
  const text1 = reString(text);
  myClip.value.copy(text1);
};
// 复制成功
const copySuccess = () => {
  showToast("复制成功");
};
// 复制失败
const copyFail = () => {
  showToast("复制失败");
};
// 去首页
const handGoHome = () => {
  router.push({
    path: "/",
  });
};

// 显示slidebar
const handShowSlide = () => {
  if (sendLoading.value) return;
  slideVisible.value = true;
};

// 打开删除聊天消息弹窗
const handShowRemove = (item) => {
  msgId.value = item.id;
  removeMsgVisible.value = true;
};

// 确认删除一对问答消息
const confirmRemoveMsg = () => {
  showToast({
    duration: 0,
    forbidClick: true,
    type: "loading",
    message: "加载中",
  });
  request
    .post(api.chat_delAnswer, {
      answerId: msgId.value,
    })
    .then((res) => {
      closeToast();
      if (res.code == 200) {
        // 设置动作为删除  删除后不用手动填充新数据到列表, 监听高度不足一屏时会自动获取
        actionState = "4";
        const idx = chatList.list.findIndex((item) => item.id === msgId.value);
        chatList.list.splice(idx - 1, 2);
      } else {
        showToast(res.message || res.msg);
      }
    });
};

// 敏感词弹窗确认
const confirmRemoveLastMsg = () => {
  chatList.list.splice(chatList.list.length - 2, 2);
  // 重新设置lastId
  chatList.lastId = chatList.list.length
    ? chatList.list[chatList.list.length - 1].id
    : 0;
};

let slideTimer = null;
// 滑动动画 length:number 滑动距离
const slideAnimation = (length, time = 800) => {
  console.log("滑动动画", length);
  if (slideTimer) {
    clearInterval(slideTimer);
    slideTimer = null;
  }
  let length1 = Math.abs(length); //正数值
  const di = length >= 0 ? true : false; // 方向
  const interval = 10; // 间隔时间 毫秒
  let step = Math.max((length / time) * interval, 1); // 每一步的长度

  slideTimer = setInterval(() => {
    if (!chatScrollView) {
      clearInterval(slideTimer);
    } else {
      if (di) {
        chatScrollView.value.scrollTop += step;
      } else {
        chatScrollView.value.scrollTop -= step;
      }
      length1 -= step;
      if (length1 <= 0) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }
  }, interval);
};

// 接受答案中 如果位置在最底下时就加载动画, 如果不是则不动
const scrollToEnd = (oldPageHeight, newPageHeight) => {
  if (
    oldPageHeight -
      (chatScrollView.value.scrollTop + chatScrollView.value.offsetHeight) <=
    30
  ) {
    chatScrollView.value.scrollTop = newPageHeight;
  }
};

// 监听滚动
const onScroll = (e) => {
  if (e.target.scrollTop === 0) {
    actionState = "1";
    console.log("到顶了");
    getChatList();
  }
};
// 转换标准时间
const formatNormal = (inputDateString) => {
  let str = inputDateString.split(" +")[0];
  return dayjs(str).format("YYYY/MM/DD HH:mm:ss");
};

// 加载列表
const getChatList = () => {
  console.log("getChatList");
  if (chatStore.activeTagId === 0) return false;
  if (chatList.finish) return false;
  if (chatList.loading) return false;
  chatList.loading = true;
  const pageSize = 10;
  request
    .get(api.chat_answerList, {
      tagId: chatStore.activeTagId,
      lastId: chatList.lastId,
      pageSize: pageSize,
    })
    .then((res) => {
      if (res.code == 200) {
        // 去掉<br/>
        res.data.list.forEach((item) => {
          let n = item.description.replace(/\\\\/g, "\\");
          n = n.replace(/\\n/g, "<br/>");
          n = n.replace(/\\/g, "");
          item.description = n;
        });
        res.data.list.forEach((item) => {
          item.createdAt = formatNormal(item.createdAt);
        });
        chatList.list = [...res.data.list.reverse(), ...chatList.list];
        chatList.lastId = res.data.lastId;

        // 是否是最后一页
        if (res.data.list.length < pageSize) {
          chatList.finish = true;
        }
      } else {
        chatList.finish = true;
        showToast(res.message || res.msg);
      }
      chatList.loading = false;
    });
};

onUpdated(() => {
  nextTick(() => {
    scrollPageHeight.value = chatScrollPage.value.offsetHeight;
  });
});

// 每次加载列表后设置滚动高度
watch(
  scrollPageHeight,
  (newVal, oldVal) => {
    // 列表不满一屏 加载
    if (actionState === "1") {
      if (newVal <= chatScrollView.value.offsetHeight) {
        console.log("聊天列表不满一屏,加载");
        getChatList();
      } else {
        // 动作状态为下拉加载列表时: 触发列表加载完成后,卷轴scrollTop设定为加载之前观看的位置
        chatScrollView.value.scrollTop = newVal - oldVal;
        // 滑动动画:下滑一点点
        console.log("actionState 1", chatScrollView);
        slideAnimation(-40);
      }
    } else if (actionState === "2") {
      // 动作状态为发送新问题时: 卷轴scrollTop设定到最底下位置
      // 滑动动画:滑到最底
      slideAnimation(oldVal);
    } else if (actionState === "3") {
      // 接收答案中 向上慢慢滑动
      scrollToEnd(oldVal, newVal);
    } else if (actionState === "4") {
      // 动作状态为删除对话信息: 删除对话信息,卷轴scrollTop设定为加载之前观看的位置
      // chatScrollView.value.scrollTop = oldVal - newVal;
    }
  },
  {
    deep: true,
  }
);
// 获取最后一条历史记录id
const getLastHistory = async () => {
  try {
    const pageSize = 1;
    const lastId = 0;
    const res = await request.get(api.chat_tagList, {
      lastId,
      pageSize,
    });
    if (res.code == 200) {
      if (res.data && res.data.list && res.data.list.length !== 0) {
        chatStore.saveActiveTagId(res.data.list[0].id);
        getChatList();
      }
    }
  } catch (error) {
    throw error;
  }
};

onMounted(() => {
  handAddEvent();
  if (chatStore.activeTagId) {
    getChatList();
  } else {
    getLastHistory();
  }
});
onUnmounted(() => {});

watch(
  () => chatStore.activeTagId,
  (next, prev) => {
    if (next === 0) {
      clearChatList();
    }
  }
);

// 清空聊天窗口数据
const clearChatList = () => {
  chatList.list = [];
  chatList.lastId = 0;
  chatList.loading = false;
  chatList.finish = false;
  actionState = "1";
};

// ------------------------------------

// 获取答案
const _getResult = async (message) => {
  // 配置网络
  let resultSign = await _getSign({});

  const source = new EventSourcePolyfill(
    `${process.env.VUE_APP_BASE_URL}${
      api.chat_qa
    }?question=${encodeURIComponent(message)}&tagId=${chatStore.activeTagId}`,
    {
      headers: {
        ...resultSign,
        "content-type": "text/event-stream",
      },
    }
  );

  // 其他错误信息
  source.addEventListener("apiErrors", (err) => {
    err.data = JSON.parse(err.data);
    console.log(err, "apiErrors");
    // 敏感词
    if (err.data.code == 1025) {
      tipMessage.value = err.data.message;
      dialogVisible.value = true;
      return;
    }
    // 敏感词
    if (err.data.code == 1026) {
      tipMessage.value = err.data.message;
      dialogVisible.value = true;
      return;
    }

    // 非常抱歉，您的问答次数已用尽
    if (err.data.code == 30104) {
      // 减少提问次数
      userStore.saveResidueQAQuantity(0);
      // 移除列表中最后一对
      chatList.list.splice(chatList.list.length - 2, 2);
      showToast(err.data.message);
      return;
    }

    // 充值会员
    if (err.data.code == 30108) {
      //   "您的免费问答次数已用尽，开通会员享1000次/月问答权益!";
      // 减少提问次数
      userStore.saveResidueQAQuantity(0);
      // 移除列表中最后一对
      chatList.list.splice(chatList.list.length - 2, 2);

      showToast(err.data.message);
      return;
    }

    console.log(err, "其他错误信息");
    // 移除列表中最后一对
    chatList.list.splice(chatList.list.length - 2, 2);
    showToast(err.data.message);
  });

  //监听返回的信息添加到响应的会话信息
  source.addEventListener(
    "qInfo",
    (event) => {
      console.log(event, "监听返回的信息添加到响应的会话信息");
      actionState = "3"; // 接收答案时卷轴不调用滚动方法

      let qd = JSON.parse(event.data);

      // 减少提问次数
      userStore.saveResidueQAQuantity(Number(qd.residueQAQuantity));

      chatList.list[chatList.list.length - 1].id = qd.aId;
      chatList.list[chatList.list.length - 1].tagId = qd.tagId;
      chatList.list[chatList.list.length - 2].id = qd.qId;
      chatList.list[chatList.list.length - 2].tagId = qd.tagId;
      chatList.lastId = chatList.list[0].id;

      // 如果tagId==0说明是第一次会话，把新的会话第一条添加到side
      if (chatStore.activeTagId == 0) {
        let h = {
          id: qd.tagId,
          title: qd.tagTitle,
        };
        chatStore.saveActiveTagId(qd.tagId);
      }
    },
    false
  );

  source.onopen = (e) => {
    console.log(e, "open");
  };

  source.onmessage = (e) => {
    console.log("onmessage", e);
    if (e.data == "[DONE]") {
      chatList.list[chatList.list.length - 1].outputing = "2";
      sendLoading.value = false;
      source.close();
    } else if (e.type == "message") {
      chatList.list[chatList.list.length - 1].outputing = "1";
      let n = e.data.replace(/\\\\/g, "\\");
      n = n.replace(/\\n/g, "\n");
      n = n.replace(/\\/g, "");
      let s = n.substring(1, n.length - 1);
      chatList.list[chatList.list.length - 1].description += s;
    }
    scrollToEnd();
  };

  source.onerror = (e) => {
    try {
      console.log(e, "onerror");
      showToast("网络连接中断，请检查您的网络并重试。");
      chatList.list[chatList.list.length - 1].outputing = "3";
      sendLoading.value = false;
      e.target.close();
    } catch (error) {}
  };
};

// 发送
const onSend = () => {
  if (sendLoading.value) return;
  if (newQuestion.value.trim().length === 0) {
    return;
  }
  if (newQuestion.value.length > 800) {
    return showToast("您的输入已超出800字，请进行修改。");
  }
  if (userStore.residueQAQuantity == 0) {
    return showToast("您的问答次数已用尽，请联系客服购买");
  }

  sendLoading.value = true;
  actionState = "2"; //动作状态设定为添加新问题
  const newQuestion1 = reString(newQuestion.value.trim());
  newQuestion.value = "";

  // 添加问题和答案的位置到列表
  chatList.list.push({
    id: "",
    userId: userStore.userInfo.userId,
    tagId: "",
    type: 1,
    description: newQuestion1,
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
  });
  chatList.list.push({
    id: "",
    userId: userStore.userInfo.userId,
    tagId: "",
    type: 2,
    description: "",
    createdAt: dayjs().format("YYYY/MM/DD HH:mm:ss"),
    outputing: "0", // 答案输出状态  0等待中1输出中2输出完成3错误提示
  });
  // scrollToEnd();

  _getResult(newQuestion1);
};

// 为元素添加高度变化事件
const handAddEvent = () => {
  const box = document.querySelector(".new_question"); // 输入栏
  const page = document.querySelector(".chat-list"); // 卷纸
  const scrollview = document.querySelector(".container-body"); // 卷轴视区
  const adaptivePX = (document.documentElement.clientWidth / 375) * 16; // 下填充16px
  const chronoTrigger = () => {
    actionState = ""; // 设置动作状态为空
    const scrollTop = scrollview.scrollTop;
    page.style.paddingBottom = box.offsetHeight + adaptivePX + "px";
    scrollview.scrollTop = scrollTop;
  };
  const resizeObserver = new ResizeObserver(chronoTrigger);
  resizeObserver.observe(box);
};
</script>

<style scoped lang="less">
.container {
  position: relative;
  box-sizing: border-box;
  height: 100%;
  padding-top: 44px;
  overflow: hidden;
  background: #f6f6f6;

  .navbar {
    position: fixed;
    top: 0;
    left: 0;
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
  .container-body {
    position: relative;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;

    .chat-list {
      padding: 12px 16px 100px 16px;
      .listloading {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 12px;
        @keyframes round {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 6px;
          transform-origin: center;
          animation: round 0.8s infinite linear;
        }
        span {
          color: rgba(0, 0, 0, 0.9);
          font-family: PingFang SC;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: 20px;
        }
      }
      .question {
        display: flex;
        justify-content: flex-end;
        width: 100%;
        margin-bottom: 12px;
        .q-view {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          margin-right: 6px;
          .timestamp {
            color: #999;
            text-align: right;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: 0.12px;
            margin-bottom: 2px;
          }
          .message {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            min-width: 58px;
            min-height: 33px;
            max-width: 280px;
            padding: 12px 16px 28px 16px;
            color: #161616;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            border-radius: 15px 0 15px 15px;
            background: #fff;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
            .copy_icon {
              position: absolute;
              bottom: 6px;
              left: 16px;
              width: 16px;
              height: 16px;
              &:active {
                opacity: 0.7;
              }
            }
          }
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
      }
      .answer {
        display: flex;
        width: 100%;
        margin-bottom: 12px;
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
        }
        .a-view {
          display: flex;
          flex-direction: column;
          margin-left: 6px;
          .timestamp {
            color: #999;
            text-align: left;
            font-family: PingFang SC;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: 17px;
            letter-spacing: 0.12px;
            margin-bottom: 2px;
          }
          .message_state0 {
            position: relative;
            box-sizing: border-box;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 33px;
            color: #161616;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            border-radius: 0 15px 15px 15px;
            background: #fff;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
            .round {
              width: 5px;
              height: 5px;
              margin: 0 2px;
              border-radius: 50%;
              background-color: #ffffff;
              transition: background-color 0;
            }

            @keyframes kf1 {
              0% {
                background-color: rgba(18, 108, 254, 1);
              }

              26% {
                background-color: rgba(18, 108, 254, 0.3);
              }

              100% {
                background-color: rgba(18, 108, 254, 0.3);
              }
            }

            @keyframes kf2 {
              0% {
                background-color: rgba(18, 108, 254, 0.3);
              }

              26% {
                background-color: rgba(18, 108, 254, 1);
              }

              51% {
                background-color: rgba(18, 108, 254, 0.3);
              }

              100% {
                background-color: rgba(18, 108, 254, 0.3);
              }
            }

            @keyframes kf3 {
              0% {
                background-color: rgba(18, 108, 254, 0.3);
              }

              51% {
                background-color: rgba(18, 108, 254, 1);
              }
              76% {
                background-color: rgba(18, 108, 254, 0.3);
              }
              100% {
                background-color: rgba(18, 108, 254, 0.3);
              }
            }
            @keyframes kf4 {
              0% {
                background-color: rgba(18, 108, 254, 0.3);
              }

              76% {
                background-color: rgba(18, 108, 254, 1);
              }

              100% {
                background-color: rgba(18, 108, 254, 1);
              }
            }

            .light1 {
              animation: kf1 1s infinite linear;
            }

            .light2 {
              animation: kf2 1s infinite linear;
            }

            .light3 {
              animation: kf3 1s infinite linear;
            }
            .light4 {
              animation: kf4 1s infinite linear;
            }
          }
          .message_state1 {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            min-width: 80px;
            min-height: 33px;
            max-width: 280px;
            padding: 12px 16px 28px 16px;
            color: #161616;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            border-radius: 0px 15px 15px 15px;
            background: rgba(218, 224, 245, 0.6);
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
          }
          .message_state2 {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            min-width: 80px;
            min-height: 33px;
            max-width: 280px;
            padding: 12px 16px 28px 16px;
            color: #161616;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            border-radius: 0px 15px 15px 15px;
            background: rgba(218, 224, 245, 0.6);
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
            .copy_icon {
              position: absolute;
              bottom: 6px;
              left: 16px;
              width: 16px;
              height: 16px;
              &:active {
                opacity: 0.7;
              }
            }
            .remove_icon {
              position: absolute;
              bottom: 6px;
              left: 36px;
              width: 16px;
              height: 16px;
              &:active {
                opacity: 0.7;
              }
            }
          }
          .message_state3 {
            position: relative;
            box-sizing: border-box;
            display: inline-block;
            min-width: 80px;
            min-height: 33px;
            max-width: 280px;
            padding: 6px 16px;
            color: #161616;
            font-family: PingFang SC;
            font-size: 15px;
            font-style: normal;
            font-weight: 400;
            line-height: 22px;
            text-align: left;
            border-radius: 0 15px 15px 15px;
            background: #fff;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-break: break-all;
          }
        }
      }
    }

    .new_question {
      position: fixed;
      bottom: 0;
      left: 0;
      box-sizing: border-box;
      width: 100%;
      min-height: 83px;
      padding: 16px 0;
      display: flex;
      justify-content: center;
      border-radius: 10px 10px 0px 0px;
      background: #fff;
      box-shadow: 0px -1px 8px 0px rgba(0, 0, 0, 0.05);

      .ipt {
        box-sizing: border-box;
        width: 286px;
        margin-right: 7px;
        padding: 0;
        &::placeholder {
          color: #999;
          font-family: PingFang SC;
          font-size: 13px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }

        /deep/.el-textarea__inner {
          padding: 5px 12px;
          min-height: 33px;
          box-sizing: border-box;
          width: 100%;
          border-radius: 3px;
          border: 1px solid #dcdcdc;
          background: #fff;
          outline: none;
          color: #333;
          font-family: PingFang SC;
          font-size: 13px;
          line-height: 23px;
          resize: none;
          /*禁止拉伸*/
        }

        /deep/.el-textarea__inner::-webkit-scrollbar {
          display: none;
        }
      }
      .send {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54px;
        height: 33px;
        border-radius: 3px;
        background: #126cfe;
        color: #fff;
        font-family: PingFang SC;
        font-size: 13px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        user-select: none;
        &:active {
          opacity: 0.7;
        }
      }
      .send-disabled {
        filter: grayscale(100%);
        &:active {
          opacity: 1;
        }
      }
    }
  }
}
</style>