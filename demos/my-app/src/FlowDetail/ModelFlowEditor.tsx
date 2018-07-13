/**
 * @fileOverview
 * @author huangtonger@aliyun.com
 */

import * as React from 'react';
import Editor from './Editor';
// import G6Editor from '../g6Editor';
// import Navigator from './Navigator.jsx';
import ToolBar from './Toolbar';
// import Contextmenu from './Contextmenu.jsx';
import Page from './Page';
import './editor.css';
import './modelFlowEditor.css';

export default class ModelFlowEditor extends Editor {

  componentDidMount() {
    super.componentDidMount();
  }

  public render() {
    return (<div id="editor" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <ToolBar />
      <div style={{ flex: 16}}>
      <div className="bottom-container">
        {/* <Contextmenu /> */}
        <div id="itempannel">
          <ul>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="k-means" id="k-means" data-key="k-means" data-type="node" data-size="170*34" data-extendid="model-card">
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
    </div>);
  }
}
