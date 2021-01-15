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
   
  return request({
    url: '/hk/examine/',
    method: 'post',
    params: {personId:RowId}
  })
}

export function documentList(pageIndex,pageSize,queryParam){
  return request({
    url: '/hk/documentdata/' + pageIndex + '/' + pageSize,
    method: 'post',
    params : queryParam
  })
}

export function householdRelationList(){
  return request({
    url: '/hk/householdRelation/',
    method: 'post'
  })
}

export function healthList(){
  return request({
    url: '/hk/health/',
    method: 'post'
  })
}

export function updateDocument(tempData){
  return request({
    url: '/hk/updatedocument/',
    method: 'post',
    params : tempData
  })
}

export function createDocument(tempData){
  return request({
    url: '/hk/createdocument/',
    method: 'post',
    params : tempData
  })
}

export function deleteDocument(tempData){
  return request({
    url: '/hk/deletedocument/',
    method: 'post',
    params : tempData
  })
}