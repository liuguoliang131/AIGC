import request from "@/http/index";

const send_verfyCode = "/user/sendVerifyCode"; // 发送验证码
const user_login = "/user/login"; // 登录

export function sendVerifyCode(phone) {
  return request.get(send_verfyCode, {
    tel: phone,
  });
}

export function userLogin(phone, verifyCode) {
  return request.post(user_login, {
    tel: phone,
    verifyCode: verifyCode,
  });
}
