// rem布局设置根标签字体大小
(function () {
  const calc = function () {
    let rootFontSize = document.documentElement.clientWidth / 10 
    rootFontSize = rootFontSize > 128 ? rootFontSize : 128
    document.documentElement.style.fontSize = rootFontSize + 'px'
  }
  calc()
  window.addEventListener('resize', calc)
})()