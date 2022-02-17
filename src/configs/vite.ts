import { UserConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Pages from 'vite-plugin-pages';
import Layout from 'vite-plugin-vue-layouts';
import Component from 'unplugin-vue-components/vite';
import Inspect from 'vite-plugin-inspect';
import MKCert from 'vite-plugin-mkcert';
import { resolve } from 'path';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';
import Visualizer from 'rollup-plugin-visualizer';
import ManualChunksCompletion from '../plugins/manualChunksCompletion';
import { dependencies } from '../../package.json';
import { deepMerge } from '../utils';
import { isClient, isReport, isStatic } from '../constants';

const commonConfig: UserConfig = {
    plugins: [
        Vue({
            reactivityTransform: true,
        }),
        Pages({
            routeBlockLang: 'yaml',
        }),
        Layout(),
        AutoImport({
            dts: true,
            include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
            // NOTE: Temporarily ignore some Vue imports to prevent duplicate imports
            // e.g.:
            // import { defineComponent } 'vue'; <-- unplugin-auto-import
            // import { defineComponent as _defineComponent } from 'vue'; <-- @vitejs/vue
            //
            // Though it is not a critical issue, it shows that the plugin has problems with character matching
            // You should manually import these APIs if you want to use them
            ignore: ['defineComponent', 'resolveComponent', 'useCssVars', 'unref'],
            imports: ['vue', 'vue-router', 'pinia', '@vueuse/head', '@vueuse/core'],
            eslintrc: {
                enabled: true,
                globalsPropValue: 'readonly',
            },
        }),
        Component({
            dts: true,
            resolvers: [NaiveUiResolver()],
        }),
        // Dev only
        Inspect(),
        MKCert({ source: 'coding' }),
    ],
    server: {
        https: true,
    },
    optimizeDeps: {
        include: ['naive-ui', 'pinia'],
    },
    build: {
        reportCompressedSize: false,
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, '..'),
        },
    },
};

function extendConfig(newConfig: UserConfig): UserConfig {
    return deepMerge(commonConfig, newConfig);
}

const serverConfig = extendConfig({
    build: {
        outDir: './dist/server',
        ssr: './src/entry-server.ts',
    },
});

const manualChunksExp = ['vue', 'naive-ui'];

const clientConfig = extendConfig({
    plugins: [ManualChunksCompletion({ dependencies, manualChunksExp })],
    build: {
        outDir: './dist/client',
        ssrManifest: true,
    },
});

export default function getViteConfig(): UserConfig {
    if (isClient) {
        if (isReport) {
            clientConfig.plugins!.push(
                Visualizer({
                    filename: './dist/visualizer/stats.html',
                    open: true,
                    gzipSize: true,
                    brotliSize: true,
                }),
            );
        }

        if (isStatic) {
            clientConfig.build!.outDir = './dist/static';
        }

        return clientConfig;
    }

    // isClient: false | null
    if (isClient !== null) {
        return serverConfig;
    }

    throw new Error('[getViteConfig] Environment variable EPH_TARGET was not set!');
}
