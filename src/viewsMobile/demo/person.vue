<template>
  <div class="person_wrapper">
    <div :class="['remote-container']" id="container"></div>
    <div class="oper_row">
      <div @click="say" class="reSpeaker">重读</div>
    <div @click="unmute" class="reSpeaker1" v-html="isMute? '取消<br>静音':'静音'"></div>
    </div>
  </div>
</template>
<script setup>
// import DUIX from "duix-guiji";
import { onUnmounted } from "vue";
import { ref, watch, onMounted } from "vue";
const isMute = ref(true);

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

watch(() => props.message, (newValue, oldValue) => {
  if (newValue) {
    say();
  }
});

function getToken() {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          const token = JSON.parse(request.responseText).data;
          resolve(token);
        }
      }
    };
    // appid为数字人的robotCode
    request.open(
      "GET",
      // 'https://prevshow.guiji.ai/duix-manage-api/sig/getConversationSig?appId=1673603560606142464&exp=43200',

      "https://duix.guiji.ai/duix-manage-api/sig/getConversationSig?appId=1710637128179912704&exp=43200"

      // "https://duix.guiji.ai/duix-manage-api/sig/getConversationSig?appId=1536639317445840896"
    );
    request.send();
  });
}
var duix;
window.addEventListener('beforeunload', function (event) {
  console.log("beforeunload");
  stop();
});
const init = async () => {
  const token = await getToken();
  // const signUrl = 'https://prevshow.guiji.ai/duix-manage-api/sdk/checkSig?sig=';
  // const configUrl = 'https://prevshow.guiji.ai/render-sdk/config.json';

  const signUrl = 'https://duix.guiji.ai/duix-manage-api/sdk/checkSig?sig=';
  const configUrl = 'https://duix.guiji.ai/render-sdk/config.json';
  duix = new DUIX({
    containerLable: ".remote-container",
    signUrl,
    sign: token,
    configUrl,
  });
  duix.on("intialSucccess", () => {
    const sessionId = duix.start({
      robotMode: 'null',
      muted: true,
      transparent: true,
      wipeGreen: true,
    });
    console.log("sessionId", sessionId);
    // duix.setVideoMuted(false)
  });
  duix.on("busy", function () {
    console.log("on busy");
  });
  duix.on("report", function (info) {
    console.log("report", info);
  });
  duix.on("error", function (e) {
    console.error("on error", e);
  });
  duix.on("bye", function () {
    console.log("on bye");
  });
  duix.on("speakStart", function () {
    console.log("数字人开始说话");
  });
  duix.on("speakEnd", function () {
    console.log("数字人结束说话");
  });
  duix.on("show", function () {
    console.log("on show");
    // transparentBG.value = true;
    // if (drive === "audio") {
    //   console.log("开始打开asr");

    //   duix.openAsr();
    //   duix.on("asrResult", function (result) {
    //     console.log("实时识别结果", result);
    //     duix.speak(result);
    //   });
    // }
  });
};

function say() {
  if (!duix) {
    alert("请先开始驱动");
  }
  duix.speak(props.message);
}
function stop() {
  duix && duix.break();
  duix && duix.stop();
}
function unmute() {
  isMute.value = false;
  duix && duix.setVideoMuted(false);
}
onMounted(() => {
  init();
});
</script>
<style>
canvas {
  width: auto !important;

  left: 100% !important;
  transform: translateX(-100%) !important;

}
</style>

<style scoped lang="less">
.person_wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;

  .remote-container {
    width:208px;
    height: 208px;
    background-color: transparent;
    // background-repeat: no-repeat;
    // background-position: center center;
    // background-size: cover;
    margin-bottom: 20px;
  }

  .oper_row{
    display: flex;
    flex-direction: row;
  }

  .reSpeaker {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-bottom: 20px;
    margin-right: 10px;
    font-size: 14px;
    background-color: #d55119;
  }

  .reSpeaker1 {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    width: 50px;
    height: 50px;
    border-radius: 50px;
    margin-bottom: 20px;
    margin-right: 10px;
    font-size: 14px;
    background-color: rgb(106, 229, 18);
  }
}
</style>