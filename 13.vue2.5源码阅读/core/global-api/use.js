/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
  Vue.use = function (plugin: Function | Object) {
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    } //防止反复注册

    // additional parameters
    const args = toArray(arguments, 1) //Vue.use后面传入的参数
    args.unshift(this) //Vue添加到参数中
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    installedPlugins.push(plugin) //注册过放入数组中
    return this
  }
}
