<template>
    <div class="path-edit">
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
    </div>
</template>

<script lang="ts" setup>
import { Edit16Filled } from '@vicons/fluent';

const formValue = ref({
    path: '',
});

const showModal = ref(false);
</script>

<style scoped>
.path-edit {
    display: inline-block;
}
</style>
