import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

import { useUserStore } from '@store/user'
import loginRoute from './auth'

const routes: RouteRecordRaw[] = [
  ...loginRoute
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {
  // 如果是匿名访问的页面，直接放行
  if (to.meta.anonymous as boolean) {
    return true
  }
  // 不是匿名访问的页面，检查是否登录
  const userStore = useUserStore()
  const loginStatus = userStore.isLogin()
  // 如果未登录，跳转到登录页面
  if (!loginStatus) {
    return '/auth/login'
  }
  // 如果已经登录，等待初始化完成后直接跳转
  await userStore.waitLogin()
})

export default router
