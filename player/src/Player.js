import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default class Player {
  constructor(element) {
    this.element = element;

    this.playButton = new PlayButton();
    this.element.appendChild(this.playButton.element);
    this.playButton.onClick = this.onPlayClick.bind(this);

    this.progressBar = new ProgressBar();
    this.element.appendChild(this.progressBar.element);
    this.progressBar.loadRatio = 0.75;
    this.progressBar.timeRatio = 0.5;

    this.volumeControl = new VolumeControl();
    this.element.appendChild(this.volumeControl.element);

    this.data = null;
    this.audio = new Audio();
    this.audio.addEventListener('play', this.onPlay.bind(this));
    this.audio.addEventListener('pause', this.onPause.bind(this));
    this.audio.addEventListener('loadstart', this.onLoadStart.bind(this));
    this.audio.addEventListener('progress', this.onLoadProgress.bind(this));
    this.audio.addEventListener('canplay', this.onCanPlay.bind(this));
    this.audio.addEventListener('loadedmetadata', this.onLoadProgress.bind(this));
    this.audio.addEventListener('error', this.onError.bind(this));
    this.audio.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
  }

  play(data) {
    this.data = data;
    this.audio.autoPlay = true;
    this.progressBar.loadRatio = 0;
    this.progressBar.timeRatio = 0;
    this.playButton.state = PlayButton.LOADING;
    this.audio.src = data['audio_url'];
  }

  get volume() {
    return this.audio.volume;
  }

  set volume(value) {
    this.audio.volume = value;
  }

  onPlayClick() {
    if (!this.audio.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  onCanPlay() {
    this.audio.play();
  }

  onPlay() {
    this.playButton.state = PlayButton.PLAYING;
  }

  onPause() {
    this.playButton.state = PlayButton.PAUSED;
  }

  onLoadStart(e) {
    console.log('onLoadStart', e);
  }

  onLoadProgress() {
    var b = this.audio.buffered;
    var s = 0;
    var e = 0;
    if (b.length > 0) {
      s = b.start(0)/this.audio.duration;
      e = b.end(b.length - 1)/this.audio.duration;
    }
    this.progressBar.loadRatio = e - s;
  }

  onLoadMetaData(e) {
    console.log('onLoadMetaData', e);
  }

  onError(e) {
    console.log('onError', e);
  }

  onTimeUpdate() {
    this.progressBar.timeRatio = this.audio.currentTime/this.audio.duration;
  }
}

window.Player = Player;
