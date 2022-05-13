import Visualizer from 'rollup-plugin-visualizer';
import { isReport } from '../../constants';

const createVisualizer = () =>
    isReport
        ? Visualizer({
              filename: './dist/visualizer/stats.html',
              open: true,
              gzipSize: true,
              brotliSize: true,
          })
        : null;

export default createVisualizer();
