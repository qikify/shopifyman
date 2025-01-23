import { createApp } from 'vue';
import router from '@/router';
import PolarisVue from '@ownego/polaris-vue';
import '@ownego/polaris-vue/dist/style.css';

import App from './App.vue';

const app = createApp(App);

app.use(PolarisVue);
app.use(router);

app.provide('isPortal', true);
app.provide('isEmbed', true);

router.isReady().then(() => {
  app.mount('#app');
});
