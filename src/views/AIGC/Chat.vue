<template>
  <div class="container">
    <div class="container-side">
      <div class="title">
        <img
          class="logo"
          src="https://quanres.hanhoukeji.com/hanhou-ai-pc/hanhou-monkey-icon.png"
          alt=""
        />
        Hanhou·AIGC
      </div>

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
        <div class="scroll_view">
          <div v-if="tagList.isNull" class="scroll_page"></div>
          <div
            v-else
            v-infinite-scroll="getHistory"
            :infinite-scroll-disabled="tagList.finish"
            class="scroll_page"
          >
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
                class="bubble_icon"
                src="https://quanres.hanhoukeji.com/hanhou-ai-pc/bubble-icon.svg"
                alt=""
              />
              <span class="log_name nowrap">{{ item.title }}</span>
              <img
                v-if="item.id === activeTag"
                @click.self="handDeleteTag(item, index)"
                class="delete_icon"
                src="https://quanres.hanhoukeji.com/hanhou-ai-pc/delete-icon.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div class="side-fo">
        <div class="menu-item mt20" @click="serviceVisible = true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="21"
            viewBox="0 0 19 21"
            fill="none"
          >
            <path
              d="M1.4674 20.5124C1.05215 20.5124 0.717529 20.1777 0.717529 19.7625C0.717529 18.1337 2.64059 16.9565 6.02309 16.4848V16.259C3.72912 14.5013 3.72912 11.2437 3.72912 9.26021C3.72912 5.98657 5.65622 4.03125 8.88148 4.03125H9.05484C12.2801 4.03125 14.2072 5.98657 14.2072 9.26021C14.2072 9.50211 14.2032 9.744 14.1991 9.99396C14.187 10.4092 13.8484 10.7358 13.4291 10.7237C13.0139 10.7116 12.6873 10.3689 12.6994 9.95364C12.7075 9.71981 12.7075 9.49001 12.7075 9.26021C12.7075 6.78482 11.4778 5.531 9.05484 5.531H8.88148C6.4585 5.531 5.22887 6.78482 5.22887 9.26021C5.22887 11.655 5.37804 14.0941 7.17612 15.239C7.39383 15.3761 7.52284 15.614 7.52284 15.872V17.15C7.52284 17.533 7.23256 17.8555 6.8536 17.8959C3.842 18.2144 2.21728 19.0973 2.21728 19.7625C2.21728 20.1737 1.87862 20.5124 1.4674 20.5124Z"
              fill="#126CFE"
            />
            <path
              d="M16.5416 20.5124C16.1264 20.5124 15.7918 20.1778 15.7918 19.7625C15.7918 19.0933 14.167 18.2144 11.1555 17.8959C10.7725 17.8556 10.4822 17.5331 10.4822 17.1501V15.868C10.4822 15.4528 10.8168 15.1182 11.2321 15.1182C11.6473 15.1182 11.9819 15.4528 11.9819 15.868V16.4849C15.3644 16.9525 17.2875 18.1338 17.2875 19.7625C17.2915 20.1738 16.9569 20.5124 16.5416 20.5124Z"
              fill="#126CFE"
            />
            <path
              d="M11.3488 13.7836C10.3168 13.7836 9.54672 13.6788 9.52657 13.6748C9.15566 13.5619 8.93392 13.187 9.01456 12.804C9.09116 12.425 9.44594 12.175 9.83297 12.2113C11.7036 12.4169 14.558 12.2395 15.0579 11.1994C15.2353 10.8285 15.6828 10.6672 16.0577 10.8486C16.4327 11.026 16.5899 11.4776 16.4085 11.8485C15.6263 13.4772 13.1106 13.7836 11.3488 13.7836Z"
              fill="#126CFE"
            />
            <path
              d="M18.001 12.9976C17.5858 12.9976 17.2511 12.663 17.2511 12.2477V9.62722L16.2473 9.26841C15.9489 9.16359 15.7474 8.87735 15.7474 8.56288C15.7474 4.80142 12.7196 1.73742 8.99849 1.73742C5.27734 1.73742 2.24962 4.80142 2.24962 8.56288C2.24962 8.80478 2.13271 9.03054 1.93516 9.17165L1.49975 9.48208V12.2477C1.49975 12.663 1.16513 12.9976 0.749874 12.9976C0.334621 12.9976 0 12.663 0 12.2477V9.09908C0 8.85719 0.116916 8.63142 0.314463 8.49031L0.757937 8.17182C0.963548 3.7653 4.57988 0.241699 8.99849 0.241699C13.3687 0.241699 16.9568 3.6887 17.231 8.03071L18.251 8.39355C18.5493 8.49838 18.7509 8.78462 18.7509 9.09908V12.2477C18.7509 12.663 18.4163 12.9976 18.001 12.9976Z"
              fill="#126CFE"
            />
          </svg>
          <span>联系客服</span>
          <svg
            class="gt"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
          >
            <path
              d="M1.50049 1.5L9.00049 9L2.00049 16.5"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="menu-item mt30" @click="handExit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15.857 3.28498C15.857 2.85898 15.55 2.51398 15.172 2.51398H6.21201C4.73601 2.51398 3.51501 3.76398 3.51501 5.34298V17.685C3.51501 19.265 4.73501 20.514 6.21201 20.514H15.172C15.55 20.514 15.857 20.169 15.857 19.743C15.857 19.317 15.55 18.971 15.172 18.971H6.21201C5.46601 18.971 4.88601 18.378 4.88601 17.685V5.34298C4.88601 4.64998 5.46601 4.05698 6.21201 4.05698H15.172C15.55 4.05698 15.857 3.71098 15.857 3.28498ZM20.335 11.106L20.26 11.02L16.146 6.90598C16.0089 6.76632 15.8237 6.68407 15.6281 6.6759C15.4326 6.66773 15.2412 6.73425 15.0929 6.86197C14.9445 6.9897 14.8503 7.16906 14.8294 7.36368C14.8084 7.5583 14.8623 7.7536 14.98 7.90998L15.055 7.99698L17.851 10.794H10.149C9.91601 10.794 9.72401 11.079 9.69101 11.451L9.68601 11.565C9.68601 11.953 9.85701 12.273 10.08 12.328L10.149 12.337H17.852L15.055 15.134C14.9242 15.2647 14.8447 15.4381 14.8309 15.6226C14.8171 15.807 14.8701 15.9903 14.98 16.139L15.055 16.225C15.1857 16.3555 15.3589 16.4349 15.5431 16.4487C15.7273 16.4624 15.9104 16.4097 16.059 16.3L16.146 16.225L20.26 12.111C20.3908 11.9802 20.4704 11.8068 20.4841 11.6224C20.4979 11.438 20.445 11.2547 20.335 11.106Z"
              fill="black"
            />
          </svg>
          <span>退出登录</span>
          <svg
            class="gt"
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="18"
            viewBox="0 0 10 18"
            fill="none"
          >
            <path
              d="M1.50049 1.5L9.00049 9L2.00049 16.5"
              stroke="#333333"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="container-body">
      <div class="body-top">
        <span>您的免费问答次数：{{ residueQAQuantity }}次</span>
      </div>
      <div class="body-content">
        <div class="chat_box">
          <div v-show="chatList.loading" class="loading">正在加载...</div>
          <div
            class="scroll_page"
            @scroll="chatScrollViewListen"
            ref="chatScrollView"
          >
            <div class="list_content" ref="chatScrollPage">
              <template v-for="(item, idx) in chatList.list" :key="idx">
                <div v-if="item.type == 1" class="msg_item question">
                  <div class="toright">
                    <div class="bubble">
                      <div
                        v-html="item.description"
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
                      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/robot-avatar.png"
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
                        v-html="item.description"
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
              :autosize="{ minRows: 1, maxRows: 6 }"
              type="textarea"
              placeholder="请输入您需要提问的信息..."
            />
            <div class="length_count">
              <span
                :style="{ color: question.length > 1000 ? 'red' : 'inherit' }"
                >{{ question.length }}</span
              >/1000
            </div>
          </div>

          <div v-if="sendLoading" class="send_btn_disabled">发送</div>
          <div v-else @click="handSend" class="send_btn">发送</div>
        </div>
      </div>
    </div>
    <!-- 敏感词提醒 -->
    <el-dialog
      v-model="dialogVisible"
      width="3.1777rem"
      :show-close="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="dia_title">敏感词提醒</div>
      <div class="dia_content">{{ tipMessage }}</div>
      <div class="dia_footer_1">
        <div class="confirm" @click="bowDownToTheCCP">确认</div>
      </div>
    </el-dialog>
    <!-- 删除对话窗口提醒 -->
    <el-dialog
      v-model="removeVisible"
      width="3.1777rem"
      :show-close="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="dia_title">温馨提示</div>
      <div class="dia_content">是否要删除此对话窗口？</div>
      <div class="dia_footer_2">
        <div class="cancel" @click="removeVisible = false">取消</div>
        <div class="confirm" @click="handConfirmDeleteTag">删除</div>
      </div>
    </el-dialog>
    <!-- 删除对话信息提醒 -->
    <el-dialog
      v-model="removeMsgVisible"
      width="3.1777rem"
      :show-close="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="dia_title">温馨提示</div>
      <div class="dia_content">是否要删除此对话信息？</div>
      <div class="dia_footer_2">
        <div class="cancel" @click="removeMsgVisible = false">取消</div>
        <div class="confirm" @click="handConfirmRemoveMsg">删除</div>
      </div>
    </el-dialog>
    <!-- 退出提醒 -->
    <el-dialog
      v-model="exitVisible"
      width="3.1777rem"
      :show-close="false"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="dia_title">退出提醒</div>
      <div class="dia_content">是否要退出登录</div>
      <div class="dia_footer_2">
        <div class="cancel" @click="exitVisible = false">取消</div>
        <div class="confirm" @click="confirmExit">确定</div>
      </div>
    </el-dialog>
    <!-- 客服二维码 -->
    <el-dialog
      v-model="serviceVisible"
      width="3.1777rem"
      :show-close="true"
      :close-on-click-modal="false"
      @close="dialogClose"
    >
      <div class="service">
        <div class="service_title">扫描二维码添加专属客服</div>
        <div class="service_code">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/CustomerServiceCode.png"
            alt=""
          />
        </div>
      </div>
    </el-dialog>
    <div
      ref="copy_text"
      class="clipboard_text"
      data-clipboard-action="copy"
      data-clipboard-text="copytext..."
    ></div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUpdated, watch } from "vue";
import { useRouter } from "vue-router";
import http from "../../http/index";
import { ElMessage } from "element-plus";
import { Loading as LoadingIcon } from "@element-plus/icons-vue";
import { EventSourcePolyfill } from "event-source-polyfill";
import api from "./api";
import Clipboard from "clipboard";
import { _getSign } from "@/http/sign";
import utils from "@/common/utils";

// 路由
const router = useRouter();
// 剩余提问次数
const userInfo = utils.getUserInfo() || { residueQAQuantity: 0 };

const residueQAQuantity = ref(Number(userInfo.residueQAQuantity || 0));

// 弹层关闭事件
const dialogClose = () => {};

// 退出登录弹窗
const exitVisible = ref(false);

const handExit = () => {
  exitVisible.value = true;
};

// 确认退出登录
const confirmExit = () => {
  exitVisible.value = false;
  http
    .get(api.user_logout, {
      params: {},
    })
    .then((res) => {
      if (res.code == 200) {
        utils.setToken("");
        utils.setUserInfo("");
        router.push({
          path: "/login",
          replace: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: res.msg,
        });
      }
    });
};

// 客服二维码弹窗
const serviceVisible = ref(false);

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
  tagList.loading = true;
  const pageSize = 20;
  const lastId = tagList.list.length
    ? tagList.list[tagList.list.length - 1].id
    : 0;
  http
    .get(api.chat_tagList, {
      params: {
        lastId,
        pageSize,
      },
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
// -------------------------------------

// -----------------聊天窗口--------------------

// 聊天窗口scroll元素
const chatScrollView = ref();
// 聊天窗口scroll内子元素
const chatScrollPage = ref();
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
  if (chatList.finish) return false;
  if (chatList.loading) return false;
  chatList.loading = true;
  const pageSize = 10;
  http
    .get(api.chat_answerList, {
      params: {
        tagId: activeTag.value,
        lastId: chatList.lastId,
        pageSize,
      },
    })
    .then((res) => {
      if (res.code == 200) {
        // 防止在加载列表时切换tag
        if (
          chatList.list.length &&
          chatList.list[0].tagId !== activeTag.value
        ) {
          return;
        }
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
    `${process.env.VUE_APP_BASE_URL}${api.chat_qa}?question=${encodeURI(
      message
    )}&tagId=${tagId}`,
    {
      headers: {
        ...resultSign,
      },
    }
  );

  // 其他错误信息
  source.addEventListener("apiErrors", (err) => {
    err.data = JSON.parse(err.data);

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
      residueQAQuantity.value = 0;
      userInfo.residueQAQuantity = residueQAQuantity.value;
      utils.setUserInfo(userInfo);
      // 移除列表中最后一对
      chatList.list.splice(chatList.list.length - 2, 2);
      ElMessage({
        message: err.data.message,
        type: "info",
      });
      return;
    }

    console.log(err, "其他错误信息");
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
      residueQAQuantity.value = Number(qd.residueQAQuantity);
      userInfo.residueQAQuantity = residueQAQuantity.value;
      utils.setUserInfo(userInfo);

      chatList.list[chatList.list.length - 1].id = qd.aId;
      chatList.list[chatList.list.length - 1].tagId = qd.tagId;
      chatList.list[chatList.list.length - 2].id = qd.qId;
      chatList.list[chatList.list.length - 2].tagId = qd.tagId;
      chatList.lastId = chatList.list[0].id;

      // 如果tagId==0说明是第一次会话，把新的会话第一条添加到side
      if (activeTag.value == 0) {
        let h = {
          id: qd.tagId,
          title: chatList.list[chatList.list.length - 2].description,
        };
        activeTag.value = qd.tagId;
        tagList.list.unshift(h);
        tagList.isNull = false;
        // tagList.list = [h];
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
      source.close(source);
    } else if (e.type == "message") {
      let n = e.data.replace(/\\\\/g, "\\");
      n = n.replace(/\\n/g, "<br/>");
      n = n.replace(/\\/g, "");

      let s = n.substring(1, n.length - 1);

      chatList.list[chatList.list.length - 1].description += s;
    }
  };

  source.onerror = (e) => {
    console.log(e, "onerror");
    sendLoading.value = false;
    source._close(source);
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
  copy_text.value.setAttribute("data-clipboard-text", text);
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
    e.clearSelection();
  });
  clipboard.on("error", function (e) {
    ElMessage({
      message: "复制失败",
      type: "error",
    });
    // 清空选中
    e.clearSelection();
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
  getAnswerList(activeTag.value);
};

// 删除对话窗口弹窗
const removeVisible = ref(false);

// 删除弹窗打开
const handDeleteTag = (item, index) => {
  removeVisible.value = true;
};

// 确认删除 左侧历史
const handConfirmDeleteTag = () => {
  const tagId = activeTag.value;
  activeTag.value = 0;
  removeVisible.value = false;
  http
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
        // 列表不足的时候填充
        if (tagList.list.length < 20 && tagList.finish !== false) {
          getHistory();
        }
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
  if (residueQAQuantity.value == 0) {
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
const handSend = () => {
  if (question.value.length === 0) {
    return;
  }
  if (question.value.length > 1000) {
    return ElMessage({
      message: "已达到最大字数限制，请缩小您的文本长度",
      type: "warning",
    });
  }
  if (residueQAQuantity.value === 0) {
    return ElMessage({
      message: "您的问答次数已用尽，请联系客服购买",
      type: "warning",
    });
  }
  actionState = "2"; //动作状态设定为添加新问题
  const question1 = question.value;
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

  _getResult(question1, activeTag.value);
};

let slideTimer = null;
// 滑动动画 length:number 滑动距离
const slideAnimation = (length, time = 1000) => {
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
  }, interval);
};

// dom更新后调用  记录此时的聊天列表高度
onUpdated(() => {
  scrollPageHeight.value = chatScrollPage.value.offsetHeight;
});

// 每次加载列表后设置滚动高度
watch(
  scrollPageHeight,
  (newVal, oldVal) => {
    console.log("watch:chatScrollPage", scrollPageHeight.value);
    console.log("chatScrollPage父卷轴", chatScrollView.value.offsetHeight);
    // 列表不满一屏 加载
    if (scrollPageHeight.value <= chatScrollView.value.offsetHeight) {
      console.log();
      return getAnswerList("列表不满一屏 加载");
    }

    if (actionState === "1") {
      // 动作状态为加载列表时: 触发列表加载完成后,卷轴scrollTop设定为加载之前观看的位置
      chatScrollView.value.scrollTop = newVal - oldVal;
      // 滑动动画:下滑一点点
      slideAnimation(-40);
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
  http
    .post(api.chat_delAnswer, {
      answerId: delMsgId.value,
    })
    .then((res) => {
      if (res.code == 200) {
        // 设置动作为删除  删除后填充新数据到列表
        actionState = "4";
        const idx = chatList.list.findIndex(
          (item) => item.id === delMsgId.value
        );
        chatList.list.splice(idx - 1, 2);

        if (chatList.list.length < 10 && chatList.finish !== false) {
          getAnswerList();
        }
      } else {
        ElMessage({
          type: "error",
          message: res.message,
        });
      }
    });
};

// 加载完成事件
onMounted(() => {
  console.log("mount");

  initCopyClipboard();
});
</script>

<style scoped lang="less">
.container {
  display: flex;
  height: 100%;

  .container-side {
    width: 310px;
    height: 100%;
    border-right: 1px solid #dae0f5;
    background-color: #f2f3f7;
    text-align: center;
    .title {
      display: flex;
      align-items: center;
      width: 270px;
      height: 67px;
      border-bottom: #dae0f5 1px solid;
      margin: auto;
      color: #000;
      text-align: center;
      font-family: PingFang SC;
      font-size: 28px;
      font-style: normal;
      font-weight: 600;
      line-height: 68px;
      .logo {
        width: 40px;
        height: 30px;
        margin-right: 14px;
      }
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
      margin: 28px auto 0 auto;
      cursor: pointer;
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
      margin: 28px auto 0 auto;
      cursor: auto;
      opacity: 0.5;
      span {
        margin-left: 11px;
      }
    }

    // 历史列表
    .log_list {
      width: 310px;
      height: calc(100% - 331px);
      margin: auto;
      padding: 22px 0;
      .scroll_view {
        width: 310px;
        height: 100%;
        overflow-y: hidden;
        .scroll_page {
          height: 100%;
          overflow-y: scroll;
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
            margin: 22px auto;
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
              color: #333;
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
                background-color: rgba(0, 0, 0, 0.06);
              }
              &:active {
                background-color: rgba(0, 0, 0, 0.1);
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
            background-color: #dae0f5;
          }
        }
      }
    }

    .side-fo {
      width: 270px;
      height: 144px;
      border-top: 1px solid #dae0f5;
      margin: auto;
      .menu-item {
        position: relative;
        margin: auto;
        display: flex;
        align-items: center;
        cursor: pointer;

        span {
          margin-left: 16.25px;
          margin-right: 137.5px;
          color: #333;
          font-family: PingFang SC;
          font-size: 19px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          &:active {
            color: #126cfe;
          }
        }
        .gt {
          position: absolute;
          right: 10px;
          top: 50%;
          transform: translate(0, -50%);
        }
      }
      .mt20 {
        margin-top: 20px;
      }
      .mt30 {
        margin-top: 30px;
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
        &::-webkit-scrollbar {
          display: none;
        }
        .loading {
          position: absolute;
          top: 20px;
          left: 0;
          width: 100%;
          height: 22px;
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
        .scroll_page {
          position: relative;
          height: 100%;
          overflow-y: scroll;
          .list_content {
            padding: 0 30px;
            .msg_item {
              margin: 40px;
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
                  font-weight: 500;
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
                  font-weight: 500;
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
              resize: none; /*禁止拉伸*/
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
  /deep/.el-dialog {
    border-radius: 16px;
  }
  /deep/.el-dialog__header {
    height: 0;
    .el-dialog__close {
      width: 20.5px;
      height: 20.5px;
    }
  }
  /deep/.el-dialog__body {
    padding: 60px 73px;
  }
  .dia_title {
    color: #000;
    text-align: center;
    font-family: PingFang SC;
    font-size: 30px;
    font-style: normal;
    font-weight: 500;
    line-height: 42px;
  }
  .dia_content {
    margin-top: 40px;
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
    margin-top: 58px;
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
    margin-top: 58px;
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
