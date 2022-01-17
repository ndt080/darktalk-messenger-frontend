import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { RouterPaths } from "@/core/consts/router-paths.enum";
import authGuard from "@/middlewares/auth.guard";
import { UserStorageService } from "@/services/storage/user-storage.service";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: `/${RouterPaths.LOGIN}`,
    name: "Login",
    meta: { layout: "auth", auth: false },
    component: () => import("../views/Login.vue")
  },
  {
    path: `/${RouterPaths.HOME}`,
    name: "Home",
    meta: { layout: "home", auth: true },
    component: Home
  },
  {
    path: `/${RouterPaths.CHAT}/:id`,
    name: "Chat",
    meta: { layout: "home", auth: true },
    component: () => import("../views/Chat.vue")
  },
  {
    path: "/about",
    name: "About",
    meta: { layout: "home", auth: true },
    component: () => import("../views/About.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some((record) => record.meta.auth);
  const currentUser = UserStorageService.getUser();

  authGuard(next, !(requireAuth && !currentUser))
});

export default router;
