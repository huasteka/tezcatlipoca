import { createRouter, createWebHashHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authentication';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import WelcomeView from '@/views/WelcomeView.vue';
import storageRoutes from './storageRoutes';
import measureUnitRoutes from './measureUnitRoutes';
import itemRoutes from './itemRoutes';
import storageOperationRoutes from './storageOperationRoutes';
import budgetGroupRoutes from './budgetGroupRoutes';
import budgetCategoryRoutes from './budgetCategoryRoutes';
import accountRoutes from './accountRoutes';
import paymentTypeRoutes from './paymentTypeRoutes';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      meta: {
        skipAuthenticated: true,
      },
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: WelcomeView,
      children: [
        {
          path: '',
          name: 'welcome.login',
          component: LoginForm,
        },
        {
          path: 'register',
          name: 'welcome.register',
          component: RegistrationForm,
        },
      ],
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/MainView.vue'),
      meta: {
        protected: true,
      },
      children: [
        {
          path: '',
          name: 'dashboard.main',
          component: () => import('@/views/DashboardView.vue'),
        },
        {
          path: 'settings',
          name: 'dashboard.settings',
          component: () => import('@/views/SettingsView.vue'),
        },
        ...storageOperationRoutes,
        ...storageRoutes,
        ...measureUnitRoutes,
        ...itemRoutes,
        ...budgetGroupRoutes,
        ...budgetCategoryRoutes,
        ...accountRoutes,
        ...paymentTypeRoutes,
      ],
    },
  ],
});

router.beforeEach((from, to, next) => {
  const store = useAuthStore();

  if (store.isAuthenticated && from.matched.some(record => record.meta.skipAuthenticated)) {
    next({ name: 'dashboard.main' });
    return;
  }

  if (!store.isAuthenticated && from.matched.some(record => record.meta.skipAuthenticated)) {
    next({ name: 'welcome.login' });
    return;
  }

  if (!store.isAuthenticated && from.matched.some(record => record.meta.protected)) {
    next({ name: 'welcome.login' });
    return;
  }

  next();
});

export default router;
