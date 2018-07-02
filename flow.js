/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:14
 * @modify date 2018-06-27 06:08:14
 * @desc [description]
*/

// /* eslint-disable */
import G6 from '@antv/g6';

import GenNode from './genFlowNode';

// import BaseDom from './dom';
// import { mixin } from './util';

class Flow extends G6.Graph {
  constructor(cfg) {
    const { graph } = cfg;
    super(graph);
    this.moduleName = 'Flow';
    this.nodeMange = new GenNode();
    this.dragOrigin = null;
    // mixin(this, BaseDom);
  }

  addEventListener() {
    const { containers } = this;
    containers.addEventListener('dragover', (ev) => { ev.preventDefault(); }, false);
    containers.addEventListener('drop', this.onDrop.bind(this), false);
    this.event.addListener('Itempannel@@dragitem', (ev) => {
      const { clientX, clientY } = ev;
      this.dragOrigin = { clientX, clientY };
    });
  }

  addEventTo(event) {
    this.event = event;
  }

  onDrag() {
    let node;
    let dx;
    let dy;
    this.on('node:dragstart', (ev) => {
      const { item } = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    this.on('node:drag', (ev) => {
      node && this.update(node, {// eslint-disable-line
        x: ev.x + dx,
        y: ev.y + dy,
      });
    });
    this.on('node:dragend', (ev) => {// eslint-disable-line
      node = undefined;
    });
  }

  onDrop(ev) {// eslint-disable-line
    ev.preventDefault();
    const clientX = ev.clientX;
    const clientY = ev.clientY;
    const shape = ev.dataTransfer.getData('shape');
    const extendId = ev.dataTransfer.getData('extendId');
    this.nodeMange.extendModelCard(shape,
      { dragOrigin: this.dragOrigin, dragTarget: { clientX, clientY }, width: 184, height: 40 },
    extendId);
    this.read(this.nodeMange.cfgs);
  }

  findDom() {
    const { container } = this._cfg;
    this.containers = this.findDomById(container);
    this.addEventListener();
  }

  parse() {
    this.findDom();
  }

  findDomById(container, node) { //eslint-disable-line
    if (node) {
      return node.getElementById(container);
    }
    return document.getElementById(container);
  }

  findDomByClassName(container, node) {//eslint-disable-line
    if (node) {
      return node.getElementsByClassName(container);
    }
    return document.getElementsByClassName(container);
  }

  read(data) {
    // this.nodeMange.setData(data);
    super.read(data);
    setTimeout(() => {
      this.onDrag();
    }, 2000);
  }

  // registerNode(id, attrs) {
  //   debugger;
  //   super.registerNode(id, attrs);
  // }
}


Flow.registerNode = G6.registerNode;
Flow.registerEdge = G6.registerEdge;
Flow.registerGroup = G6.registerGroup;
Flow.registerGuide = G6.registerGuide;
Flow.registerBehaviour = G6.registerBehaviour;
Flow.version = '0.1.0';

export default Flow;
