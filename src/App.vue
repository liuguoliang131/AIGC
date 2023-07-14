<template>
  <router-view />
</template>
<script>
import { onMounted } from "vue";
export default {
  name: "App",
  setup(props, { slots, emit }) {
    onMounted(() => {});
  },
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
#app {
  width: 100%;
  height: 100vh;
  font-family: PingFang SC;
  font-size: 19px;
  font-weight: 500;
  line-height: 44px;
  text-align: left;
  color: #333333;
}
/*  强制一行显示 超出显示省略号 */
.nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/* 多行文本 超出显示省略号 */
/* 2行 */
.lineClamp2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 3行 */
.lineClamp3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
