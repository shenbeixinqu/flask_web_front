import request from '@/utils/request'

// 通知公告列表
export function noticeList(data) {
  return request({
    url: '/cms/noticeList',
    method: 'get',
    params: data
  })
}

// 通知公告添加
export function addNotice(data) {
  return request({
    url: 'cms/addNotice',
    method: 'post',
    data
  })
}

// 通知公告删除
export function deleteNotice(data) {
  return request({
    url: 'cms/deleteNotice',
    method: 'post',
    data
  })
}
