/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:07:54
 * @modify date 2018-06-27 06:07:54
 * @desc [description]
*/
/* eslint-disable */
export default class BaseDom {
  findDomById(container, node) {
    if (node) {
      return node.getElementById(container);
    }
    return document.getElementById(container);
  }
  findDomByClassName(container, node) {
    if (node) {
      return node.getElementsByClassName(container);
    }
    return document.getElementsByClassName(container);
  }
}
