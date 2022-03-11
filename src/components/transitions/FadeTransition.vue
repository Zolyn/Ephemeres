<template>
    <base-transition name="fade" :mode="mode" :appear="appear">
        <slot />
    </base-transition>
</template>

<script lang="ts" setup>
import type { CommonTransitionProps } from '~/types';

const { enterDuration = 0.3, leaveDuration = 0.3, mode, appear } = defineProps<CommonTransitionProps>();
</script>

<style scoped>
.fade-enter-active {
    transition: opacity v-bind(enterDuration + 's') ease-in-out;
}

.fade-leave-active {
    transition: opacity v-bind(leaveDuration + 's') ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
