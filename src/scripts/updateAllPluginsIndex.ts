import { resolve as _resolve } from 'path';
import { updatePluginsIndex } from './updatePluginsIndex';

const resolve = (p: string) => _resolve(__dirname, p);

const vitePluginsPath = resolve('../plugins');

function updateAllPluginsIndex(): void {
    updatePluginsIndex(`${vitePluginsPath}/common`);
    updatePluginsIndex(`${vitePluginsPath}/client`);
}

updateAllPluginsIndex();
