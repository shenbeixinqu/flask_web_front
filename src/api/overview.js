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


// 分支机构列表
export function branchList(data) {
  return request({
    url: '/cms/branchList',
    method: 'get',
    params: data
  })
}

// 分支机构添加
export function addBranch(data) {
  return request({
    url: 'cms/addBranch',
    method: 'post',
    data
  })
}

// 分支机构删除
export function deleteBranch(data) {
  return request({
    url: 'cms/deleteBranch',
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

// 理事单位列表
export function directorList(data) {
  return request({
    url: '/cms/directorCompanyList',
    method: 'get',
    params: data
  })
}

// 理事单位添加
export function addDirector(data) {
  return request({
    url: 'cms/addDirectorCompany',
    method: 'post',
    data
  })
}

// 理事单位删除
export function deleteDirector(data) {
  return request({
    url: 'cms/deleteDirectorCompany',
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

// 支撑单位列表
export function supportList(data) {
  return request({
    url: '/cms/supportCompanyList',
    method: 'get',
    params: data
  })
}

// 会员单位添加
export function addSupport(data) {
  return request({
    url: 'cms/addSupportCompany',
    method: 'post',
    data
  })
}

// 会员单位删除
export function deleteSupport(data) {
  return request({
    url: 'cms/deleteSupportCompany',
    method: 'post',
    data
  })
}
