/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:18
 * @modify date 2018-06-27 06:08:18
 * @desc [description]
*/
import Base from './base';

interface Modules {
  [propName: string]: any;
}

class Editor extends Base {
  private modules: Modules;
  constructor(cfg: any) {
    super(cfg);
    this.initContainer();
    this.modules = {};
  }
  initContainer() {
    let container = this.get('container');
    if (!container) {
      // Compatible with id written
      container = this.get('id');
    }
    if (container) {
      if (typeof container === 'string') {
        container = document.getElementById(container); //eslint-disable-line
      }
    } else {
      throw new Error('please set the container for the graph !');
    }
  }

  addListener(type: string, func: any) : void {
    super.addListener(type, func);
  };
  emitEvent(type: string, data: any) : void {
    super.emitEvent(type, data);
  };

  add(component: any) {
    if (typeof component !== 'object') {
      return;
    }
    this.modules[component.moduleName] = component;
    this.addParseEvent(component);
    if (component.addEventTo) {
      component.addEventTo(this);
    }
  }

  addParseEvent(component: any) {
    this.addListener(`${component.moduleName}@@parse`, component.parse.bind(component));
  }

  emit(type: string, params: any) {
    this.emitEvent(type, []);
  }

  // registerTemplateNodes(cfg: any) {

  // }
}

export default Editor;
