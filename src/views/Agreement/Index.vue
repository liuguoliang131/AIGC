<template>
  <div class="container">
    <TopTitleBar />
    <div class="container-body" v-html="agreementText"></div>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/TopTitleBar.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/http/api";
import http from "@/http/index";
import { ElMessage } from "element-plus";
const {
  query: { type },
} = useRoute();

const agreementText = ref("");

const getAgreement = (type) => {
  http
    .get(api.user_agreement, {
      type: Number(type),
    })
    .then((res) => {
      if (res.code !== 200) {
        return ElMessage({
          type: "error",
          message: res.msg,
        });
      }
      agreementText.value = res.data.agreementText;
    });
};
getAgreement(type);
</script>

<style scoped lang="less">
.container {
  height: 100%;
  padding-top: 70px;
  overflow: hidden;
  box-sizing: border-box;
  .container-body {
    height: 100%;
    overflow-y: scroll;
    box-sizing: border-box;
    padding: 12px;
  }
}
</style>