import utils from './utils'


// 移动设备浏览器
export function mobileRem() {

  const calc = function () {
    let rootFontSize = document.documentElement.clientWidth / 10
    rootFontSize = rootFontSize > 37.5 ? rootFontSize : 37.5
    document.documentElement.style.fontSize = rootFontSize + 'px'
  }
  calc()
  window.addEventListener('resize', calc)

  // 禁止用户手动缩放
  const meta = document.createElement('meta');
  meta.content = 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0';
  meta.name = 'viewport';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

// pc浏览器
export function pcRem() {
  // 设置最小宽度
  document.querySelector('html').style.minWidth = '1280px'

  const calc = function () {
    let rootFontSize = document.documentElement.clientWidth / 10
    rootFontSize = rootFontSize > 128 ? rootFontSize : 128
    document.documentElement.style.fontSize = rootFontSize + 'px'
  }
  calc()
  window.addEventListener('resize', calc)
}




(function () {
  utils.isMobile() ? mobileRem() : pcRem()
})()