<template>
  <div>
    <canvas ref="animationCanvas" :width="canvasWidth" :height="canvasHeight"></canvas>
  </div>
</template>

<script>
export default {
  name: 'anim_listen',
  data() {
    return {
      canvasWidth: 144,
      canvasHeight: 256,
      framePath: '../../person/', // 替换为实际的图片路径
      startFrame: 1, // 起始帧
      endFrame: 96, // 结束帧
      currentFrame: 0, // 当前帧
      animationInterval: null, // 定时器
      imageFrame: null, // 定时器
    };
  },
  mounted() {
    this.frames();
    // this.loadFrames();
    this.startAnimation();
  },
  unmounted() {
    clearInterval(this.animationInterval);
  },
  methods: {
    // loadFrames() {
    //   for (let i = this.startFrame; i <= this.endFrame; i++) {
    //     const img = new Image();
    //     img.src = this.framePath + i + '_pixian_ai.png'; // 替换为实际的图片格式和文件名
    //     img.onload = () => {
    //       this.drawFrame();
    //     };
    //   }
    // },
    drawFrame() {
      const canvas = this.$refs.animationCanvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(this.imageFrame[this.currentFrame], 0, 0, canvas.width, canvas.height);
    },
    updateAnimation() {
      this.currentFrame++;
      if ((this.currentFrame + 1) > this.endFrame) {
        this.currentFrame = 0;
      }
      this.drawFrame();
    },
    startAnimation() {
      this.animationInterval = setInterval(this.updateAnimation, 2500 / 30); // 根据需要调整帧率
    },
    frames() {
      this.imageFrame = [];
      for (let i = this.startFrame; i <= this.endFrame; i++) {
        const img = new Image();
        img.src = this.framePath + i + '_pixian_ai.png'; // 替换为实际的图片格式和文件名
        img.onload = () => {
          this.drawFrame();
        };
        this.imageFrame.push(img);
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.animationInterval);
  },
};
</script>