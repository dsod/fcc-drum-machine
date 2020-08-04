import React from "react";

type DisplayProps = {
  struckDrumName: string;
};

export default class Diplay extends React.Component<DisplayProps, {}> {
  render() {
    return <div id="display">{this.props.struckDrumName}</div>;
  }
}
