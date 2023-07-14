module.exports = {
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
      rootValue: 192, // 设计稿宽度的 1/ 10
      propList: ['*'], // 所有 px 转 rem
      selectorBlackList: ['.el-'],
      exclude: /node_modules\/(?!(element-plus)\/).*/,
    }
  }
}
