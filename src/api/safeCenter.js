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

