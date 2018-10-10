/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-07-10 06:33:10
 * @modify date 2018-07-10 06:33:10
 * @desc [description]
*/

const G6 = require("G6")

import execute from './dagre'
import BaseDom from './dom';
import GenNode from './genFlowNode';

interface Drag {
  clientX: number;
  clientY: number;
}

// class Flow extends G6.Net. Cannot assign to read only property 'constructor' of object '#<t>'.
class Flow extends BaseDom {

  static registerNode = G6.registNode;
  static registerEdge = G6.registEdge;
  static registerGroup = G6.registGroup;
  static registerGuide = G6.registGuide;
  static registerBehaviour = G6.registBehaviour;
  static Util = G6.Util;
  static version = '0.1.0';
  public readonly moduleName: string = 'Flow';
  private nodeMange: GenNode;
  private dragOrigin: Drag;
  private containers: any;
  private event: any;
  private dragginNode: boolean;
  private dragginCancas: boolean;
  private _cfg: any;
  private g6: any;
  private sync: (params: object) => void;
  // private templates: any;
  private windowOffset: any;
  constructor(cfg: any) {
    super();
    const { graph, sync, windowOffset } = cfg;
    
    this.g6 = new G6.Net(graph);
    this.sync = sync;
    // this.templates = templates;
    this.windowOffset = windowOffset;
    // this.g6.tooltip({
    //   title: '标题', // @type {String} 标题
    //   split: '=>',  // @type {String} 分割符号
    //   dx: 10,       // @type {Number} 水平偏移
    //   dy: 10        // @type {Number} 竖直偏移
    // });
    // this.g6.edge().tooltip(['id', 'label']);
    // this.g6.node().tooltip(['id']);
    this._cfg = graph;
    this.nodeMange = new GenNode({});
    this.dragOrigin = null;
    this.dragginNode = false;
    this.dragginCancas = false;
  }

  private registerAnyHandle() {
    // 进入锚点切换到曲线添加模式
    // 第五️步：编辑交互变形
    let dragging = false;
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
      const { item, shape } = ev;
      // if(item.get('type') === 'node'){
      //   this.showAnchor(item);
      // }
      if(shape && shape.hasClass('anchor-point') && !dragging) {
        this.beginAdd('edge', {
          id: `edgeId@${new Date().getTime()}`,
          shape: 'smooth',
          style: {
            color: '#C6D1DC',
            stroke: '#C6D1DC',
            arrow: true,
          }
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
      if (!item) { return; }
      const { _attrs: { id } } = item;
      if (item._attrs.shapeObj.clickPath) {
        const { minX: l, minY: t } = item._attrs.boxStash;
        item._attrs.shapeObj.clickPath({ l, t }, ev);
      }
      if (ev.itemType === 'node') {
        this.event.emitEvent('ToolBar@@listen_node', [ev.item._attrs]);
      } else if (ev.itemType === 'edge') {
        this.event.emitEvent('ToolBar@@listen_edge', [ev.item._attrs]);
      }
    })

    this.on('dblclick', (ev) => {
      const { item } = ev;
      if (!item) { return; }
      const { _attrs: { id }, shapeObj } = item;
      if (item._attrs.shapeObj.dblclick && typeof item._attrs.shapeObj.dblclick === 'function') {
        item._attrs.shapeObj.dblclick(ev)
      }
    })

    setTimeout(() => {
      this.event.addListener('@delete_node', (ev: any) => {
        const id = ev;
        // const ids = this.g6.getEdges(id);
        // const id2 = this.g6.geEdges();
        const g6 = this.g6;
        if (id.indexOf('node') !== -1) {
          const edges = this.g6.find(id).getEdges();
          const ids = edges.map(t => t._attrs.model.id);
          if (ids.length) {
            this.sync({ type: 'edge', operate: 'delete', payload: { ids } });
            ids.forEach(element => {
              this.g6.remove(element);
            });
          }
          this.sync({ type: 'node', operate: 'delete', payload: { id } });
          this.g6.remove(id);
        } else {
          this.g6.remove(id);
          this.sync({ type: 'edge', operate: 'delete', payload: { ids: [id] } });
        }
        this.g6.refresh();
      });

      this.event.addListener('@dagre_graph', (ev) => {
        const nodes = this.g6.getNodes().map(t => ({ ...t._attrs.model }));
        const edges = this.g6.getEdges().map(t => ({ ...t._attrs.model }));
        const { nodes: next} = execute({ nodes, edges });
        next.forEach(t => {
          this.g6.update(t.id, t);
        })
        this.g6.refresh();
        // const edges = this.g6.getEdges().map(t => ({ ...t._attrs.model }));
      })

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
        if (scale <= 0.5) { return; }
        this.g6._zoom(scale - 0.5)
        this.g6.refresh()
      })
      this.event.addListener('@zoomReset', (ev) => {
        this.g6._zoom(1)
        this.g6.refresh()
      })

      this.g6.refresh();

    }, 1000)

    setTimeout(() => {
      this.onDrag();
    }, 50);

    // this.g6.on('beforeaddedge', ev => {
    //   debugger;
    //   if (ev.anchor.type === 'input') {
    //     ev.cancel = true;
    //   }
    // });
    // this.g6.on('dragedge:beforeshowanchor', ev => {
    //   debugger;
    //   // 只允许目标锚点是输入，源锚点是输出，才能连接
    //   if (!(ev.targetAnchor.type === 'input' && ev.sourceAnchor.type === 'output')) {
    //     ev.cancel = true;
    //   }
    //   // 如果拖动的是目标方向，则取消显示目标节点中已被连过的锚点
    //   if (ev.dragEndPointType === 'target' && this.g6.anchorHasBeenLinked(ev.target, ev.targetAnchor)) {
    //     ev.cancel = true;
    //   }
    //   // 如果拖动的是源方向，则取消显示源节点中已被连过的锚点
    //   if (ev.dragEndPointType === 'source' && this.g6.anchorHasBeenLinked(ev.source, ev.sourceAnchor)) {
    //     ev.cancel = true;
    //   }
    // });
  }

  add(type: string, data: any) {
    this.g6.add(type, data)
  }

  addEventListener() {
    const { containers } = this;
    containers.addEventListener('dragover', (ev: any) => { ev.preventDefault(); }, false);
    containers.addEventListener('drop', this.onDrop.bind(this), false);
    this.event.addListener('Itempannel@@dragitem', (ev: any) => {
      const { clientX, clientY } = ev;
      this.dragOrigin = { clientX, clientY };
    });
    // this.event.addListener(`Itempannel@@command`, this.addWithCommand.bind(this));
    this.registerAnyHandle();
  }

  addEventTo(event: any) {
    this.event = event;
  }

  buldCreateEdge(payload: any) {
    this.g6.add('edge', payload)
  }

  bulkCreate(type: string, payload: any) {
    const nodes = this.g6.getNodes()
    const source = nodes[0]._attrs.id
    const id = new Date().getTime();
    const target = nodes[1]._attrs.id;
    const style = {
      arrow: true,
    }
    this.g6.add('edge', { source, id, target, style, shape: 'smooth', label: '' })
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
      if (this.dragginCancas) { return; }
      this.dragginNode = true;
      const { item } = ev;
      const model = item.getModel();
      node = item;
      dx = model.x - ev.x;
      dy = model.y - ev.y;
    });
    this.on('node:drag', (ev: any) => {
      if (this.dragginCancas) { return; }
      this.update(node, {
        x: ev.x + dx,
        y: ev.y + dy,
      });
    });
    this.on('node:dragend', (ev: any) => {
      setTimeout(() => {
        this.dragginNode = false;
      }, 500)
      if (this.dragginCancas) { return; }
      node = undefined;
    });
  }

  on (type: string, func: any) {
    this.g6.on(type, func)
  }

  onDrag() {
    this.dragNode();
  }

  getModule(name) {
    return this.event.modules[name]
  }

  onDrop(ev: any) {
    ev.preventDefault();
    const clientX = ev.clientX;
    const clientY = ev.clientY;
    const shape = ev.dataTransfer.getData('shape');
    const extendId = ev.dataTransfer.getData('extendId');
    const name = ev.dataTransfer.getData('name');
    const theme = ev.dataTransfer.getData('theme');
    const offsetTop = ev.dataTransfer.getData('offsetTop');
    const stringify = ev.dataTransfer.getData('stringify');
    let nextNode: any;
    if (name === 'undefined') {
      const node = this.nodeMange.extendModelCard(shape,
        {
          dragOrigin: this.dragOrigin,
          dragTarget: { clientX, clientY },
          theme,
          windowOffset: this.windowOffset,
          offsetTop,
        }, extendId, { nodeName: '空节点'});
      const { x, y } = node;
      const position = this.mapGrapPosition({ x, y})
      nextNode = {
        ...node,
        ...position,
        nodeName: '空节点',
        frontData: {
          label: '空节点',
          ...JSON.parse(stringify)
        }
      }
    } else {
      const template = this.getModule('Itempannel').templates.filter(t => t.nodeName === name)[0]
      const node = this.nodeMange.extendModelCard(shape,
        {
          dragOrigin: this.dragOrigin,
          dragTarget: { clientX, clientY },
          theme,
          windowOffset: this.windowOffset,
          offsetTop
        }, extendId, template);
      const { x, y } = node;
      const position = this.mapGrapPosition({ x, y})
      nextNode = {
        ...node,
        ...template,
        ...position,
        label: template.nodeName,
        frontData: {
          label: template.nodeName,
          ...JSON.parse(stringify)
        }
      }
    }
    this.add('node', nextNode);
    // const nodes = this.g6.getNodes()
    // const source = nodes[0]._attrs.id
    // const id = new Date().getTime();
    // const target = nodes[1]._attrs.id;
    // const style = {
    //   arrow: true,
    // }
    // this.g6.add('edge', { source, id, target, style, shape: 'smooth', label: '' })
    this.g6.refresh();
    setTimeout(() => {
      const nodes = this.g6.getNodes();
      this.sync({ type: 'node', operate: 'add', payload: {nodes} });
    }, 0)
  }

  findDom() {
    const { id: container } = this._cfg;
    this.containers = this.findDomById(container, null);
    this.addEventListener();
  }

  parse() {
    this.findDom();
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

  refresh() {
    this.g6.refresh();
  }

  remove(param) {
    this.g6.remove(param);
  }

  render() {
    this.g6.render();
  }

  read(data: any) {
    this.source(data.nodes, data.edges);
    this.render();
  }

  update(type: string, func: any) {
    this.g6.update(type, func);
  }

  translate(x: number, y: number) {
    this.g6.translate(x, y);
  }
}

export default Flow;
