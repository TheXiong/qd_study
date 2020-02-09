const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();

// const bundle = fs.readFileSync(path.resolve(__dirname, '../dist/server.bundle.js'), 'utf-8');
const renderer = require('vue-server-renderer').createRenderer( {
  template: fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')
});

const createApp = require('../dist/server.bundle.js').default

// 后端Server
backendRouter.get('*', (ctx, next) => {
  // 这里用 renderToString 的 promise 返回的 html 有问题，没有样式
  const context = { url: ctx.url }
  createApp(context).then(app => {
    renderer.renderToString(app, (err, html) => {
      if (err) {
        ctx.status = 500;
        ctx.body = '服务器内部错误';
      } else {
        console.log(html);

        ctx.status = 200;
        ctx.body = html;
      }
    });
  })

});

backendApp.use(serve(path.resolve(__dirname, '../dist')));

backendApp
  .use(backendRouter.routes())
  .use(backendRouter.allowedMethods());

backendApp.listen(5000, () => {
  console.log('服务器端渲染地址： http://localhost:5000');
});


// 前端Server
frontendRouter.get('*', (ctx, next) => {
  let html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  ctx.type = 'html';
  ctx.status = 200;
  ctx.body = html;
});

frontendApp.use(serve(path.resolve(__dirname, '../dist')));

frontendApp
  .use(frontendRouter.routes())
  .use(frontendRouter.allowedMethods());

frontendApp.listen(5001, () => {
  console.log('浏览器端渲染地址： http://localhost:5001');
});