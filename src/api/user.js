import request from '@/utils/request'

export function login(data) {
  return request({
    // url: '/vue-admin-template/user/login',
    url: '/cms/login',
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
