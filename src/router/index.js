import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    // component: () => import('@/views/login/index'),
    component: () => import('@/views/login/login_back'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/safeCenter',
    component: Layout,
    name: '咨询中心',
    meta: { title: '咨询中心' },
    children: [
      {
        path: 'Activity',
        name: 'Activity',
        component: () => import('@/views/safeCenter/Law'),
        meta: { title: '法律法规' }
      },
      {
        path: 'Dynamic',
        name: 'Dynamic',
        component: () => import('@/views/safeCenter/Loophole'),
        meta: { title: '漏洞发布' }
      },
      {
        path: 'Notify',
        name: 'Notify',
        component: () => import('@/views/safeCenter/SafeEvent'),
        meta: { title: '安全事件' }
      },
      {
        path: 'Train',
        name: 'Train',
        component: () => import('@/views/safeCenter/SafeService'),
        meta: { title: '安全服务' }
      }
    ]
  },
  {
    path: '/association',
    component: Layout,
    name: '协会在线',
    meta: { title: '协会在线' },
    children: [
      {
        path: 'Member',
        name: 'Member',
        component: () => import('@/views/association/index'),
        meta: { title: '会员注册' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
