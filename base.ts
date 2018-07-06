/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-25 04:06:25
 * @modify date 2018-06-25 04:06:25
 * @desc [description]
*/
/* eslint-disable */
const EventEmitter = require('wolfy87-eventemitter');
// import EventEmitter from 'wolfy87-eventemitter'

export default class Base extends EventEmitter {
  protected _cfg: any;
  protected destroyed: Boolean;
  getDefaultCfg() {
    return {};
  }

  constructor(cfg: object) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this._cfg = (<any>Object).assign({}, defaultCfg, cfg);
  }

  get(name: string) {
    return this._cfg[name];
  }

  set(name: string, value: any) {
    this._cfg[name] = value;
  }

  destroy() {
    this._cfg = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}
