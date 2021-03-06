import Cookies from 'js-cookie'
import { storage, tokenTableName } from '@/config'

// // const TokenKey = 'vue_admin_template_token'
// const TokenKey = 'web_attack_token'

// export function getToken() {
//   return Cookies.get(TokenKey)
// }

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

// export function removeToken() {
//   return Cookies.remove(TokenKey)
// }

/**
 * @description 获取token
 * @returns {string|ActiveX.IXMLDOMNode|Promise<any>|any|IDBRequest<any>|MediaKeyStatus|FormDataEntryValue|Function|Promise<Credential | null>}
 */
export function getToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.getItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.getItem(tokenTableName)
    } else if (storage === 'cookie') {
      return Cookies.get(tokenTableName)
    } else {
      return localStorage.getItem(tokenTableName)
    }
  } else {
    return localStorage.getItem(tokenTableName)
  }
}

/**
 * @description 存储token
 * @param token
 * @returns {void|*}
 */
export function setToken(token) {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.setItem(tokenTableName, token)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.setItem(tokenTableName, token)
    } else if (storage === 'cookie') {
      return Cookies.set(tokenTableName, token)
    } else {
      return localStorage.setItem(tokenTableName, token)
    }
  } else {
    return localStorage.setItem(tokenTableName, token)
  }
}

/**
 * @description 移除token
 * @returns {void|Promise<void>}
 */
export function removeToken() {
  if (storage) {
    if (storage === 'localStorage') {
      return localStorage.removeItem(tokenTableName)
    } else if (storage === 'sessionStorage') {
      return sessionStorage.clear()
    } else if (storage === 'cookie') {
      return Cookies.remove(tokenTableName)
    } else {
      return localStorage.removeItem(tokenTableName)
    }
  } else {
    return localStorage.removeItem(tokenTableName)
  }
}
