import { LocalStorage } from 'quasar';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

const isAuthenticatedGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (LocalStorage.has('token')) {
    next();
  } else {
    next({ name: 'acceder' });
  }
};

const isAuthenticatedAdminGuard = async (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  if (LocalStorage.getItem('token')) {
    const authStore = useAuthStore();
    const { userAuth } = storeToRefs(authStore);
    if (userAuth.value?.is_admin) {
      next();
    } else {
      next({ name: 'forbidden' });
    }
  } else {
    next({ name: 'login' });
  }
};

export { isAuthenticatedGuard, isAuthenticatedAdminGuard };
