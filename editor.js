/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:18
 * @modify date 2018-06-27 06:08:18
 * @desc [description]
*/
/* eslint-disable */
import Flow from './flow';
import Base from './base.ts';

const INITCONTAINER = Symbol('editor#initcontainer');

function createNode(htmlStr, style) {
  const div = document.createElement('div');
  div.innerHTML = htmlStr;
  const s = div.childNodes[0];
  s.style = style;
  return s;
}

class Editor extends Base {
  constructor(cfg) {
    super(cfg);
    this[INITCONTAINER]();
  }
  [INITCONTAINER]() {
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

  add(component) {
    if (typeof component !== 'object') return;
    this[component] = component;
    this.addEvent(component);
    if (component.addEventTo) component.addEventTo(this);
  }

  addEvent(component) {
    console.log(`----register event ${component.moduleName}@@parse -----------`);
    this.addListener(`${component.moduleName}@@parse`, component.parse.bind(component));
  }

  emit(type, params) {
    console.log(`----emit event ${type} -----------`);
    this.emitEvent(type, []);
  }

  registerTemplateNodes(cfg) {

  }
}

export default Editor;
