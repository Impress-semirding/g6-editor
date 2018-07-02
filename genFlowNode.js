/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-29 02:43:23
 * @modify date 2018-06-29 02:43:23
 * @desc [description]
*/
/* eslint-disable */
import Editor from './index';
import tpls from './tpls';


const INNIT = Symbol('editor#gennode@@init');

class GenNode {
  constructor(cfg) {
    this._cfg = cfg;// eslint-disable-line
    this._tpls = [];// eslint-disable-line
    this.nodes = [];
  }

  [INNIT]() {
    // this.registerModelCard();
  }

  get cfgs() {
    return {
      nodes: this.nodes
    }
  }

  createData(id, attrs, shape) {
    const { dragOrigin:  { clientX: oX, clientY: oY },
      dragTarget: { clientX, clientY },
    width, height } = attrs;
    const x = clientX - oX - width / 2;
    const y = clientY - oY - height / 2;
    this.nodes.push({ id, shape, x, y });
  }
  //  暂时只支持node节点模版
  extendModelCard(shape,atrrs, extendId) {
    const attrs = tpls[shape];
    const id = new Date().getTime();
    this.createData(id, atrrs, shape);
    Editor.Flow.registerNode(shape, attrs, extendId);
  }
}

export default GenNode;
