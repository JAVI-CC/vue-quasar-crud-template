import { boot } from 'quasar/wrappers';
import { LoadingBar } from 'quasar';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  LoadingBar.setDefaults({
    color: 'secondary',
    size: '4px',
    position: 'top',
    hijackFilter(url: string): boolean {
      // example (only https://sock*-eu.pusher/* should trigger)
      return /^https:\/\/sock*-eu.pusher\.com/.test(url);
    },
  });
});
