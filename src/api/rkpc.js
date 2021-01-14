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


export function getNeedExamineList(pageIndex, pageSize) {
  return request({
    url: '/hk/transData/' + pageIndex + '/' + pageSize,
    method: 'post'
  })
}

export function getNotNeedExamineList(pageIndex, pageSize) {
  return request({
    url: '/hk/transDataForNotNeedExamine/' + pageIndex + '/' + pageSize,
    method: 'post'
  })
}

export function ExaminePerson(RowId) {
  console.log(RowId)
  return request({
    url: '/hk/examine/',
    method: 'post',
    params: {personId:RowId}
  })
}
