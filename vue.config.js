const { defineConfig } = require('@vue/cli-service')
const TerserPlugin = require('terser-webpack-plugin');
module.exports = defineConfig({
  transpileDependencies: ["*"],
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://hhosaigcapi.yctmt.com',
        target: 'http://aigcapi.yctmt.com',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      },
      '/user/hanhouqa': {
        // target: 'http://hhosaigcapi.yctmt.com',
        target: 'http://aigcapi.yctmt.com',
        changeOrigin: true,
        pathRewrite: {
          '^/user/hanhouqa': '/user/hanhouqa'
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
  // 拆包
  chainWebpack: config => {
    // 将 chunk-vendors 文件进行拆分
    config.optimization.splitChunks({
      cacheGroups: {
        // 将引入超过一次的代码拆分成一个独立的 chunk
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2,
          priority: -20
        },
        // 将 node_modules 中的依赖拆分成一个独立的 chunk
        vendors: {//vendor 是导入的 npm 包
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          maxSize: 600000,
          maxInitialRequests: 20,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        elementPlus: {//把UI库从chunk-vendors.js提取出来
          name: 'element-plus',
          test: /[\\/]node_modules[\\/]element-plus[\\/]/,
          chunks: 'initial',
          priority: 3,
          maxSize: 600000,
          reuseExistingChunk: true,
          enforce: true
        }
      },
    });
  }
})
