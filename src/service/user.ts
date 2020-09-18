import http from '../utils/http/index';

/**
 * 登陆
 * @param payload 
 */
export const login = (payload: Params.Login) => {
  return http.post<Res.Login>('/user/login', payload)
}

/**
 * 获取验证码
 * @param payload 
 */
export const sendEmailCode = (payload: Params.EmailCode) => {
  return http.post<Res.EmailCode>('/user/email/code', payload)
}

export const register = (payload: Params.Register) => {
  return http.post<Res.Register>('/user/register', payload);
}



