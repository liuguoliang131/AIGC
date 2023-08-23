module.exports = ({ file }) => {

  const mobileList = ['mobile', 'viewsMobile']
  const isMobile = mobileList.some(item => file.toLowerCase().indexOf(item.toLowerCase()) !== -1)
  const rootValue = isMobile ? 75 : 192

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
