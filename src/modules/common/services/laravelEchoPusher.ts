import Echo from 'laravel-echo';
import laravelEchoPusherConfig from './LaravelEchoPusher/laravelEchoPusherConfig';
import { storeToRefs } from 'pinia';
import { useAuthStore } from 'src/modules/auth/stores/authStore';
import { NotificationPusher } from '../interfaces/commonInterface';

let pusherConfig: Echo | null = null;

const instanceNotifications = async (): Promise<void> => {
  const authStore = useAuthStore();
  const { userAuth } = storeToRefs(authStore);

  //Pusher instance and configuration
  pusherConfig = await laravelEchoPusherConfig();

  //Pusher listen channels
  pusherConfig
    .private(`users.${userAuth.value?.id}`).notification(
      (notification: NotificationPusher) => {
        if (notification.type === 'verified') console.log('Verificando user...');
      }
    );
};

export { instanceNotifications, pusherConfig };
