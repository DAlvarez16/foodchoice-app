import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  {
    path: "/",
    component: () => import('../components/Home.vue'),
    name: 'home'
  },
  {
    path: "/restaurant/:id",
    component: () => import('../components/RestaurantInfo.vue'),
    name: 'restaurant'
  },
  {
    path: "/login",
    component: () => import('../components/Login.vue'),
    name: 'login'
  },
  {
    path: "/register",
    component: () => import('../components/Register.vue'),
    name: 'register'
  },
  {
    path: "/restaurant-profile/:id",
    component: () => import('../components/RestaurantPerfil.vue'),
    name: 'restaurant-profile'
  },
  {
    path: "/admin",
    component: () => import('../components/LoginAdmin.vue'),
    name: 'admin-login'
  },
  /* {
    path: "/admin-profile",
    component: () => import('../components/AdminProfile.vue'),
    name: 'admin-profile'
  }, */
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})


/* router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('user');

  if (to.path === '/login' || to.path === '/register') {
    // Si el usuario está autenticado y trata de acceder a /login o /register, redirigir al perfil del usuario
    if (isAuthenticated) {
      next('/');
    }
  }
}); */

export default router