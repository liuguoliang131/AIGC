const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ["*"],
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://hhosaigcapi.yctmt.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/mock': {
        target: 'http://yapi.hanhoukeji.com',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': '/mock'
        }
      }
    }
  },
  publicPath: './',  // 静态文件路径
  assetsDir: 'static', 
  productionSourceMap: false,  //生成map文件
  // ...其他配置
  css: {
    extract: true
  },
// 编译配置
  configureWebpack(config) {
    if (process.env.NODE_ENV === 'production') {
        config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  }
})
