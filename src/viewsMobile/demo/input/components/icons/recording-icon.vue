<!-- from https://codepen.io/aurer/pen/jEGbA -->
<template>
  <div class="recording" title="recording…">
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
      y="0px" width="16px" height="16px" viewBox="0 0 16 16" style="enable-background:new 0 0 50 50;"
      xml:space="preserve">
      <rect x="2" y="2" width="2.4" height="12" :fill="color">
        <animate attributeName="height" attributeType="XML" values="4;20;4" begin="0s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="8; 0; 8" begin="0s" dur="0.6s" repeatCount="indefinite" />
      </rect>
      <rect x="6.79999" y="2" width="2.4" height="12" :fill="color">
        <animate attributeName="height" attributeType="XML" values="4;20;4" begin="0.15s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="8; 0; 8" begin="0.15s" dur="0.6s"
          repeatCount="indefinite" />
      </rect>
      <rect x="11.6" y="2" width="2.4" height="12" :fill="color">
        <animate attributeName="height" attributeType="XML" values="4;20;4" begin="0.3s" dur="0.6s"
          repeatCount="indefinite" />
        <animate attributeName="y" attributeType="XML" values="8; 0; 8" begin="0.3s" dur="0.6s"
          repeatCount="indefinite" />
      </rect>
    </svg>
    <!-- <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="2.4" height="12" rx="0.2" fill="white" />
      <rect x="6.79999" y="5.59998" width="2.4" height="8.4" rx="0.2" fill="white" />
      <rect x="11.6" y="8" width="2.4" height="6" rx="0.2" fill="white" />
    </svg> -->
  </div>
</template>

<script>
export default {
  name: 'recording-icon',
  props: {
    color: {
      type: String,
      default: '#fff'
    }
  }
};
</script>

<style lang="less" scoped>.recording {
  width: 16px;
  height: 16px;
  margin: auto;
}</style>
