import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Component from 'unplugin-vue-components/vite';
import { resolve } from 'path';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import AutoImportsRulesPlugin from './src/plugins/auto-imports-rules';
// import DebugPlugin from './src/plugins/debug';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        Pages({
            routeBlockLang: 'yaml',
        }),
        AutoImport({
            dts: true,
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            imports: ['vue', 'vue-router', 'pinia'],
        }),
        Component({
            dts: true,
            resolvers: [NaiveUiResolver()],
        }),
        AutoImportsRulesPlugin(),
        // DebugPlugin(),
    ],
    optimizeDeps: {
        include: ['naive-ui'],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, './src'),
        },
    },
});
