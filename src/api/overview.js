import request from '@/utils/request'

// 协会简介列表
export function introductionList(data) {
  return request({
    url: '/cms/introductionList',
    method: 'get',
    params: data
  })
}

// 添加法律法规
export function addIntroduction(data) {
  return request({
    url: 'cms/addIntroduction',
    method: 'post',
    data
  })
}

// 删除法律法规
export function deleteIntroduction(data) {
  return request({
    url: 'cms/deleteIntroduction',
    method: 'post',
    data
  })
}
