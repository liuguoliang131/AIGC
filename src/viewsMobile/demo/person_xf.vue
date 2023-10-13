<template>
  <div class="person_wrapper">
    <!-- <span class="errorCode">{{ errorCode }}</span> -->
    <canvas id="canvas" width="1080" height="1080" />
    <img src="https://quanres.hanhoukeji.com/hanhou-ai-pc/ai_person_desktop.png" class="desktop" />
    <div :class="['remote-container']" id="remote_stream">
    </div>
    <!-- <div class="oper_row">
      <div @click="say" class="reSpeaker">重读</div> -->

    <!--更新背景-->
    <!-- <input className="excle-file" type="file" title="" name="fileUploaderBg" accept=".jpg,.png" id="fileUploaderBg"
        :onChange=upload /> -->
    <!-- </div> -->
  </div>
  <my-dialog v-model:show="removeVisible" title="温馨提示" message="苹果兼容性问题，请点击确认恢复虚拟人" @confirm="confirmVideo">
  </my-dialog>
</template>
<script setup>
// import DUIX from "duix-guiji";
import { onUnmounted } from "vue";
import { ref, watch, onMounted } from "vue";
import VMS from './core/vms-2d-web-sdk-1.1.0';
import MyDialog from "@/components/mobile/MyDialog.vue";
import { encode, decode } from "js-base64";
const isMute = ref(true);
const errorCode = ref('');
// 删除对话窗口弹窗
const removeVisible = ref(false);

const vmsStatus = ref(0); //虚拟人服务状态 结束：0，激活：1

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

function upload(e) {
  console.log(e);
  let target = e.target;
  let file = e.target.files[0];

  // "bg",
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function (e) {
    let result = reader.result;
    let base64Str = result.split(";base64,")[1];
    VMS.uploadResourceData(
      {
        appId: "15288978",
        apiKey: "f1b41f43990adf262f260892644f053e",
        apiSecret: "M2FmZDM1NDEzMzEyZWU4MDgxOWJmMjYy",
        resourceBase64Str: base64Str,
      },
    )
      .then((data) => {

        console.log(data);
        if (data) {

        }
      })
      .catch((e) => {
        console.error(e);
      });
  };
}

window.addEventListener('beforeunload', function (event) {
  console.log("beforeunload");
  stop();
});
window.addEventListener('unload', function (event) {
  console.log("unload");
  stop();
});
var stream;

function confirmVideo() {
  removeVisible.value = false;
  stream && stream.resume();
  setTimeout(() => detectVideo(), 0);
}

const init = async () => {
  VMS.start({
    //测试环境
    appId: process.env.VUE_APP_SELF_ENV !== "prod" ? "3c4dc848" : "15288978",
    apiKey: process.env.VUE_APP_SELF_ENV !== "prod" ? "b221b349d95deb3fe82a20651af287b9" : "f1b41f43990adf262f260892644f053e",
    apiSecret: process.env.VUE_APP_SELF_ENV !== "prod" ? "NTM2ZWExYzRhODUxOWExMzg1ZWMxMjNh" : "M2FmZDM1NDEzMzEyZWU4MDgxOWJmMjYy",

    // width: 1280, //[1920 1280 720]
    height: 1080, // [1080 720 405]
    avatarId: '118801001',
    streamDomId: "remote_stream",
    resId: '1711936698963906560',//白色背景
    // isSsl: false,
    // moveH:200,
    moveV:15,
    // scale: 1.2,
    // maskRegion: '[0,0,900,600]'
  })
    .then((msg) => {
      console.log('yk3372_success');
      vmsStatus.value = 1;
      detectVideo();
    })
    .catch((e) => {
      console.log('yk3372_error', e);
      if (e.stream && e.code === 0x4043) {
        removeVisible.value = true;
        stream = e.stream;
      }
      errorCode.value = `${e.code}`;
      vmsStatus.value = 0;
    });
};

function detectVideo() {
  const videos = document.getElementsByTagName('video');
  let video;
  if (videos.length > 0) {
    video = videos[0];
    video.addEventListener(
      "play",
      () => {
        showPerson(video);
      },
      false,
    );
    showPerson(video);
  } else {
    setTimeout(() => { detectVideo(); }, 1500);
  }
}

function showPerson(video) {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  console.log(video);
  console.log(canvas);

  const drawFrame = () => {
    if (video.paused || video.ended) {
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      if (green >= 254 && red >= 254 && blue >= 254) {
        data[i + 3] = 0;
      } else if (green >= 240 && red >= 240 && blue >= 240) {
        data[i + 3] = 0;
      }
    }
    ctx.putImageData(frame, 0, 0);
    requestAnimationFrame(drawFrame);
  };

  drawFrame();
}
function say() {
  VMS.textDriver(
    {
      encoding: "utf8",
      compress: "raw",
      format: "plain",
      status: 3,
      text: encode(props.message),
    },
    {
      vcn: 'x3_qianxue', // 发音人
      speed: 50, // 语速：[0,100]，默认50
      pitch: 50, // 语调：[0,100]，默认50
      volume: 50,
    },
    {
      // 字偏移控制指令
      encoding: 'utf8',
      compress: 'raw',
      format: 'json',
      status: 3,
      text: encode(
        JSON.stringify({
          avatar: [
            { type: 'action', value: 'A_RH_emphasize2_O', wb: 0, we: 5 },
            { type: 'action', value: 'A_RH_introduced_O', wb: props.message.length - 5, we: props.message.length },
            // { type: 'action', value: 'A_RH_emphasize2_O', wb: 70, we: 90 },
            // { type: 'action', value: 'A_RH_ok_O', wb: props.message.length - 20, we: props.message.length }
          ]
        })
      )
    },
  )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {
      console.log(e);
    });
}
function stop() {
  stream = null;
  VMS.stop()
    .then(() => {
      vmsStatus.value = 0;
      console.log('结束虚拟人服务成功'); //成功回调
    })
    .catch(() => {
      vmsStatus.value = 0;
      console.log('结束虚拟人服务失败'); //失败回调
    });
}
function unmute() {
  isMute.value = false;
}
onMounted(() => {
  init();
});
onUnmounted(() => {
  stop();
});
</script>
<style>
canvas {
  width: 130% !important;
  height: 130% !important;
  z-index: 1;
}
</style>

<style scoped lang="less">
.person_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
  position: relative;


  .errorCode {
    color: gray;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .remote-container {
    width: 1px;
    height: 1px;
    background-color: transparent;
    // margin-bottom: 20px;
  }

  .desktop {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
  }

  .oper_row {
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