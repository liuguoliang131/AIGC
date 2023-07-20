const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ["*"],
  lintOnSave: false,
  devServer: {
    proxy: {
      '/': {
        target: 'http://hhosaigcapi.yctmt.com',
        changeOrigin: true,
        pathReWrite: {
          '^/': '/'
        }
      },
      '/mock': {
        target: 'http://yapi.hanhoukeji.com',
        changeOrigin: true,
        pathReWrite: {
          '^/mock': '/mock'
        }
      },
      '/ws': {
        changeOrigin: false,
      }
    }
  },
  publicPath: './',  // 静态文件路径
  assetsDir: 'static', 
  productionSourceMap: true,  //生成map文件

})
