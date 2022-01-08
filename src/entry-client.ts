// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/entry-client.js
import { createApp } from './main';

const { app, router } = createApp();

// wait until router is ready before mounting to ensure hydration match
router.isReady().then(() => {
    app.mount('#app');
});
