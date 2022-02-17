<template>
    <div class="path-indicator">
        <n-breadcrumb>
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.id">
                <n-button
                    :type="item.disabled ? 'default' : 'primary'"
                    :disabled="item.disabled"
                    size="small"
                    secondary
                    round
                    >{{ item.text }}</n-button
                >
            </n-breadcrumb-item>
        </n-breadcrumb>
    </div>
</template>

<script lang="ts" setup>
import { join } from 'path-browserify';
import { nanoid } from 'nanoid';
import { BreadCrumbList } from '~/types';

const router = useRouter();
const breadcrumbs = computed<BreadCrumbList>(() => {
    const { path } = router.currentRoute.value;
    const breadCrumbList: BreadCrumbList = [
        {
            id: nanoid(),
            text: 'Home',
            disabled: false,
            href: '/',
        },
    ];

    const pathClip = path.split('/');
    // Remove empty value
    pathClip.shift();

    // For non-root path
    if (pathClip[0]) {
        pathClip.reduce((prev, val) => {
            const mergedVal = join(prev, val);

            breadCrumbList.push({
                id: nanoid(),
                text: val,
                disabled: false,
                href: mergedVal,
            });

            return mergedVal;
        }, '/');
    }

    breadCrumbList[breadCrumbList.length - 1].disabled = true;

    return breadCrumbList;
});
</script>
