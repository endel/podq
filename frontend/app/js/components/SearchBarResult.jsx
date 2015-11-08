import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

export default class SearchBarResult extends React.Component {

  constructor () {

    super();

  }

  render () {

    var entry = this.props.data,
        resultClass = classNames({
          'result-item': true,
          'no-image': !entry.image
        });

    // Ugly but functional HTML tags removal :)
    var tempDom = document.createElement('div');
    tempDom.innerHTML = entry.description;
    entry.description = tempDom.textContent;

    return <li className={resultClass}>

            <div className="result-picture">
              <img src={entry.image} />
            </div>

            <div className="result-info">
              <h4>{entry.title}</h4>
              <span>{entry.description}</span>
            </div>

          </li>
  }

}




