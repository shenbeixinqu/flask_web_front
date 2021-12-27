import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/cms/login',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/cms/register',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     // url: '/vue-admin-template/user/info',
//     url: '/cms/userInfo',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(token) {
  return request({
    url: '/cms/logout',
    method: 'post',
    params: { token }
  })
}

// 管理员列表
export function userList(data) {
  return request({
    url: '/cms/userList',
    method: 'get',
    params: data
  })
}

// 管理员添加
export function addUser(data) {
  return request({
    url: 'cms/addUser',
    method: 'post',
    data
  })
}

// 管理员删除
export function deleteUser(data) {
  return request({
    url: 'cms/deleteUser',
    method: 'post',
    data
  })
}

