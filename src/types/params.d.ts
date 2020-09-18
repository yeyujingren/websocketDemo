declare namespace Params {
  /**
   * 登陆
   */
  interface Login {
    username: string;
    userpwd: string;
  }

  /**
   * 获取邮箱验证码
   */
  interface EmailCode {
    email: string;
  }

  /**
   * 注册
   */
  interface Register {
    email: string;
    verifyCode: string;
    username: string;
    userpwd: string;
  }
}
