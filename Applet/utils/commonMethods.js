// 深拷贝对象
function $deepClone(obj) {
  if (obj === null) return;
  if (obj instanceof RegExp) return new RegExp (obj);
  if (obj instanceof Date) return new Date (obj);
  if (typeof obj !== 'object') return obj;
  let t = new obj.constructor ();
  for (let key in obj) {
    t[key] = $deepClone (obj[key]);
  }
  return t;
}
exports.$deepClone = $deepClone;


exports.$getUserInfo = function (a) {
  console.log('调用了按需引入的方法')
  console.log(a)
  console.log(this.data.name);
}