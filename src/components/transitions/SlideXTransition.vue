<template>
    <transition name="slide-x" mode="out-in" @before-enter="beforeEnter">
        <slot />
    </transition>
</template>

<script lang="ts" setup>
interface TransitionProps {
    enterDuration?: number;
    leaveDuration?: number;
    reverse?: boolean;
}

// eslint-disable-next-line vue/no-setup-props-destructure
const { reverse = false, enterDuration = 0.3, leaveDuration = 0.3 } = defineProps<TransitionProps>();

const xPos = computed(() => (reverse ? '16px' : '-16px'));

function beforeEnter(el: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    el.style.transformOrigin = 'top center 0';
}
</script>

<style scoped>
.slide-x-enter-active {
    transition: v-bind(enterDuration + 's') cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-x-leave-active {
    transition: v-bind(leaveDuration + 's') cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-x-enter-from,
.slide-x-leave-to {
    opacity: 0;
    transform: translateX(v-bind(xPos));
}
</style>
