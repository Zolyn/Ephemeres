<template>
    <div id="layout">
        <n-config-provider :theme="theme">
            <n-dialog-provider>
                <n-space vertical>
                    <n-layout position="absolute">
                        <n-layout-header id="nav" bordered>
                            <n-page-header>
                                <template #title>
                                    <n-button :theme-overrides="buttonThemeOverrides" text @click="goToHome"
                                        >Ephemeres</n-button
                                    >
                                    <n-divider id="nav-divider" vertical />
                                </template>
                                <template #subtitle>
                                    <slide-y-transition :enter-duration="0.5" reverse>
                                        <path-indicator v-show="!mainStore.isBreadCrumbVisible" />
                                    </slide-y-transition>
                                </template>
                                <template #extra>
                                    <div id="nav-end">
                                        <slide-y-transition :enter-duration="0.5" reverse>
                                            <path-edit v-show="!mainStore.isBreadCrumbVisible" />
                                        </slide-y-transition>
                                        <n-divider vertical />
                                        <n-button quaternary circle @click="changeTheme">
                                            <template #icon>
                                                <n-icon :component="themeIcon" />
                                            </template>
                                        </n-button>
                                    </div>
                                </template>
                            </n-page-header>
                        </n-layout-header>
                        <n-layout position="absolute" style="top: 64px" has-sider>
                            <n-layout-sider :collapsed-width="0" collapse-mode="transform" show-trigger="bar" bordered>
                                <n-menu :collapsed-width="0" :options="menuOptions"></n-menu>
                            </n-layout-sider>
                            <n-layout-content
                                ref="contentComponent"
                                :native-scrollbar="false"
                                class="layout-content"
                                content-style="min-height: calc(100vh - 63px); display: flex; flex-direction: column; padding: 64px 0;"
                            >
                                <router-view v-slot="{ Component, route }">
                                    <slide-x-transition :enter-duration="0.5">
                                        <component :is="Component" :key="route" />
                                    </slide-x-transition>
                                </router-view>
                                <n-back-top />
                            </n-layout-content>
                        </n-layout>
                    </n-layout>
                </n-space>
            </n-dialog-provider>
        </n-config-provider>
        <n-global-style />
    </div>
</template>
<script lang="ts" setup>
import { darkTheme, useOsTheme, ButtonProps } from 'naive-ui';
import { Moon, Sunny } from '@vicons/ionicons5';
import { START_LOCATION } from 'vue-router';
import { useEventListener } from '@vueuse/core';
import useMainStore from '~/stores/main';
import emitter from '~/eventbus';

interface ContentComponent {
    // eslint-disable-next-line no-unused-vars
    scrollTo: ((options: ScrollToOptions) => void) & ((x: number, y: number) => void);
    $refs: {
        scrollbarInstRef: {
            containerScrollTop: number;
        };
    };
}

type ButtonThemeOverrides = Partial<ButtonProps['themeOverrides']>;

const buttonThemeOverrides: ButtonThemeOverrides = {
    fontSizeMedium: '18px',
};

const mainStore = useMainStore();
const router = useRouter();

const theme = computed(() => (mainStore.theme === 'dark' ? darkTheme : null));
const themeIcon = computed(() => (mainStore.theme === 'dark' ? Moon : Sunny));
const contentComponent = ref<ContentComponent | null>(null);
// const scrollBarLight = {
//     bg: 'rgb(255, 255, 255)',
//     bar: 'rgba(0, 0, 0, 0.25)',
//     barHover: 'rgba(0, 0, 0, 0.4)',
// };
//
// const scrollBarDark = {
//     bg: 'rgb(24, 24, 28)',
//     bar: 'rgba(255, 255, 255, 0.2)',
//     barHover: 'rgba(255, 255, 255, 0.3)',
// };
//
// const scrollBarStyles = computed(() => (osTheme.value === 'light' ? scrollBarLight : scrollBarDark));

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

function goToHome() {
    router.push('/');
}

function changeTheme() {
    mainStore.theme = mainStore.theme === 'dark' ? 'light' : 'dark';
}

function scroll(options: ScrollToOptions): void {
    contentComponent.value!.scrollTo(options);
}

function savePositionFn(key: string): void {
    mainStore.savedPositionMap.set(key, {
        top: contentComponent.value!.$refs.scrollbarInstRef.containerScrollTop,
        behavior: 'smooth',
    });
}

emitter.on('savePosition', ({ from, position }) => {
    if (from !== START_LOCATION) {
        savePositionFn(`${position - 1}:${from.path}`);
        scroll({ top: 0, behavior: 'smooth' });
    } else {
        savePositionFn(`${position}:${from.path}`);
    }
});

emitter.on('saveAndRestorePosition', ({ to, from, position, forward }) => {
    // Determine which button the user press (Back or Forward)
    const offset = forward === from.path ? 1 : -1;
    const key = `${position}:${to.path}`;

    if (from !== START_LOCATION) {
        savePositionFn(`${position + offset}:${from.path}`);
        scroll(mainStore.savedPositionMap.get(key)!);
        mainStore.savedPositionMap.delete(key);
    }
    // page refresh
    else {
        scroll(mainStore.savedPositionMap.get(key)!);
        mainStore.savedPositionMap.delete(key);
    }
});

onMounted(() => {
    mainStore.theme = useOsTheme().value as string;

    const savedPosMapFromStorage = sessionStorage.getItem('saved-pos-map');

    if (savedPosMapFromStorage) {
        const parsedMap = JSON.parse(savedPosMapFromStorage);

        if (Array.isArray(parsedMap)) {
            mainStore.savedPositionMap = new Map(parsedMap);
        }
    }

    // Persist savedPositionMap
    mainStore.$subscribe((_, state) => {
        sessionStorage.setItem('saved-pos-map', JSON.stringify([...state.savedPositionMap]));
    });

    // Save position when page refreshed
    useEventListener(window, 'beforeunload', () => {
        // eslint-disable-next-line no-restricted-globals
        const { position } = history.state;
        const { path } = router.currentRoute.value;
        savePositionFn(`${position}:${path}`);
    });
});
</script>

<style>
#nav {
    display: grid;
    grid-template-rows: 63px;
    align-items: center;
    padding: 0 16px 0 20px;
}

#nav-divider {
    margin-left: 60px;
}

#nav-end {
    margin-right: 10px;
}

/*.layout-content > .n-layout-scroll-container::-webkit-scrollbar {*/
/*    width: 8px;*/
/*    background-color: v-bind(scrollBarStyles.bg);*/
/*}*/

/*.layout-content > .n-layout-scroll-container::-webkit-scrollbar-track {*/
/*    border-radius: 10px;*/
/*}*/

/*.layout-content > .n-layout-scroll-container::-webkit-scrollbar-thumb {*/
/*    border-radius: 10px;*/
/*    background-color: v-bind(scrollBarStyles.bar);*/
/*}*/

/*.layout-content > .n-layout-scroll-container::-webkit-scrollbar-thumb:hover {*/
/*    background-color: v-bind(scrollBarStyles.barHover);*/
/*}*/
</style>
