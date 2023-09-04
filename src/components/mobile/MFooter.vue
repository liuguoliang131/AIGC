<template>
  <div class="footer" @click="handGoICP">
    <div>京ICP备19041919号-2京公网安备11010502039881号</div>
    <div>网络经营许可证京网文[2020]4683-870号</div>
  </div>
</template>

<script setup>
// 去工信部备案网址
const handGoICP = () => {
  window.open(`https://beian.miit.gov.cn/`);
};
</script>

<style scoped lang="less">
.footer {
  padding-top: 20px;
  padding-bottom: 20px;
  width: 750px;
  color: #999;
  margin: auto;
  text-align: center;
  font-family: PingFang SC;
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  transform-origin: 0 0;
  transform: scale(0.5);
  &:active {
    opacity: 0.7;
    outline: auto;
  }
}
</style>