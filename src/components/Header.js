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

          <Link to="/tables">
            <button>Tables</button>
          </Link>

          <Link to="/batches">
            <button>Batches</button>
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;
