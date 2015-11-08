import React from 'react';
import { Link } from 'react-router'
import main from '../main';
import ItemList from '../components/ItemList.jsx';
import Notifier from '../tools/Notifier';
import Client from '../tools/Client';
import app from '../app';
import PlaybackBtn from '../components/PlaybackBtn.jsx';

export default class Entry extends React.Component {
  constructor() {
    super();
    this.state = this.initialState;
    this.client = new Client();
  }

  get initialState() {
    return {feed:{}, entry:{}, loading: true};
  }

  load(service) {
    this.client.fetch(service)
      .then((data) => {
        data.loading = false
        this.setState(data);
      });
  }

  componentDidMount() {
    if (!app.entry) {
      this.load(`entries/${this.props.params.id}`);
    } else {
      this.setState({feed:app.feed, entry:app.entry, loading: false});
    }
  }

  componentWillReceiveProps(props) {
    this.setState(this.initialState);
    this.load(`entries/${props.params.id}`);
  }

  render() {
    var hasAudio = this.state.audio_url !== undefined;
    var playButton = <div className='play-button'>
                        <PlaybackBtn data={this.state}/>
                     </div>;

    return (this.state.loading) ? (
      <section className='section loading'></section>
    ) : (
      <section className='section'>
        {hasAudio ? playButton : null}
        <div className='content'>
          <h1><Link to={`/feed/${ this.state.feed._id }`}>{ this.state.feed.title }</Link>: {this.state.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: this.state.description }} />
          {
            if (this.state.image) {
              <img src={this.state.image} alt={this.state.title}/>
            }
          }
        </div>
      </section>
    );
  }
}
