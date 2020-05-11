import CommonMixin from './common';
let commonMethods = require('../commonMethods');
let options = {
  pageConfig: {},
  mixins: [],
  methods:[]
}
export default function merge (opts=options) {
  // 方法从后面开始数组的第一项开始运行-page最后运行
  // data赋值：如果page有取page的，否则取mixins里最后一项
  opts.mixins.unshift (CommonMixin);
  for (let i = opts.mixins.length - 1; i > -1; i--) {
    for (let key in opts.mixins[i].methods) {
      if (opts.pageConfig[key]) {
        let fn = opts.pageConfig[key];
        opts.pageConfig[key] = function (d) {
          opts.mixins[i].methods[key].apply (this, arguments);
          fn.apply (this, arguments);
        };
        continue;
      }
      opts.pageConfig[key] = commonMethods.$deepClone (opts.mixins[i].methods[key]);
    }

    for (let key in opts.mixins[i].data) {
      if (opts.pageConfig.data[key]) continue;
      opts.pageConfig.data[key] = commonMethods.$deepClone (opts.mixins[i].data[key]);
    }
  }
  
  for (let i = 0; i < opts.methods.length; i++){
    let fnName = opts.methods[i];
    // 判断是否有这个方法
    if (fnName && commonMethods[fnName]) {
      if (opts.pageConfig[fnName]) {
        console.error('pageConfig已经定义了'+fnName)
        continue;
      } else {
        opts.pageConfig[fnName] = commonMethods[fnName];
      }
    } else {
      console.error('未找到' + fnName+'方法')
    }
  }

  return opts.pageConfig;
}
