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

export function CancelExaminePerson(RowId){
  return request({
    url: '/hk/cancelexamine/',
    method: 'post',
    params: {personId:RowId}
  })
}
//Batch
export function BatchExaminePerson(RowIds) {
  return request({
    url: '/hk/batchexamine/',
    method: 'post',
    params:  {personIds:RowIds}
  })
}

export function BatchCancelExaminePerson(RowIds){
  return request({
    url: '/hk/batchcancelexamine/',
    method: 'post',
    params:  {personIds:RowIds}
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

export function GetDocumentPerson(personId){
  return request({
    url: '/hk/getdocpersonbyid/',
    method: 'post',
    params: {personId:personId}
  })
}