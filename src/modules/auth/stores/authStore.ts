import { ref, computed, readonly } from 'vue';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import { LocalStorage } from 'quasar';
import type { LoginForm, UserAuth, AuthChangePasswordForm, AuthVerificationUser } from '../interfaces/authInterface';
import type { Message, MessageErrors } from 'src/modules/common/interfaces/commonInterface';
import { AxiosError } from 'axios';
import piniaResetAllStores from 'src/modules/common/helpers/piniaResetAllStores';

export const useAuthStore = defineStore('auth', () => {
  //State
  const isLogged = ref<boolean | null>(false);
  const isEmailVerified = ref<boolean | null>(false);
  const userAuth = ref<UserAuth | null>(null);

  const prefixPathAuth = readonly(ref<string>('auth'));
  const prefixPathUser = readonly(ref<string>('user'));
  //End State

  //Getters
  const isAdmin = computed<boolean>(() => userAuth.value?.is_admin ?? false);
  //End Getters

  //Actions
  const check = async (): Promise<void> => {
    try {
      const { data } = await api.get<UserAuth>(`${prefixPathAuth.value}/check`);
      setCheck(data);
    } catch (error) {
      setLogout();
    } finally {
    }
  };

  const login = async (credentials: LoginForm): Promise<void | string | string[]> => {
    try {
      const { data } = await api.post<UserAuth>(`${prefixPathAuth.value}/login`, credentials);
      setLogin(data);
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await api.get<void>(`${prefixPathAuth.value}/logout`);
    } catch (error) {
    } finally {
      setLogout();
    }
  };

  const changePassword = async (payload: AuthChangePasswordForm, token?: string): Promise<boolean | string | string[] | void> => {
    if (!!token) LocalStorage.set('token', token);

    try {
      await api.post<Message>(`${prefixPathAuth.value}/change/password`, payload);
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
      if (!!token) LocalStorage.remove('token');
    }
  };

  const recoveryPassword = async (email: string): Promise<boolean | string | string[] | void> => {
    try {
      await api.post<Message>(`${prefixPathAuth.value}/recovery/password`, { email });
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const sendEmailVerification = async (): Promise<boolean | string | string[] | void> => {
    try {
      await api.post<Message>(`${prefixPathUser.value}/verification/email/notification`);
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };

  const verifyUserAuth = async ({ id, hash, expires, signature, token }: AuthVerificationUser): Promise<boolean | string | string[] | void> => {
    try {
      LocalStorage.set('token', token);
      await api.get<Message>(`${prefixPathUser.value}/verification/email/${id}/${hash}?expires=${expires}&signature=${signature}`);
      await check();
      return true;
    } catch (error) {
      const err = error as AxiosError<MessageErrors | Message>;
      return err.response?.data?.message;
    } finally {
    }
  };
  //End Actions

  //Setters
  const setCheck = (data: UserAuth): void => {
    isLogged.value = !!data?.is_logged;
    isEmailVerified.value = data?.is_email_verified;
    if (!isLogged.value) {
      LocalStorage.remove('token');
      userAuth.value = null;
    } else {
      userAuth.value = data;
    }
  };

  const setLogin = (data: UserAuth): void => {
    isLogged.value = true;
    isEmailVerified.value = data?.is_email_verified;
    LocalStorage.set('token', data.token);
    userAuth.value = data;
    userAuth.value.token = null;
  };

  const setLogout = (): void => {
    isLogged.value = false;
    isEmailVerified.value = false;
    userAuth.value = null;
    piniaResetAllStores();
    LocalStorage.remove('token');
  };

  const setLoggedFalse = (): void => {
    isLogged.value = false;
  };

  const setEmailVerified = (val: boolean) => {
    isEmailVerified.value = val;
  };

  const $reset = (): void => {
    isLogged.value = false;
    isEmailVerified.value = false;
    userAuth.value = null;
  };
  //End Setters

  return {
    //State
    isLogged,
    userAuth,

    //Getters
    isAdmin,

    //Actions
    check,
    login,
    logout,
    changePassword,
    recoveryPassword,
    sendEmailVerification,
    verifyUserAuth,

    //Setters
    setCheck,
    setLogin,
    setLogout,
    setLoggedFalse,
    setEmailVerified,
    $reset,
  };
});
