<template>
    <div id="page" :theme="osTheme">
        <n-space vertical>
            <n-grid :cols="7">
                <n-grid-item :span="5" :offset="1">
                    <n-card :theme-overrides="cardThemeOverrides" hoverable>
                        <template #header>
                            <n-breadcrumb class="breadcrumb-nav">
                                <n-breadcrumb-item>
                                    <n-button type="primary" size="small" secondary round>Home</n-button>
                                </n-breadcrumb-item>
                                <n-breadcrumb-item>
                                    <n-button size="small" secondary round>Test</n-button>
                                </n-breadcrumb-item>
                            </n-breadcrumb>
                        </template>
                        <n-list :theme-overrides="listThemeOverrides" bordered>
                            <n-list-item v-for="i in 20" class="list-item">
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
                    </n-card>
                </n-grid-item>
            </n-grid>
        </n-space>
    </div>
</template>

<script lang="ts" setup>
import { CardProps, ListProps, useOsTheme } from 'naive-ui';

type CardThemeOverrides = Partial<CardProps['themeOverrides']>;

type ListThemeOverrides = Partial<ListProps['themeOverrides']>;

const osTheme = useOsTheme();

const borderRadius = '16px';

const bgColorHover = computed(() => (osTheme.value === 'light' ? 'rgba(246, 246, 246, 1)' : 'rgba(38, 38, 42, 1)'));

const cardThemeOverrides: CardThemeOverrides = {
    borderRadius,
};

const listThemeOverrides: ListThemeOverrides = {
    borderRadius,
};

// const isBreadCombVisible = ref(true);
// onMounted(() => {
//     console.log(new Date().getTime());
//     const container = document.getElementsByClassName('breadcrumb-nav')[0];
//     const observer = new IntersectionObserver((entries) => {
//         entries.map((entry) => {
//             isBreadCombVisible.value = entry.isIntersecting;
//             console.log(entry.time);
//         });
//     });
//     setTimeout(() => {
//         observer.observe(container);
//     }, 2000);
// });
</script>

<style scoped>
#page .list-item {
    transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
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
