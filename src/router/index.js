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
    path: '/register',
    component: () => import('@/views/register'),
    meta: {
      hidden: true
    }
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
      meta: { title: '首页' }
    }]
  },
  {
    path: '/safeCenter',
    component: Layout,
    name: '咨询中心',
    meta: { title: '咨询中心' },
    children: [
      {
        path: 'Law',
        name: 'Law',
        component: () => import('@/views/safeCenter/Law'),
        meta: { title: '法律法规' }
      },
      {
        path: 'Loophole',
        name: 'Loophole',
        component: () => import('@/views/safeCenter/Loophole'),
        meta: { title: '漏洞发布' }
      },
      {
        path: 'SafeEvent',
        name: 'SafeEvent',
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
  {
    path: '/Overview',
    component: Layout,
    name: 'Overview',
    meta: { title: '协会概况' },
    children: [
      {
        path: 'Introduction',
        name: 'Introduction',
        component: () => import('@/views/Overview/Introduction'),
        meta: { title: '协会简介' }
      },
      {
        path: 'Bylaws',
        name: 'Bylaws',
        component: () => import('@/views/Overview/Bylaws'),
        meta: { title: '协会章程' }
      },
      {
        path: 'Branch',
        name: 'Branch',
        component: () => import('@/views/Overview/Branch'),
        meta: { title: '分支机构' }
      },
      {
        path: 'Member',
        name: 'MemberCompany',
        component: () => import('@/views/Overview/Member'),
        meta: { title: '会员单位' }
      },
      {
        path: 'Standard',
        name: 'Standard',
        component: () => import('@/views/Overview/Standard'),
        meta: { title: '会费标准' }
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
