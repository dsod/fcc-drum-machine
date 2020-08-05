import React, { MouseEvent } from "react";
import { DrumPadType } from "../App";

type DrumPadProps = {
  drumPads: DrumPadType;
  setLastStruckedDrum: (name: string) => void;
};

type DrumPadState = {
  buttonPressed: boolean;
};

export default class DrumPad extends React.Component<DrumPadProps, DrumPadState> {
  state = {
    buttonPressed: false,
  };

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
    if (e.keyCode === this.props.drumPads.keyCode) {
      this.playAudio();
      this.props.setLastStruckedDrum(this.props.drumPads.name);
      this.triggerAnimation();
    }
  };

  triggerAnimation = () => {
    this.setState({
      buttonPressed: !this.state.buttonPressed,
    });
    setTimeout(() => {
      this.setState({
        buttonPressed: !this.state.buttonPressed,
      });
    }, 40);
  };

  playAudio = (e: MouseEvent | null = null) => {
    const audioElement = document.getElementById(this.props.drumPads.hotkey) as HTMLAudioElement;
    audioElement.currentTime = 0;
    audioElement?.play();
  };

  render() {
    const buttonAnimation = this.state.buttonPressed ? "drum-struck" : "";
    return (
      <div className="drum-pad-wrapper">
        <button
          className={"drum-pad " + buttonAnimation}
          id={this.props.drumPads.name.toLowerCase().split(" ").join("-")}
          onClick={() => {
            this.playAudio();
            this.props.setLastStruckedDrum(this.props.drumPads.name);
            this.triggerAnimation();
          }}
          key={this.props.drumPads.name.toLowerCase().split(" ").join("-")}
        >
          {this.props.drumPads.hotkey}
          <audio className="clip" id={this.props.drumPads.hotkey} src={this.props.drumPads.audioSrc} />
        </button>
      </div>
    );
  }
}
