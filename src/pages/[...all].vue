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
                        <slide-x-transition>
                            <n-list :theme-overrides="listThemeOverrides" bordered>
                                <n-list-item v-for="i in 20" class="list-item" @click="$router.push(`/${i}`)">
                                    <n-thing>
                                        <template #header>
                                            <n-text>File</n-text>
                                        </template>
                                        <template #description>
                                            <n-text>1KB / 2077-1-2 8:00</n-text>
                                        </template>
                                    </n-thing>
                                </n-list-item>
                            </n-list>
                        </slide-x-transition>
                    </n-card>
                </n-grid-item>
            </n-grid>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { CardProps, ListProps } from 'naive-ui';
import { useIntersectionObserver } from '@vueuse/core';
import useMainStore from '~/stores/main';
import PathIndicator from '~/components/PathIndicator.vue';
import SlideXTransition from '~/components/transitions/SlideXTransition.vue';

type CardThemeOverrides = Partial<CardProps['themeOverrides']>;

type ListThemeOverrides = Partial<ListProps['themeOverrides']>;

const mainStore = useMainStore();

const borderRadius = '16px';

const bgColorHover = computed(() => (mainStore.theme === 'light' ? 'rgba(246, 246, 246, 1)' : 'rgba(38, 38, 42, 1)'));

const cardThemeOverrides: CardThemeOverrides = {
    borderRadius,
};

const listThemeOverrides: ListThemeOverrides = {
    borderRadius,
};

const pathIndicatorComponent = ref<HTMLElement | null>(null);

useIntersectionObserver(pathIndicatorComponent, ([{ isIntersecting }]) => {
    mainStore.isBreadCrumbVisible = isIntersecting;
});
</script>

<style scoped>
#page .list-item {
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

#page .list-item:first-child {
    border-radius: v-bind(borderRadius) v-bind(borderRadius) 0 0;
}

#page .list-item:last-child {
    border-radius: 0 0 v-bind(borderRadius) v-bind(borderRadius);
}

#page .list-item:hover {
    background-color: v-bind(bgColorHover);
}
</style>
