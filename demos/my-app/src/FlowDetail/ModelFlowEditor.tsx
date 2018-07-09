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

  public componentDidMount() {
    super.componentDidMount();
  }

  public render() {
    return (<div id="editor" style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <ToolBar />
      <div className="bottom-container" style={{ flex: 1 }}>
        {/* <Contextmenu /> */}
        <div id="itempannel">
          <ul>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="k-means" id="k-means" data-key="k-means" data-type="node" data-size="170*34" data-extendid="model-card">
              <span className="pannel-type-icon" />K 均值聚类
            </li>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="random-forest" id="random-forest" data-key="random-forest" data-type="node" data-size="170*34">
              <span className="pannel-type-icon" />随机森林
            </li>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="PS-SMART" data-type="node" data-size="170*34">
              <span className="pannel-type-icon" />PS-SMART 分类
            </li>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="read-data-base" data-type="node" data-size="170*34">
              <span className="pannel-type-icon" />读数据表
            </li>
            <li className="getItem" style={{ height: '80px', lineHeight: '80px', border: '1px solid rgb(153, 153, 153, 0.4)' }} data-shape="Bayes" data-type="node" data-size="170*34">
              <span className="pannel-type-icon" />朴素贝叶斯
            </li>
          </ul>
        </div>
        {/* <Navigator
          curZoom={curZoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          changeZoom={this.changeZoom.bind(this)}
        />*/}
      </div>
      <Page />
    </div>);
  }
}
