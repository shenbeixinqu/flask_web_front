import request from '@/utils/request'

// 党建活动列表
export function buildingList(data) {
  return request({
    url: '/cms/buildingList',
    method: 'get',
    params: data
  })
}

// 党建活动添加
export function addBuilding(data) {
  return request({
    url: 'cms/addBuilding',
    method: 'post',
    data
  })
}

// 党建活动删除
export function deleteBuilding(data) {
  return request({
    url: 'cms/deleteBuilding',
    method: 'post',
    data
  })
}
