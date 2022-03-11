import { CardProps, ListProps } from 'naive-ui';
import { nanoid } from 'nanoid';
import { _RouteLocationBase } from 'vue-router';
import { EphemeresConfig } from '~/types';

type StringKeyObject = Record<string, any>;

type CardThemeOverrides = Partial<CardProps['themeOverrides']>;

type ListThemeOverrides = Partial<ListProps['themeOverrides']>;

const borderRadius = '16px';

const cardThemeOverrides: CardThemeOverrides = {
    borderRadius,
};

const listThemeOverrides: ListThemeOverrides = {
    borderRadius,
};

const skeletonItems = Array.from({ length: 20 }).map(() => ({ id: nanoid() }));

type Func = (...args: any[]) => any;

/**
 * 深度合并两个对象
 *
 * @param target - 目标对象
 * @param merge - 合并对象
 *
 * @public
 */
function deepMerge<T extends StringKeyObject>(target: T, merge: T): T {
    const keys = [...new Set(Object.keys(target).concat(Object.keys(merge)))];
    const mergedObject: StringKeyObject = {};

    keys.forEach((key) => {
        const targetVal = target[key];
        const mergeVal = merge[key];

        if (Array.isArray(targetVal) || Array.isArray(mergeVal)) {
            mergedObject[key] = [targetVal, mergeVal].flat();
        } else if (typeof targetVal === 'object' && typeof mergeVal === 'object') {
            mergedObject[key] = deepMerge(target[key], merge[key]);
        } else {
            mergedObject[key] = merge[key] ?? target[key];
        }
    });

    return mergedObject as T;
}

function formatTime(time: number): string {
    if (time < 10) {
        return `0${time}`;
    }
    return time.toString();
}

function transformTime(time: number): string {
    const rawDate = new Date(time * 1000);
    const year = rawDate.getFullYear();
    const month = rawDate.getMonth() + 1;
    const date = rawDate.getDate();
    const hour = rawDate.getHours();
    const minute = rawDate.getMinutes();
    const second = rawDate.getSeconds();

    return `${year}-${month}-${date} ${hour}:${formatTime(minute)}:${formatTime(second)}`;
}

function transformBytes(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];
    let result = '-';

    units.reduce((prev, val) => {
        if (!prev) {
            return prev;
        }

        const transformedBytes = parseFloat((bytes / prev).toFixed(2));

        if (transformedBytes < 1024 || val === 'GB') {
            result = `${transformedBytes} ${val}`;
            return 0;
        }

        return prev * 1024;
    }, 1);

    return result;
}

function decodeRouteLocation<L extends _RouteLocationBase>(location: L): L {
    return {
        ...location,
        path: decodeURIComponent(location.path),
        fullPath: decodeURIComponent(location.fullPath),
    };
}

function createConfig(config: EphemeresConfig): EphemeresConfig {
    return config;
}

function debounceFn(fn: Func, waitTime: number, immediate = false): Func {
    let timer: number | null;
    let startTime: number;
    let argArray: any[];

    function createTimer(setTimeInterval: number) {
        timer = setTimeout(() => {
            const currentTime = Date.now();
            const timeInterval = currentTime - startTime;

            // startTime updated, create new timer
            if (timeInterval < setTimeInterval) {
                startTime = currentTime;
                createTimer(waitTime - timeInterval);
            } else {
                if (!immediate) {
                    fn(...argArray);
                }

                clearTimeout(timer!);
                timer = null;
            }
        }, setTimeInterval) as unknown as number;
    }

    return (...args: any[]): void => {
        argArray = args;
        startTime = Date.now();

        if (!timer) {
            if (immediate) {
                fn(...args);
            }

            createTimer(waitTime);
        }
    };
}

export {
    borderRadius,
    cardThemeOverrides,
    listThemeOverrides,
    skeletonItems,
    deepMerge,
    formatTime,
    transformBytes,
    transformTime,
    decodeRouteLocation,
    createConfig,
    debounceFn,
};
export * from './composables';
export * from './config';
export type { CardThemeOverrides, ListThemeOverrides };
