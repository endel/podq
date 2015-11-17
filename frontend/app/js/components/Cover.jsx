import React from 'react';
import * as tools from '../tools/tools';

export default class Cover extends React.Component {
  constructor() {
    super();
  }

  render() {
    var title = tools.clampString(this.props.alt, 60);
    var img = <img src={this.props.src} alt={this.props.alt}/>;
    var alt = <h1>{title}</h1>
    var content = this.props.src ? img : alt;

    return (
      <div className="cover">
        <div className="cover-shadow"></div>
        {content}
      </div>
    );
  }
}
