import * as React from 'react';
import { Modal, Button } from 'antd';

interface NodeProps {
  visible: boolean;
  onOk: any;
  onCancel: any;
}

export default class NodeModal extends React.Component<NodeProps> {
  constructor(props: NodeProps) {
    super(props);
  }
  public render() {
    return (
      <Modal
        title="Basic Modal"
        {...this.props}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
}
