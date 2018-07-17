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

// class Flow extends G6.Net. Cannot assign to read only property 'constructor' of object '#<t>'.
class Flow {
  private readonly moduleName: string = 'Flow';
  private nodeMange: GenNode;
  private dragOrigin: Drag;
  private containers: any;
  private event: any;
  private dragginNode: boolean;
  private dragginCancas: boolean;
  private _cfg: any;
  private domClick: boolean = false;
  private g6: any;

  static registerNode = G6.registNode;
  static registerEdge = G6.registEdge;
  static registerGroup = G6.registGroup;
  static registerGuide = G6.registGuide;
  static registerBehaviour = G6.registBehaviour;
  static Util = G6.Util;
  static version = '0.1.0';
  constructor(cfg: any) {
    // super(cfg.graph);
    const { graph, domClick } = cfg;
    this.g6 = new G6.Net(graph)

    // super(Object.assign({}, graph, { plugins: [grid] }));
    //  g6降级v1版本，需删除container
    this._cfg = graph;
    this.domClick = domClick || false;
    this.nodeMange = new GenNode({});
    this.dragOrigin = null;
    this.dragginNode = false;
    this.dragginCancas = false;
  }

  add(type: string, node: any) {
    this.g6.add(type, node)
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
    this.g6.beginAdd(type, node);
  }

  changeMode(type: string) {
    this.g6.changeMode(type)
  }

  edge(attr: any) {
    this.g6.edge(attr);
  }

  getViewPortBox() {
    return this.g6.getViewPortBox();
  }

  mapGrapPosition(dom: any) {
    const { x, y } = dom;
    const scale = this.g6.getScale();
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
    this.g6.on(type, func)
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
    this.g6.refresh();
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

  hideAnchor(obj: any) {
    this.g6.hideAnchor(obj);
  }

  showAnchor(obj: any) {
    this.g6.showAnchor(obj);
  }



  source(nodes: Array<any>, edges: Array<any>) {
    this.g6.source(nodes, edges);
  }

  removeBehaviour(arr: Array<string>) {
    this.g6.removeBehaviour(arr);
  }

  public render() {
    this.g6.render();
  }

  public read(data: any) {
    this.registerAnyHandle();
    this.source(data.nodes, data.edges);
    this.render();
  }

  private registerAnyHandle() {
    // 进入锚点切换到曲线添加模式
    // 第五️步：编辑交互变形
    var dragging = false;
    this.g6.addBehaviour(['hoverNodeShowAnchor', 'dragEdge', 'dragEdgeEndHideAnchor', 'hoverAnchorSetActived'])
    // this.g6.removeBehaviour(['hoverNodeShowAnchor', 'dragEdgeEndHideAnchor', 'dragNodeEndHideAnchor']);
    this.g6.removeBehaviour(['resizeNode']);

    this.g6.on('dragstart', function(ev){
      dragging = true;
    });
    this.g6.on('dragend', function(ev){
      dragging = false;
    });
    this.g6.on('mouseenter', (ev) => {
      var { item, shape } = ev;
      // if(item.get('type') === 'node'){
      //   this.showAnchor(item);
      // }
      if(shape && shape.hasClass('anchor-point') && !dragging) {
        this.beginAdd('edge', {
          shape: 'polyLineFlow'
        });
      }
    });
    // 离开锚点切换回编辑模式
    this.g6.on('mouseleave', (ev) => {
      const { item, shape } = ev;
      if(shape && shape.hasClass('anchor-point') && !dragging) {
        this.changeMode('edit');
      }
    });
    // this.g6.on('afteritemrender', (ev) => {
    //   var item = ev.item;
    //   if(item.get('type') === 'node'){
    //     this.showAnchor(item);
    //   }
    // });
    this.g6.on('click', (ev) => {
      const { item } = ev;
      if (!item) return;
      const { _attrs: { id } } = item;
      if (item._attrs.shapeObj.clickPath) {
        const { minX: l, minY: t } = item._attrs.boxStash;
        item._attrs.shapeObj.clickPath({ l, t }, ev);
      }
      if (ev.itemType === 'node') {
        this.event.emitEvent('ToolBar@@listen_node', [ev.item._attrs]);
      }
    })

    setTimeout(() => {
      this.event.addListener('@delete_node', (ev: any) => {
        const id = ev;
        this.g6.remove(id);
        this.g6.refresh();
      });
      this.event.addListener('@updo', (ev) => {
        this.g6.updo();
        this.g6.refresh();
      })
      this.event.addListener('@redo', (ev) => {
        this.g6.redo();
        this.g6.refresh();
      })

      this.event.addListener('@dragmode', (ev) => {
        this.changeMode('drag');
      })

      this.event.addListener('@zoomIn', (ev) => {
        const scale = this.g6.getScale();
        this.g6._zoom(scale + 0.5)
        this.g6.refresh()
      })
      this.event.addListener('@zoomOut', (ev) => {
        const scale = this.g6.getScale();
        if (scale <= 0.5) return;
        this.g6._zoom(scale - 0.5)
        this.g6.refresh()
      })
      this.event.addListener('@zoomReset', (ev) => {
        this.g6._zoom(1)
        this.g6.refresh()
      })

    }, 1000)

    setTimeout(() => {
      this.onDrag();
    }, 50);
  }

  update(type: string, func: any) {
    this.g6.update(type, func);
  }

  translate(x: number, y: number) {
    this.g6.translate(x, y);
  }
}

export default Flow;
