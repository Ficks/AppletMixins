export default {
  data: {
    name: '熊大大',
    // 列表数据
    page: {
      page: 1,
      per_page: 12,
    },
    list: [],
    loading: false,
    finished: false,
    error: false,
    isRefresh: false,
  },
  methods: {
    $initList () {
      this.setData ({
        ['page.page']: 1,
        loading: false,
        finished: false,
        error: false,
        isRefresh: true,
      });
      this.$getListBefore ();
    },
    //   获取数据前
    $getListBefore () {
      if (this.data.loading || this.data.finished) return;
      this.setData ({
        loading: true,
        error: false,
      });
      this.getList ();
    },
    // 获取数据后
    $getListAfter (list, res) {
      let finished = false;
      let page = this.data.page.page;
      if (list.length < this.data.page.per_page) finished = true; //加载完毕了
      page++;
      if (this.data.isRefresh) {
        setTimeout (() => {
          wx.hideNavigationBarLoading ();
          wx.stopPullDownRefresh ();
          wx.showToast ({
            title: '刷新成功',
          });
        }, 500);
      }
      this.setData ({
        ['page.page']: page,
        list: this.data.isRefresh ? list : this.data.list.concat (list), //如果是刷新直接赋值否则数据合并
        finished,
        loading: false,
        isRefresh: false,
      });
    },
    // 获取数据错误
    $getListError () {
      console.log (9921321);
      this.setData ({
        loading: false,
        error: true,
      });
    },
    // 监听上拉加载
    onReachBottom () {
      this.$getListBefore ();
    },
    // 下拉刷新
    onPullDownRefresh () {
      wx.showNavigationBarLoading ();
      this.$initList ();
    },
    // 页面加载-只监听一次
    onLoad () {
      console.log ('万年老二方法');
      this.$getListBefore ();
    },
  },
};
