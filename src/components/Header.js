import React, { Component } from "react";

import { Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <nav>
          <Link to="/">
            <button>Home</button>
          </Link>

          <Link to="/collections">
            <button>Collections</button>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
