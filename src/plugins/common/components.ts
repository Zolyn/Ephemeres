import Components from 'unplugin-vue-components/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default Components({
    dts: true,
    resolvers: [NaiveUiResolver()],
});
