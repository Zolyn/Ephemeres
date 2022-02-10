<template>
    <n-breadcrumb>
        <n-breadcrumb-item>
            <n-button type="primary" size="small" secondary round @click="$router.push('/error')">Home</n-button>
        </n-breadcrumb-item>
        <n-breadcrumb-item>
            <n-button size="small" secondary round>Test</n-button>
        </n-breadcrumb-item>
    </n-breadcrumb>
</template>

<script>
export default {
    name: 'PathIndicator',
};
</script>

<style scoped></style>
