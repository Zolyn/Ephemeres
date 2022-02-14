import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Layout from 'vite-plugin-vue-layouts';
import Component from 'unplugin-vue-components/vite';
import { resolve } from 'path';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
// import DebugPlugin from './src/plugins/debug';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue({
            reactivityTransform: true,
        }),
        Pages({
            routeBlockLang: 'yaml',
        }),
        Layout(),
        AutoImport({
            dts: true,
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: ['vue', 'vue-router', 'pinia'],
            eslintrc: {
                enabled: true,
                globalsPropValue: 'readonly',
            },
        }),
        Component({
            dts: true,
            resolvers: [NaiveUiResolver()],
        }),
        // DebugPlugin(),
    ],
    optimizeDeps: {
        include: ['naive-ui', 'pinia'],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './src'),
        },
    },
});
