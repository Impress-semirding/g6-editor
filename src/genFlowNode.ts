/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-29 02:43:23
 * @modify date 2018-06-29 02:43:23
 * @desc [description]
*/
import Flow from './flow';
import getTpl from './tpls';
import Manage from './store/stateManage'
const G6 = require("G6")


class GenNode {
  private _cfg: any;
  private _tpls: any;
  private nodes: any;
  private manage: Manage;
  constructor(cfg: any) {
    this._cfg = cfg;
    this._tpls = [];
    this.nodes = [];
    this.manage = new Manage();
  }

  getData() {
    return {
      nodes: this.nodes
    }
  }

  createData(id: number, attrs: any, shape: string) {
    const {
      dragOrigin:  { clientX: oX, clientY: oY },
      dragTarget: { clientX, clientY },
      width,
      height
    } = attrs;
    const x = clientX - oX - width / 2;
    const y = clientY - oY - height / 2;
    this.syncStore(id, shape, x, y)
    return { id, shape, x, y }
    // this.nodes.push({ id, shape, x, y });
  }

  syncStore(id, shape, x, y) {
    this.manage.addNode({ id, shape, x, y });
  }
  //  暂时只支持node节点模版
  extendModelCard(shape: string,atrrs: any, extendId: string) {
    const tplAttrs = getTpl(shape);
    const id = new Date().getTime();
    G6.registNode(shape, tplAttrs, extendId);
    return this.createData(id, atrrs, shape);
  }
}

export default GenNode;
