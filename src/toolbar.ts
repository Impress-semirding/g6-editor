/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-07-09 10:35:23
 * @modify date 2018-07-09 10:35:23
 * @desc [description]
*/

import BaseDom from './dom';

interface Options {
  container: string,
  itemClassName?: string;
}

interface Datasets {
  [propName: string]: boolean;
}

class ToolBar extends BaseDom {
  private event: any;
  private options: Options;
  private readonly moduleName: string = 'ToolBar';
  private containers: HTMLElement;
  private nodes: any;
  private datasets: Datasets;
  private selected: any;
  constructor(options: any) {
    super();
    this.event = null;
    this.options = options;
    this.datasets = {};
  }

  private undo() {
    alert('undo暂不支持，稍后')
    // this.event.emitEvent('@updo', []);
  }

  private redo() {
    alert('redo，暂不支持，稍后')
  }

  private copy() {
    alert('copy暂不支持，稍后')
  }

  private dragmode() {
    this.event.emitEvent('@dragmode', [])
  }

  private paste() {
    alert('paste暂不支持，稍后')
  }

  private delete() {
    const { selected: { id } } = this;
    this.event.emitEvent('@delete_node', [id]);
  }

  private zoomIn() {
    this.event.emitEvent('@zoomIn', [])
  }

  private zoomOut() {
    this.event.emitEvent('@zoomOut', [])
  }

  private autoZoom() {
    this.event.emitEvent('@zoomReset', [1])
  }

  private resetZoom() {
    this.event.emitEvent('@zoomReset', [1])
  }

  addEventListener() {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i].dataset.command;
      nodes[i].addEventListener('click', this[type].bind(this), false);
    }
  }

  addEventTo(event: any) {
    this.event = event;
  }

  findDomById(container: string) : HTMLElement{
    return super.findDomById(container);
  }

  findDom() {
    const { container, itemClassName } = this.options;
    this.containers = this.findDomById(container);
    const className = itemClassName || 'command';
    this.nodes = this.findDomByClassName(className, this.containers);
  }

  genDatasets() {
    const { nodes } = this;
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i].dataset.command;
      const { datasets } = this;
      this.datasets = (<any>Object).assign({}, datasets, { [ type ]: true });
    }
  }

  listeningNode() {
    this.event.addListener(`${this.moduleName}@@listen_node`, (ev: any) => {
      this.setfocus(ev);
    });
  }

  parse() {
    this.findDom();
    this.genDatasets();
    this.addEventListener();
    this.listeningNode();
  }

  setfocus(node) {
    this.selected = node;
  }
}

export default ToolBar;
