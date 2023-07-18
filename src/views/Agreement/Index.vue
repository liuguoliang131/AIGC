<template>
  <div class="container" v-html="agreementText"></div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import api from "./api";
import http from "@/http/index";
import { ElMessage } from "element-plus";
const {
  query: { type },
} = useRoute();

const agreementText = ref("");

const getAgreement = (type) => {
  http
    .get(api.user_agreement, {
      params: {
        type: Number(type),
      },
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

<style>
</style>