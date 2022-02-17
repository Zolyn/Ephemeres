<template>
    <n-list :theme-overrides="listThemeOverrides" bordered>
        <n-list-item v-for="item in skeletonItems" :key="item.id">
            <n-thing>
                <template #header>
                    <n-skeleton text width="100px" :sharp="false" />
                </template>
                <template #header-extra>
                    <n-skeleton circle size="small" />
                </template>
                <template #description>
                    <n-skeleton text width="180px" :sharp="false" />
                </template>
            </n-thing>
        </n-list-item>
    </n-list>
</template>

<script lang="ts" setup>
import { listThemeOverrides, skeletonItems } from '~/utils';
</script>

<style scoped></style>
