<template>
    <div id="layout">
        <n-config-provider :theme="theme">
            <n-dialog-provider>
                <n-layout position="absolute">
                    <n-layout-header class="h-64px" bordered>
                        <div id="layout-header" class="flex-center py-4 px-6 justify-between">
                            <div id="layout-header-front" class="flex w-3/5 gap-x-3">
                                <div
                                    id="layout-header-front__title"
                                    :class="[mainStore.isBreadCrumbVisible ? 'flex' : 'hidden md:flex']"
                                >
                                    <n-button
                                        :disabled="mainStore.isLoading"
                                        :theme-overrides="buttonThemeOverrides"
                                        text
                                        @click="goToHome"
                                        >Ephemeres</n-button
                                    >
                                </div>
                                <fade-transition :enter-duration="0.5">
                                    <divider v-show="!mainStore.isBreadCrumbVisible" />
                                </fade-transition>
                                <div id="layout-header-front__path-navigator" class="w-full">
                                    <slide-y-transition :enter-duration="0.5" reverse> </slide-y-transition>
                                </div>
                            </div>
                            <div id="layout-header-end" class="flex-center">
                                <slide-y-transition :enter-duration="0.5" reverse>
                                    <path-edit v-show="!mainStore.isBreadCrumbVisible" />
                                </slide-y-transition>
                                <fade-transition :enter-duration="0.5">
                                    <divider v-show="!mainStore.isBreadCrumbVisible" />
                                </fade-transition>
                                <n-button quaternary circle @click="changeTheme">
                                    <template #icon>
                                        <n-icon :component="themeIcon" />
                                    </template>
                                </n-button>
                            </div>
                        </div>
                    </n-layout-header>
                    <n-layout-content
                        id="layout-content"
                        ref="layoutContentInst"
                        class="!top-64px !bottom-40px"
                        position="absolute"
                        content-style="padding-top: 3.5rem; padding-bottom: 2rem;"
                        :native-scrollbar="false"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                    >
                        <router-view v-slot="{ Component, route }">
                            <slide-x-transition :enter-duration="0.5">
                                <component :is="Component" :key="route" />
                            </slide-x-transition>
                        </router-view>
                        <n-back-top id="back-to-top" :bottom="60" />
                    </n-layout-content>
                    <n-layout-footer id="layout-footer" position="absolute" class="h-40px" bordered></n-layout-footer>
                </n-layout>
            </n-dialog-provider>
            <n-global-style />
        </n-config-provider>
    </div>
</template>

<script lang="ts" setup>
import { Moon, Sunny } from '@vicons/ionicons5';
import { ButtonProps, darkTheme, useOsTheme } from 'naive-ui';
import { clickoutside as vClickOutside } from 'vdirs';
import { START_LOCATION } from 'vue-router';
import emitter from '~/eventbus';
import useMainStore from '~/stores/main';
import { debounceFn, useIsMobile } from '~/utils';

interface ScrollBarInst {
    containerScrollTop: number;
    isShowYBar: boolean;
}

interface LayoutContentInst {
    scrollTo: ((options: ScrollToOptions) => void) & ((x: number, y: number) => void);
    $refs: {
        scrollbarInstRef: ScrollBarInst;
    };
}

type ButtonThemeOverrides = Partial<ButtonProps['themeOverrides']>;

const buttonThemeOverrides: ButtonThemeOverrides = {
    fontSizeMedium: '18px',
};

const isMobile = useIsMobile();

const mainStore = useMainStore();
const router = useRouter();

const theme = computed(() => (mainStore.theme === 'dark' ? darkTheme : null));
const themeIcon = computed(() => (mainStore.theme === 'dark' ? Moon : Sunny));

let scrollBarEl: HTMLDivElement | null;
const scrollBarWidth = computed(() => (isMobile.value ? '3px' : '5px'));
const layoutContentInst = ref<LayoutContentInst | null>(null);
const scrollBarInst = computed<ScrollBarInst | null>(() =>
    layoutContentInst.value ? layoutContentInst.value.$refs.scrollbarInstRef : null,
);
// const isScrollbarVisible = computed(() => (scrollBarInst.value ? scrollBarInst.value.isShowYBar : false));

function emulateMouseEnter() {
    const event = new Event('mouseenter');
    scrollBarEl!.dispatchEvent(event);
}

function emulateMouseLeave() {
    console.log('leave');
    const event = new Event('mouseleave');
    scrollBarEl!.dispatchEvent(event);
}

const debouncedEmulateMouseEnter = debounceFn(emulateMouseEnter, 100, true);
const debouncedEmulateMouseLeave = debounceFn(emulateMouseLeave, 1000);

function goToHome() {
    router.push('/');
}

function changeTheme() {
    mainStore.theme = mainStore.theme === 'dark' ? 'light' : 'dark';
}

// Emulate mouseenter Event to make Naive-UI style scrollbar visible when scrolling content in mobile
function handleTouchStart() {
    if (isMobile.value) {
        debouncedEmulateMouseEnter();
    }
}

function handleTouchEnd() {
    console.log('touchend');
    if (isMobile.value) {
        debouncedEmulateMouseLeave();
    }
}

// Emulate mouseleave Event to make Naive-UI style scrollbar invisible when clicking outside content in mobile
// function handleClickOutside(e: Event) {
//     console.log(e);
//     const elements = e.composedPath() as Element[];
//     const id = elements[0].id || elements[1].id;
//
//     if (isMobile.value) {
//         // If the element is not NBackTop, make the scrollbar invisible
//         if (id !== 'back-to-top') {
//             debouncedEmulateMouseLeave();
//         }
//         // If the element is NBackTop but the scrollbar is invisible, make it visible
//         else if (!isScrollbarVisible.value) {
//             debouncedEmulateMouseEnter();
//         }
//     }
// }

function scroll(options: ScrollToOptions): void {
    layoutContentInst.value!.scrollTo(options);
}

function savePositionFn(key: string): void {
    mainStore.savedPositionMap.set(key, {
        top: scrollBarInst.value!.containerScrollTop,
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
    // Determine which button the user pressed (Back or Forward)
    const offset = forward === from.path ? 1 : -1;
    const key = `${position}:${to.path}`;
    const savedPos = mainStore.savedPositionMap.get(key);

    // Page not refresh
    if (from !== START_LOCATION) {
        savePositionFn(`${position + offset}:${from.path}`);
    }

    // Scroll to saved position if it exists
    if (savedPos) {
        scroll(savedPos);
        mainStore.savedPositionMap.delete(key);
    }
});

function initLayout() {
    mainStore.theme = useOsTheme().value as string;

    scrollBarEl = document.querySelector('#layout-content .n-scrollbar');

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
#layout-content .n-scrollbar-rail {
    --n-scrollbar-width: v-bind(scrollBarWidth);
}
</style>
