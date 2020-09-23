function createSagaMiddleware() {
  function CreateChannel() {
    let takers = {};

    function take(actionType, cb) {
      takers[actionType] = cb;
    }
    function put(action) {
      let taker = takers[action.type];
      if (taker) {
        let tmp = taker;
        delete takers[action.type];
        tmp(action);
      }
    }
    return {
      take,
      put,
    };
  }

  const chanel = new CreateChannel();

  function sagaMiddleware({ getState, dispatch }) {
    let run = (saga) => {
      let it = typeof saga === "function" ? saga() : saga;
      function next(input) {
        let { value: effect, done } = it.next(input);
        if (!done) {
          //如果这个属性是一个函数的话，它就是一个generator
          if (typeof effect[Symbol.iterator] === "function") {
            run(effect);
            next(); //不需要这个run结束就可以调用next
          } else if (typeof effect.then === "function") {
            effect.then(() => {
              next();
            });
          } else {
            switch (effect.type) {
              //take是要等待一个动作发生，相当于注册一个监听
              case "take":
                let { actionType } = effect;
                chanel.take(actionType, next);
                break;
              case "put":
                let { action } = effect;
                dispatch(action);
                next(action);
                break;
              case "fork":
                let { worker } = effect;
                run(worker);
                next();
                break;
              case "call":
                let { fn, args } = effect;
                fn(...args).then(next);
                break;
              default:
                break;
            }
          }
        }
      }

      next();
    };
    sagaMiddleware.run = run;

    return (next) => (action) => {
      next(action);
      chanel.put(action);
    };
  }

  

  return sagaMiddleware;
}

export default createSagaMiddleware;
