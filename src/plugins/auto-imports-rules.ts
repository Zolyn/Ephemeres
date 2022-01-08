import { Plugin } from 'vite';
import { format } from 'prettier';
import { resolve } from 'path';
import { readFileSync, writeFileSync } from 'fs';

interface EslintRules {
    globals: {
        [k: string]: 'readonly';
    };
}

export default function AutoImportsRulesPlugin(): Plugin {
    const autoImportsDeclaration = resolve(__dirname, '../../auto-imports.d.ts');
    const rules = resolve(__dirname, '../../auto-imports.json');

    async function sleep(time: number): Promise<void> {
        return new Promise((resolvePromise) => {
            setTimeout(() => resolvePromise(), time);
        });
    }

    return {
        name: 'vite-plugin-auto-imports-rules',

        async configResolved() {
            if (process.env.EPHEMERES_SERVER) {
                return;
            }

            let times = 0;
            let declarationsFile = '';
            while (times < 3) {
                console.log('Time:', times + 1);
                declarationsFile = readFileSync(autoImportsDeclaration, { encoding: 'utf-8' });

                if (declarationsFile) {
                    break;
                }

                times += 1;
                // eslint-disable-next-line no-await-in-loop
                await sleep(2000);
            }

            const declarations = declarationsFile
                .split('{')[1]
                .split('}')[0]
                .trim()
                .split('\n')
                .map((statments): string => {
                    return statments.trim().split(':')[0].split(' ')[1];
                });

            console.log(declarations);

            const eslintRules: EslintRules = { globals: {} };

            declarations.map((key) => {
                eslintRules.globals[key] = 'readonly';
            });

            writeFileSync(rules, format(JSON.stringify(eslintRules), { parser: 'json-stringify' }));
            console.log('[Auto-imports-rules] Rules are generated.');
        },
    };
}
