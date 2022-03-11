<template>
    <base-transition name="slide-y" :mode="mode" :appear="appear">
        <slot />
    </base-transition>
</template>

<script lang="ts" setup>
import { SlideTransitionProps } from '~/types';

const {
    mode,
    appear,
    offset = 16,
    reverse = false,
    enterDuration = 0.3,
    leaveDuration = 0.3,
} = defineProps<SlideTransitionProps>();

const yOffset = computed(() => (reverse ? -offset : offset));
</script>

<style scoped>
.slide-y-enter-active {
    transition: v-bind(enterDuration + 's');
}

.slide-y-leave-active {
    transition: v-bind(leaveDuration + 's');
}

.slide-y-enter-from,
.slide-y-leave-to {
    opacity: 0;
    transform: translateY(v-bind(yOffset + 'px'));
}
</style>
