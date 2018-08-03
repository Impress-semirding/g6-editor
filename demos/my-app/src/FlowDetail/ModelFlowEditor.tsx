/**
 * @fileOverview
 * @author huangtonger@aliyun.com
 */

import * as React from 'react';
import Editor from './Editor';
import NodeModal from './Modal';

// import G6Editor from '../g6Editor';
// import Navigator from './Navigator.jsx';
import ToolBar from './Toolbar';
// import Contextmenu from './Contextmenu.jsx';
import Page from './Page';

import './editor.css';
import './modelFlowEditor.css';


export default class ModelFlowEditor extends Editor {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    super.componentDidMount();
  }

  bulkCreate = () => {
    const page = super.getPage();
    const nodes = page.g6.getNodes();
    const source = nodes[0]._attrs.id
    const id = new Date().getTime();
    const target = nodes[1]._attrs.id;
    const style = { arrow: true };
    page.buldCreateEdge({ source, id, target, style, shape: 'smooth', label: '' });
  }

  nodeClick(id) {
    this.props.edit();
  }

  public render() {
    return (
    <div id="editor" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ToolBar />
      <div style={{ flex: 16}}>
      <div className="bottom-container">
        {/* <Contextmenu /> */}
        <div id="itempannel">
          <ul>
            <li className="getItem" style={{ height: '48px', lineHeight: '48px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="k-means" id="k-means" data-key="k-means" data-type="node" data-size="170*34" data-extendid="model-card">
              <span className="pannel-type-icon" />test节点
            </li>
          </ul>
        </div>
        <Page />
        {/* <Navigator
          curZoom={curZoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          changeZoom={this.changeZoom.bind(this)}
        />*/}
      </div>
      </div>
      <NodeModal
        visible={this.props.modalVisible}
        onOk={this.props.handleOk}
        onCancel={this.props.handleCancel}
        bulkCreate={this.bulkCreate}
      />
    </div>);
  }
}
