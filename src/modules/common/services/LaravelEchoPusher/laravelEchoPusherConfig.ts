import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import { LocalStorage } from 'quasar';

const laravelEchoPusherConfig = async (): Promise<Echo> => {
  Pusher; //Instance new Pusher
  return new Echo({
    authEndpoint: `${process.env.APP_AXIOS_BASEURL}/broadcasting/auth`,
    broadcaster: 'pusher',
    key: process.env.PUSHER_APP_KEY,
    cluster: 'eu',
    forceTLS: true,
    auth: {
      headers: {
        authorization: LocalStorage.getItem('token'),
        accept: 'application/json',
      },
    },
  });
};

export default laravelEchoPusherConfig;
