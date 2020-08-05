import React from "react";
import "./App.scss";
import DrumPad from "./components/DrumPad";
import Display from "./components/Display";

export type DrumPadType = {
  audioSrc: string;
  name: string;
  hotkey: string;
  keyCode: number;
};

type DrumMachineState = {
  struckDrumName: string;
  drumPads: DrumPadType[];
};

class DrumMachine extends React.Component<{}, DrumMachineState> {
  state = {
    struckDrumName: "Play a drum...",
    drumPads: [
      {
        audioSrc: "./audio/Hi Hats 1.wav",
        name: "Hi Hat 1",
        hotkey: "Q",
        keyCode: 81,
      },
      {
        audioSrc: "./audio/Hi Hats 2.wav",
        name: "Hi Hat 2",
        hotkey: "W",
        keyCode: 87,
      },
      {
        audioSrc: "./audio/Hi Hats 3.wav",
        name: "Hi Hat 3",
        hotkey: "E",
        keyCode: 69,
      },
      {
        audioSrc: "./audio/Snare Drum 1.wav",
        name: "Snare Drum 1",
        hotkey: "A",
        keyCode: 65,
      },
      {
        audioSrc: "./audio/Snare Drum 2.wav",
        name: "Snare Drum 2",
        hotkey: "S",
        keyCode: 83,
      },
      {
        audioSrc: "./audio/Clap 1.wav",
        name: "Clap 1",
        hotkey: "D",
        keyCode: 68,
      },
      {
        audioSrc: "./audio/Clap 2.wav",
        name: "Clap 2",
        hotkey: "Z",
        keyCode: 90,
      },
      {
        audioSrc: "./audio/Bass Drum 1.wav",
        name: "Bass Drum 1",
        hotkey: "X",
        keyCode: 88,
      },
      {
        audioSrc: "./audio/Bass Drum 2.wav",
        name: "Bass Drum 2",
        hotkey: "C",
        keyCode: 67,
      },
    ],
  };

  setLastStruckedDrum = (drumName: string) => {
    this.setState({
      struckDrumName: drumName,
    });
  };

  render() {
    return (
      <div className="App">
        <div id="drum-machine" className="drum-container">
          <Display struckDrumName={this.state.struckDrumName} />
          <div className="drum-pads">
            {this.state.drumPads.map((drum) => (
              <DrumPad drumPads={drum} setLastStruckedDrum={this.setLastStruckedDrum} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DrumMachine;
