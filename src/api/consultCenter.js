import request from '@/utils/request'

export function getActivityList(data) {
  return request({
    url: '/cms/hello',
    method: 'get',
    params: data
  })
}
