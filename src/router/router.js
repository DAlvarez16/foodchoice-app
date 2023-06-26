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
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

router.beforeEach((to, from) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (to.name !== 'restaurant-profile' && (user && user.userType == 'Restaurante')) {
    return {
      name: 'restaurant-profile',
      params: {
        id: user._id
      }
    }
  }else if(user && (to.name == 'login' || to.name == 'register' || to.name == 'admin-login')){
    return {
      name: 'home'
    }
  }
});

export default router