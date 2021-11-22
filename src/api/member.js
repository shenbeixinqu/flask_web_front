import request from '@/utils/request'

export function getMemberList(data) {
  return request({
    url: '/cms/memberList',
    method: 'get',
    params: data
  })
}
