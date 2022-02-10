// https://github.com/vitejs/vite/blob/main/packages/playground/ssr-vue/prerender.js
// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.

import * as fs from 'fs';
import * as path from 'path';
import P from '@antfu/p';
import fg from 'fast-glob';
import { minify } from 'html-minifier';

async function prerender() {
    const toAbsolute = (p: string) => path.resolve(__dirname, '../', p);

    const manifest = JSON.parse(fs.readFileSync(toAbsolute('./dist/static/ssr-manifest.json'), 'utf-8'));

    const template = fs.readFileSync(toAbsolute('./dist/static/index.html'), 'utf-8');

    const render: typeof import('../src/entry-server').render = await import(
        toAbsolute('./dist/server/entry-server.js')
    ).then((serverEntry) => serverEntry.render);

    // determine routes to pre-render from src/pages
    const pageFiles = await fg('**/*.vue', { cwd: toAbsolute('./src/pages') });
    const routesMap = new Map<string, string>();
    pageFiles.map((file) => {
        const pageInfo = path.parse(file);

        pageInfo.dir = pageInfo.dir.replace('[', '').replace(']', '');

        let route = `/${pageInfo.dir}`;

        // Dynamic routing (also requires url rewrites on server side)
        if (pageInfo.name.startsWith('[') && pageInfo.name.endsWith(']')) {
            pageInfo.name = `d-${pageInfo.name.slice(1, pageInfo.name.length - 1).replace('...', '')}`;
        }
        // Static routing
        else if (pageInfo.name !== 'index') {
            route = path.resolve(`/${pageInfo.dir}/${pageInfo.name}`);
        }

        const filePath = path.resolve(`/${pageInfo.dir}/${pageInfo.name}.html`);

        if (routesMap.has(route)) {
            console.log(`[Prerender] Info: Skipping duplicate pages:\n${routesMap.get(route)}\n${filePath}\n`);
        } else {
            routesMap.set(route, filePath);
        }
    });
    console.log(routesMap);

    // pre-render each route...
    await P([...routesMap]).map(async (arr) => {
        const filePath = `./dist/static${arr[1]}`;
        const { appHtml, cssHtml, preloadLinks, renderedHead } = await render(arr[0], manifest);

        const html = template
            .replace(`<!--preload-links-->`, preloadLinks)
            .replace(`<!--head-meta-->`, renderedHead.headTags)
            .replace(`<!--css-html-->`, cssHtml)
            .replace(`<!--app-html-->`, appHtml)
            .replace(`<html>`, `<html${renderedHead.htmlAttrs}>`)
            .replace(`<body>`, `<body${renderedHead.bodyAttrs}>`);

        fs.writeFileSync(
            toAbsolute(filePath),
            minify(html, {
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                collapseWhitespace: true,
                minifyCSS: true,
                minifyJS: true,
                sortAttributes: true,
                sortClassName: true,
                useShortDoctype: true,
            }),
        );
        console.log('pre-rendered:', filePath);
    });

    // done, delete ssr manifest
    fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'));
}

prerender().catch((err) => console.error(err));

export default prerender();
