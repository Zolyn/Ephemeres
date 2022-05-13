import { UserConfig } from 'vite';
import { extendConfig } from './common';
import { getClientPlugins } from '../../plugins/client';

function getClientConfig(): UserConfig {
    return extendConfig({
        plugins: getClientPlugins(),
        build: {
            outDir: './dist/static',
            ssrManifest: true,
        },
    });
}

export { getClientConfig };
