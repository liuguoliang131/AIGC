import md5 from './md5.js'
import utils from '../common/utils.js'
/**
 * 加密
 * varstrSign="sys="+sys+"&timestamp="+timestamp+"&token="+token+"&version="+version+appKey;
 * */
export const _getSign = function(config) {
  return new Promise((resolve, reject) => {
    const sys = utils.getToken() || ''
    const timestamp = Date.parse(new Date()).toString().substr(0, 10)
    const token = utils.getStorageSync('token') || ''
    // let token = "ffacef74451e3d72fba1f4633e25a612"
    const version = config.version || '1.0.0'
    const appKey = utils.getStorageSync('appKey')

    const md5Origin = `sys=${sys}&timestamp=${timestamp}&token=${token}&version=${version}${appKey}`
    // let md5Origin = 'R0XCVg4buCMaD4l0VBXtyAm8JvOIfXrSnEJeFHBmyDe9TKuvHtbV6VgcgFb3A03lFMuOP7fax4vxQyCN4khw5T70mihJZ1haJs1HREDq%2BVMiH2VtfHVC%2FYzYM3DNRE6VXad1IH%2FuOIOEtkSPGWK%2FsnmIw9zhjy2cV2e9E7B2CLY%3D'
    resolve({
      sys,
      token,
      version,
      timestamp,
      sign: md5.md5(md5Origin)
    })
  })
}
