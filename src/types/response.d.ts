declare namespace Res {
  /**
   * 登陆
   */
  interface Login<T=null> extends API.BaseResponse<T> {
    uid: string;
  }
  /**
   *  获取验证码
   */
  interface EmailCode<T=null> extends API.BaseResponse {};
}
