import PlayButton from './PlayButton';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

export default class Player {
  constructor(element) {
    this.element = element;

    this.playButton = new PlayButton();
    this.element.appendChild(this.playButton.element);

    this.progressBar = new ProgressBar();
    this.element.appendChild(this.progressBar.element);
    this.progressBar.ratio = 0.75;

    this.volumeControl = new VolumeControl();
    this.element.appendChild(this.volumeControl.element);
  }
}

window.Player = Player;
