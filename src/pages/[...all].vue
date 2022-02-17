<template>
    <div id="page">
        <n-space vertical>
            <n-grid :cols="7">
                <n-grid-item :span="5" :offset="1">
                    <n-card :theme-overrides="cardThemeOverrides" hoverable>
                        <template #header>
                            <div ref="pathIndicatorComponent">
                                <path-indicator />
                            </div>
                        </template>
                        <template #header-extra>
                            <path-edit />
                        </template>
                        <slide-x-transition :enter-duration="0.5">
                            <component :is="loading ? ListSkeleton : ListLoaded" />
                        </slide-x-transition>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { useIntersectionObserver } from '@vueuse/core';
import useMainStore from '~/stores/main';
import { cardThemeOverrides } from '~/utils';
import ListSkeleton from '~/components/ListSkeleton.vue';
import ListLoaded from '~/components/ListLoaded.vue';

const mainStore = useMainStore();

const pathIndicatorComponent = ref<HTMLElement | null>(null);
const loading = ref(true);

useIntersectionObserver(pathIndicatorComponent, ([{ isIntersecting }]) => {
    mainStore.isBreadCrumbVisible = isIntersecting;
});

onMounted(() => {
    setTimeout(() => {
        loading.value = false;
    }, 3000);
});
</script>

<style scoped></style>
