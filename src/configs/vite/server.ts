import { extendConfig } from './common';

function getServerConfig() {
    return extendConfig({
        build: {
            outDir: './dist/server',
            ssr: './src/entry-server.ts',
        },
    });
}

export { getServerConfig };
