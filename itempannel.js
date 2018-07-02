/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:04
 * @modify date 2018-06-27 06:08:04
 * @desc [description]
*/
/* eslint-disable */
import cloneDeep from 'lodash.clonedeep';

import BaseDom from './dom';

if (typeof Array.isArray === 'undefined') {
  Array.isArray = (arg) => {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}

class Itempannel extends BaseDom {
  constructor(options) {
    super();
    this.event = null;
    this.options = options;
    this.moduleName = 'Itempannel';
    // this.init();
    this.datasets = [];
    this.container = null;
    this.nodes = [];
  }

  addEventListener() {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].setAttribute('draggable', true);
      nodes[i].addEventListener('dragstart', this.ondragstart.bind(this), false);
      // nodes[i].addEventListener('dragstart', this.ondragstart, false);
    }
  }

  getDragNode(id) {
    const tpls = cloneDeep(this.cloneDeep);
    return tpls.filter(t => t.id !== id);
  }

  findDom() {
    const { container, itemKey } = this.options;
    this.containers = this.findDomById(container);
      // const containers = ReactDOM.findDOMNode(ref);
    const className = itemKey || 'getItem';
    this.nodes = this.findDomByClassName(className, this.containers);
  }

  genDatasets() {
    const { nodes } = this;
    for (let i = 0; i < nodes.length; i++) {
      const dataset = Object.assign({}, nodes[i.dataset]);
      this.datasets.push(dataset);
    }
  }

  parse() {
    this.findDom();
    this.genDatasets();
    this.setContainerAttr();
    this.addEventListener();
    // this.findDom();
  }

  addEventTo(event) {
    this.event = event;
  }

  registerTpl(tpls) {
    if (Array.isArray(tpls) !== '[object Array]') {
      console.error('registerTpl params must be a array');
      return;
    }
    this.tpls = tpls;
  }

  ondragstart(ev) {
    console.log('---------正在drag---------');
    ev.dataTransfer.setData('shape', ev.target.dataset.shape);
    ev.dataTransfer.setData('extendId', ev.target.dataset.extendid);
    this.event.emitEvent('Itempannel@@dragitem', [ev]);
    // alert('ondragstart');
  }

  setContainerAttr() {
    const { containers } = this;
    containers.addEventListener('drop', (event) => {
      alert('drop');
    });
    containers.addEventListener('dragover', (event) => {
      event.preventDefault();
    });
  }
}

export default Itempannel;
