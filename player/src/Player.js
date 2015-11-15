import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default class Player {
  constructor(element) {
    this.element = element;
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

    this.playButton = new PlayButton();
    this.element.appendChild(this.playButton.element);
    this.playButton.onClick = this.onPlayClick.bind(this);

    this.progressBar = new ProgressBar();
    this.element.appendChild(this.progressBar.element);
    this.progressBar.onSeekUpdate = this.onSeekUpdate.bind(this);

    this.volumeControl = new VolumeControl();
    this.element.appendChild(this.volumeControl.element);
    this.volumeControl.onUpdate = this.onVolumeUpdate.bind(this);
  }

  play(data) {
    this.data = data;
    this.audio.autoPlay = true;
    this.progressBar.loadRatio = 0;
    this.progressBar.timeRatio = 0;
    this.audio.src = data['audio_url'];
  }

  onPlayClick() {
    if (!this.audio.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  onVolumeUpdate() {
    this.audio.volume = this.volumeControl.ratio;
  }

  onSeekUpdate() {
    var time = this.audio.duration*this.progressBar.timeRatio;
    console.log(time);
    this.audio.currentTime = time;
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

  onLoadStart() {
    this.playButton.state = PlayButton.LOADING;
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

  onLoadMetaData() {
    // console.log('onLoadMetaData', e);
  }

  onError(e) {
    console.log('AUDIO LOAD ERROR!', e);
  }

  onTimeUpdate() {
    this.progressBar.timeRatio = this.audio.currentTime/this.audio.duration;
  }
}

window.Player = Player;
