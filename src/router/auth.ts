import Login from '@views/auth/Login.vue'
import { type RouteRecordRaw } from 'vue-router'

const loginRoute: RouteRecordRaw[] = [
  {
    path: '/auth/login',
    component: Login,
    meta: {
      anonymous: true
    }
  }
]

export default loginRoute
