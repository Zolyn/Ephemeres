<template>
    <n-config-provider :theme="theme">
        <n-dialog-provider>
            <n-space vertical>
                <n-layout position="absolute">
                    <n-layout-header class="nav" bordered>
                        <n-page-header>
                            <template #title>
                                <n-text>Ephemeres</n-text>
                            </template>
                        </n-page-header>
                    </n-layout-header>
                    <n-layout position="absolute" style="top: 64px" has-sider>
                        <n-layout-sider
                            :native-scrollbar="false"
                            :collapsed-width="0"
                            collapse-mode="transform"
                            show-trigger="bar"
                            bordered
                        >
                            <n-menu :collapsed-width="0" :options="menuOptions"></n-menu>
                        </n-layout-sider>
                        <n-layout-content
                            :native-scrollbar="scroll"
                            content-style="min-height: calc(100vh - 63px); display: flex; flex-direction: column; padding: 64px 0;"
                        >
                            <slot />
                            <n-back-top />
                        </n-layout-content>
                    </n-layout>
                </n-layout>
            </n-space>
        </n-dialog-provider>
        <n-global-style />
    </n-config-provider>
</template>
<script lang="ts" setup>
import { useOsTheme, darkTheme } from 'naive-ui';

const osTheme = useOsTheme();

const menuOptions = [
    {
        label: '且听风吟',
        key: 'hear-the-wind-sing',
    },
    {
        label: '1973年的弹珠玩具',
        key: 'pinball-1973',
        disabled: true,
        children: [
            {
                label: '鼠',
                key: 'rat',
            },
        ],
    },
    {
        label: '寻羊冒险记',
        key: 'a-wild-sheep-chase',
        disabled: true,
    },
    {
        label: '舞，舞，舞',
        key: 'dance-dance-dance',
        children: [
            {
                type: 'group',
                label: '人物',
                key: 'people',
                children: [
                    {
                        label: '叙事者',
                        key: 'narrator',
                    },
                    {
                        label: '羊男',
                        key: 'sheep-man',
                    },
                ],
            },
            {
                label: '饮品',
                key: 'beverage',
                children: [
                    {
                        label: '威士忌',
                        key: 'whisky',
                    },
                ],
            },
            {
                label: '食物',
                key: 'food',
                children: [
                    {
                        label: '三明治',
                        key: 'sandwich',
                    },
                ],
            },
            {
                label: '过去增多，未来减少',
                key: 'the-past-increases-the-future-recedes',
            },
        ],
    },
];

const theme = computed(() => {
    return osTheme.value === 'light' ? null : darkTheme;
});

const scroll = ref(true);

// onMounted(() => {
//     scroll.value = false;
// });
</script>

<style>
.nav {
    display: grid;
    grid-template-rows: 63px;
    align-items: center;
    padding: 0 16px;
}
</style>
