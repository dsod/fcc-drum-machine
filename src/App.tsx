import React from "react";
import "./App.scss";
import DrumPad from "./components/DrumPad";
import Display from "./components/Display";

export type DrumPadType = {
  audioSrc: string;
  name: string;
  hotkey: string;
};

type DrumMachineState = {
  struckDrumName: string;
  drumPads: DrumPadType[];
};

class DrumMachine extends React.Component<{}, DrumMachineState> {
  state = {
    struckDrumName: "Play a drum...",
    drumPads: [
      { audioSrc: "./audio/Hi Hats 1.wav", name: "Hi Hat 1", hotkey: "Q" },
      { audioSrc: "./audio/Hi Hats 2.wav", name: "Hi Hat 2", hotkey: "W" },
      { audioSrc: "./audio/Hi Hats 3.wav", name: "Hi Hat 3", hotkey: "E" },
      {
        audioSrc: "./audio/Snare Drum 1.wav",
        name: "Snare Drum 1",
        hotkey: "A",
      },
      {
        audioSrc: "./audio/Snare Drum 2.wav",
        name: "Snare Drum 2",
        hotkey: "S",
      },
      { audioSrc: "./audio/Clap 1.wav", name: "Clap 1", hotkey: "D" },
      { audioSrc: "./audio/Clap 2.wav", name: "Clap 2", hotkey: "Z" },
      {
        audioSrc: "./audio/Bass Drum 1.wav",
        name: "Bass Drum 1",
        hotkey: "X",
      },
      {
        audioSrc: "./audio/Bass Drum 2.wav",
        name: "Bass Drum 2",
        hotkey: "C",
      },
    ],
  };

  componentWillMount() {
    // Using Vanilla JS to handle keybindings since my use-case are simple, instead of a react specific library
    document.addEventListener("keydown", (e: KeyboardEvent) => {
      this.handleKeyDown(e);
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e: KeyboardEvent) => {
    const drumPad = this.state.drumPads.filter(
      (x) => x.hotkey === e.key.toUpperCase()
    );
    if (drumPad.length) {
      const audioSrc: string | null = drumPad[0].audioSrc;
      const drumName: string | null = drumPad[0].name;
      this.playAudio(audioSrc);
      this.setLastStruckedDrum(drumName);
    }
  };

  setLastStruckedDrum = (drumName: string) => {
    this.setState({
      struckDrumName: drumName,
    });
  };

  playAudio = (src: string | null) => {
    if (src) {
      new Audio(src).play();
    }
  };

  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <Display struckDrumName={this.state.struckDrumName} />
          <DrumPad
            drumPads={this.state.drumPads}
            playAudio={this.playAudio}
            setLastStruckedDrum={this.setLastStruckedDrum}
          />
        </div>
      </div>
    );
  }
}

export default DrumMachine;
