/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:18
 * @modify date 2018-06-27 06:08:18
 * @desc [description]
*/
import Base from './base';


class Editor extends Base {

  private modules: Array<any>;
  constructor(cfg: any) {
    super(cfg);
    this.initContainer();
    this.modules = [];
  }
  private initContainer() {
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
    // const graphContainer = createNode('<div class="graph-container"></div>', {
    //   position: 'relative',
    // });
    // container.appendChild(graphContainer);
    // this.set('_containerDOM', container);
    // this.set('_graphContainer', graphContainer);
  }

  // addListener(type: string, func: any) : void {};
  // emitEvent(type: string, data: any) : void {};

  add(component: any) {
    if (typeof component !== 'object') return;
    this.modules.push(component);
    this.addEvent(component);
    if (component.addEventTo) component.addEventTo(this);
  }

  addEvent(component: any) {
    console.log(`----register event ${component.moduleName}@@parse -----------`);
    this.addListener(`${component.moduleName}@@parse`, component.parse.bind(component));
  }

  emit(type: string, params: any) {
    console.log(`----emit event ${type} -----------`);
    this.emitEvent(type, []);
  }

  registerTemplateNodes(cfg: any) {

  }
}

export default Editor;
