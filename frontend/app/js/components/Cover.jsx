import React from 'react';
import * as tools from '../tools/tools';

export default class Cover extends React.Component {

  constructor() {
    super();
  }

  render() {

    let imageSrc = `https://i.embed.ly/1/display/resize?width=200&height=200&url=${ encodeURIComponent( this.props.src.replace("https://", "http://") ) }&key=00193985e12540c98f5a8a595480c62c`
    let title = tools.clampString(this.props.alt, 60);
    let img = <img src={ imageSrc } alt={ this.props.alt }/>;
    let alt = <h1>{ title }</h1>
    let content = ( this.props.src ) ? img : alt;

    return (
      <div className="cover">
        <div className="cover-shadow"></div>
        {content}
      </div>
    );
  }
}
