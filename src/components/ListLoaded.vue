<template>
    <n-list class="list-loaded" :theme-overrides="listThemeOverrides" bordered>
        <n-list-item
            v-for="fileMeta in apiStore.currentFileMetaList"
            :key="fileMeta.id"
            :class="[itemClass, isSingleItem ? singleItemClass : '']"
            @click="updateCurrentFileMetaList(fileMeta.pathname)"
        >
            <n-thing>
                <template #header>
                    <n-text>{{ fileMeta.pathname }}</n-text>
                </template>
                <template #header-extra>
                    <n-button-group size="small">
                        <n-button round>
                            <template #icon>
                                <n-icon :component="Copy16Regular" />
                            </template>
                        </n-button>
                        <n-button v-if="!fileMeta.isDir" round>
                            <n-icon :component="ArrowDownload16Regular" />
                        </n-button>
                    </n-button-group>
                </template>
                <template #description>
                    <n-text>{{
                        `${fileMeta.transformedSize === '0 B' ? '' : `${fileMeta.transformedSize} / `}${
                            fileMeta.transformedTime
                        }`
                    }}</n-text>
                </template>
            </n-thing>
        </n-list-item>
    </n-list>
</template>

<script lang="ts" setup>
import { resolve } from 'path-browserify';
import { Copy16Regular, ArrowDownload16Regular } from '@vicons/fluent';
import useMainStore from '~/stores/main';
import { borderRadius, listThemeOverrides } from '~/utils';
import useApiStore from '~/stores/api';

const mainStore = useMainStore();
const apiStore = useApiStore();

const router = useRouter();

const itemClass = ref('list-loaded__item');
const singleItemClass = ref('list-loaded__item--single');
const isSingleItem = computed(() => apiStore.currentFileMetaList.length === 1);

const bgColorHover = computed(() => (mainStore.theme === 'light' ? 'rgba(246, 246, 246, 1)' : 'rgba(38, 38, 42, 1)'));

function updateCurrentFileMetaList(path: string): void {
    const fullPath = resolve(apiStore.currentPath, path);
    router.push(fullPath);
}
</script>

<style scoped>
#page .list-loaded__item {
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
}

#page .list-loaded__item:first-child {
    border-radius: v-bind(borderRadius) v-bind(borderRadius) 0 0;
}

#page .list-loaded__item:last-child {
    border-radius: 0 0 v-bind(borderRadius) v-bind(borderRadius);
}

#page .list-loaded__item:hover {
    background-color: v-bind(bgColorHover);
}

#page .list-loaded__item.list-loaded__item--single {
    border-radius: v-bind(borderRadius);
}
</style>
