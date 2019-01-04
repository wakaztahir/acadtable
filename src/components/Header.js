import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button>Main Page</button>
        </Link>
        <Link to="/tables">
          <button>Tables</button>
        </Link>
      </div>
    );
  }
}

export default connect(
  null,
  {}
)(Header);
