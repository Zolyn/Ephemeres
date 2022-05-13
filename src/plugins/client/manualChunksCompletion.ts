import ManualChunksCompletion from 'vite-plugin-manual-chunks-completion';
import { dependencies } from '../../../package.json';

export default ManualChunksCompletion({
    dependencies,
    patterns: {
        prefix: ['vue', 'naive-ui', '@better-scroll'],
    },
});
