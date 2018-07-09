import React from 'react';
import G6Editor, { Flow, Itempannel, ToolBar } from '../dist';
// import 'antd/dist/antd.css';

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedModel: {}, // 当前选中项数据模型
      curZoom: 1, // 当前缩放比率
      minZoom: 0.5, // 最小缩放比率
      maxZoom: 2, // 最大缩放比率
    };
  }
  changeZoom(zoom) {
    const page = this.page;
    page.zoom(zoom);
  }
  toggleGrid(ev) {
    const page = this.page;
    if (ev.target.checked) {
      page.showGrid();
    } else {
      page.hideGrid();
    }
  }
  updateGraph(key, value) {
    const editor = this.editor;
    editor.executeCommand(() => {
      const page = this.page;
      const selectedItems = page.getSelected();
      selectedItems.forEach((item) => {
        const updateModel = {};
        updateModel[key] = value;
        page.update(item, updateModel);
      });
    });
  }
  genDom(params) {
    const { width, height, x, y } = params;
    const node = document.getElementsByClassName('graph-container-html-Elements');
    const div = document.createElement('div');
    div.innerHTML = '我是dom节点哟';
    div.style.display = 'block';
    div.style.position = 'absolute';
    div.style.width = `${width}px`;
    div.style.height = `${height}px`;
    div.style.left = `${x}px`;
    div.style.top = `${y}px`;
    div.style.background = 'rgba(1, 1, 1, 0.3)';
    div.addEventListener('click', (e) => { alert(1111); });
    node[0].appendChild(div);
  }

  onDrag(pages) {
  }
  componentDidMount() {
    // 生成 G6 Editor 编辑器
    // const height = window.innerHeight - 38;
    const editor = this.editor = new G6Editor({ container: 'editor' });
    // const minimap = new G6Editor.Minimap({
    //   container: 'minimap',
    //   height: 120,
    //   width: 200,
    // });
    const toolbar = new Toolbar({
      container: 'toolbar',
    });
    // const contextmenu = new G6Editor.Contextmenu({
    //   container: 'contextmenu',
    // });
    const itempannel = new Itempannel({
      container: 'itempannel',
      tpls: [

      ],
    });
    const pages = document.getElementById('page');
    const page = new Flow({
      graph: {
        container: 'page',
        id: 'page',
        width: pages.clientWidth,
        height: pages.clientHeight,
        // fitView: 'autoZoom',
        grid: {
          forceAlign: true, // 是否支持网格对齐
          cell: 30,         // 网格大小
          line: {           // 网格线样式
            stroke: '#333',
          },
        },
      },
      grid: {
        forceAlign: true, // 是否支持网格对齐
        cell: 30,         // 网格大小
        line: {           // 网格线样式
          stroke: '#333',
        },
      },
      noEndEdge: false,
      edgeResizeable: false,
    });
    const self = this;

    G6Editor.Flow.registerNode('model-card', {
      draw(item) {
        const group = item.getGraphicGroup();
        const model = item.getModel();
        const width = 184;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 4;
        // const { x: px, y: py } = item.model;
        // self.genDom({ width, height, x: px + x, y: py + y });
        console.log(x, y);
        const keyShape = group.addShape('rect', {
          attrs: {
            x: 10,
            y: 10,
            width,
            height,
            radius: borderRadius,
            fill: 'white',
            stroke: '#CED4D9',
          },
        });
        // 左侧色条
        group.addShape('path', {
          attrs: {
            path: [
              ['M', x, y + borderRadius],
              ['L', x, y + height - borderRadius],
              ['A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height],
              ['L', x + borderRadius, y],
              ['A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius],
            ],
            fill: this.color_type,
          },
        });
        // 类型 logo
        group.addShape('image', {
          attrs: {
            img: this.type_icon_url,
            x: x + 16,
            y: y + 12,
            width: 20,
            height: 16,
          },
        });
        // 名称文本
        const label = model.label ? model.label : this.label;
        group.addShape('text', {
          attrs: {
            text: label,
            x: x + 52,
            y: y + 13,
            textAlign: 'start',
            textBaseline: 'top',
            fill: 'rgba(0,0,0,0.65)',
          },
        });
        // 状态 logo
        group.addShape('image', {
          attrs: {
            img: this.state_icon_url,
            x: x + 158,
            y: y + 12,
            width: 16,
            height: 16,
          },
        });
        return keyShape;
      },
      // 设置锚点
      anchor(item) {
        return [
          [0, 0.25],
          [0, 0.5],
          [0, 0.75],
          [1, 0.25],
          [1, 0.5],
          [1, 0.75],
          [0.25, 0],
          [0.5, 0],
          [0.75, 0],
          [0.25, 1],
          [0.5, 1],
          [0.75, 1],
        ];
      },
    });


    page.edge({
      style() {
        return {
          endArrow: true,
        };
      },
    });
    this.onDrag(page);
    const scale = 1;
    //   test case
    // setInterval(() => {
    //   scale -= 0.1;
    //   page.zoom(scale);
    // }, 8000);


    page.read({ nodes: [{
      shape: 'k-means',
      id: 'node1',
      x: 100,
      y: 100,
    },
    {
      shape: 'k-means',
      id: 'node2',
      x: 300,
      y: 300,
    }],
      edges: [
        // {
        //   id: 'edge1',
        //   target: 'node2',
        //   source: 'node1',
        //   label: '我是线条',
        // },
      ],
    });

    this.editor.add(page);
    // const detailpannel = new G6Editor.Detailpannel({
    //   container: 'detailpannel',
    // });
    // page.on('afteritemselected', (ev) => {
    //   this.setState({
    //     selectedModel: ev.item.getModel(),
    //   });
    // });
    // page.on('afterzoom', (ev) => {
    //   this.setState({
    //     curZoom: ev.updateMatrix[0],
    //   });
    // });
    // editor.add(minimap);
    editor.add(toolbar);
    // editor.add(contextmenu);
    editor.add(itempannel);
    // setTimeout(() => {
    editor.emit('Itempannel@@parse', {});
    editor.emit('Flow@@parse', {});
    editor.emit('ToolBar@@parse', {});
    this.page = page;
    // editor.add(detailpannel);

    this.editor = editor;
  }
}
