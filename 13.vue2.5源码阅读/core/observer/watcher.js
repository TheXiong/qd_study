/* @flow */

import {
  warn,
  remove,
  isObject,
  parsePath,
  _Set as Set,
  handleError,
  noop
} from '../util/index'

import { traverse } from './traverse'
import { queueWatcher } from './scheduler'
import Dep, { pushTarget, popTarget } from './dep'

import type { SimpleSet } from '../util/index'

let uid = 0

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
export default class Watcher {
  vm: Component;
  expression: string;
  cb: Function; //所依赖值改变触发回调回调
  id: number;
  deep: boolean;
  user: boolean; //用来标志是watch，渲染watcher为false
  lazy: boolean; //
  sync: boolean; //同步更新，不会之后再批量更新
  dirty: boolean; //如果是lazy，dirty才有意义，如果dirty为true则组件应该更新
  active: boolean;

  deps: Array<Dep>;
  newDeps: Array<Dep>;
  depIds: SimpleSet;
  newDepIds: SimpleSet;

  before: ?Function; //批量更新前会调用（scheduler.js）
  getter: Function; //触发函数收集依赖，可以是组件更新函数\computed函数,调用都会收集依赖
  value: any;

  constructor (
    vm: Component,
    expOrFn: string | Function,
    cb: Function,
    options?: ?Object,
    isRenderWatcher?: boolean
  ) {
    this.vm = vm
    if (isRenderWatcher) { //是否是渲染Watcher
      vm._watcher = this //挂载到vm上
    }
    vm._watchers.push(this)
    // options
    if (options) {
      this.deep = !!options.deep
      this.user = !!options.user
      this.lazy = !!options.lazy
      this.sync = !!options.sync
      this.before = options.before
    } else {
      this.deep = this.user = this.lazy = this.sync = false
    }
    this.cb = cb
    this.id = ++uid // uid for batching
    this.active = true
    this.dirty = this.lazy // for lazy watchers
    this.deps = []
    this.newDeps = []
    this.depIds = new Set()
    this.newDepIds = new Set()
    this.expression = process.env.NODE_ENV !== 'production'
      ? expOrFn.toString()
      : ''
    // parse expression for getter
    if (typeof expOrFn === 'function') { //updateComponent更新组件函数，计算属性会走这
      this.getter = expOrFn
    } else { //监听属性
      this.getter = parsePath(expOrFn) //返回一个函数
      if (!this.getter) {
        this.getter = noop
        process.env.NODE_ENV !== 'production' && warn(
          `Failed watching path: "${expOrFn}" ` +
          'Watcher only accepts simple dot-delimited paths. ' +
          'For full control, use a function instead.',
          vm
        )
      }
    }
    this.value = this.lazy
      ? undefined
      : this.get()
  }

  /**
   * Evaluate the getter, and re-collect dependencies.
   */
  get () {
    pushTarget(this) //会将这个watcher放到一个全局变量中Dep.target和目标栈targetStack中
    let value
    const vm = this.vm
    try {
      value = this.getter.call(vm, vm) //可以获取vm.expOrFn的值并触发该值的getter，getter里面会建立dep和watcher之间的联系
    } catch (e) {
      if (this.user) {
        handleError(e, vm, `getter for watcher "${this.expression}"`)
      } else {
        throw e
      }
    } finally {
      // "touch" every property so they are all tracked as
      // dependencies for deep watching
      if (this.deep) {
        traverse(value) //遍历value---deep收集依赖
      }
      popTarget() //释放建立完依赖的watcher
      this.cleanupDeps() //移除dep多余watcher ------ 之前依赖，现在不依赖的watcher
    }
    return value
  }

  /**
   * Add a dependency to this directive.
   */
  addDep (dep: Dep) {
    const id = dep.id
    if (!this.newDepIds.has(id)) { //新的newDepIds没有该dep----现在还没有收集
      this.newDepIds.add(id) 
      this.newDeps.push(dep)
      if (!this.depIds.has(id)) { //原depIds里面没有该id-----原来没有收集
        dep.addSub(this) //dep里面没有此watcher
      }
    }
  }

  /**
   * Clean up for dependency collection.
   */
  cleanupDeps () {
    let i = this.deps.length
    while (i--) { //循环旧deps
      const dep = this.deps[i]
      if (!this.newDepIds.has(dep.id)) { //旧deps里面有，新的deps里面没有
        dep.removeSub(this) //移除dep里面该watcher
      }
    }
    let tmp = this.depIds
    this.depIds = this.newDepIds //newDepIds替换depIds
    this.newDepIds = tmp
    this.newDepIds.clear() //清空
    tmp = this.deps
    this.deps = this.newDeps //newDeps替换deps
    this.newDeps = tmp 
    this.newDeps.length = 0
  }

  /**
   * Subscriber interface.
   * Will be called when a dependency changes.
   */
  update () {
    /* istanbul ignore else */
    if (this.lazy) {
      this.dirty = true
    } else if (this.sync) {
      this.run()
    } else {
      queueWatcher(this)
    }
  }

  /**
   * Scheduler job interface.
   * Will be called by the scheduler.
   */
  run () {
    if (this.active) {
      const value = this.get()
      if (
        value !== this.value ||
        // Deep watchers and watchers on Object/Arrays should fire even
        // when the value is the same, because the value may
        // have mutated.
        isObject(value) ||
        this.deep
      ) {
        // set new value
        const oldValue = this.value
        this.value = value
        if (this.user) { //用户watcher，监听属性
          try {
            this.cb.call(this.vm, value, oldValue) //watch的回调会走这，监听值改变回调
          } catch (e) {
            handleError(e, this.vm, `callback for watcher "${this.expression}"`)
          }
        } else {
          this.cb.call(this.vm, value, oldValue)
        }
      }
    }
  }

  /**
   * Evaluate the value of the watcher.
   * This only gets called for lazy watchers.
   */
  evaluate () {
    this.value = this.get()
    this.dirty = false
  }

  /**
   * Depend on all deps collected by this watcher.
   */
  depend () {
    let i = this.deps.length
    while (i--) {
      this.deps[i].depend()
    }
  }

  /**
   * Remove self from all dependencies' subscriber list.
   */
  teardown () {
    if (this.active) {
      // remove self from vm's watcher list
      // this is a somewhat expensive operation so we skip it
      // if the vm is being destroyed.
      if (!this.vm._isBeingDestroyed) {
        remove(this.vm._watchers, this)
      }
      let i = this.deps.length
      while (i--) {
        this.deps[i].removeSub(this)
      }
      this.active = false
    }
  }
}
