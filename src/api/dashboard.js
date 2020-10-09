import request from '@/utils/request'

export function initDataBoardData(query) {
  return request({
    url: '/hk/baseinfo',
    method: 'post',
    query
  })
}

export function initCommunityInfo(query) {
  return request({
    url: '/hk/communityinfo',
    method: 'post',
    query
  })
}
