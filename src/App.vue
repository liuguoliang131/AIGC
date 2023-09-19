<template>
  <router-view v-slot="{ Component, route }">
    <Transition>
      <keep-alive :include="['DrawHistory']">
        <component :is="Component" />
      </keep-alive>
    </Transition>
  </router-view>
</template>
<script setup>
import { onMounted } from "vue";

onMounted(() => {
  //首先我们获得视口高度并将其乘以1%以获得1vh单位的值
  let vh = window.innerHeight * 0.01;
  // 然后，我们将——vh自定义属性中的值设置为文档的根
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // 我们监听resize事件 视图大小发生变化就重新计算1vh的值
  window.addEventListener("resize", () => {
    // 我们执行与前面相同的脚本
    let vh = window.innerHeight * 0.01;
    console.log(vh);
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  });
});
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

:root:root {
  --van-base-font: "PingFang SC";
  --van-price-font: "PingFang SC";
}

body {
  font-size: 14px;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
  font-family: PingFang SC;
  text-align: left;
  color: #333333;
  overflow: hidden;
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
