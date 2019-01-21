import React, { Component } from "react";

import { Link } from "react-router-dom";

class Welcome extends Component {
  render() {
    return (
      <div>
        <span>Welcome !</span>
        <p>
          You have't created any collections
          <br />
          <Link to="/collections">Click Here</Link>
        </p>
      </div>
    );
  }
}

export default Welcome;
