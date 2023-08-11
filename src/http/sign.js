import md5 from './md5.js'
import utils from '../common/utils.js'

let appKey = ''
if (process.env.VUE_APP_SELF_ENV === 'prod') {
  appKey = 'a34da50ae275694db7b1b9f4d2c64bab'
} else {
  appKey = '4fffe8bdebd230e0f5a082a582d8d443'
}
/**
 * 加密
 * varstrSign="sys="+sys+"&timestamp="+timestamp+"&token="+token+"&version="+version+appKey;
 * */
export const _getSign = function(config={}) {
  return new Promise((resolve, reject) => {
    // const sys = 'AIGC'
    // const timestamp = Date.parse(new Date()).toString().substr(0, 10)
    const token = utils.getToken()
    // let token = "ffaa197f6075429697136e754e056ab8"
    // const version = config.version || '1.0.0'
    // const md5Origin = `sys=${sys}&timestamp=${timestamp}&token=${token}&version=${version}${appKey}`

    resolve({
      // sys,
      // token,
      // version,
      // timestamp,
      // sign: md5.md5(md5Origin),
      'x-token':token
    })
  })
}
