<template>
  <div class="person_wrapper">
    <div class="clipped-div">
      <canvas id="canvas" width="1080" height="1080" />
    </div>
    <div :class="['remote-container']" id="remote_stream">

    </div>
    <div class="oper_row">
      <div @click="say" class="reSpeaker">重读</div>

      <!--更新背景-->
      <!-- <input className="excle-file" type="file" title="" name="fileUploaderBg" accept=".jpg,.png" id="fileUploaderBg"
        :onChange=upload /> -->
    </div>
  </div>
  <my-dialog v-model:show="removeVisible" title="温馨提示" message="ios兼容性问题，请点击确认按钮恢复虚拟人" @confirm="confirm">
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
var stream;
function confirm() {
  removeVisible.value = false;
  stream && stream.resume();
  detectVideo();
}
const init = async () => {
  VMS.start({
    appId: "15288978",
    apiKey: "f1b41f43990adf262f260892644f053e",
    apiSecret: "M2FmZDM1NDEzMzEyZWU4MDgxOWJmMjYy",
    // width: 1280, //[1920 1280 720]
    height: 1080, // [1080 720 405]
    avatarId: '118801001',
    streamDomId: "remote_stream",
    resId: '1711936698963906560',//白色背景
    // isSsl: false,
    // moveH:200,
    // moveV:0,
    // scale: 1,
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
      vmsStatus.value = 0;
    });
};

function detectVideo() {
  const videos = document.getElementsByTagName('video');
  let video;
  if (videos.length > 0) {
    video = videos[0];
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
    const frame = ctx.getImageData(200, 0, canvas.width, canvas.height);
    const data = frame.data;

    for (let i = 0; i < data.length; i += 4) {
      const red = data[i + 0];
      const green = data[i + 1];
      const blue = data[i + 2];
      if (green > 250 && red > 250 && blue > 250) {
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
            { type: 'action', value: 'A_LH_introduced_O', wb: 3, we: 20 },
            { type: 'action', value: 'A_RH_bye_O', wb: 30, we: 50 }
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
  width: 200px !important;
  height: 200px !important;
}
</style>

<style scoped lang="less">
.person_wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;

  .clipped-div {
    width: 120px;
    height: 200px;
    overflow: hidden;
  }

  .remote-container {
    width: 1px;
    height: 1px;
    background-color: transparent;
    margin-bottom: 20px;
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