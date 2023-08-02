<script setup>
import { ref } from "vue";
import Sidebar from "./components/Sidebar.vue";
import MyDialog from "@/components/MyDialog.vue";
import DataTab from "./components/DataTab.vue";
const visible = ref(false);
</script>

<template>
  <div class="container">
    <sidebar :foo="666" :giao="333" :aaa="123"></sidebar>
    <div class="container-body">
      <data-tab></data-tab>
    </div>
  </div>
</template>

<style scoped lang="less">
.container {
  height: 100vh;
  overflow: hidden;
  display: flex;
  .container-body {
    flex: 1;
    height: 100%;
  }
}
</style>