declare namespace API {
  type StatusSuccess = 'SUCCESS';
  type StatusFail = 'FAIL';
  type SuccessCode = 1;
  type FailCode = 0 | 2 | 3 | 4;

  /**
   * base response
   */
  interface BaseResponse<T> {
    content: T;
    msg: string;
    code: SuccessCode | FailCode;
    status: StatusFail | StatusSuccess;
    handler?: string;
    uid?: string;
  }

  /**
   * success response
   */
  interface SuccessResponse<T> extends BaseResponse<T> {
    code: SuccessCode;
    status: StatusSuccess;
  }

  /**
   * fail response
   */
  interface FailResponse<T = null> extends BaseResponse<T> {
    code: FailCode
    status: StatusFail
  }

  /**
   * response body
   */
  type Response<T> = SuccessResponse<T> | FailResponse<null | Record<string, any>>

}
