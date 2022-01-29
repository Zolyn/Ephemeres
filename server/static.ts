import express from 'express';
import compression from 'compression';
import serveStatic from 'serve-static';
import { resolve as _resolve } from 'path';

const resolve = (p: string) => _resolve(__dirname, '../', p);

const app = express();

app.use(compression());
app.use(serveStatic(resolve('./dist/static'), { index: false }));
app.use('*', (_, res) => {
    console.log(_.params);
    res.sendFile(resolve('./dist/static/index.html'));
});

app.listen(3000, () => {
    console.log('Server listening on http://localhost:3000');
});
