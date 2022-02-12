// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/src/router.js
import { createMemoryHistory, createRouter as _createRouter, createWebHistory, START_LOCATION } from 'vue-router';
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
        // Manually implement scrollBehavior for Naive UI
        scrollBehavior(to, from, savedPosition) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    console.log(`to: ${to.path}, from: ${from.path}`);

                    // eslint-disable-next-line no-restricted-globals
                    const { position, forward } = history.state;

                    if (savedPosition) {
                        console.log('Save & Restore');
                        emitter.emit('saveAndRestorePosition', { to, from, position, forward });
                    } else {
                        console.log('Save');
                        emitter.emit('savePosition', { to, from, position, forward });
                    }

                    resolve();
                }, 1000);
            });
        },
    });
}
