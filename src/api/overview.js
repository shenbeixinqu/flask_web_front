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

// 协会负责人列表
export function leaderList(data) {
  return request({
    url: '/cms/leaderList',
    method: 'get',
    params: data
  })
}

// 协会负责人添加
export function addLeader(data) {
  return request({
    url: 'cms/addLeader',
    method: 'post',
    data
  })
}

// 协会负责人删除
export function deleteLeader(data) {
  return request({
    url: 'cms/deleteLeader',
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
