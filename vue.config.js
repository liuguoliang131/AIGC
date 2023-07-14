const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://124.70.107.130:8033',
        changeOrigin: true,
        pathReWrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: 'http://yapi.hanhoukeji.com',
        changeOrigin: true,
        pathReWrite: {
          '^/mock': '/mock'
        }
      }
    }
  }

})
