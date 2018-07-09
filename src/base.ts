const EventEmitter = require('wolfy87-eventemitter');
// import EventEmitter = require("wolfy87-eventemitter");

// import EventEmitter from 'wolfy87-eventemitter'

export default class Base extends EventEmitter {
  protected _cfg: any;
  protected destroyed: boolean;
  constructor(cfg: object) {
    super();
    const defaultCfg = this.getDefaultCfg();
    this._cfg = (<any>Object).assign({}, defaultCfg, cfg);
  }
  getDefaultCfg() {
    return {};
  }

  get(name: string) {
    return this._cfg[name];
  }

  set(name: string, value: any) {
    this._cfg[name] = value;
  }

  addListener(type: string, func: any) : void {
    super.addListener(type, func);
  };

  emitEvent(type: string, data: any) : void {
    super.emitEvent(type, data);
  };

  removeAllListeners() : void {
    super.removeAllListeners();
  }

  destroy() {
    this._cfg = {};
    this.removeAllListeners();
    this.destroyed = true;
  }
}
