import { createWebHistory, createRouter } from 'vue-router';
import { AppLayout } from '@/components';
import { Dashboard } from '@/pages';
import { AppConfig } from '@/configs';

const routes = [
  {
    path: '/',
    component: AppLayout,
    meta: {
      appSlug: AppConfig.APP_SLUG,
      appName: AppConfig.APP_NAME,
    },
    children: [
      {
        path: '',
        name: 'app',
        component: Dashboard,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

