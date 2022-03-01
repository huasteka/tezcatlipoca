import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '@/components/LoginForm.vue';
import RegistrationForm from '@/components/RegistrationForm.vue';
import { useAuthStore } from '@/stores/authentication';
import WelcomeView from '@/views/WelcomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/welcome',
      meta: {
        skipAuthenticated: true
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
      ]
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import("@/views/DashboardView.vue"),
      meta: {
        protected: true,
      },
    },
  ],
});

router.beforeEach((from, to, next) => {
  const store = useAuthStore();

  if (true && to.matched.some(record => record.meta.skipAuthenticated)) {
    next({ name: 'dashboard' });
    return;
  }

  if (!store.isAuthenticated && (from.matched.some(record => record.meta.protected) || to.matched.some(record => record.meta.protected))) {
    next({ name: 'welcome.login' });
    return;
  }

  next();
});

export default router;
