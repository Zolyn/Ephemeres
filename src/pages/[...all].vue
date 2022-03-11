<template>
    <div id="page" class="mx-auto w-90vw sm:w-85vw md:w-80vw lg:w-75vw">
        <n-card :theme-overrides="cardThemeOverrides" hoverable>
            <div id="page-card-header" class="flex items-center justify-between">
                <div id="page-card-header__path-navigator" ref="pathNavigatorComponent" class="w-3/5">
                    <path-navigator />
                </div>
                <div id="page-card-header__actions">
                    <path-edit />
                </div>
            </div>
            <div id="page-card-content">
                <slide-x-transition>
                    <component :is="ListSkeleton" />
                </slide-x-transition>
            </div>
        </n-card>
    </div>
</template>

<script lang="ts" setup>
import ky from 'ky';
import { useIntersectionObserver } from '@vueuse/core';
import useMainStore from '~/stores/main';
import { cardThemeOverrides, getRequestUrl } from '~/utils';
import ListSkeleton from '~/components/ListSkeleton.vue';
import ListLoaded from '~/components/ListLoaded.vue';
import useApiStore from '~/stores/api';
import { PlainDirectoryMap } from '~/types/shared';
import SlideXTransition from '~/components/transitions/SlideXTransition.vue';

const mainStore = useMainStore();
const apiStore = useApiStore();

const pathNavigatorComponent = ref<HTMLElement | null>(null);

const router = useRouter();

watchEffect(() => {
    apiStore.currentPath = decodeURIComponent(router.currentRoute.value.path);
});

useIntersectionObserver(pathNavigatorComponent, ([{ isIntersecting }]) => {
    mainStore.isBreadCrumbVisible = isIntersecting;
});

// async function initRequest() {
//     if (mainStore.isLoading) {
//         console.log('Sending request...');
//         const result = (await ky.get(getRequestUrl()).json()) as PlainDirectoryMap;
//         apiStore.resolveDirectoryMap(result);
//         mainStore.isLoading = false;
//     }
// }
//
// onBeforeMount(initRequest);
</script>
