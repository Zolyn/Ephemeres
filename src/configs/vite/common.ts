import { UserConfig } from 'vite';
import { resolve } from 'path';
import { deepMerge } from '../../utils';
import { getCommonPlugins } from '../../plugins/common';

const commonConfig: UserConfig = {
    plugins: getCommonPlugins(),
    server: {
        https: true,
        proxy: {
            // Fix 'ERR_HTTP2_PROTOCOL_ERROR' error
            'https://localhost:3000': 'https://localhost:3000',
        },
    },
    optimizeDeps: {
        include: ['naive-ui', 'pinia'],
    },
    build: {
        reportCompressedSize: false,
    },
    esbuild: {
        pure: ['console.log'],
    },
    resolve: {
        alias: {
            '~': resolve(__dirname, '../..'),
        },
    },
};

function extendConfig(newConfig: UserConfig): UserConfig {
    return deepMerge(commonConfig, newConfig);
}

export { extendConfig };
