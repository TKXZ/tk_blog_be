/**
 * @author tkwang
 * @description 数据包修饰
 */

function wrapperSuccess(data: any, message: string = 'success') {
  return {
    errno: 0,
    data,
    message,
  }
}

function wrapperFailure(errno: number = -1, message: string = 'failed') {
  return { errno, message }
}

async function wrapperResult(resPromise: Promise<any>) {
  const res = await resPromise
  return res
}

export { wrapperSuccess, wrapperFailure, wrapperResult }
