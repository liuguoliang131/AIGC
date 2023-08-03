

<script setup>
import { ref } from "vue";

const { value } = defineProps({});

const emit = defineEmits([]);

const loading = ref(false);

const handChoose = () => {
  console.log("aaaa");
};
</script>


<template>
  <div v-loading="loading" class="file_upload" @click="handChoose">
    <input type="file" id="file" />
    <slot></slot>
  </div>
</template>


<style scoped lang="less">
.file_upload {
  display: inline-block;
  #file {
    position: fixed;
    top: -1000px;
    left: 0;
    width: 0;
  }
}
</style>