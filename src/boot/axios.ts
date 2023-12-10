import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosRequestHeaders } from 'axios';
import { LocalStorage, Loading } from 'quasar';
//import piniaResetAllStores from '../modules/common/helpers/piniaResetAllStores';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: `${process.env.APP_AXIOS_BASEURL}/api/` });

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: LocalStorage.getItem('token'),
    Accept: 'application/json',
  } as AxiosRequestHeaders;

  config.headers['Accept-Language'] = LocalStorage.getItem('language');

  return config;
});

const isRedirectEndSession = (): boolean => {
  const lastPage = window.location.pathname + window.location.search;

  if (lastPage !== '/acceder' && lastPage.startsWith('/auth/reset/password')) {
    LocalStorage.set('lastPage401', lastPage);
    return true;
  }

  return false;
};

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const { status } = error.response;
      if (LocalStorage.has('token') && status === 401 /*UNAUTHORIZED*/) {
        if (isRedirectEndSession()) router.push({ name: 'acceder' });
        //piniaResetAllStores(); //Reset states in all stores
        Loading.hide(); //Para evitar un loading que no se haya cerrado.
      }
      return Promise.reject(error);
    }
  );
});

export { api };
