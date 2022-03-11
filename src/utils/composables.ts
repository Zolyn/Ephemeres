import { useBreakpoint } from 'vooks';
import { ComputedRef } from 'vue';
import { EphemeresConfig } from '~/types';

function useIsMobile(): ComputedRef<boolean> {
    return computed(() => useBreakpoint().value === 'xs');
}

async function useConfig(): Promise<EphemeresConfig> {
    return import('../configs/ephemeres').then((module) => module.default);
}

export { useIsMobile, useConfig };
