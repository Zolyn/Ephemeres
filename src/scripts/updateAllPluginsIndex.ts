import { resolve as _resolve } from 'path';
import { updatePluginsIndex } from '~/scripts/updatePluginsIndex';

const resolve = (p: string) => _resolve(__dirname, p);

const vitePluginsPath = resolve('../configs/vite/plugins');

function updateAllPluginsIndex(): void {
    updatePluginsIndex(`${vitePluginsPath}/common`);
    updatePluginsIndex(`${vitePluginsPath}/client`);
}

updateAllPluginsIndex();
