import React, { MouseEvent } from "react";
import { DrumPadType } from "../App";

type DrumPadProps = {
  drumPads: DrumPadType[];
  playAudio: (src: string) => void;
  setLastStruckedDrum: (name: string) => void;
};

export default class DrumPad extends React.Component<DrumPadProps, {}> {
  handleClick = (event: MouseEvent) => {
    const reactAudioElement = event.currentTarget.firstElementChild;
    const drumPad = this.props.drumPads.filter(
      (x) => x.hotkey === reactAudioElement?.getAttribute("id")
    );
    if (drumPad.length) {
      this.props.setLastStruckedDrum(drumPad[0].name);
      this.props.playAudio(drumPad[0].audioSrc);
    }
  };

  render() {
    const drums = this.props.drumPads.map((x) => (
      <button
        className="drum-pad"
        id={x.name.toLowerCase().split(" ").join("-")}
        onClick={this.handleClick}
        key={x.name.toLowerCase().split(" ").join("-")}
      >
        {x.hotkey}
        <audio className="clip" id={x.hotkey} src={x.audioSrc} />
      </button>
    ));
    return <div className="drum-pads">{drums}</div>;
  }
}
