// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/router.js
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'layouts-generated';
import pageRoutes from '~pages';
import emitter from '~/eventbus';

const routes = setupLayouts(pageRoutes);

export function createRouter() {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
        scrollBehavior() {
            // TODO: implement savedPosition to replace the same functionality of Vue Router
            return new Promise((resolve) => {
                setTimeout(() => {
                    emitter.emit('scroll', { top: 0, behavior: 'smooth' });
                    resolve();
                }, 700);
            });
        },
    });
}
