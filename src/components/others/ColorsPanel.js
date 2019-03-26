import React, { Component } from "react";

import { COLORS } from "../../actions/helpers";

class ColorsPanel extends Component {
  render() {
    return (
      <div style={this.props.style == null ? {} : this.props.style}>
        {COLORS.map(color => {
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
