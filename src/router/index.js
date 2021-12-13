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
        path: 'Leader',
        name: 'Leader',
        component: () => import('@/views/Overview/Leader'),
        meta: { title: '协会负责人' }
      },
      {
        path: 'Director',
        name: 'DirectorCompany',
        component: () => import('@/views/Overview/Director'),
        meta: { title: '理事单位' }
      },
      {
        path: 'Member',
        name: 'MemberCompany',
        component: () => import('@/views/Overview/Member'),
        meta: { title: '会员单位' }
      },
      {
        path: 'Support',
        name: 'SupportCompany',
        component: () => import('@/views/Overview/Support'),
        meta: { title: '支撑单位' }
      },
      {
        path: 'Standard',
        name: 'Standard',
        component: () => import('@/views/Overview/Standard'),
        meta: { title: '会费标准' }
      }
    ]
  },
  {
    path: '/Task',
    component: Layout,
    name: 'Task',
    meta: { title: '协会工作' },
    children: [
      {
        path: 'Building',
        name: 'Building',
        component: () => import('@/views/Task/Building'),
        meta: { title: '党建活动' }
      },
      {
        path: 'Communication',
        name: 'Communication',
        component: () => import('@/views/Task/Communication'),
        meta: { title: '交流活动' }
      },
      {
        path: 'Education',
        name: 'Education',
        component: () => import('@/views/Task/Education'),
        meta: { title: '教育培训' }
      }
    ]
  },
  {
    path: '/other',
    component: Layout,
    name: '通知公告',
    meta: { title: '通知公告' },
    children: [
      {
        path: 'Notice',
        name: 'Notice',
        component: () => import('@/views/other/Notice'),
        meta: { title: '通知公告' }
      }
    ]
  },
  {
    path: '/Statute',
    component: Layout,
    name: 'Statute',
    meta: { title: '法律法规' },
    children: [
      {
        path: 'Statute',
        name: 'Statute',
        component: () => import('@/views/other/Statute'),
        meta: { title: '法律法规' }
      }
    ]
  },
  {
    path: '/Footer',
    component: Layout,
    name: 'Footer',
    meta: { title: '底部信息' },
    children: [
      {
        path: 'Contract',
        name: 'Contract',
        component: () => import('@/views/footer/contract'),
        meta: { title: '底部信息' }
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
