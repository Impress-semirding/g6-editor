import * as React from 'react';

import G6Editor, { Flow, Itempannel, ToolBar } from '../../../../src/index';

export default class Editor extends React.Component {
  private editor: any;
  private page: any;
  constructor(props: any) {
    super(props);
    this.state = {
      selectedModel: {}, // 当前选中项数据模型
    };
  }

  // genDom(params) {
  //   const { width, height, x, y } = params;
  //   const node = document.getElementsByClassName('graph-container-html-Elements');
  //   const div = document.createElement('div');
  //   div.innerHTML = '我是dom节点哟';
  //   div.style.display = 'block';
  //   div.style.position = 'absolute';
  //   div.style.width = `${width}px`;
  //   div.style.height = `${height}px`;
  //   div.style.left = `${x}px`;
  //   div.style.top = `${y}px`;
  //   div.style.background = 'rgba(1, 1, 1, 0.3)';
  //   div.addEventListener('click', (e) => { alert(1111); });
  //   node[0].appendChild(div);
  // }

  componentDidMount() {
    // 生成 G6 Editor 编辑器
    // const height = window.innerHeight - 38;
    this.editor = new G6Editor({ container: 'editor' });

    const toolbar = new ToolBar({
      container: 'toolbar',
    });

    const itempannel = new Itempannel({ container: 'itempannel' });
    const pages = document.getElementById('page');
    const page = new Flow({
      graph: {
        // container: pages,
        id: 'page',
        // fitView: 'autoZoom',
        height: pages.clientHeight,
        width: pages.clientWidth,
      },
      noEndEdge: false,
    });
    // const self = this;

    Flow.registerNode('model-card', {
      draw(cfg, group) {
        const model = cfg.model;
        const width = 184;
        const height = 40;
        const x = -width / 2;
        const y = -height / 2;
        const borderRadius = 4;
        // const { x: px, y: py } = item.model;
        // self.genDom({ width, height, x: px + x, y: py + y });
        const keyShape = group.addShape('rect', {
          attrs: {
            x,
            y,
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
      getAnchorPoints: function(){
        return [
          [0, 0.5],
          [1, 0.5],
          [1, 0.25],
          [1, 0.5]
        ];
      }
    });


    page.edge({
      style() {
        return {
          endArrow: true,
        };
      },
    });

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

    this.editor.add(toolbar);
    // editor.add(contextmenu);
    this.editor.add(itempannel);
    // setTimeout(() => {
    this.editor.emit('Itempannel@@parse', {});
    this.editor.emit('Flow@@parse', {});
    this.editor.emit('ToolBar@@parse', {});
    this.page = page;
    // editor.add(detailpannel);
  }
}
