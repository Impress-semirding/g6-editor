/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:14
 * @modify date 2018-06-27 06:08:14
 * @desc [description]
*/

// /* eslint-disable */
import G6 from '@antv/g6';
import Grid from '@antv/g6/plugins/layout.grid/';
import each from 'lodash/each';

import GenNode from './genFlowNode.ts';
import Dragger from '_antd@2.13.14@antd/lib/upload/Dragger';
import tt from './test.ts';

// import BaseDom from './dom';
// import { mixin } from './util';


const grid = new Grid({});
class Flow extends G6.Graph {
  constructor(cfg) {
    const { graph } = cfg;
    // super(Object.assign({}, graph, { plugins: [grid] }));
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

  clearDrag(event) {
    each(this._events[event], (fn) => {
      this.off(event, fn);
    });
    // this._events[event] = [];
  }

  dragNode() {
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

  dragGraph() {
    let gdx;
    let gdy;
    this.on('dragstart', (ev) => {
      if (!ev.item) {
        gdx = ev.x;
        gdy = ev.y;
      }
    });
    this.on('drag', (ev) => {
      if (!ev.item) {
        const x = ev.x;
        const y = ev.y;
        this && this.translate((x - gdx) / (x - gdx), (y - gdy) / (x - gdx));
      }
    });
    this.on('dragend', (ev) => {// eslint-disable-line
    });
  }

  onDrag() {
    this.dragNode();
    // this.dragGraph();
    // this.on('node:mouseenter', () => {
    //   this.clearDrag('dragstart');
    //   this.clearDrag('drag');
    //   this.clearDrag('dragend');
    //   debugger;
    //   console.log(this);
    // });

    // this.on('node:mouseleave', () => {
    //   this.dragGraph();
    // });
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
    this.read(this.nodeMange.getData());
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
    }, 50);
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
