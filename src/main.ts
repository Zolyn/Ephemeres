import { createSSRApp, createApp as createClientApp } from 'vue';
import { createHead } from '@vueuse/head';
import App from './App.vue';
import { createRouter } from './router';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp() {
    const app = import.meta.env.SSR ? createSSRApp(App) : createClientApp(App);
    const router = createRouter();
    const head = createHead();
    const pinia = createPinia();
    app.use(router);
    // NOTE: I don't know whether it is necessary to hydrate the state manually
    //  even though this project doesn't require data prefetching :(
    app.use(pinia);
    return { app, router, head };
}
