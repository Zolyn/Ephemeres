<template>
    <div id="layout">
        <n-config-provider :theme="theme">
            <n-dialog-provider>
                <n-layout position="absolute">
                    <n-layout-header id="nav" bordered>
                        <div id="nav__title">
                            <n-button
                                :disabled="mainStore.isLoading"
                                :theme-overrides="buttonThemeOverrides"
                                text
                                @click="goToHome"
                                >Ephemeres</n-button
                            >
                            <n-icon size="16" :component="DividerTall16Filled" />
                        </div>
                        <div id="nav-center">
                            <div id="nav-center__path-navigator">
                                <slide-y-transition :enter-duration="0.5" reverse> </slide-y-transition>
                            </div>
                            <div id="nav-center__path-edit">
                                <slide-y-transition :enter-duration="0.5" reverse>
                                    <path-edit v-show="!mainStore.isBreadCrumbVisible" />
                                </slide-y-transition>
                            </div>
                        </div>
                        <div id="nav__theme-switch">
                            <n-button quaternary circle @click="changeTheme">
                                <template #icon>
                                    <n-icon :component="themeIcon" />
                                </template>
                            </n-button>
                        </div>
                    </n-layout-header>
                    <n-layout position="absolute" style="top: 64px" has-sider>
                        <n-layout-sider :collapsed-width="0" collapse-mode="transform" show-trigger="bar" bordered>
                            <n-text>Coming soon...</n-text>
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
            </n-dialog-provider>
        </n-config-provider>
        <n-global-style />
    </div>
</template>
<script lang="ts" setup>
import { darkTheme, useOsTheme, ButtonProps } from 'naive-ui';
import { DividerTall16Filled } from '@vicons/fluent';
import { Moon, Sunny } from '@vicons/ionicons5';
import { START_LOCATION } from 'vue-router';
import { useEventListener } from '@vueuse/core';
import useMainStore from '~/stores/main';
import emitter from '~/eventbus';

interface ContentComponent {
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
    const savedPos = mainStore.savedPositionMap.get(key);

    // Page not refresh
    if (from !== START_LOCATION) {
        savePositionFn(`${position + offset}:${from.path}`);
    }

    // Scroll to saved position if it exists
    if (savedPos) {
        scroll(mainStore.savedPositionMap.get(key)!);
        mainStore.savedPositionMap.delete(key);
    }
});

function initLayout() {
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
}

onMounted(initLayout);
</script>

<style>
#nav {
    display: grid;
    grid-template-rows: 63px;
    grid-template-columns: 140px auto 48px;
    align-items: center;
    padding: 0 16px 0 20px;
}

#nav__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#nav-center {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

#nav-center__path-navigator {
    width: 50%;
}

#nav__theme-switch {
    justify-self: center;
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
