<template>
  <div class="container">
    <sidebar @on-pannel-toggle="onOnPannelToggle">
      <div class="side-content">
        <div v-if="!isExpandMode" @click="handNewChat">
          <img src="@/assets/add_chat_shrink.svg" alt="" class="newchat_shink_icon" />
        </div>
        <div v-else-if="sendLoading" class="newchat_disabled">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect y="6" width="14" height="2" fill="white" />
            <rect x="6" y="14" width="14" height="2" transform="rotate(-90 6 14)" fill="white" />
          </svg>
          <span>新建聊天</span>
        </div>
        <div v-else class="newchat" @click="handNewChat">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect y="6" width="14" height="2" fill="white" />
            <rect x="6" y="14" width="14" height="2" transform="rotate(-90 6 14)" fill="white" />
          </svg>
          <span>新建聊天</span>
        </div>

        <div :class="['log_list', isExpandMode ? '' : 'log_listShink']" v-loading="tagList.loading">
          <div :class="['scroll_view', isExpandMode ? '' : 'scroll_viewShink']" ref="tagListScroll"
            @scroll="handTagListScroll">
            <div v-if="tagList.isNull" class="scroll_page"></div>
            <div v-else ref="tagListPage" :class="['scroll_page', isExpandMode ? '' : 'scroll_pageShrink']">
              <div v-for="(item, index) in tagList.list" :key="index" :class="[
                'log_item',
                isExpandMode ? '' : 'log_itemShrink',
                item.id === activeTag ? 'log_item_active' : '',
                (!isExpandMode && item.id === activeTag) ? 'log_item_activeShrink' : '',
              ]" @click="handActiveTag(item, index)">
                <template v-if="isExpandMode">
                  <img v-if="item.id === activeTag" class="bubble_icon"
                    src="https://quanres.hanhoukeji.com/hanhou-ai-pc/bubble_icon_active.png" alt="" />
                  <img v-else class="bubble_icon" src="https://quanres.hanhoukeji.com/hanhou-ai-pc/bubble_icon_.png"
                    alt="" />
                  <span class="log_name nowrap">{{ item.title }}</span>

                  <svg v-if="item.id === activeTag" @click.self="handDeleteTag(item, index)" class="delete_icon"
                    xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M4.12832 4.93606C4.30351 4.93606 4.47153 5.00836 4.5954 5.13705C4.71928 5.26575 4.78887 5.4403 4.78887 5.62231V15.2805C4.78887 15.4575 4.82242 15.6326 4.8876 15.7961C4.95278 15.9595 5.04831 16.108 5.16874 16.2331C5.28918 16.3582 5.43215 16.4574 5.58949 16.5251C5.74683 16.5927 5.91546 16.6275 6.08576 16.6275H13.9144C14.2582 16.6275 14.588 16.4856 14.8312 16.233C15.0743 15.9804 15.2109 15.6378 15.2109 15.2805V5.62231C15.2109 5.4403 15.2805 5.26575 15.4044 5.13705C15.5282 5.00836 15.6963 4.93606 15.8714 4.93606C16.0466 4.93606 16.2146 5.00836 16.3385 5.13705C16.4624 5.26575 16.532 5.4403 16.532 5.62231V15.2805C16.532 16.0018 16.2562 16.6935 15.7653 17.2035C15.2744 17.7135 14.6086 18 13.9144 18H6.08539C5.39115 18 4.72535 17.7135 4.23446 17.2035C3.74356 16.6935 3.46777 16.0018 3.46777 15.2805V5.62231C3.46777 5.4403 3.53737 5.26575 3.66124 5.13705C3.78512 5.00836 3.95314 4.93606 4.12832 4.93606ZM7.55365 3.40571C7.72883 3.40571 7.89685 3.33341 8.02072 3.20472C8.1446 3.07602 8.2142 2.90147 8.2142 2.71946C8.21415 2.54255 8.24765 2.36735 8.31278 2.20389C8.37792 2.04042 8.47341 1.89189 8.59381 1.76677C8.7142 1.64165 8.85715 1.5424 9.01447 1.47469C9.17179 1.40697 9.34042 1.37212 9.51071 1.37212H10.4891C10.6594 1.37207 10.828 1.40689 10.9854 1.47458C11.1428 1.54227 11.2858 1.64152 11.4062 1.76664C11.5266 1.89176 11.6222 2.04031 11.6873 2.2038C11.7525 2.36729 11.786 2.54251 11.7859 2.71946C11.7859 2.90147 11.8555 3.07602 11.9794 3.20472C12.1033 3.33341 12.2713 3.40571 12.4465 3.40571C12.6217 3.40571 12.7897 3.33341 12.9136 3.20472C13.0374 3.07602 13.107 2.90147 13.107 2.71946C13.1071 2.00432 12.836 1.31793 12.3525 0.80894C11.8689 0.299949 11.2119 0.00932405 10.5236 0H9.47658C8.78831 0.0094226 8.1313 0.300079 7.64778 0.809049C7.16426 1.31802 6.89313 2.00435 6.89309 2.71946C6.89309 2.90147 6.96269 3.07602 7.08657 3.20472C7.21044 3.33341 7.37846 3.40571 7.55365 3.40571Z"
                      fill="#C9E1FF" />
                    <path
                      d="M2 3.33469C2 3.15268 2.06959 2.97813 2.19347 2.84944C2.31735 2.72074 2.48536 2.64844 2.66055 2.64844H17.3394C17.5146 2.64844 17.6827 2.72074 17.8065 2.84944C17.9304 2.97813 18 3.15268 18 3.33469C18 3.51669 17.9304 3.69125 17.8065 3.81994C17.6827 3.94864 17.5146 4.02094 17.3394 4.02094H2.66055C2.48536 4.02094 2.31735 3.94864 2.19347 3.81994C2.06959 3.69125 2 3.51669 2 3.33469ZM8.04294 5.8254C8.21812 5.8254 8.38614 5.8977 8.51002 6.0264C8.63389 6.1551 8.70349 6.32965 8.70349 6.51165V14.1367C8.70349 14.3187 8.63389 14.4932 8.51002 14.6219C8.38614 14.7506 8.21812 14.8229 8.04294 14.8229C7.86775 14.8229 7.69973 14.7506 7.57586 14.6219C7.45198 14.4932 7.38239 14.3187 7.38239 14.1367V6.51165C7.38239 6.32965 7.45198 6.1551 7.57586 6.0264C7.69973 5.8977 7.86775 5.8254 8.04294 5.8254ZM11.9574 5.8254C12.1326 5.8254 12.3006 5.8977 12.4245 6.0264C12.5484 6.1551 12.618 6.32965 12.618 6.51165V14.1367C12.618 14.3187 12.5484 14.4932 12.4245 14.6219C12.3006 14.7506 12.1326 14.8229 11.9574 14.8229C11.7822 14.8229 11.6142 14.7506 11.4904 14.6219C11.3665 14.4932 11.2969 14.3187 11.2969 14.1367V6.51165C11.2969 6.32965 11.3665 6.1551 11.4904 6.0264C11.6142 5.8977 11.7822 5.8254 11.9574 5.8254Z"
                      fill="#C9E1FF" />

                  </svg>
                </template>
                <template v-else>
                  <el-tooltip effect="dark" :content="item.title" placement="right" popper-class="popper_style2">
                    <span class="log_name nowrap log_nameShink">{{ item.title.substring(0, 1) }}</span>
                  </el-tooltip>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </sidebar>

    <div class="container-body">
      <div class="body-top">
        <div class="tip_line">
          <span v-html="chatTips[chatTipsIndex]" v-if="userStore.residueQAQuantity > 4"></span>
          <span v-else-if="userStore.residueQAQuantity > 0">您的问答次数即将用尽，<span class="tip_buyvip"
              @click="buyMember">购买会员</span>获取更多问答次数~</span>
          <span v-else>您的问答次数已用尽，<span class="tip_buyvip" @click="buyMember">购买会员</span>获取更多问答次数~</span>
        </div>
        <div class="tip_btns">
          <div class="tip_times">
            <img class="tip_msg_icon" src="@/assets/icon_message_left.svg" alt="" />
            <span>{{ userStore.residueQAQuantity }}次</span>
          </div>
          <div class="tip_buy" @click="buyMember">
            <span>购买会员</span>
          </div>
        </div>
      </div>
      <div class="body-content">
        <div class="chat_box">
          <div class="chat_scroll_view" @scroll="chatScrollViewListen" ref="chatScrollView">
            <div class="list_content" ref="chatScrollPage">
              <div v-show="chatList.loading" class="loading">正在加载...</div>
              <template v-for="(item, idx) in chatList.list" :key="idx">
                <div v-if="item.type == 1" class="msg_item question">
                  <div class="toright">
                    <div class="bubble">
                      <div v-text="item.description" style="white-space: pre-wrap"></div>
                    </div>
                    <img class="avatar" src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mine-avatar.png" alt="" />
                  </div>
                </div>
                <div v-else-if="item.type == 2" class="msg_item answer">
                  <div class="toleft">
                    <img class="avatar" src="https://quanres.hanhoukeji.com/hanhou-ai-pc/hhrobot-avatar.png" alt="" />
                    <div class="bubble">
                      <div v-if="!item.description &&
                        sendLoading &&
                        chatList.list.length - 1 === idx
                        ">
                        <el-icon class="rotate_icon"><loading-icon /></el-icon>
                      </div>
                      <div v-else v-text="item.description" style="white-space: pre-wrap"></div>
                      <div class="taptap" v-show="!(chatList.list.length - 1 == idx && sendLoading)
                        ">
                        <div class="copy" @click="handleCopy(item.description)">
                          <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/copy-icon.svg" alt="" />
                          复制
                        </div>
                        <div class="del" @click="handShowRemoveMsg(item.id)">
                          <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/delete-icon.svg" alt="" />
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
            <el-input class="textarea" v-model="question" resize="none" @keydown="sendByKey"
              :autosize="{ minRows: 1, maxRows: 6 }" type="textarea" placeholder="请输入您需要提问的信息..." />
            <div class="length_count">
              <span :style="{ color: question.length > 800 ? 'red' : 'inherit' }">{{ question.length }}</span>/800
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
    <my-dialog :show-close="false" :close-on-click-modal="false" v-model:visible="dialogVisible">
      <div class="dialog_dia">
        <div class="dia_title">敏感词提醒</div>
        <div class="dia_content">{{ tipMessage }}</div>
        <div class="dia_footer_1">
          <div class="confirm" @click="bowDownToTheCCP">确认</div>
        </div>
      </div>
    </my-dialog>

    <!-- 删除对话窗口提醒 -->
    <my-dialog :show-close="false" :close-on-click-modal="false" v-model:visible="removeVisible">
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
    <my-dialog :show-close="false" :close-on-click-modal="false" v-model:visible="removeMsgVisible">
      <div class="dialog_dia">
        <div class="dia_title">温馨提示</div>
        <div class="dia_content">是否要删除此对话信息？</div>
        <div class="dia_footer_2">
          <div class="cancel" @click="removeMsgVisible = false">取消</div>
          <div class="confirm" @click="handConfirmRemoveMsg">删除</div>
        </div>
      </div>
    </my-dialog>
    <div class="custDialog">
      <el-dialog :show-close="false" :close-on-click-modal="false" v-model="removeBuyVisible">
        <div class="buyMember_dia">
          <img class="buyMemberBg" src="https://quanres.hanhoukeji.com/hanhou-ai-pc/buy_memeber_dialog.png" alt="" />
          <img class="buyMemberClose" src="@/assets/dialog_close.svg" alt="" @click="removeBuyVisible = false" />
          <span class="buyMemeberTitle">购买会员获得更多问答次数</span>
        </div>
      </el-dialog>
    </div>

    <div ref="copy_text" class="clipboard_text" data-clipboard-action="copy" data-clipboard-text="copytext"></div>
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
import { ElMessage, ElDialog, ElInput, ElIcon, ElTooltip } from "element-plus";
import { Loading as LoadingIcon } from "@element-plus/icons-vue";
import { EventSourcePolyfill } from "event-source-polyfill";
import api from "@/http/api";
import Clipboard from "clipboard";
import { _getSign } from "@/http/sign";
import utils from "@/common/utils";
import Sidebar from "@/components/Sidebar.vue";
import MyDialog from "@/components/MyDialog.vue";
import { useUserStore } from "@/store/user";
import data from "@/common/data";
import debounce from "lodash/debounce";

const userStore = useUserStore(); //用户信息

const chatTips = data.getChatTipList();
const randomNumber = Math.floor(Math.random() * chatTips.length);
const chatTipsIndex = ref(randomNumber);

// 上下文
// const instance = getCurrentInstance();
// console.log("app", instance.appContext);
// instance.appContext.app.directive("loading", vLoading);

// 路由
const router = useRouter();
// 剩余提问次数
const userInfo = utils.getUserInfo() || {};

// 弹层关闭事件
const dialogClose = () => { };

// 敏感词提醒弹窗
const dialogVisible = ref(false);
const isExpandMode = ref(true);
// 敏感词提示词
const tipMessage = ref("");

// 删除信息弹窗
const removeMsgVisible = ref(false);
const removeBuyVisible = ref(false);
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

function onOnPannelToggle(expanded) {
  isExpandMode.value = expanded;
}

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
    `${process.env.VUE_APP_BASE_URL}${api.chat_qa
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
      buyMember();
      // ElMessage({
      //   message: err.data.message,
      //   type: "info",
      // });
      return;
    }

    // 充值会员
    if (err.data.code == 30108) {
      //   "您的免费问答次数已用尽，开通会员享1000次/月问答权益!";
      // 减少提问次数
      userStore.saveResidueQAQuantity(0);
      // 移除列表中最后一对
      chatList.list.splice(chatList.list.length - 2, 2);
      buyMember();
      // ElMessage({
      //   message: err.data.message,
      //   type: "info",
      // });
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
    } catch (error) { }
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
    buyMember();
    return;
    // return ElMessage({
    //   message: "您的问答次数已用尽，请联系客服购买",
    //   type: "warning",
    // });
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
      return ElMessage({
        type: 'error',
        message:res.msg
      });
    }
    userStore.saveResidueQAQuantity(res.data.residueQAQuantity);
  } catch (error) {
    throw error;
  }
};

function buyMember() {
  removeBuyVisible.value = true;;
}

// 加载完成事件
onMounted(() => {
  console.log("mount");
  getChatResidueQuantity();
  getHistory();
});
</script>

<style>
.popper_style2 {
  background-color: black !important;
  border: none !important;
  font-family: PingFang SC !important;
  line-height:39px;
  font-size: 16px !important;

  span {
    font-family: PingFang SC !important;
  }

}
.el-popper__arrow::before {
    background-color: black !important;
    border: none !important;
  }
</style>

<style scoped lang="less">
.container {
  display: flex;
  height: 100%;

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
  .side-content {
    height: 100%;

    .newchat_shink_icon {
      width: 53px;
      height: 53px;
    }

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
    .log_listShink {
      width: 100px !important;
    }

    .log_list {
      width: 310px;
      height: calc(100% - 90px);
      margin: auto;
      padding: 22px 0;

      .scroll_viewShink {
        width: 100px !important;
      }

      .scroll_view {
        width: 301px;
        height: 100%;
        overflow-y: scroll;

        .scroll_pageShrink {
          margin-left: 0 !important;
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .scroll_page {
          margin-left: 22px;

          .log_itemShrink {
            width: 46px !important;
            padding: 0 !important;
            margin: 0 0 22px 0 !important;
            background-color: #182039;
            border-width: 0px !important;

            &:hover {
              background-color: #1D2849;
            }

            &:active {
              background-color: #126CFE;
            }
          }

          .log_item {
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 266px;
            height: 46px;
            padding: 0 13px;
            // border: 1px solid #dae0f5;
            border-radius: 5px;
            margin: 5px 0;
            font-family: PingFang SC;
            font-size: 19px;
            font-weight: 400;
            line-height: 46px;
            cursor: pointer;

            &:hover {
              background-color: #172141;
            }

            &:active {
              background-color: #192039;
            }

            .bubble_icon {
              width: 20px;
              height: 20px;
            }

            .log_nameShink {
              padding-right: 0px !important;
              text-align: center !important;
              text-indent: 0px !important;
            }

            .log_name {
              flex: 1;
              min-width: 0;
              padding-right: 30px;
              text-indent: 10px;
              color: #C9E1FF;
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

          .log_item_activeShrink {
            background-color: #126CFE !important;
            border-width: 0px !important;
          }

          .log_item_active {
            background-color: #192039;
            // border: 1px solid rgba(90, 161, 248, 1);

            .log_name {
              color: #C9E1FF;
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
