<template>
  <div class="arc_content">
    <img
      class="arc"
      src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-arc.png"
      alt=""
    />
    <div class="drag">
      <img
        class="silver_star"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-star.png"
        alt=""
      />
      <div class="silver_point" @click="handCheck(0)">
        <div class="before"></div>
      </div>
      <div class="silver_text">月卡</div>

      <img
        class="gold_star"
        src="https://quanres.hanhoukeji.com/hanhou-ai-pc/mobile-buyMember-star.png"
        alt=""
      />
      <div class="gold_point" @click="handCheck(1)">
        <div class="before"></div>
      </div>
      <div class="gold_text">年卡</div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["activeIdx", "moveX"]);
const emit = defineEmits(["changeActive"]);

const setAnimation = (val) => {
  const arc = document.querySelector(".arc");
  const silverStar = document.querySelector(".silver_star");
  const silverPoint = document.querySelector(".silver_point");
  const silverText = document.querySelector(".silver_text");
  const goldStar = document.querySelector(".gold_star");
  const goldPoint = document.querySelector(".gold_point");
  const goldText = document.querySelector(".gold_text");
  const clientWidth = document.documentElement.clientWidth;
  const opacity = Math.max(Math.abs(val / clientWidth), 0.1); // 手指向左划 年卡元素的透明度增加
  const scale = opacity; // 年卡元素的缩放变大
  const gray = Math.abs((val / clientWidth) * 100);
  if (props.activeIdx === 0) {
    if (val === 0) {
      arc.style.filter = `grayscale(100%)`;
      silverStar.style.opacity = 1;
      silverText.style.opacity = 1;
      silverPoint.style.opacity = 0;
      goldStar.style.opacity = 0;
      goldText.style.opacity = 0;
      goldPoint.style.opacity = 1;

      silverStar.style.transform = `scale(1)`;
      silverText.style.transform = `scale(0.5)`;
      silverPoint.style.transform = `scale(0)`;
      goldStar.style.transform = `scale(0)`;
      goldText.style.transform = `scale(0)`;
      goldPoint.style.transform = `scale(1)`;
    } else if (val < 0) {
      arc.style.filter = `grayscale(${100 - gray}%)`;
      silverStar.style.opacity = opacity;
      silverText.style.opacity = opacity;
      silverPoint.style.opacity = 1 - opacity;
      goldStar.style.opacity = opacity;
      goldText.style.opacity = opacity;
      goldPoint.style.opacity = 1 - opacity;

      silverStar.style.transform = `scale(${1 - scale})`;
      silverText.style.transform = `scale(${(1 - scale) * 0.5})`;
      silverPoint.style.transform = `scale(${scale})`;
      goldStar.style.transform = `scale(${scale})`;
      goldText.style.transform = `scale(${scale * 0.5})`;
      goldPoint.style.transform = `scale(${1 - scale})`;
    }
  } else {
    if (val === 0) {
      arc.style.filter = `grayscale(0%)`;
      silverStar.style.opacity = 0;
      silverText.style.opacity = 0;
      silverPoint.style.opacity = 1;
      goldStar.style.opacity = 1;
      goldText.style.opacity = 1;
      goldPoint.style.opacity = 0;

      silverStar.style.transform = `scale(0)`;
      silverText.style.transform = `scale(0)`;
      silverPoint.style.transform = `scale(1)`;
      goldStar.style.transform = `scale(1)`;
      goldText.style.transform = `scale(0.5)`;
      goldPoint.style.transform = `scale(0)`;
    } else if (val > 0) {
      arc.style.filter = `grayscale(${gray}%)`;
      silverStar.style.opacity = opacity;
      silverText.style.opacity = opacity;
      silverPoint.style.opacity = 1 - opacity;
      goldStar.style.opacity = 1 - opacity;
      goldText.style.opacity = 1 - opacity;
      goldPoint.style.opacity = opacity;

      silverStar.style.transform = `scale(${scale})`;
      silverText.style.transform = `scale(${scale * 0.5})`;
      silverPoint.style.transform = `scale(${1 - scale})`;
      goldStar.style.transform = `scale(${1 - scale})`;
      goldText.style.transform = `scale(${(1 - scale) * 0.5})`;
      goldPoint.style.transform = `scale(${scale})`;
    }
  }
};
watch(
  () => props.moveX,
  (newVal, oldVal) => {
    console.log(newVal);
    setAnimation(newVal);
  }
);

// 切换activeIdx
const handCheck = (idx) => {
  console.log(idx);
  emit("changeActive", idx);
};
</script>

<style scoped lang="less">
.arc_content {
  position: relative;
  width: 375px;
}
.arc {
  width: 375px;
  height: 35px;
  padding-top: 10px;
  filter: grayscale(100%);
}
@keyframes rotateFn {
  0% {
    transform: translate(-50%, 0) rotate(0deg);
  }
  100% {
    transform: translate(-50%, 0) rotate(360deg);
  }
}
.drag {
  position: absolute;
  left: 0;
  top: 0;
  width: 375px;
  height: 45px;
  .silver_star {
    position: absolute;
    top: 8px;
    left: 106px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    transform-origin: center;
    opacity: 1;
    transition: all 0.3s;
    background-color: rgba(143, 143, 143, 0.8);
    border-radius: 50%;
  }
  .silver_text {
    position: absolute;
    left: 78px;
    top: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 30px;
    transform-origin: center;
    transform: scale(0.5);
    font-size: 20px;
    font-family: PingFang HK;
    font-weight: 600;
    color: #dddddd;
    border-radius: 30px;
    background: linear-gradient(180deg, #c8c8c8 0%, #717171 100%);
  }
  .silver_point {
    position: absolute;
    top: 10px;
    left: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(195, 195, 195, 0.4);
    opacity: 0;
    transition: all 0.3s;

    .before {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(195, 195, 195, 0.5);
    }
  }

  .gold_star {
    position: absolute;
    top: 8px;
    right: 106px;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    opacity: 0;
    transform-origin: center;
    transition: all 0.3s;
    background-color: rgba(110, 79, 35, 0.8);
    border-radius: 50%;
  }
  .gold_text {
    position: absolute;
    top: 18px;
    right: 78px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70px;
    height: 30px;
    transform-origin: center;
    transform: scale(0.5);
    font-size: 20px;
    font-family: PingFang HK;
    font-weight: 600;
    color: #6f4f23;
    border-radius: 30px;
    background: linear-gradient(104.23deg, #ffd8a2 10.64%, #eaa564 87.06%);
    opacity: 0;
    transition: all 0.3s;
  }
  .gold_point {
    position: absolute;
    top: 10px;
    right: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: linear-gradient(
      180deg,
      rgba(255, 216, 162, 0.4) 0%,
      rgba(234, 165, 100, 0.4) 100%
    );
    opacity: 1;
    transition: all 0.3s;

    .before {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: linear-gradient(
        180deg,
        rgba(255, 216, 162, 0.5) 0%,
        rgba(234, 165, 100, 0.5) 100%
      );
    }
  }
}
</style>