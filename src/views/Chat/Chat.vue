<template>
  <div class="container">
    <sidebar>
      <div class="side-content">
        <div v-if="sendLoading" class="newchat_disabled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <rect y="6" width="14" height="2" fill="white" />
            <rect
              x="6"
              y="14"
              width="14"
              height="2"
              transform="rotate(-90 6 14)"
              fill="white"
            />
          </svg>
          <span>新建聊天</span>
        </div>
        <div v-else class="newchat" @click="handNewChat">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <rect y="6" width="14" height="2" fill="white" />
            <rect
              x="6"
              y="14"
              width="14"
              height="2"
              transform="rotate(-90 6 14)"
              fill="white"
            />
          </svg>
          <span>新建聊天</span>
        </div>

        <div class="log_list" v-loading="tagList.loading">
          <div
            class="scroll_view"
            ref="tagListScroll"
            @scroll="handTagListScroll"
          >
            <div v-if="tagList.isNull" class="scroll_page"></div>
            <div v-else ref="tagListPage" class="scroll_page">
              <div
                v-for="(item, index) in tagList.list"
                :key="index"
                :class="[
                  'log_item',
                  item.id === activeTag ? 'log_item_active' : '',
                ]"
                @click="handActiveTag(item, index)"
              >
                <img
                  v-if="item.id === activeTag"
                  class="bubble_icon"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/bubble_icon_active.png"
                  alt=""
                />
                <img
                  v-else
                  class="bubble_icon"
                  src="https://quanres.hanhoukeji.com/hanhou-ai-pc/bubble_icon_.png"
                  alt=""
                />
                <span class="log_name nowrap">{{ item.title }}</span>

                <svg
                  v-if="item.id === activeTag"
                  @click.self="handDeleteTag(item, index)"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                >
                  <path
                    d="M2.39449 5.48451C2.59157 5.48451 2.78059 5.56484 2.91995 5.70784C3.05931 5.85083 3.13761 6.04478 3.13761 6.24701V16.9784C3.13761 17.1749 3.17535 17.3696 3.24867 17.5512C3.322 17.7328 3.42947 17.8978 3.56496 18.0368C3.70044 18.1758 3.86129 18.286 4.0383 18.3612C4.21531 18.4364 4.40502 18.475 4.5966 18.475H13.4038C13.7906 18.475 14.1616 18.3173 14.4352 18.0366C14.7087 17.756 14.8624 17.3753 14.8624 16.9784V6.24701C14.8624 6.04478 14.9407 5.85083 15.08 5.70784C15.2194 5.56484 15.4084 5.48451 15.6055 5.48451C15.8026 5.48451 15.9916 5.56484 16.131 5.70784C16.2703 5.85083 16.3486 6.04478 16.3486 6.24701V16.9784C16.3486 17.7798 16.0384 18.5483 15.4861 19.115C14.9338 19.6817 14.1848 20 13.4038 20H4.59618C3.81517 20 3.06614 19.6817 2.51388 19.115C1.96162 18.5483 1.65137 17.7798 1.65137 16.9784V6.24701C1.65137 6.04478 1.72966 5.85083 1.86902 5.70784C2.00838 5.56484 2.1974 5.48451 2.39449 5.48451ZM6.24797 3.78413C6.44506 3.78413 6.63408 3.70379 6.77344 3.5608C6.9128 3.4178 6.99109 3.22385 6.99109 3.02163C6.99104 2.82505 7.02873 2.63039 7.102 2.44876C7.17528 2.26714 7.28271 2.1021 7.41815 1.96308C7.5536 1.82406 7.71441 1.71378 7.8914 1.63854C8.06839 1.56331 8.25809 1.52458 8.44967 1.52458H9.55031C9.74192 1.52452 9.93167 1.56321 10.1087 1.63842C10.2857 1.71364 10.4466 1.82391 10.5821 1.96293C10.7176 2.10195 10.8251 2.26701 10.8984 2.44866C10.9717 2.63032 11.0094 2.82502 11.0093 3.02163C11.0093 3.22385 11.0876 3.4178 11.227 3.5608C11.3663 3.70379 11.5553 3.78413 11.7524 3.78413C11.9495 3.78413 12.1385 3.70379 12.2779 3.5608C12.4172 3.4178 12.4955 3.22385 12.4955 3.02163C12.4956 2.22702 12.1906 1.46437 11.6466 0.898822C11.1027 0.333277 10.3635 0.0103601 9.58912 0H8.41128C7.63697 0.0104696 6.89783 0.333421 6.35387 0.898943C5.80991 1.46446 5.50489 2.22705 5.50485 3.02163C5.50485 3.22385 5.58315 3.4178 5.72251 3.5608C5.86187 3.70379 6.05089 3.78413 6.24797 3.78413Z"
                    fill="#C9E1FF"
                  />
                  <path
                    d="M0 3.70537C0 3.50314 0.0782929 3.3092 0.217655 3.1662C0.357017 3.02321 0.546032 2.94287 0.743119 2.94287H17.2569C17.454 2.94287 17.643 3.02321 17.7823 3.1662C17.9217 3.3092 18 3.50314 18 3.70537C18 3.9076 17.9217 4.10155 17.7823 4.24454C17.643 4.38754 17.454 4.46787 17.2569 4.46787H0.743119C0.546032 4.46787 0.357017 4.38754 0.217655 4.24454C0.0782929 4.10155 0 3.9076 0 3.70537ZM6.7983 6.47283C6.99539 6.47283 7.18441 6.55317 7.32377 6.69616C7.46313 6.83916 7.54142 7.0331 7.54142 7.23533V15.7076C7.54142 15.9098 7.46313 16.1037 7.32377 16.2467C7.18441 16.3897 6.99539 16.4701 6.7983 16.4701C6.60122 16.4701 6.4122 16.3897 6.27284 16.2467C6.13348 16.1037 6.05518 15.9098 6.05518 15.7076V7.23533C6.05518 7.0331 6.13348 6.83916 6.27284 6.69616C6.4122 6.55317 6.60122 6.47283 6.7983 6.47283ZM11.2021 6.47283C11.3992 6.47283 11.5882 6.55317 11.7276 6.69616C11.8669 6.83916 11.9452 7.0331 11.9452 7.23533V15.7076C11.9452 15.9098 11.8669 16.1037 11.7276 16.2467C11.5882 16.3897 11.3992 16.4701 11.2021 16.4701C11.005 16.4701 10.816 16.3897 10.6766 16.2467C10.5373 16.1037 10.459 15.9098 10.459 15.7076V7.23533C10.459 7.0331 10.5373 6.83916 10.6766 6.69616C10.816 6.55317 11.005 6.47283 11.2021 6.47283Z"
                    fill="#C9E1FF"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sidebar>

    <div class="container-body">
      <div class="body-top">
        <span>您的免费问答次数：{{ userStore.residueQAQuantity }}次</span>
      </div>
      <div class="body-content">
        <div class="chat_box">
          <div
            class="chat_scroll_view"
            @scroll="chatScrollViewListen"
            ref="chatScrollView"
          >
            <div class="list_content" ref="chatScrollPage">
              <div v-show="chatList.loading" class="loading">正在加载...</div>
              <template v-for="(item, idx) in chatList.list" :key="idx">
                <div v-if="item.type == 1" class="msg_item question">
                  <div class="toright">
                    <div class="bubble">
                      <div
                        v-text="item.description"
                        style="white-space: pre-wrap"
                      ></div>
                    </div>
                    <img
                      class="avatar"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mine-avatar.png"
                      alt=""
                    />
                  </div>
                </div>
                <div v-else-if="item.type == 2" class="msg_item answer">
                  <div class="toleft">
                    <img
                      class="avatar"
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/hhrobot-avatar.png"
                      alt=""
                    />
                    <div class="bubble">
                      <div
                        v-if="
                          !item.description &&
                          sendLoading &&
                          chatList.list.length - 1 === idx
                        "
                      >
                        <el-icon class="rotate_icon"><loading-icon /></el-icon>
                      </div>
                      <div
                        v-else
                        v-text="item.description"
                        style="white-space: pre-wrap"
                      ></div>
                      <div
                        class="taptap"
                        v-show="
                          !(chatList.list.length - 1 == idx && sendLoading)
                        "
                      >
                        <div class="copy" @click="handleCopy(item.description)">
                          <img
                            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/copy-icon.svg"
                            alt=""
                          />
                          复制
                        </div>
                        <div class="del" @click="handShowRemoveMsg(item.id)">
                          <img
                            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/delete-icon.svg"
                            alt=""
                          />
                          删除
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
            <div class="page_bottom"></div>
          </div>
        </div>
        <div class="ask">
          <div class="ask_input">
            <el-input
              class="textarea"
              v-model="question"
              resize="none"
              @keydown="sendByKey"
              :autosize="{ minRows: 1, maxRows: 6 }"
              type="textarea"
              placeholder="请输入您需要提问的信息..."
            />
            <div class="length_count">
              <span
                :style="{ color: question.length > 800 ? 'red' : 'inherit' }"
                >{{ question.length }}</span
              >/800
            </div>
          </div>

          <div v-if="sendLoading || question == ''" class="send_btn_disabled">
            发送
          </div>
          <div v-else @click="handleSend" class="send_btn">发送</div>
        </div>
      </div>
    </div>
    <!-- 敏感词提醒 -->
    <my-dialog
      :show-close="false"
      :close-on-click-modal="false"
      v-model:visible="dialogVisible"
    >
      <div class="dialog_dia">
        <div class="dia_title">敏感词提醒</div>
        <div class="dia_content">{{ tipMessage }}</div>
        <div class="dia_footer_1">
          <div class="confirm" @click="bowDownToTheCCP">确认</div>
        </div>
      </div>
    </my-dialog>

    <!-- 删除对话窗口提醒 -->
    <my-dialog
      :show-close="false"
      :close-on-click-modal="false"
      v-model:visible="removeVisible"
    >
      <div class="dialog_dia">
        <div class="dia_title">温馨提示</div>
        <div class="dia_content">是否要删除此对话窗口？</div>
        <div class="dia_footer_2">
          <div class="cancel" @click="removeVisible = false">取消</div>
          <div class="confirm" @click="handConfirmDeleteTag">删除</div>
        </div>
      </div>
    </my-dialog>

    <!-- 删除对话信息提醒 -->
    <my-dialog
      :show-close="false"
      :close-on-click-modal="false"
      v-model:visible="removeMsgVisible"
    >
      <div class="dialog_dia">
        <div class="dia_title">温馨提示</div>
        <div class="dia_content">是否要删除此对话信息？</div>
        <div class="dia_footer_2">
          <div class="cancel" @click="removeMsgVisible = false">取消</div>
          <div class="confirm" @click="handConfirmRemoveMsg">删除</div>
        </div>
      </div>
    </my-dialog>

    <div
      ref="copy_text"
      class="clipboard_text"
      data-clipboard-action="copy"
      data-clipboard-text="copytext"
    ></div>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  onMounted,
  onUpdated,
  watch,
  getCurrentInstance,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import request from "@/http/index";
import { ElMessage, ElDialog, ElInput, ElIcon } from "element-plus";
import { Loading as LoadingIcon } from "@element-plus/icons-vue";
import { EventSourcePolyfill } from "event-source-polyfill";
import api from "@/http/api";
import Clipboard from "clipboard";
import { _getSign } from "@/http/sign";
import utils from "@/common/utils";
import Sidebar from "@/components/Sidebar.vue";
import MyDialog from "@/components/MyDialog.vue";
import { useUserStore } from "@/store/user";
import debounce from "lodash/debounce";

const userStore = useUserStore(); //用户信息

// 上下文
// const instance = getCurrentInstance();
// console.log("app", instance.appContext);
// instance.appContext.app.directive("loading", vLoading);

// 路由
const router = useRouter();
// 剩余提问次数
const userInfo = utils.getUserInfo() || {};

// 弹层关闭事件
const dialogClose = () => {};

// 敏感词提醒弹窗
const dialogVisible = ref(false);
// 敏感词提示词
const tipMessage = ref("");

// 删除信息弹窗
const removeMsgVisible = ref(false);
// 点击删除的消息id
const delMsgId = ref(null);
const handShowRemoveMsg = (id) => {
  delMsgId.value = id;
  removeMsgVisible.value = true;
};

// 输入框的文本
const question = ref("");

// 发送按钮的loading
const sendLoading = ref(false);

// -----------------左侧聊天历史列表----------------------

// tagList滚动卷轴ref
const tagListScroll = ref();
// tagList内容盒子
const tagListPage = ref();

// 左侧tag列表滚动事件
const handTagListScroll = (e) => {
  console.log("tagList scroll", e);
  console.log(
    "对话列表scrollTop:",
    e.target.scrollTop,
    "高度:",
    tagListPage.value.offsetHeight
  );
  if (
    e.target.scrollTop + tagListScroll.value.offsetHeight + 10 >
    tagListPage.value.offsetHeight
  ) {
    console.log("触底");
    getHistory();
  }
};
// 被选中的聊天历史id
const activeTag = ref(0);
// 左侧聊天历史列表
const tagList = reactive({
  list: [],
  loading: false, // 左侧历史列表的loading
  finish: false, // 加载完成
  isNull: false, // 左侧聊天历史列表是否为空
});

// 获取聊天历史列表 和 剩余提问次数
const getHistory = () => {
  if (tagList.loading) return;
  if (tagList.finish) return;
  tagList.loading = true;
  const pageSize = 20;
  const lastId = tagList.list.length
    ? tagList.list[tagList.list.length - 1].id
    : 0;
  request
    .get(api.chat_tagList, {
      lastId,
      pageSize,
    })
    .then((res) => {
      console.log("gethistory", res);
      if (res.code == 200) {
        if (
          lastId === 0 &&
          res.data &&
          res.data.list &&
          res.data.list.length === 0
        ) {
          tagList.isNull = true;
        }
        // res.data.list.forEach((item) => (item.status = "none"));
        // const list = res.data.list.reverse();
        const list = res.data.list;

        tagList.list = [...tagList.list, ...list];
        // 第一次获取列表时默认选中第一个tag
        if (lastId === 0 && res.data && res.data.list && res.data.list.length) {
          handActiveTag(tagList.list[0]);
        }

        // 条数不足 没有下一页了
        if (res.data.list.length < pageSize) {
          tagList.finish = true;
        }
      } else {
        tagList.finish = true;
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
      tagList.loading = false;
    });
};

// 对话列表不满一屏 加载
watch(
  tagListPage,
  (newVal, oldVal) => {
    console.log("watch:tagListPageHeight", newVal, oldVal);
    console.log("tagListScroll卷轴", tagListScroll.value.offsetHeight);
    if (newVal) {
      if (newVal.offsetHeight <= tagListScroll.value.offsetHeight) {
        console.log("对话列表不满一屏,加载");
        return getHistory();
      }
    }
  },
  {
    deep: true,
  }
);

// -------------------------------------

// 过滤换行符方法  使用``包裹的换行符不会被替换
const reString = (str) => {
  try {
    const outputString = str.replace(/<br\s*\/?>/gi, "\n");
    return outputString;
  } catch (error) {
    return str;
  }
};

// -----------------聊天窗口--------------------

// 聊天窗口scroll元素
const chatScrollView = ref();
// 聊天窗口scroll内子元素
const chatScrollPage = ref(null);
// 聊天列表高度
const scrollPageHeight = ref(0);

// 记录当前动作状态是1加载列表 2发送新问题 3接收答案中
let actionState = "1";

// 滚动条距离顶部距离scrollTop
const chatScrollTop = ref(0);

// 聊天列表
const chatList = reactive({
  list: [],
  lastId: 0,
  loading: false,
  finish: false, //是否加载完成 不再获取列表
});

// 获取聊天列表
const getAnswerList = () => {
  console.log("getAnswerList");
  if (chatList.finish) return false;
  if (chatList.loading) return false;
  chatList.loading = true;
  const pageSize = 10;
  request
    .get(api.chat_answerList, {
      tagId: activeTag.value,
      lastId: chatList.lastId,
      pageSize,
    })
    .then((res) => {
      if (res.code == 200) {
        // 防止在加载列表时切换tag
        if (
          chatList.list.length &&
          chatList.list[0].tagId !== activeTag.value
        ) {
          chatList.loading = false;
          return;
        }

        // 去掉<br/>
        res.data.list.forEach((item) => {
          let n = item.description.replace(/\\\\/g, "\\");
          n = n.replace(/\\n/g, "<br/>");
          n = n.replace(/\\/g, "");
          item.description = n;
        });
        chatList.list = [...res.data.list.reverse(), ...chatList.list];
        chatList.lastId = res.data.lastId;

        // 是否是最后一页
        if (res.data.list.length < pageSize) {
          chatList.finish = true;
        }
      } else {
        chatList.finish = true;
        ElMessage({
          message: res.message,
          type: "error",
        });
      }
      chatList.loading = false;
    });
  console.log("加载列表");
};

// 清空聊天窗口数据
const clearChatList = () => {
  chatList.list = [];
  chatList.lastId = 0;
  chatList.loading = false;
  chatList.finish = false;
  actionState = "1";
};

// 聊天窗口滚动监听
const chatScrollViewListen = (e) => {
  chatScrollTop.value = e.target.scrollTop;
};

// ------------------------------------

// 获取答案
const _getResult = async (message, tagId) => {
  // 配置网络
  let resultSign = await _getSign({});

  const source = new EventSourcePolyfill(
    `${process.env.VUE_APP_BASE_URL}${
      api.chat_qa
    }?question=${encodeURIComponent(message)}&tagId=${tagId}`,
    {
      headers: {
        ...resultSign,
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
      ElMessage({
        message: err.data.message,
        type: "info",
      });
      return;
    }

    // 充值会员
    if (err.data.code == 30108) {
      //   "您的免费问答次数已用尽，开通会员享1000次/月问答权益!";
      // 减少提问次数
      userStore.saveResidueQAQuantity(0);
      // 移除列表中最后一对
      chatList.list.splice(chatList.list.length - 2, 2);
      ElMessage({
        message: err.data.message,
        type: "info",
      });
      return;
    }

    console.log(err, "其他错误信息");
    // 移除列表中最后一对
    chatList.list.splice(chatList.list.length - 2, 2);
    ElMessage({
      message: err.data.message,
      type: "info",
    });
  });

  //监听返回的信息添加到响应的会话信息
  source.addEventListener(
    "qInfo",
    (event) => {
      console.log(event, "监听返回的信息添加到响应的会话信息");
      actionState = "3"; // 接收答案时卷轴不调用滚动方法

      // if (this.isVip === false && this.freeTotal > 0) {
      //   this.freeTotal--;
      //   uni.setStorageSync("residueFreeQAQuantity", this.freeTotal);
      //   this.freeTotal = uni.getStorageSync("residueFreeQAQuantity");

      //   console.log("ssss", this.freeTotal);
      // }

      let qd = JSON.parse(event.data);

      // 减少提问次数
      userStore.saveResidueQAQuantity(Number(qd.residueQAQuantity));

      chatList.list[chatList.list.length - 1].id = qd.aId;
      chatList.list[chatList.list.length - 1].tagId = qd.tagId;
      chatList.list[chatList.list.length - 2].id = qd.qId;
      chatList.list[chatList.list.length - 2].tagId = qd.tagId;
      chatList.lastId = chatList.list[0].id;

      // 如果tagId==0说明是第一次会话，把新的会话第一条添加到side
      if (activeTag.value == 0) {
        let h = {
          id: qd.tagId,
          title: qd.tagTitle,
        };
        activeTag.value = qd.tagId;
        tagList.list.unshift(h);
        tagList.isNull = false;
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
      sendLoading.value = false;
      source.close();
    } else if (e.type == "message") {
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
      sendLoading.value = false;
      e.target.close();
      // ElMessage({
      //   type: "error",
      //   message: e.error || "异常: 对话中断",
      // });
    } catch (error) {}
  };
};

// 敏感词弹窗 确认
const bowDownToTheCCP = () => {
  chatList.list.splice(chatList.list.length - 2, 2);
  // 重新设置lastId
  chatList.lastId = chatList.list.length
    ? chatList.list[chatList.list.length - 1].id
    : 0;
  dialogVisible.value = false;
};

// 复制
const copy_text = ref();
const handleCopy = (text) => {
  const text1 = reString(text);
  copy_text.value.setAttribute("data-clipboard-text", text1);
  initCopyClipboard();
  copy_text.value.click();
};

// 设置复制板
const initCopyClipboard = () => {
  const clipboard = new Clipboard(".clipboard_text");
  clipboard.on("success", function (e) {
    ElMessage({
      message: "复制成功",
      type: "success",
    });
    // 清空选中
    clipboard.destroy();
  });
  clipboard.on("error", function (e) {
    ElMessage({
      message: "复制失败",
      type: "error",
    });
    // 清空选中
    clipboard.destroy();
  });
};

// -----------------左侧聊天历史的选中和删除----------------------

// 选中
const handActiveTag = (item, index) => {
  if (item.id === activeTag.value) return;
  // 正在提问中不允许切换tag
  if (sendLoading.value) return;
  activeTag.value = item.id;
  // 清空聊天窗口数据
  clearChatList();
  console.log("选中tag,获取聊天");
  getAnswerList(activeTag.value);
};

// 删除对话窗口弹窗
const removeVisible = ref(false);

// 删除弹窗打开
const handDeleteTag = (item, index) => {
  removeVisible.value = true;
};

const scrollToEnd = debounce(function () {
  nextTick(() => {
    slideAnimation(chatScrollPage.value.offsetHeight);
  });
}, 250);

// 确认删除 左侧历史
const handConfirmDeleteTag = () => {
  const tagId = activeTag.value;
  activeTag.value = 0;
  removeVisible.value = false;
  request
    .post(api.ai_delTag, {
      tagId,
    })
    .then((res) => {
      if (res.code === 200) {
        const idx = tagList.list.findIndex((item) => item.id == tagId);
        console.log("idx", idx);
        tagList.list.splice(idx, 1);
        tagList.lastId = tagList.list.length
          ? tagList.list[tagList.list.length - 1].id
          : 0;
        clearChatList();
        ElMessage({
          message: "删除成功",
          type: "success",
        });
      } else {
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    });
};

// 新增聊天
const handNewChat = () => {
  if (userStore.residueQAQuantity == 0) {
    return ElMessage({
      message: "您的问答次数已用尽，请联系客服购买",
      type: "info",
    });
  }

  // 清空聊天区
  activeTag.value = 0;
  question.value = "";
  clearChatList();
};

// ------------------------------------------

// 监听scrollTop, 为0时调用加载列表方法getAnswerList
watch(
  chatScrollTop,
  (newVal, oldVal) => {
    if (newVal === 0) {
      if (activeTag.value) {
        console.log("watch:到顶");
        actionState = "1"; // 动作状态设定为加载列表
        getAnswerList();
      }
    }
  },
  {
    immediate: false,
  }
);

// 发送问题
const handleSend = () => {
  if (question.value.trim().length === 0) {
    return;
  }
  if (question.value.length > 800) {
    return ElMessage({
      message: "您的输入已超出800字，请进行修改。",
      type: "warning",
    });
  }
  if (userStore.residueQAQuantity == 0) {
    return ElMessage({
      message: "您的问答次数已用尽，请联系客服购买",
      type: "warning",
    });
  }
  actionState = "2"; //动作状态设定为添加新问题
  const question1 = reString(question.value.trim());
  question.value = "";
  sendLoading.value = true;
  // 添加问题和答案的位置到列表
  chatList.list.push({
    id: "",
    userId: userInfo.userId,
    tagId: "",
    type: 1,
    description: question1,
    createdAt: "",
  });
  chatList.list.push({
    id: "",
    userId: userInfo.userId,
    tagId: "",
    type: 2,
    description: "",
    createdAt: "",
  });
  scrollToEnd();

  _getResult(question1, activeTag.value);
};

const sendByKey = (event) => {
  if (event.key === "Enter") {
    if (!event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      handleSend();
    } else {
      question.value = question.value + "\n";
    }
  }
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

onUpdated(() => {
  if (sendLoading.value) return;
  scrollPageHeight.value = chatScrollPage.value.offsetHeight;
});

// 每次加载列表后设置滚动高度
watch(
  scrollPageHeight,
  (newVal, oldVal) => {
    if (!activeTag.value) return;
    if (actionState === "1") {
      // 列表不满一屏 加载
      if (newVal <= chatScrollView.value.offsetHeight) {
        console.log("聊天列表不满一屏,加载");
        getAnswerList();
      } else {
        // 动作状态为加载列表时: 触发列表加载完成后,卷轴scrollTop设定为加载之前观看的位置
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
      // 接收答案中 不滚动卷轴
    } else if (actionState === "4") {
      // 动作状态为删除对话信息: 删除对话信息,卷轴scrollTop设定为加载之前观看的位置
      chatScrollView.value.scrollTop = oldVal - newVal;
    }
  },
  {
    deep: true,
  }
);

// 删除信息确认
const handConfirmRemoveMsg = () => {
  removeMsgVisible.value = false;
  request
    .post(api.chat_delAnswer, {
      answerId: delMsgId.value,
    })
    .then((res) => {
      if (res.code == 200) {
        // 设置动作为删除  删除后不用手动填充新数据到列表, 监听高度不足一屏时会自动获取
        actionState = "4";
        const idx = chatList.list.findIndex(
          (item) => item.id === delMsgId.value
        );
        chatList.list.splice(idx - 1, 2);
      } else {
        ElMessage({
          type: "error",
          message: res.message,
        });
      }
    });
};

// 获取对话剩余次数
const getChatResidueQuantity = async () => {
  try {
    const res = await request.get(api.chat_residueQuantity);
    console.log(res, "获取对话剩余次数");
    if (res.code !== 200) {
      return showToast(res.msg);
    }
    userStore.saveResidueQAQuantity(res.data.residueQAQuantity);
  } catch (error) {
    throw error;
  }
};

// 加载完成事件
onMounted(() => {
  console.log("mount");
  getChatResidueQuantity();
  getHistory();
});
</script>


<style scoped lang="less">
.container {
  display: flex;
  height: 100%;

  .side-content {
    height: 100%;

    .newchat {
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
      cursor: pointer;
      svg {
        width: 14px;
        height: 14px;
      }
      span {
        margin-left: 11px;
      }

      &:active {
        opacity: 0.8;
      }
    }

    .newchat_disabled {
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
      cursor: auto;
      opacity: 0.5;
      svg {
        width: 14px;
        height: 14px;
      }
      span {
        margin-left: 11px;
      }
    }

    // 历史列表
    .log_list {
      width: 310px;
      height: calc(100% - 90px);
      margin: auto;
      padding: 22px 0;

      .scroll_view {
        width: 301px;
        height: 100%;
        overflow-y: scroll;

        .scroll_page {
          margin-left: 22px;

          .log_item {
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 266px;
            height: 46px;
            padding: 0 13px;
            border: 1px solid #dae0f5;
            border-radius: 5px;
            margin: 22px 0;
            font-family: PingFang SC;
            font-size: 19px;
            font-weight: 400;
            line-height: 46px;
            cursor: pointer;

            .bubble_icon {
              width: 20px;
              height: 20px;
            }

            .log_name {
              flex: 1;
              min-width: 0;
              padding-right: 30px;
              text-indent: 10px;
              color: #ffffff;
              font-family: PingFang SC;
              font-size: 19px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              text-align: left;
            }

            .delete_icon {
              position: absolute;
              top: 50%;
              right: 13px;
              transform: translate(0, -50%);
              width: 20px;
              height: 20px;
              border-radius: 5px;

              &:hover {
                background-color: rgba(0, 0, 0, 0.4);
              }

              &:active {
                background-color: rgba(0, 0, 0, 0.5);
              }
            }
          }

          .log_item:nth-child(1) {
            margin-top: 0;
          }

          .log_item:nth-last-child(1) {
            margin-bottom: 0;
          }

          .log_item_active {
            background-color: rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(90, 161, 248, 1);

            .log_name {
              color: rgba(201, 225, 255, 1);
            }
          }
        }
      }
    }
  }

  .container-body {
    flex: 1;
    height: 100%;
    background: #f1f2f6;

    .body-top {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 68px;
      background-color: #e5e9f5;
      color: #666;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .body-content {
      position: relative;
      width: 100%;
      height: calc(100% - 68px);

      .chat_box {
        position: relative;
        height: 100%;

        .chat_scroll_view {
          position: relative;
          height: 100%;
          overflow-y: scroll;

          &::-webkit-scrollbar {
            display: none;
          }

          .list_content {
            padding: 0 30px;

            .loading {
              width: 100%;
              height: 22px;
              margin-bottom: 40px;
              display: block;
              text-align: center;
              color: #999;
              text-align: center;
              font-family: PingFang SC;
              font-size: 16px;
              font-style: normal;
              font-weight: 400;
              line-height: 22px;
            }

            .msg_item {
              margin: 40px 0;
            }

            .question {
              display: flex;
              justify-content: flex-end;

              .toright {
                display: flex;
                justify-content: flex-end;

                .bubble {
                  max-width: 1278px;
                  padding: 12px 16px;
                  border-radius: 8px;
                  background: #fff;
                  color: #333;
                  font-family: PingFang SC;
                  font-size: 19px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 44px;
                }

                .avatar {
                  width: 68px;
                  height: 68px;
                  border-radius: 50%;
                  margin-left: 10px;
                }
              }
            }

            .answer {
              display: flex;
              justify-content: flex-start;

              .toleft {
                display: flex;
                justify-content: flex-start;

                .avatar {
                  width: 68px;
                  height: 68px;
                  border-radius: 50%;
                  margin-right: 10px;
                }

                .bubble {
                  position: relative;
                  max-width: 1278px;
                  min-width: 195px;
                  padding: 12px 16px 52px 16px;
                  border-radius: 8px;
                  background: #dae0f5;
                  color: #333;
                  font-family: PingFang SC;
                  font-size: 19px;
                  font-style: normal;
                  font-weight: 400;
                  line-height: 44px;

                  .taptap {
                    position: absolute;
                    left: 22px;
                    bottom: 0;
                    display: flex;
                    align-items: center;
                    height: 52px;
                    color: #666;
                    font-family: PingFang SC;
                    font-size: 19px;
                    font-style: normal;
                    font-weight: 500;
                    line-height: normal;

                    .copy {
                      display: flex;
                      align-items: center;
                      margin-right: 15px;

                      img {
                        width: 30px;
                        height: 30px;
                        margin-right: 15px;
                        cursor: pointer;
                      }

                      &:active {
                        border-radius: 5px;
                        background-color: rgba(18, 108, 254, 0.5);
                      }
                    }

                    .del {
                      display: flex;
                      align-items: center;

                      img {
                        width: 30px;
                        height: 30px;
                        margin-right: 15px;
                        cursor: pointer;
                      }

                      &:active {
                        border-radius: 5px;
                        background-color: rgba(18, 108, 254, 0.5);
                      }
                    }
                  }
                }
              }
            }
          }

          .page_bottom {
            height: 225px;
          }
        }

        .scroll_page::-webkit-scrollbar {
          display: none !important;
        }
      }

      .ask {
        position: absolute;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        padding: 0 30px 38px 30px;
        background: #f1f2f6;

        .ask_input {
          position: relative;
          flex: 1;
          min-height: 52px;

          .textarea {
            &::placeholder {
              color: #ccc;
              font-family: PingFang SC;
              font-size: 19px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
            }

            /deep/.el-textarea__inner {
              padding: 11.5px 16px;
              box-sizing: border-box;
              width: 100%;
              // height: 52px;
              border-radius: 6px;
              border: 1px solid #dae0f5;
              background: #fff;
              outline: none;
              color: #333;
              font-size: 19px;
              line-height: 27px;
              resize: none;
              /*禁止拉伸*/
            }

            /deep/.el-textarea__inner::-webkit-scrollbar {
              display: none;
            }
          }

          .length_count {
            position: absolute;
            bottom: 16.5px;
            right: 13px;
            color: #ccc;
            text-align: right;
            font-family: PingFang SC;
            font-size: 19px;
            font-style: normal;
            font-weight: 400;
            line-height: 19px;
          }
        }

        .send_btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96px;
          height: 52px;
          margin-left: 14px;
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

        .send_btn_disabled {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 96px;
          height: 52px;
          margin-left: 14px;
          border-radius: 6px;
          background: #126cfe;
          color: #fff;
          text-align: center;
          font-family: PingFang SC;
          font-size: 19px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
          opacity: 0.5;
          cursor: auto;
        }
      }
    }
  }

  .dialog_dia {
    height: 229px;

    .dia_title {
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 30px;
      font-style: normal;
      font-weight: 500;
      line-height: 42px;
      padding-top: 23.7px;
      padding-bottom: 12px;
    }

    .dia_content {
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 20px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
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

    .dia_footer_2 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 50px;

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
  }

  .service {
    display: flex;
    flex-direction: column;
    align-items: center;

    .service_title {
      margin-top: 30px;
      color: #000;
      font-family: PingFang SC;
      font-size: 30px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
    }

    .service_code {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 48px;
      margin-bottom: 40px;
      width: 320px;
      height: 320px;

      img {
        width: 270px;
        height: 270px;
      }
    }
  }

  .clipboard_text {
    position: fixed;
    top: -500px;
    left: 0;
    width: 200px;
    height: 200px;
  }

  @keyframes rotateLoading {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  /deep/.rotate_icon {
    transform-origin: center center;
    animation: rotateLoading 1.5s linear infinite;
  }
}
</style>
