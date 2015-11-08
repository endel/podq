import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'
import Notifier from '../tools/Notifier';
import app from '../app';

export default class SearchBarResult extends React.Component {

  constructor () {

    super();

  }

  handleClick () {
    if (this.props.type === 'feed'){
      app.title = this.props.data.title;
      app.history.pushState(null, '/feed/' + this.props.data._id);
    } else {
      Notifier.get('playback').emit('play', this.props.data);
    }

    this.props.onClick && this.props.onClick();

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

    return <li className={resultClass} onClick={this.handleClick.bind(this)}>

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




