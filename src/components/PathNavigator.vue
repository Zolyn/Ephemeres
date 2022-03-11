<template>
    <div class="path-navigator">
        <div ref="pathNavigatorWrapper" class="path-navigator__wrapper overflow-hidden whitespace-nowrap rounded-28px">
            <div class="path-navigator__content inline-block">
                <n-breadcrumb>
                    <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.id" @click="router.push(item.path)">
                        <n-button
                            :type="item.disabled ? 'default' : 'primary'"
                            :disabled="mainStore.isLoading ? false : item.disabled"
                            size="small"
                            secondary
                            round
                            >{{ item.text }}</n-button
                        >
                        <template #separator>
                            <n-icon :component="ChevronRight12Regular" />
                        </template>
                    </n-breadcrumb-item>
                </n-breadcrumb>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import BScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';
import { BScrollConstructor } from '@better-scroll/core/dist/types/BScroll';
import { ChevronRight12Regular } from '@vicons/fluent';
import { join } from 'path-browserify';
import { nanoid } from 'nanoid';
import { BreadCrumbList } from '~/types';
import useMainStore from '~/stores/main';

BScroll.use(MouseWheel);

const mainStore = useMainStore();
const router = useRouter();

const pathNavigatorWrapper = ref<null | HTMLDivElement>(null);

let bs: BScrollConstructor;

const breadcrumbs = computed<BreadCrumbList>(() => {
    const { path } = router.currentRoute.value;
    const breadCrumbList: BreadCrumbList = [
        {
            id: nanoid(),
            text: 'Home',
            disabled: false,
            path: '/',
        },
    ];

    const pathClip = decodeURIComponent(path).split('/');
    // Remove empty value
    pathClip.shift();

    // For non-root path
    if (pathClip[0]) {
        pathClip.reduce((prev, val) => {
            const mergedVal = join(prev, val);

            breadCrumbList.push({
                id: nanoid(),
                text: val,
                disabled: false,
                path: mergedVal,
            });

            return mergedVal;
        }, '/');
    }

    breadCrumbList[breadCrumbList.length - 1].disabled = true;

    return breadCrumbList;
});

async function initPathNavigator() {
    await nextTick();
    console.log('path-navigator');
    console.log(pathNavigatorWrapper.value);

    bs = new BScroll(pathNavigatorWrapper.value!, {
        scrollX: true,
        disableMouse: false,
        disableTouch: false,
        mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300,
        },
    });
}

function destroy() {
    bs.destroy();
}

onMounted(initPathNavigator);
// onBeforeUnmount(destroy);
</script>
