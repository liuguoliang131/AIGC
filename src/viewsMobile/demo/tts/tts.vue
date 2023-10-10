<template>
  <div>
    <div @click="handlePlay" class="speaker">重读</div>
  </div>
</template>

<script setup>
import TTSRecorder from "./onlineTTS";
import { ref, onMounted, watch } from "vue";

const ttsRecorder = ref(null);
const emit = defineEmits(['speakerStart', 'speakerStart']);

const props = defineProps({
  message: {
    type: String,
    required: true
  }
});

watch(() => props.message, (newValue, oldValue) => {
  if (newValue) {
    handlePlay();
  }
});

onMounted(() => {
  ttsRecorder.value = new TTSRecorder(
    {
      onWillStatusChange: (newStatus) => {
        if (ttsRecorder.value?.status == 'play') {
          emit("speakerStart");
        } else if (['init', 'endPlay', 'errorTTS'].indexOf(ttsRecorder.value?.status) > -1) {
          emit("speakerEnd");
        }
      }
    }
  );
});

function handlePlay() {
  ttsRecorder.value.stop();
  if (['init', 'endPlay', 'errorTTS'].indexOf(ttsRecorder.value?.status) > -1) {
    ttsRecorder.value.setParams({
      voiceName: 'xiaoyan',
      tte: 'UTF8',
      text: props.message
    });
    ttsRecorder.value.start();
  } else {
    ttsRecorder.value.stop();
  }
}
</script>

<style>
.body {
  position: absolute;
  top: 50%;
  left: 50%;
}

.speaker {
  position: absolute;
  bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  font-size: 14px;
  background-color: #d55119;
}
</style>
