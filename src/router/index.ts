import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { layout: 'AppLayout', requiresAuth: true },
  },
  {
    path: '/schedule',
    name: 'schedule',
    component: () => import('../views/ScheduleView.vue'),
    meta: { layout: 'AppLayout', requiresAuth: true },
  },
  {
    path: '/members',
    name: 'members',
    component: () => import('../views/MemberView.vue'),
    meta: { layout: 'AppLayout', requiresAuth: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/SettingView.vue'),
    meta: { layout: 'AppLayout', requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { layout: 'AuthLayout' },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/TestView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/errors/404.vue'),
    meta: { layout: 'ErrorLayout' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const routeName = typeof to.name === 'string' ? to.name : ''

  // Nếu đang ở trang login
  if (routeName === 'login') {
    // Nếu đã authenticated, redirect về home
    if (authStore.isAuthenticated) {
      return next({ name: 'home' })
    }

    // Không gọi fetchMe() khi ở trang login để tránh vòng lặp
    // Nếu user đã authenticated, isAuthenticated sẽ là true
    // Nếu chưa authenticated, cho phép vào login page
    return next()
  }

  // Nếu route yêu cầu authentication
  if (to.meta.requiresAuth || routeName === 'home') {
    // Nếu đã authenticated, cho phép vào
    if (authStore.isAuthenticated) {
      return next()
    }

    // Thử fetch user info
    try {
      await authStore.fetchMe()
      return next()
    } catch (error) {
      // Nếu fail, redirect về login
      // Không cần clear auth ở đây vì axios interceptor đã xử lý
      return next({ name: 'login' })
    }
  }

  return next()
})

export default router
