import { VueQueryPlugin } from '@tanstack/vue-query'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setNavigate, setClearAuth } from './lib/axios'
import { useAuthStore } from './stores/auth'

import './style.css'
import 'vue-sonner/style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        gcTime: 5 * 60 * 1000, // 5 minutes (formerly cacheTime)
      },
    },
  },
})

const authStore = useAuthStore()

// Inject hàm điều hướng cho axios để có thể redirect khi session hết hạn
setNavigate((path: string) => {
  router.push(path)
})

// Inject hàm clear auth để clear user khi session hết hạn
setClearAuth(() => {
  authStore.setUser(null)
})

await router.isReady()
// ✅ Chỉ bootstrap nếu KHÔNG ở trang login
const currentRoute = router.currentRoute.value
const isLoginPage = currentRoute.name === 'login' || currentRoute.path === '/login'

if (!isLoginPage) {
  await authStore.bootstrap()
}

app.mount('#app')
