import mitt from 'mitt';
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

interface RouteInfo {
    to: RouteLocationNormalized;
    from: RouteLocationNormalizedLoaded;
    position: number;
    forward: string | null;
}

type Events = {
    savePosition: RouteInfo;
    saveAndRestorePosition: RouteInfo;
};

const emitter = mitt<Events>();

export default emitter;
export type { RouteInfo };
