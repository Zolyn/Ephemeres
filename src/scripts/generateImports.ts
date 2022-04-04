import fg from 'fast-glob';
import { parse } from 'path';
import camelcase from 'camelcase';

type Extension = '.js' | '.ts';

interface GenerateResult {
    result: string;
    fileList: string[];
}

// Generate import statements from the files in the specific directory (must be absolute path, and it is not recursive)
function generateImportStatements(path: string, extensions: Extension[] = ['.ts'], pascalCase = true): GenerateResult {
    let result: string = '';

    const searchPaths = extensions.map((ext) => [`${path}/*${ext}`, `!${path}/index${ext}`]).flat();

    const fileList = fg.sync(searchPaths);

    fileList.forEach((filePath) => {
        const { name } = parse(filePath);
        result += `import ${camelcase(name, { pascalCase })} from './${name}';\n`;
    });

    return {
        result,
        fileList,
    };
}

export { generateImportStatements };
export type { Extension };
