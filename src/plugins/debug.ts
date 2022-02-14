// Just for test use
import { Plugin } from 'vite';
import { resolve } from 'path';
import { appendFileSync, unlinkSync, existsSync } from 'fs';

export default function DebugPlugin(): Plugin {
    const clientDebugFile = resolve(__dirname, '../.vite-debug.client.log');
    const serverDebugFile = resolve(__dirname, '../.vite-debug.server.log');
    const isClient = true;

    return {
        name: 'vite-plugin-debug',

        // configResolved(config) {
        //     console.log('[DEBUG] Config:');
        //     console.log(config);
        //     console.log('Client:', config.define!['process.client']);
        //     // isClient = config.define['process.client'];
        //     // if (isClient) {
        //     //     if (existsSync(clientDebugFile)) {
        //     //         console.log('[DEBUG] Cleanning old client logs...');
        //     //         unlinkSync(clientDebugFile);
        //     //     }
        //     //
        //     //     if (existsSync(serverDebugFile)) {
        //     //         console.log('[DEBUG] Cleanning old server logs...');
        //     //         unlinkSync(serverDebugFile);
        //     //     }
        //     // }
        // },

        // transform(code: string, id: string) {
        //     if (isClient) {
        //         console.log(`[DEBUG] Client: ${id}`);
        //         appendFileSync(clientDebugFile, `${id}\n${code}\n`);
        //     } else {
        //         console.log(`[DEBUG] Server: ${id}`);
        //         appendFileSync(serverDebugFile, `${id}\n${code}\n`);
        //     }
        //
        //     return {
        //         code,
        //     };
        // },
    };
}
