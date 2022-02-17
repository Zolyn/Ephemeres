import { Plugin, UserConfig } from 'vite';
import camelcase from 'camelcase';

interface ManualChunksCompletionOptions {
    dependencies: Record<string, string>;
    manualChunksExp: (string | string[])[];
}

export default function ManualChunksCompletionPlugin({
    dependencies,
    manualChunksExp,
}: ManualChunksCompletionOptions): Plugin {
    return {
        name: 'vite-plugin-manual-chunks-completion',
        config(): UserConfig {
            const depList = Object.keys(dependencies);
            const manualChunks: Record<string, string[]> = {};
            const matchedDeps: string[] = [];

            manualChunksExp.forEach((exp) => {
                let key: string;
                let startStr: string;

                if (Array.isArray(exp)) {
                    [startStr, key] = exp;
                } else {
                    key = camelcase(exp.startsWith('@') ? exp.slice(1) : exp);
                    startStr = exp;
                }

                const matched = depList.filter((dep) => dep.startsWith(startStr));

                matchedDeps.push(...matched);
                manualChunks[key] = matched;
            });

            manualChunks.vendor = depList.filter((dep) => !matchedDeps.includes(dep));

            return {
                build: {
                    rollupOptions: {
                        output: {
                            manualChunks,
                        },
                    },
                },
            };
        },
    };
}
