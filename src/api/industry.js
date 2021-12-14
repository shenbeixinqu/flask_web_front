import request from '@/utils/request'

// 行业动态列表
export function industryList(data) {
  return request({
    url: '/cms/industryList',
    method: 'get',
    params: data
  })
}

// 行业动态添加
export function addIndustry(data) {
  return request({
    url: 'cms/addIndustry',
    method: 'post',
    data
  })
}

// 行业动态删除
export function deleteIndustry(data) {
  return request({
    url: 'cms/deleteIndustry',
    method: 'post',
    data
  })
}
