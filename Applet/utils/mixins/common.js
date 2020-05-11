// 公共方法只要调用了mergePage 就会把这个界面和混入page
export default {
  data: {
    userInfo: {
      name: 'Ficks',
      phone: 15111326666,
      level: 1,
      avatar: '',
      level_name: '掌柜',
    },
  },
  methods: {
    // 判断是否登录promise
    $loginAfter () {
      return new Promise ((resolve, reject) => {
        if (this.data.userInfo && this.data.userInfo.id) {
          resolve (this.data.userInfo);
        } else {
          reject ();
        }
      });
    },
    onLoad () {
      console.log ('公共方法执行-我是你老大');
    },
  },
};
