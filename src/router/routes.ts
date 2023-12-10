import { RouteRecordRaw } from 'vue-router';
import authRouter from '../modules/auth/router/authRouter';
import userRouter from 'src/modules/user/router/userRouter';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'mainlayout',
    component: () => import(/* webpackChunkName: "mainlayout */ '../modules/common/views/common-mainlayout.vue'),
    children: [
      //Auth
      ...authRouter,

      //Users
      ...userRouter,
    ],
  },

  {
    path: '/acceder/:emailRecoveryPassword?',
    name: 'acceder',
    component: () => import(/* webpackChunkName: "acceder" */ '../modules/auth/views/auth-login.vue'),
    props: (route: { params: { emailRecoveryPassword?: string; } }) => ({
      emailRecoveryPassword: route.params.emailRecoveryPassword ? String(decodeURIComponent(route.params.emailRecoveryPassword)) : '',
    }),
  },

  {
    path: '/restablecer-password',
    name: 'recovery-password',
    component: () =>
      import(/* webpackChunkName: "recovery-password" */ '../modules/auth/views/auth-recoveryPassword.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    //component: () => import('../modules/common/views/common-error404.vue'),
    redirect() {
      return { name: 'inicio', params: {} };
    },
  },

  {
    path: '/error/403',
    name: 'forbidden',
    //component: () => import('../modules/common/views/common-error403.vue'),
    redirect() {
      return { name: 'inicio', params: {} };
    },
  },
];

export default routes;
