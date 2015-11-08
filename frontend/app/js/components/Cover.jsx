import React from 'react';

export default class Cover extends React.Component {
  constructor() {
    super();
  }

  render() {
    var img = <img src={this.props.src} alt={this.props.alt}/>;
    var alt = <h1>{this.props.alt}</h1>
    var content = this.props.src ? img : alt;
    return (
      <div className="cover">
        {content}
      </div>
    );
  }
}
