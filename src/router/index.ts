// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/dashboards/DashboardView.vue';
import MainLayout from '@/layouts/MainLayout.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'assets',
          name: 'assets',
          component: () => import('@/views/dashboards/AssetsView.vue'),
        },
        {
          path: 'assets/create',
          name: 'create-assets',
          component: () => import('@/views/dashboards/assets/AssetCreateView.vue')
        },
        {
          path: 'assets/edit/:id',
          name: 'edit-assets',
          component: () => import('@/views/dashboards/assets/AssetEditView.vue')
        }
      ]
    },
  ]
});


router.beforeEach((to, from, next) => {

  const token = sessionStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (!token) {
      next('/login');
    } else {
      next();
    }
  } else {

    if (to.name === 'login' && token) {
      next('/');
    } else {
      next();
    }
  }
});

export default router;