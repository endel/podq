import React from 'react';

export default class Cover extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="cover">
        <img src={this.props.src} />
      </div>
    );
  }
}
