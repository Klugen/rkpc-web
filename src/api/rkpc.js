import request from '@/utils/request'

export function hkall(query) {
  return request({
    url: '/hk/all',
    method: 'post',
    params: query
  })
}

export function CommunityList() {
  return request({
    url: '/hk/getusercommunitylist',
    method: 'post'
  })
}
