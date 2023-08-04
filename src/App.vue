<template>
  <router-view />
  <TopTitleBar />
</template>
<script setup>
import TopTitleBar from '@/components/TopTitleBar.vue';
</script>
<style lang="less">
* {
  padding: 0;
  margin: 0;
  overscroll-behavior: none; // 取消ios系统回弹动画效果
}

::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-thumb {
  background-color: #0003;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
}

::-webkit-scrollbar-track {
  border-radius: 10px;
}

body {
  font-size: 14px;
}

#app {
  width: 100%;
  height: 100vh;
  font-family: PingFang SC;
  font-size: 19px;
  font-weight: 500;
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
