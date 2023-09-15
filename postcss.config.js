module.exports = ({ file }) => {
  const os = require('os');

  const platform = os.platform();  // 系统名称

  let mobileList
  if (platform === 'darwin') {
    mobileList = [/\/mobile/, /\/viewsMobile/, /\/node_modules\/vant/]
  } else {
    mobileList = [/\\mobile/, /\\viewsMobile/, /\\node_modules\\vant/]
  }

  const isMobile = mobileList.some(item => item.test(file))
  const rootValue = isMobile ? 37.5 : 192
  return {
    plugins: {
      autoprefixer: {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8',
          'last 10 versions' // 所有主流浏览器最近10版本用
        ],
        grid: true
      },
      'postcss-pxtorem': {
        rootValue, // 设计稿宽度的 1/ 10
        propList: ['*'], // 所有 px 转 rem
        exclude: () => false,  // 忽略哪个目录? 不忽略
      },
    }
  }

}
