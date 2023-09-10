import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const id = ref<string | number>('')
  const name = ref('')

  // 登录初始化，用于阻塞全局路由守卫
  let loginPromise: Promise<boolean> = Promise.resolve(false)
  let loginResolve: (value: boolean | PromiseLike<boolean>) => void

  function init (): void {
    loginPromise = new Promise(resolve => {
      loginResolve = resolve
    })
  }

  async function waitLogin (): Promise<boolean> {
    return await loginPromise
  }

  function isLogin (): boolean {
    if (token.value !== '') {
      return true
    }
    return false
  }

  function login (userToken: string, userId: string, userName: string): void {
    token.value = userToken
    id.value = userId
    name.value = userName
    loginResolve(true)
  }

  function logout (): void {
    token.value = ''
    id.value = ''
    name.value = ''
    init()
  }

  init()

  return {
    token,
    id,
    name,
    isLogin,
    login,
    logout,
    waitLogin
  }
})
