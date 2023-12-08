import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';
import { Router, useRouter } from 'vue-router';
import { LocalStorage } from 'quasar';
import type { AuthChangePasswordForm, AuthVerificationUser, Login } from '../interfaces/authInterface';

const useAuth = () => {
  const authStore = useAuthStore();
  const { isLogged, isAdmin, userAuth } = storeToRefs(authStore);
  const router: Router = useRouter();

  const checkAuth = (): void => {
    authStore.check();
  };

  const login = async (credentials: Login): Promise<void | string | string[]> => {
    const resp = await authStore.login(credentials);
    if (!isLogged.value) {
      return resp;
    } else {
      LocalStorage.has('lastPage401') ? redirectLastPage401() : redirectInicio();
    }
  };

  const logout = async (): Promise<void> => {
    authStore.setLoggedFalse();
    redirectLogin();
    await authStore.logout();
  };

  const changePassword = async (payload: AuthChangePasswordForm): Promise<boolean | string | string[] | void> => {
    return await authStore.changePassword(payload);
  };

  const recoveryPassword = async (email: string): Promise<boolean | string | string[] | void> => {
    return await authStore.recoveryPassword(email);
  };

  const sendEmailVerification = async (): Promise<boolean | string | string[] | void> => {
    return await authStore.sendEmailVerification();
  };

  const verifyUserAuth = async (payload: AuthVerificationUser): Promise<boolean | string | string[] | void> => {
    return await authStore.verifyUserAuth(payload);
  };


  //Redirects
  const redirectInicio = (): void => {
    router.push({
      name: 'inicio',
    });
  };

  const redirectLogin = (): void => {
    router.push({
      name: 'acceder',
    });
  };

  const redirectRecoveryPassword = (): void => {
    router.push({
      name: 'recovery-password',
    });
  };

  const redirectChangePassword = (): void => {
    router.push({
      name: 'cambiar-clave',
    });
  };

  const redirectLastPage401 = (): void => {
    const path: string = LocalStorage.getItem('lastPage401') as string;
    LocalStorage.remove('lastPage401');
    router.push({ path });
  };
  //End Redirects

  return {
    //Methods
    checkAuth,
    login,
    redirectInicio,
    redirectLogin,
    redirectChangePassword,
    redirectRecoveryPassword,
    logout,
    changePassword,
    recoveryPassword,
    sendEmailVerification,
    verifyUserAuth,

    //Variables
    isLogged: computed(() => isLogged.value),
    isAdmin: computed(() => isAdmin.value),
    isEmailVerified: computed(() => userAuth.value?.is_email_verified),
    userAuth: computed(() => userAuth.value),
    nombreCompleto: computed(() => userAuth.value?.nombre_completo),
  };
};

export default useAuth;
