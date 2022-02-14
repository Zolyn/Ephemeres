<template>
    <n-space :theme-overrides="spaceThemeOverrides" class="path-edit" inline>
        <n-button quaternary circle @click="showModal = true">
            <template #icon>
                <n-icon :component="Edit16Filled" />
            </template>
        </n-button>
        <n-modal v-model:show="showModal" preset="dialog">
            <template #header>
                <n-text>路径编辑</n-text>
            </template>
            <n-form :model="formValue">
                <n-form-item label="路径" path="path">
                    <n-input v-model:value="formValue.path" />
                </n-form-item>
            </n-form>
            <template #action>
                <div>操作</div>
            </template>
        </n-modal>
    </n-space>
</template>

<script lang="ts" setup>
import { SpaceProps } from 'naive-ui';
import { Edit16Filled } from '@vicons/fluent';

type SpaceThemeOverrides = Partial<SpaceProps['themeOverrides']>;

const spaceThemeOverrides: SpaceThemeOverrides = {
    gapMedium: '0px 0px',
};

const formValue = ref({
    path: '',
});

const showModal = ref(false);
</script>

<style scoped></style>
