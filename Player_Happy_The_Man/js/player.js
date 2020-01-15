import audios from "./data.js";
import { path } from "./utils.js";
import elements from "./playerElements.js"
import { secondsToMinutes } from "./utils.js";

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  start() {
    elements.get.call(this);

    this.update();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerText = "pause";
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerText = "play_arrow";
  },
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.vol.innerText = this.audio.muted ? "volume_down" : "volume_up";
  },
  next() {
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart()
    this.update();
    this.play();
  },
  setVolume(value) {
    this.audio.volume = value / 100;
  },
  setSeek(value) {
    this.audio.currentTime = value;
  },
  timeUpdate() {
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
    this.seekbar.value = this.audio.currentTime;
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${path(this.currentAudio.cover)}') no-repeat center center / cover`;
    this.titulo.innerText = this.currentAudio.title;
    this.artista.innerHTML = `<i class='material-icons' style='color: #4097e9;font-size: 12px;'>lens</i> ${this.currentAudio.artist}`;
    elements.createAudioElement.call(this, path(this.currentAudio.file));

    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    };
  },
  restart() {
    this.currentPlaying = 0;
    this.update();
  }
};