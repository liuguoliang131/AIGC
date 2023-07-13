// rem布局设置根标签字体大小
(function () {
  // 基准大小
  const baseSize = 16
  const calc = function () {
    // 当前页面宽度相对于1920宽的缩放比例
    let scale = document.documentElement.clientWidth / 1920
    // 屏幕宽度小于1280不再缩放
    scale = scale > 0.66 ? scale : 0.66
    // 设置页面根节点字体大小
    document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  }
  calc()
  window.addEventListener('resize', calc)
})()
