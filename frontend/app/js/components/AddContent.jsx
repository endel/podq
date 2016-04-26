import React from 'react';
import { findDOMNode } from 'react-dom';

export default class AddContent extends React.Component {

  constructor () {
    super()

    this.state = {
      hasFocus: false,
      url: "",
      open: false,
      loading: false
    }
  }

  handleChange (evt) {
    this.setState({
      url: evt.target.value
    });
  }

  onClick (evt) {
    evt.preventDefault()
    evt.stopPropagation()

    if (this.state.loading) {
      return
    }

    fetch(`${ BACKEND_ENDPOINT }/feeds`, {
      method: 'post',
      body: new FormData(findDOMNode(this.refs.form))
    }).then( () => {
      this.setState({ loading: false, url: "", thanks: true })

      setTimeout(() => { this.setState({ thanks: false }) }, 4000)

    })
    this.setState({ loading: true })
  }

  render() {
    return (!this.state.thanks) ? (

      <form ref="form" className="add-content">
        <input name="url" placeholder="Enter podcast website URL or RSS"
          onFocus={this.handleChange.bind(this)}
          onBlur={this.handleChange.bind(this)}
          onChange={this.handleChange.bind(this)}
          value={this.state.url} />
        <button onClick={this.onClick.bind(this)}>
          { (this.state.loading) ? "Sending..." : "Import feed" }
        </button>
      </form>

      ) : (

        <div className="add-content">
          <p>Thanks, we'll import it in a few minutes, stay tuned!</p>
        </div>

      )
  }
}

