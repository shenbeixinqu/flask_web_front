import request from '@/utils/request'

// 底部信息列表
export function footerList(data) {
  return request({
    url: '/cms/footerList',
    method: 'get',
    params: data
  })
}

// 底部信息添加
export function addFooter(data) {
  return request({
    url: 'cms/addFooter',
    method: 'post',
    data
  })
}

// 底部信息删除
export function deleteFooter(data) {
  return request({
    url: 'cms/deleteFooter',
    method: 'post',
    data
  })
}
