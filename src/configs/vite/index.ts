import { UserConfig } from 'vite';
import { isClient } from '../../constants';
import { getClientConfig } from '../../configs/vite/client';
import { getServerConfig } from '../../configs/vite/server';

export default async function getViteConfig(): Promise<UserConfig> {
    if (isClient) {
        return getClientConfig();
    }

    // isClient: false | null
    if (isClient !== null) {
        return getServerConfig();
    }

    throw new Error('[getViteConfig] Environment variable EPH_TARGET was not set!');
}
