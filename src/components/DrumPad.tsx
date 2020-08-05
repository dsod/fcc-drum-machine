import React, { MouseEvent } from "react";
import { DrumPadType } from "../App";

type DrumPadProps = {
  drumPads: DrumPadType;
  setLastStruckedDrum: (name: string) => void;
};

export default class DrumPad extends React.Component<DrumPadProps, {}> {
  componentWillMount() {
    // Using Vanilla JS to handle keybindings since my use-case are simple, instead of a react specific library
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.handleKeyPress(e);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress = (e: KeyboardEvent) => {
    console.log(e.keyCode, this.props.drumPads.keyCode);
    if (e.keyCode === this.props.drumPads.keyCode) {
      this.playAudio();
      this.props.setLastStruckedDrum(this.props.drumPads.name);
    }
  };

  playAudio = (e: MouseEvent | null = null) => {
    const audioElement = document.getElementById(
      this.props.drumPads.hotkey
    ) as HTMLAudioElement;
    audioElement.currentTime = 0;
    audioElement?.play();
  };

  render() {
    return (
      <div className="drum-pads">
        <button
          className="drum-pad"
          id={this.props.drumPads.name.toLowerCase().split(" ").join("-")}
          onClick={this.playAudio}
          key={this.props.drumPads.name.toLowerCase().split(" ").join("-")}
        >
          {this.props.drumPads.hotkey}
          <audio
            className="clip"
            id={this.props.drumPads.hotkey}
            src={this.props.drumPads.audioSrc}
          />
        </button>
      </div>
    );
  }
}
