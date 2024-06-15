import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Warehouse from '@/views/Warehouse.vue';
import List from '@/views/List.vue';
import Login from '@/views/Login.vue';
import CapX from '@/views/CapX.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: Warehouse
    },
    {
      path: '/list',
      name: 'materialList',
      component: List
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/capx',
      name: 'capx',
      component: CapX
    },
  ]
})

export default router
