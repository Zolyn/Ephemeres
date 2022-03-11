<template>
    <transition :name="name" :mode="mode" :appear="appear">
        <slot />
    </transition>
</template>

<script lang="ts" setup>
import { BaseTransitionProps } from '~/types';

interface _BaseTransitionProps extends BaseTransitionProps {
    name: string;
}

const { name, mode = 'out-in', appear = false } = defineProps<_BaseTransitionProps>();
</script>

<style scoped></style>
