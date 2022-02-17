<template>
    <n-list :theme-overrides="listThemeOverrides" bordered>
        <n-list-item v-for="item in 20" :key="item">
            <n-thing>
                <template #header>
                    <n-text>FILE</n-text>
                </template>
                <template #header-extra>
                    <n-button circle>Hi</n-button>
                </template>
                <template #description>
                    <n-text>DES</n-text>
                </template>
            </n-thing>
        </n-list-item>
    </n-list>
</template>

<script lang="ts" setup>
import useMainStore from '~/stores/main';
import { borderRadius, listThemeOverrides } from '~/utils';

const mainStore = useMainStore();

const bgColorHover = computed(() => (mainStore.theme === 'light' ? 'rgba(246, 246, 246, 1)' : 'rgba(38, 38, 42, 1)'));
</script>

<style scoped>
#page .list-loaded_item {
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

#page .list-loaded_item:first-child {
    border-radius: v-bind(borderRadius) v-bind(borderRadius) 0 0;
}

#page .list-loaded_item:last-child {
    border-radius: 0 0 v-bind(borderRadius) v-bind(borderRadius);
}

#page .list-loaded_item:hover {
    background-color: v-bind(bgColorHover);
}
</style>
