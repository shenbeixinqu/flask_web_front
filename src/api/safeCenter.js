import request from '@/utils/request'

export function getActivityList(data) {
  return request({
    url: '/cms/lawList',
    method: 'get',
    params: data
  })
}

// 添加法律法规
export function addLaw(data) {
  return request({
    url: 'cms/addLaw',
    method: 'post',
    data
  })
}

// 删除法律法规
export function deleteLaw(data) {
  return request({
    url: 'cms/deleteLaw',
    method: 'post',
    data
  })
}

// 漏洞发布列表
export function getLoopholeList(data) {
  return request({
    url: '/cms/loopholeList',
    method: 'get',
    params: data
  })
}

// 添加漏洞发布
export function addLoophole(data) {
  return request({
    url: 'cms/addLoophole',
    method: 'post',
    data
  })
}

// 删除漏洞发布
export function deleteLoophole(data) {
  return request({
    url: 'cms/deleteLoophole',
    method: 'post',
    data
  })
}

// 安全事件列表
export function getEventList(data) {
  return request({
    url: '/cms/eventList',
    method: 'get',
    params: data
  })
}

// 添加安全事件
export function addEvent(data) {
  return request({
    url: 'cms/addEvent',
    method: 'post',
    data
  })
}

// 删除安全事件
export function deleteEvent(data) {
  return request({
    url: 'cms/deleteEvent',
    method: 'post',
    data
  })
}

// 添加安全服务
export function addService(data) {
  return request({
    url: 'cms/addService',
    method: 'post',
    data
  })
}
