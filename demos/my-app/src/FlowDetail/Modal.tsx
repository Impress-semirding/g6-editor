import * as React from 'react';
import { Modal, Button } from 'antd';

interface NodeProps {
  visible: boolean;
  onOk: any;
  onCancel: any;
  bulkCreate: any;
}

export default class NodeModal extends React.Component<NodeProps> {
  constructor(props: NodeProps) {
    super(props);
  }

  private link = () => {
    this.props.bulkCreate();
  }

  public render() {
    return (
      <Modal
        title="Basic Modal"
        {...this.props}
      >
        <div onClick={this.link}>click me,自动连接第一个节点和第二个节点哦</div>
      </Modal>
    );
  }
}
