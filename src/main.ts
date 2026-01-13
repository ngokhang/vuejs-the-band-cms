import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./style.css";
import { setNavigate, setClearAuth } from "./lib/axios";
import { useAuthStore } from "./stores/auth";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// Inject hàm điều hướng cho axios để có thể redirect khi session hết hạn
setNavigate((path: string) => {
  router.push(path);
});

// Inject hàm clear auth để clear user khi session hết hạn
setClearAuth(() => {
  const authStore = useAuthStore();
  authStore.setUser(null);
});

app.mount("#app");
