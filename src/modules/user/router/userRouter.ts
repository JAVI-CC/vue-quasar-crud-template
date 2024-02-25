import { isAuthenticatedGuard } from 'src/modules/auth/router/authGuard';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/users',
    name: 'user-list',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "user-list" */ 'src/modules/user/views/user-list.vue'),
  },
  {
    path: '/users/nuevo',
    name: 'user-add',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "user-add" */ 'src/modules/user/views/user-add.vue'),
  },
  {
    path: '/users/editar/:id',
    name: 'user-edit',
    beforeEnter: [isAuthenticatedGuard],
    component: () => import(/* webpackChunkName: "user-edit" */ 'src/modules/user/views/user-edit.vue'),
    props: (route: { params: { id: string } }) => ({
      userId: String(route.params.id),
    }),
  },
];

export default routes;
