<template>
  <router-view v-slot="{ Component, route }">
    <Transition>
      <keep-alive :include="['DrawHistory']">
        <component :is="Component" />
      </keep-alive>
    </Transition>
  </router-view>
</template>
<script setup></script>
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

:root:root {
  --van-base-font: "PingFang SC";
  --van-price-font: "PingFang SC";
}

body {
  font-size: 14px;
}

#app {
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
  font-family: PingFang SC;
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
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
