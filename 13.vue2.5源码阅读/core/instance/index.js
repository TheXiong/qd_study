import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

function Vue (options) { //Vue的构造函数
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}

initMixin(Vue) //Vue混入init方法
stateMixin(Vue) //Vue上混入$data\$props属性，并代理getter到_data\_props上，混入$set\$delete\$watch方法
eventsMixin(Vue) //Vue上混入$on\$once\$off\$emit方法
lifecycleMixin(Vue) //Vue上混入_update\$forceUpdate\$destroy方法
renderMixin(Vue) //Vue上混入$nextTick\_render方法

export default Vue
