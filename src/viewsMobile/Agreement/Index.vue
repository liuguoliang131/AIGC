<template>
  <div class="container">
    <TopTitleBar />
    <div class="container-body" v-html="agreementText"></div>
  </div>
</template>

<script setup>
import TopTitleBar from "@/components/mobile/TopTitleBar.vue";
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "@/http/api";
import http from "@/http/index";
import { showToast } from "vant";
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
        return showToast(res.msg);
      }
      agreementText.value = res.data.agreementText;
    });
};
getAgreement(type);
</script>

<style scoped lang="less">
.container {
  .container-body {
    padding: 12px;
  }
}
</style>