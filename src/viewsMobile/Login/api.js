import request from "@/http/index";
import api from '@/http/api'


// 发送验证码
export function sendVerifyCode(phone) {
  return request.get(api.user_sendVerifyCode, {
    tel: phone,
  });
}
// 登录
export function userLogin(phone, verifyCode) {
  return request.post(api.user_login, {
    tel: phone,
    verifyCode: verifyCode,
  });
}
