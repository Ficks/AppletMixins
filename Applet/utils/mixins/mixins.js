import {deepClone} from '../common';
import CommonMixin from './common';
export default function mergePage (page, mixins) {
  // const mixin = mixins[0];
  mixins = Array.isArray (mixins) ? mixins : [];
  mixins.unshift (CommonMixin);

  // 方法从后面开始数组的第一项开始运行-page最后运行
  // data赋值：如果page有取page的，否则取mixins里最后一项

  for (let i = mixins.length - 1; i > -1; i--) {
    for (let key in mixins[i].methods) {
      if (page[key]) {
        let fn = page[key];
        page[key] = function (d) {
          mixins[i].methods[key].apply (this, arguments);
          fn.apply (this, arguments);
        };
        continue;
      }
      page[key] = deepClone (mixins[i].methods[key]);
    }

    for (let key in mixins[i].data) {
      if (page.data[key]) continue;
      page.data[key] = deepClone (mixins[i].data[key]);
    }
  }

  return page;
}
