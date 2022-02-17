import { CardProps, ListProps } from 'naive-ui';
import { nanoid } from 'nanoid';

type StringKeyObject = Record<string, any>;

/**
 * 深度合并两个对象
 *
 * @param target - 目标对象
 * @param merge - 合并对象
 *
 * @public
 */
function deepMerge<T extends StringKeyObject>(target: T, merge: T): T {
    const keys = [...new Set([...Object.keys(target), ...Object.keys(merge)])];
    const mergedObject: StringKeyObject = {};
    keys.map((key): undefined => {
        const targetVal = target[key];
        const mergeVal = merge[key];
        if (Array.isArray(targetVal) || Array.isArray(mergeVal)) {
            mergedObject[key] = [targetVal, mergeVal].flat();
        } else if (typeof targetVal === 'object' && typeof mergeVal === 'object') {
            mergedObject[key] = deepMerge(target[key], merge[key]);
        } else {
            mergedObject[key] = merge[key] ?? target[key];
        }

        return undefined;
    });

    return mergedObject as T;
}

type CardThemeOverrides = Partial<CardProps['themeOverrides']>;

type ListThemeOverrides = Partial<ListProps['themeOverrides']>;

const borderRadius = '16px';

const cardThemeOverrides: CardThemeOverrides = {
    borderRadius,
};

const listThemeOverrides: ListThemeOverrides = {
    borderRadius,
};

const skeletonItems = '.'
    .repeat(10)
    .split('')
    .map(() => ({ id: nanoid() }));

export { borderRadius, cardThemeOverrides, listThemeOverrides, skeletonItems, deepMerge };
export type { CardThemeOverrides, ListThemeOverrides };
