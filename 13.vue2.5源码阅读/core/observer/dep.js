/* @flow */

import type Watcher from './watcher'
import { remove } from '../util/index'
import config from '../config'

let uid = 0

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
export default class Dep {
  static target: ?Watcher;
  id: number;
  subs: Array<Watcher>;

  constructor () {
    this.id = uid++
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  removeSub (sub: Watcher) {
    remove(this.subs, sub)
  }

  depend () {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify () {
    // stabilize the subscriber list first
    const subs = this.subs.slice()
    if (process.env.NODE_ENV !== 'production' && !config.async) {
      // subs aren't sorted in scheduler if not running async
      // we need to sort them now to make sure they fire in correct
      // order
      subs.sort((a, b) => a.id - b.id)
    }
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
Dep.target = null //当前正在计算的Watcher
const targetStack = [] //vue2添加的，因为vue2中视图被抽象为一个 render 函数，一个 render 函数只会生成一个 watcher
//renderRoot () {
//   ...
//   renderMy ()
//   ...
// }
// 可以看到在 Vue2 中组件数的结构在视图渲染时就映射为 render 函数的嵌套调用，
// 有   嵌套调用    就会有调用栈。当 evaluate root 时，调用到 my 的 render 函数，
// 此时就需要中断 root 而进行 my 的 evaluate，当 my 的 evaluate 结束后 root 将会继续进行，
// 这就是 target stack 的意义。

export function pushTarget (target: ?Watcher) {
  targetStack.push(target)
  Dep.target = target
}

export function popTarget () {
  targetStack.pop()
  Dep.target = targetStack[targetStack.length - 1]
}
