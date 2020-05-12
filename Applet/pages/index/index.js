//index.js
import merge from '../../utils/mixins/mixins';

// 这个东西我会在列表使用，上拉加载上拉刷新，对列表数据的一个处理
import listMixin from '../../utils/mixins/list';

// 封装的方法集合
import {deepClone} from '../../utils/common';

//获取应用实例
const app = getApp ();
let page = {
  data: {
    name: '我的名字不会改变Ficks',
    motto: 'Hello World',
    hasUserInfo: false,
  },
  getList () {
    // 这个方法我是用来获取列表数据的
    console.log ('获取到列表数据开始处理');
    this.$getListAfter ([]);
  },
  onLoad: function () {
    console.log ('我最后执行方法');

    // 这里调用一下按需引入的方法
    console.log (this.deepClone ({name: '熊大真会玩'}));
  },
};

// 第一个参数放你的page
// 第二个参数是Mixins数组

Page (
  merge (page, [
    listMixin,
    {
      // 也可以这样直接写
      data: {
        name: '我不会有结果。。。。除非page的name没有定义',
      },
      methods: {
        onLoad () {
          console.log (this.data.name);
          console.log ('我是第三个执行方法的');
        },
      },
    },
    // 熊大提出来的按需引入方法可以共享this
    {
      methods: {
        deepClone,
      },
    },
  ])
);
