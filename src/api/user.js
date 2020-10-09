import request from '@/utils/request'

export function login(data) {
  var m = request({
    url: '/user/login',
    method: 'post',
    data
  })
  return m
}

export function getInfo(token) {
  // console.log(token)
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  // console.log(token)
  return request({
    url: '/user/logout',
    method: 'post',
    token
  })
}
