<template>
    <base-transition name="slide-x" :mode="mode" :appear="appear">
        <slot />
    </base-transition>
</template>

<script lang="ts" setup>
import type { SlideTransitionProps } from '~/types';

const {
    mode,
    appear,
    offset = 16,
    reverse = false,
    enterDuration = 0.3,
    leaveDuration = 0.3,
} = defineProps<SlideTransitionProps>();

const xOffset = computed(() => (reverse ? -offset : offset));
</script>

<style scoped>
.slide-x-enter-active {
    transition: v-bind(enterDuration + 's');
}

.slide-x-leave-active {
    transition: v-bind(leaveDuration + 's');
}

.slide-x-enter-from,
.slide-x-leave-to {
    opacity: 0;
    transform: translateX(v-bind(xOffset + 'px'));
}
</style>
