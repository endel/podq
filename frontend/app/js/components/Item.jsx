import React from 'react';
import Cover from './Cover.jsx';

export default class Item extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      // <div>{this.props.data.name}</div>
      <div className="item">
        <div className="icon">
          <img className="icon-img" src="svg/icon-play.svg" width="50px" height="50px"/>
        </div>
        <Cover src={this.props.data.image} />
      </div>
    );
  }
}
