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


class GenNode {
  private _cfg: any;
  private _tpls: any;
  private nodes: any;
  constructor(cfg: any) {
    this._cfg = cfg;
    this._tpls = [];
    this.nodes = [];
  }


  getData() {
    return {
      nodes: this.nodes
    }
  }

  createData(id: number, attrs: any, shape: string) {
    const { dragOrigin:  { clientX: oX, clientY: oY },
      dragTarget: { clientX, clientY },
    width, height } = attrs;
    const x = clientX - oX - width / 2;
    const y = clientY - oY - height / 2;
    this.nodes.push({ id, shape, x, y });
  }
  //  暂时只支持node节点模版
  extendModelCard(shape: string,atrrs: any, extendId: string) {
    const tplAttrs = tpls[shape];
    const id = new Date().getTime();
    this.createData(id, atrrs, shape);
    Editor.Flow.registerNode(shape, tplAttrs, extendId);
  }
}

export default GenNode;
