import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import app from '../app';

export default class SearchBarResult extends React.Component {

  constructor () {

    super();

  }

  render () {

    var data = this.props.data,
        resultClass = classNames({
          'result-item': true,
          'no-image': !data.image
        }),
        destination = (this.props.type === 'feed' ? '/feed/' : '/entry/') + data._id;

    // Ugly but functional HTML tags removal :)
    var tempDom = document.createElement('div');
    tempDom.innerHTML = data.description;
    data.description = tempDom.textContent;

    return <Link to={destination} className={resultClass} onClick={this.props.onClick}>

            <div className="result-picture">
              <img src={data.image} />
            </div>

            <div className="result-info">
              <h4>{data.title}</h4>
              <span>{data.description}</span>
            </div>

          </Link>
  }

}
