import UnoCSS from 'unocss/vite';
import TransformerDirectives from '@unocss/transformer-directives';
import TransformerVariantGroup from '@unocss/transformer-variant-group';
import PresetWind from '@unocss/preset-wind';
import PresetAttributify from '@unocss/preset-attributify';

export default UnoCSS({
    shortcuts: {
        'flex-center': 'flex items-center',
    },
    transformers: [TransformerDirectives(), TransformerVariantGroup()],
    presets: [PresetWind(), PresetAttributify()],
});
