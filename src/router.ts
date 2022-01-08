// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/router.js
import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import generatedRoutes from '~pages';

const routes = setupLayouts(generatedRoutes);

export function createRouter() {
    return _createRouter({
        // use appropriate history implementation for server/client
        // import.meta.env.SSR is injected by Vite.
        history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
        routes,
    });
}
