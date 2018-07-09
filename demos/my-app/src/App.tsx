import * as React from 'react';
import ModelFlowEditor from './FlowDetail';
import './App.css';

import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <ModelFlowEditor/>
      </div>
    );
  }
}

export default App;
