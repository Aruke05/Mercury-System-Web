// post
import Request from '@/utils/request'

export function postAction(url, parameter) {
  // 将签名和时间戳，添加在请求接口 Header
  url = (process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : '/') + url
  return Request({
    url: url,
    method: 'post',
    data: JSON.stringify(parameter)
  })
}

// post method= {post | put}
export function httpAction(url, parameter, method) {
  url = (process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : '/') + url
  return Request({
    url: url,
    method: method,
    data: JSON.stringify(parameter)
  })
}

// put
export function putAction(url, parameter) {
  url = (process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : '/') + url
  return Request({
    url: url,
    method: 'put',
    data: JSON.stringify(parameter)
  })
}

// get
export function getAction(url, parameter) {
  url = (process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : '/') + url
  return Request({
    url: url,
    method: 'get',
    params: JSON.stringify(parameter)
  })
}

// deleteAction
export function deleteAction(url, parameter) {
  url = (process.env.VUE_APP_BASE_API ? process.env.VUE_APP_BASE_API : '/') + url
  return Request({
    url: url,
    method: 'delete',
    params: JSON.stringify(parameter)
  })
}
