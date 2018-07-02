/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:07:59
 * @modify date 2018-06-27 06:07:59
 * @desc [description]
*/
/* eslint-disable */
function genDom(options) {
  const { position, w, h, x, y } = options;
  const box = document.createElement('div');  //eslint-disable-line
  box.style = {
    position: position || 'absolute',
    width: w,
    height: h,
    left: x,
    top: y,
  };
  return box;
}

function mixin(dest, src) {
  const srcs = src.prototype;
  dest = { ...srcs, dest };
  // for (const key in srcs) {
  //   debugger;
  //   console.log(key);
  //   // dest[key] = src.prototype[key];
  // }
}


export {
  genDom,
  mixin,
};
