// post
import Request from '@/utils/request'

export function postAction(url, parameter) {
  // 将签名和时间戳，添加在请求接口 Header
  return Request({
    url: url,
    method: 'post',
    data: JSON.stringify(parameter)
  })
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  return Request({
    url: url,
    method: method,
    data: JSON.stringify(parameter)
  })
}

// put
export function putAction(url, parameter) {
  return Request({
    url: url,
    method: 'put',
    data: JSON.stringify(parameter)
  })
}

// get
export function getAction(url, parameter) {
  return Request({
    url: url,
    method: 'get',
    params: JSON.stringify(parameter)
  })
}

// deleteAction
export function deleteAction(url, parameter) {
  return Request({
    url: url,
    method: 'delete',
    params: JSON.stringify(parameter)
  })
}
