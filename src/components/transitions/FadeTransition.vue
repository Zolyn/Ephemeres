<template>
    <transition name="fade" mode="out-in" @before-enter="beforeEnter">
        <slot />
    </transition>
</template>

<script lang="ts" setup>
interface TransitionProps {
    enterDuration?: number;
    leaveDuration?: number;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { enterDuration = 0.3, leaveDuration = 0.3 } = defineProps<TransitionProps>();

function beforeEnter(el: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    el.style.transformOrigin = 'top center 0';
}
</script>

<style scoped>
.fade-enter-active {
    transition: v-bind(enterDuration + 's') cubic-bezier(0.25, 0.8, 0.5, 1);
}

.fade-leave-active {
    transition: v-bind(leaveDuration + 's') cubic-bezier(0.25, 0.8, 0.5, 1);
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
