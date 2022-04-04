import AutoImport from 'unplugin-auto-import/vite';

export default AutoImport({
    dts: true,
    include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
    // NOTE: Temporarily ignore some Vue imports to prevent duplicate imports
    // e.g.:
    // import { defineComponent } 'vue'; <-- unplugin-auto-import
    // import { defineComponent as _defineComponent } from 'vue'; <-- @vitejs/vue
    //
    // Though it is not a critical issue, it shows that the plugin has problems with character matching
    // You should manually import these APIs if you want to use them
    ignore: ['defineComponent', 'resolveComponent', 'useCssVars', 'unref'],
    imports: ['vue', 'vue-router', 'pinia', '@vueuse/head', '@vueuse/core'],
    eslintrc: {
        enabled: true,
        globalsPropValue: 'readonly',
    },
});
