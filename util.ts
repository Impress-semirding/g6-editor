/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:07:59
 * @modify date 2018-06-27 06:07:59
 * @desc [description]
*/
/* eslint-disable */

interface Domparam {
  position? : string;
  width:string;
  height: string;
  left: string;
  top: string;
}

function genDom(options: Domparam) {
  const { position, width, height, left, top } = options;
  const box = document.createElement('div');  //eslint-disable-line
  box.style.position = options.position
  box.style.width = options.width
  box.style.height = options.height
  box.style.left = options.left
  box.style.top = options.top
  return box;
}

function mixin(dest: any, src: any) {
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
