/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-07-10 06:33:10
 * @modify date 2018-07-10 06:33:10
 * @desc [description]
*/

const G6 = require("G6")

import GenNode from './genFlowNode';

interface Drag {
  clientX: number;
  clientY: number;
}

class Flow extends G6.Net {
  private readonly moduleName: string = 'Flow';
  private nodeMange: GenNode;
  private dragOrigin: Drag;
  private containers: any;
  private event: any;
  private dragginNode: boolean;
  private dragginCancas: boolean;
  private _cfg: any;

  static registerNode = G6.registNode;
  static registerEdge = G6.registEdge;
  static registerGroup = G6.registGroup;
  static registerGuide = G6.registGuide;
  static registerBehaviour = G6.registBehaviour;
  static version = '0.1.0';
  constructor(cfg: any) {
    super(cfg.graph);
    const { graph } = cfg;
    // super(Object.assign({}, graph, { plugins: [grid] }));
    //  g6降级v1版本，需删除container
    this._cfg = graph;
    this.nodeMange = new GenNode({});
    this.dragOrigin = null;
    this.dragginNode = false;
    this.dragginCancas = false;
  }

  add(type: string, node: any) {
    // super.add(type, node);
    super.add(type, node)
    // this.render();
  }

  addEventListener() {
    const { containers } = this;
    containers.addEventListener('dragover', (ev: any) => { ev.preventDefault(); }, false);
    containers.addEventListener('drop', this.onDrop.bind(this), false);
    this.event.addListener('Itempannel@@dragitem', (ev: any) => {
      const { clientX, clientY } = ev;
      this.dragOrigin = { clientX, clientY };
    });
    this.event.addListener(`Itempannel@@command`, this.addWithCommand.bind(this));

  }

  addEventTo(event: any) {
    this.event = event;
  }

  addWithCommand(ev) {
    const shape = ev.shape;
    const extendId = ev.extendid;
    const node = this.nodeMange.extendModelCard(shape,
      {
        dragOrigin: { clientX: 50, clientY: 50 },
        dragTarget: { clientX: 100, clientY: 100 },
        width: 184,
        height: 40
      },
      extendId
    );
    this.beginAdd('node', node);
  }

  beginAdd(type: string, node: any) {
    super.beginAdd(type, node);
  }

  changeMode(type: string) {
    super.changeMode(type)
  }

  getViewPortBox() {
    return super.getViewPortBox();
  }

  mapGrapPosition(dom: any) {
    const { x, y } = dom;
    const scale = this.getScale();
    const { minX, minY, maxX, maxY } = this.getViewPortBox();
    return { x: x / scale + minX, y: y / scale + minY }
  }

  dragNode() {
    let node: any;
    let dx: number;
    let dy: number;
    this.on('node:dragstart', (ev: any) => {
      if (this.dragginCancas) return;
      this.dragginNode = true;
      const { item } = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    this.on('node:drag', (ev: any) => {
      if (this.dragginCancas) return;
      this.update(node, {
        x: ev.x + dx,
        y: ev.y + dy,
      });
    });
    this.on('node:dragend', (ev: any) => {
      setTimeout(() => {
        this.dragginNode = false;
      }, 500)
      if (this.dragginCancas) return;
      node = undefined;
    });
  }

  on (type: string, func: any) {
    super.on(type, func)
  }

  onDrag() {
    this.dragNode();
  }

  onDrop(ev: any) {
    ev.preventDefault();
    const clientX = ev.clientX;
    const clientY = ev.clientY;
    const shape = ev.dataTransfer.getData('shape');
    const extendId = ev.dataTransfer.getData('extendId');
    const node = this.nodeMange.extendModelCard(shape,
      {
        dragOrigin: this.dragOrigin,
        dragTarget: { clientX, clientY
      },
      width: 184,
      height: 40
    },
    extendId);
    const { x, y } = node;
    const position = this.mapGrapPosition({ x, y})
    const nextNode = {
      ...node,
      ...position
    }
    this.add('node', nextNode);
    this.refresh();
    // this.beginAdd('node', node);
    // this.getScale();
    // debugger;
    // var event = document.createEvent('MouseEvents');
    // const { screenX, screenY, clientX: x, clientY: y } = ev;
    // event.initMouseEvent('mouseup', true, true, document.defaultView, 0, screenX, screenY, x, y, false, false, false, false, 0 ,null);

    // document.getElementById('canvas_2').dispatchEvent(event);
  }

  findDom() {
    const { id: container } = this._cfg;
    this.containers = this.findDomById(container, null);
    this.addEventListener();
  }

  parse() {
    this.findDom();
  }

  findDomById(container: string, node: any) { //eslint-disable-line
    if (node) {
      return node.getElementById(container);
    }
    return document.getElementById(container);
  }

  findDomByClassName(container: string, node: any) {//eslint-disable-line
    if (node) {
      return node.getElementsByClassName(container);
    }
    return document.getElementsByClassName(container);
  }

  showAnchor(obj: any) {
    super.showAnchor(obj);
  }

  source(nodes: Array<any>, edges: Array<any>) {
    super.source(nodes, edges);
  }

  removeBehaviour(arr: Array<string>) {
    super.removeBehaviour(arr);
  }

  public render() {
    super.render();
  }

  public read(data: any) {
    this.source(data.nodes, data.edges);
    // 进入锚点切换到曲线添加模式
    var dragging = false;
    this.removeBehaviour(['hoverNodeShowAnchor', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor']);
    this.on('mouseenter', (ev) => {
      var shape = ev.shape;
      if(shape && shape.hasClass('anchor-point') && !dragging) {
        this.beginAdd('edge', {
          shape: 'polyLineFlow'
        });
      }
    });
    // 离开锚点切换回编辑模式
    this.on('mouseleave', (ev) => {
      var shape = ev.shape;
      if(shape && shape.hasClass('anchor-point') && !dragging) {
        this.changeMode('edit');
      }
    });
    this.on('afteritemrender', (ev) => {
      var item = ev.item;
      if(item.get('type') === 'node'){
        this.showAnchor(item);
      }
    });
    this.on('click', (ev) => {
      if (ev.itemType === 'node') {
        this.event.emitEvent('ToolBar@@listen_node', [ev.item._attrs]);
      }
    })

    setTimeout(() => {
      this.event.addListener('@delete_node', (ev: any) => {
        const id = ev;
        this.remove(id);
        this.refresh();
      });
      this.event.addListener('@updo', (ev) => {
        this.updo();
        this.refresh();
      })
    }, 1000)

    this.render();
    setTimeout(() => {
      this.onDrag();
    }, 50);
  }

  update(type: string, func: any) {
    super.update(type, func);
  }

  translate(x: number, y: number) {
    super.translate(x, y);
  }
}

export default Flow;
