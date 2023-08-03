import * as qiniu from 'qiniu-js'
import http from './index'
import {
	getToken
} from '../common/utils.js'


let subscription = null

// 获取七牛token方法
const getQiniuToken = () => {
	return new Promise(resolve => {
    http.get('/other/getUploadToken', {
      params:{}
    }).then(res => {
      if (res.code !== 200) {
        return resolve(false)
      }
			resolve(res.data)
		})
	})

}

// 命名file方法
const setFileKey = (fileName) => {
	try {
		let type = fileName.split('.')
		type = type[type.length - 1]
		let token = getToken() || 'null'
		let time = new Date().getTime()
		return token + '-' + time + '.' + type
	} catch (e) {
		//TODO handle the exception
		return new Date().getTime() + '.' + 'png'
	}

}



export const qiniuUpload = (file) => {
	return new Promise(resolve => {
    getQiniuToken().then(data => {
      if (!data) {
        return resolve(false)
      }
			const key = setFileKey(file.name)
      console.log('key', key)
      

      // 默认配置
      const config = {
        useCdnDomain: true, //是否使用cdn加速
        uphost: data.uploadUrl, //上传域名
        region:data.region, // 上传区域
        upprotocol: 'https', //上传协议
        retryCount: 1, //上传自动重试次数（整体重试次数，而不是某个分片的重试次数）；默认 3 次（即上传失败后最多重试两次）
        debugLogLevel: 'info' //INFO | WARN | ERROR | OFF，允许程序在控制台输出日志，默认为 OFF，不输出任何日志，本功能仅仅用于本地调试，不建议在线上环境开启。
      };
      
      // 指定所传文件的文件名、文件类型等 非必选
      const putExtra = {};
        


			const observable = qiniu.upload(file, key, data.token, putExtra, config)

			// 上传过程的监听函数
			const observer = {
				next(res) {
					// ...
					console.log('observer.success', res)
				},
				error(err) {
					// ...
					console.log('observer.error', err)
				},
				complete(res) {
					// ...
					console.log('observer.complete', res)
					res.path = data.domain + '/' + res.key
					resolve(res)
				}
			}
			subscription = observable.subscribe(observer) // 上传开始
			// subscription.unsubscribe() // 上传取消
		})
	})

}