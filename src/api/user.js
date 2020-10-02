import request from '@/utils/request'

export function login(data) {
  var m = request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
  return m
}

export function getInfo(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
