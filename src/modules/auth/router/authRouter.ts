import { RouteRecordRaw } from 'vue-router';
import { isAuthenticatedGuard } from './authGuard';

const routes: RouteRecordRaw[] = [
  {
    path: '',
    name: 'inicio',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "inicio" */ 'src/modules/common/views/common-inicio.vue'),
  },
  {
    path: '/change-password',
    name: 'auth-password',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "auth-password" */ 'src/modules/auth/views/auth-password.vue'),
  },
];

export default routes;
