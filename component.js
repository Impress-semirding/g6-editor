/**
 * @author senir
 * @email 15251895266@163.com
 * @create date 2018-06-27 06:08:26
 * @modify date 2018-06-27 06:08:26
 * @desc [description]
*/
import G6 from '@antv/g6';
import React from 'react';

let uniqueId = 0;
function generateUniqueId() {
  return `rc-g6-${uniqueId++}`;
}

export default function createG6(__operation) {
  class Component extends React.Component {

    constructor(props, context) {
      super(props, context);
      this.graph = null;
      this.graphId = generateUniqueId();
    }

    componentDidMount() {
      this.initGraph(this.props);
    }

    componentWillReceiveProps(newProps) {
      const { width: newWidth, height: newHeight } = newProps;
      const { width: oldWidth, height: oldHeight } = this.props;

      if (newWidth !== oldWidth || newHeight !== oldHeight) {
        this.graph.changeSize(newWidth, newHeight);
      }
    }

    shouldComponentUpdate() {
      return false;
    }

    componentWillUnmount() {
      this.graph.destroy();
      this.graph = null;
      this.graphId = null;
    }

    initGraph(props) {
      const graph = new G6.Graph({
        id: this.graphId,
        ...props,
      });
      __operation(graph);
      this.graph = graph;
      this.graph.render();
      this.graph.autoZoom();
    }

    render() {
      return (<div id={this.graphId} />);
    }
  }

  Component.propTypes = {
    // data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
  };

  return Component;
}

