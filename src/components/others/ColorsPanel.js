import React, { Component } from "react";

const colors = [
  "#fff60c",
  "#73ff81",
  "#ff5e52",
  "#fff00",
  "#6777eb",
  "#a7e034"
];

class ColorsPanel extends Component {
  render() {
    return (
      <div style={this.props.style == null ? {} : this.props.style}>
        {colors.map(color => {
          let addClass = color === this.props.color ? "selected" : "";
          return (
            <span
              className={"color-btn " + addClass}
              style={{ background: color }}
              key={"color" + color}
              onClick={() => {
                this.props.change(color);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default ColorsPanel;
