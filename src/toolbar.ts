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
  constructor(options: any) {
    super();
    this.event = null;
    this.options = options;
    this.datasets = {};
  }


  private undo() {
    alert('developing');
  }

  private redo() {
    alert('redo')
  }

  private copy() {
    alert('copy')
  }

  private paste() {
    alert('paste')
  }

  private delete() {
    alert('delete');
  }

  private zoomIn() {
    alert('zoomIn')
  }

  private zoomOut() {
    alert('zoomOut')
  }

  private autoZoom() {
    alert('autoZoom')
  }

  private resetZoom() {
    alert('resetZoom')
  }

  addEventListener() {
    const nodes = this.nodes;
    for (let i = 0; i < nodes.length; i++) {
      const type = nodes[i].dataset.command;
      nodes[i].addEventListener('click', this[type], false);
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

  parse() {
    this.findDom();
    this.genDatasets();
    this.addEventListener();
  }
}

export default ToolBar;
