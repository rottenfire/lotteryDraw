/**
 *  使用setInterval为回调函数设置参数
 */
let __sto = window.setInterval;
window.setIntervalUseParam = function (callback, timeout, ...param) {
  const _cb = function () {
    callback.apply(null, param);
  }
  return __sto(_cb, timeout);
}