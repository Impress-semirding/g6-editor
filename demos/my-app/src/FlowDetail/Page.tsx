import * as React from 'react';

// import './page.css';

export default class Page extends React.Component {
  public render() {
    return (
      <div style={{ flex: 16, marginLeft: '200px', height: '100%' }}>
        <div id="page" style={{ width: '100%', height: '100%' }} />
      </div>
    );
  }
}
