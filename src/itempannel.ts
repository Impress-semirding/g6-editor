/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:04
 * @modify date 2018-06-27 06:08:04
 * @desc [description]
*/

import BaseDom from './dom';

interface Options {
  container: string;
  itemKey?: string;
}

class Itempannel extends BaseDom {
  private event: any;
  private options: Options;
  private moduleName: string;
  private datasets: Array<number>;
  private containers: any;
  private nodes: any;
  constructor(options: Options) {
    super();
    this.event = null;
    this.options = options;
    this.moduleName = 'Itempannel';
    // this.init();
    this.datasets = [];
    this.containers = null;
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
      const dataset = (<any>Object).assign({}, nodes[i].dataset);
      // const dataset = Object.assign({}, nodes[i.dataset]);
      this.datasets.push(dataset);
    }
  }

  parse() {
    this.findDom();
    this.genDatasets();
    // this.setContainerAttr();
    this.addEventListener();
    // this.findDom();
  }

  addEventTo(event: any) {
    this.event = event;
  }

  ondragstart(ev: any) {
    console.log('---------正在drag---------');
    ev.dataTransfer.setData('shape', ev.target.dataset.shape);
    ev.dataTransfer.setData('extendId', ev.target.dataset.extendid);
    this.event.emitEvent('Itempannel@@dragitem', [ev]);
  }
}

export default Itempannel;
