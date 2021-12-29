import request from '@/utils/request'

// 通知公告列表
export function getCode(data) {
  return request({
    url: '/cms/message',
    method: 'get',
    params: data
  })
}
