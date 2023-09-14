<template>
  <div class="history_item" :data-id="item.pictureId">
    <div class="image_box">
      <template v-if="item.isFail">
        <div class="fail">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/draw-fail-status.png"
            alt=""
          />
        </div>
      </template>
      <template v-else>
        <div v-if="item.pictureUrl" class="complete">
          <img :src="item.pictureUrl" alt="" />
        </div>
        <div v-else class="making">
          <img
            src="https://quanres.hanhoukeji.com/hanhou-ai-pc/drawing-status.png"
            alt=""
          />
        </div>
      </template>
    </div>
    <div class="title nowrap">{{ item.createdAt }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
  },
});
</script>

<style scoped lang="less">
.history_item {
  width: 100%;
  padding-bottom: 12px;
  .image_box {
    width: 175px;

    .fail {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 175px;
      height: 175px;
      border-radius: 4px;
      background-color: #f1f2f6;
      img {
        width: 25px;
        height: 23.9px;
      }
    }
    .making {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 175px;
      height: 175px;
      border-radius: 4px;
      background-color: #f1f2f6;
      img {
        width: 70px;
        height: 70px;
      }
    }
    .complete {
      width: 175px;
      background-color: #f1f2f6;
      img {
        width: 175px;
        height: auto;
        border-radius: 4px;
      }
    }
  }
  .title {
    width: 100%;
    margin-top: 4px;
    color: #000;
    font-family: PingFang SC;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 17px;
  }
}
</style>