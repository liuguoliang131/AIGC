

<script setup>
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { qiniuUpload } from "@/http/qiniu";

const { value, limit, type, size } = defineProps({
  value: {
    type: String,
    default: "",
    description: "文件地址",
  },
  limit: {
    type: Number,
    default: 1,
    description: "最多上传多少张", //暂时只能上传单张
  },
  type: {
    type: Array,
    default: () => [],
    description: "限制上传类型 [ 'image/png', 'image/jpeg' ]",
  },
  size: {
    type: Number,
    default: () => 10,
    description: "限制大小 单位兆M",
  },
});

const emit = defineEmits(["update:value"]);

const loading = ref(false);

const fileRef = ref();
const handChoose = () => {
  fileRef.value.click();
};

// 文件选择完成 返回文件
const imgChose = (e) => {
  console.log(e.target.files);
  if (type.length) {
    if (!type.includes(e.target.files[0].type)) {
      ElMessage({
        type: "warning",
        message: `不可上传${e.target.files[0].type}类型文件`,
      });
      e.target.value = "";
      return false;
    }
  }
  if (e.target.files[0].size > size * 1024 * 1024) {
    ElMessage({
      type: "warning",
      message: `上传失败,图片大于10M`,
    });
    e.target.value = "";
    return false;
  }
  loading.value = true;
  qiniuUpload(e.target.files[0]).then((res) => {
    console.log("七牛 res", res);
    loading.value = false;
    e.target.value = "";
    if (!res) {
      return ElMessage({
        type: "error",
        message: `上传失败`,
      });
    }
    emit("update:value", res.path);
    emit("success", res);
  });
};
</script>


<template>
  <div class="file_upload" @click="handChoose">
    <input
      ref="fileRef"
      type="file"
      id="file"
      :accept="type.join(',')"
      @change="imgChose"
    />
    <slot :loading="loading"></slot>
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