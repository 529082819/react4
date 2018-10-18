import React, { Component } from 'react';

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {},
    this.handerClick = this.handerClick.bind(this);
  }

  async handerClick() {
    
  }

  render() {
    return (<div>
        <p onClick={this.handerClick}>handerClick</p>
      </div>
    );
  }
}

export default Demo;
