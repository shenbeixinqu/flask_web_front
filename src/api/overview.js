import request from '@/utils/request'

// 协会简介列表
export function introductionList(data) {
  return request({
    url: '/cms/introductionList',
    method: 'get',
    params: data
  })
}

// 协会简介添加
export function addIntroduction(data) {
  return request({
    url: 'cms/addIntroduction',
    method: 'post',
    data
  })
}

// 协会简介删除
export function deleteIntroduction(data) {
  return request({
    url: 'cms/deleteIntroduction',
    method: 'post',
    data
  })
}

// 协会章程列表
export function bylawsList(data) {
  return request({
    url: '/cms/bylawsList',
    method: 'get',
    params: data
  })
}

// 协会简介添加
export function addBylaws(data) {
  return request({
    url: 'cms/addBylaws',
    method: 'post',
    data
  })
}

// 协会简介删除
export function deleteBylaws(data) {
  return request({
    url: 'cms/deleteBylaws',
    method: 'post',
    data
  })
}

// 会费标准列表
export function standardList(data) {
  return request({
    url: '/cms/standardList',
    method: 'get',
    params: data
  })
}

// 协会简介添加
export function addStandard(data) {
  return request({
    url: 'cms/addStandard',
    method: 'post',
    data
  })
}

// 协会简介删除
export function deleteStandard(data) {
  return request({
    url: 'cms/deleteStandard',
    method: 'post',
    data
  })
}

// 会员单位列表
export function memberList(data) {
  return request({
    url: '/cms/memberCompanyList',
    method: 'get',
    params: data
  })
}

// 会员单位添加
export function addMember(data) {
  return request({
    url: 'cms/addMemberCompany',
    method: 'post',
    data
  })
}

// 会员单位删除
export function deleteMember(data) {
  return request({
    url: 'cms/deleteMemberCompany',
    method: 'post',
    data
  })
}
