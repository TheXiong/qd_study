import { createApp } from './app.js';

export default context => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()

    // 设置服务器端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()

      // 匹配不到的路由，执行 reject 函数，并返回 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }

      Promise.all(matchedComponents.map(component => {
        if (component.asyncData) {
          let p = component.asyncData({ store, route: router.currentRoute })
          return p
        } else {
          return Promise.resolve()
        }
      })).then(() => {
        context.state = store.state
        resolve(app)
      }).catch(reject)

    }, reject)
  })
}