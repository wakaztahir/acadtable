import React, { Component } from "react";

import { Link } from "react-router-dom";

class Batches extends Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/batches/create">Create Batch</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Batches;
