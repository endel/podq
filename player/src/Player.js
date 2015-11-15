import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import SpeedButton from './SpeedButton';
import Label from './Label';
import Settings from './Settings';

export default class Player {
  constructor(element, autoSave = true) {
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

    this.settings = new Settings();
    this.settings.load();

    this.intro = document.createElement('div');
    this.intro.id = 'intro';
    this.element.appendChild(this.intro);

    this.container = document.createElement('div');
    this.container.id = 'container';
    this.element.appendChild(this.container);

    this.labelIdle = new Label('idle');
    this.intro.appendChild(this.labelIdle.element);
    this.labelIdle.text = 'Podcast Player';

    this.labelTitle = new Label('title');
    this.container.appendChild(this.labelTitle.element);

    this.playButton = new PlayButton();
    this.container.appendChild(this.playButton.element);
    this.playButton.onClick = this.onPlayClick.bind(this);

    this.progressBar = new ProgressBar();
    this.container.appendChild(this.progressBar.element);
    this.progressBar.onSeekUpdate = this.onSeekUpdate.bind(this);

    this.volumeControl = new VolumeControl();
    this.container.appendChild(this.volumeControl.element);
    this.volumeControl.onUpdate = this.onVolumeUpdate.bind(this);
    this.volumeControl.ratio = this.settings.get('volume');

    this.speedButton = new SpeedButton();
    this.container.appendChild(this.speedButton.element);
    this.speedButton.onChange = this.onSpeedChange.bind(this);
    this.speedButton.speed = this.settings.get('speed');

    this._state = -1;
    this.state = Player.IDLE;
    this.onChangeState = null;
    this.playing = false;

    var lastEntry = this.settings.get('entry');
    if (lastEntry && autoSave) {
      this.play(lastEntry, false);
      this.audio.currentTime = this.settings.get('time');
    }
  }

  play(data, save=true) {
    this.playing = true;
    if (data) {
      if (data !== this.data) {
        this.data = data;
        if (save) {
          this.settings.set('entry', data);
          this.settings.set('time', 0);
          this.settings.save();
        }
        this.audio.autoPlay = true;
        this.progressBar.loadRatio = 0;
        this.progressBar.timeRatio = 0;
        this.audio.currentTime = 0;
        this.audio.src = data['audio_url'];
        this.labelTitle.text = data.title;
        this.state = Player.LOADING;
      } else {
        this.audio.play();
      }
    } else {
      this.audio.play();
    }
  }

  pause() {
    this.playing = false;
    this.audio.pause();
  }

  onPlayClick() {
    if (!this.audio.paused) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
  }

  onSpeedChange() {
    this.audio.playbackRate = this.speedButton.speed;
    this.audio.defaultPlaybackRate = this.speedButton.speed;
    this.settings.set('speed', this.speedButton.speed, true);
  }

  onVolumeUpdate() {
    this.audio.volume = this.volumeControl.ratio;
    this.settings.set('volume', this.volumeControl.ratio, true);
  }

  onSeekUpdate() {
    var time = this.audio.duration*this.progressBar.timeRatio;
    this.audio.currentTime = time;
  }

  onCanPlay() {
    this.audio.play();
  }

  onPlay() {
    this.state = Player.PLAYING;
  }

  onPause() {
    this.state = Player.PAUSED;
  }

  onLoadStart() {
    this.state = Player.LOADING;
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
    var delta = Math.abs(this.settings.get('time') - this.audio.currentTime);
    if (delta > 5) {
      this.settings.set('time', this.audio.currentTime, true);
    }
  }

  get state() {
    return this._state;
  }

  set state(value) {
    if (value !== this._state) {
      this._state = value;
      this.updateState();
    }
  }

  updateState() {
    this.intro.style.display = this._state === Player.IDLE ? 'block' : 'none';
    this.container.style.display = this._state !== Player.IDLE ? 'block' : 'none';
    this.playButton.state = this._state;
    if (this.onChangeState) {
      this.onChangeState(this._state);
    }
  }
}

Player.IDLE = 0;
Player.LOADING = 1;
Player.PLAYING = 2;
Player.PAUSED = 3;

window.PodcastPlayer = Player;
