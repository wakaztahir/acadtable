import React, { Component } from "react";

import {
  downloadPNG,
  downloadJPEG,
  downloadPDF
} from "../../actions/downloader";

class Exporter extends Component {
  render() {
    let screen = this.props.screen;
    return (
      <div>
        <h1>Export As</h1>
        <label htmlFor="">Document Form</label>&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            screen.props.showModal();
            screen.setState({
              tableMode: "pdfrender render",
              downloader: downloadPDF,
              download: true
            });
          }}
        >
          PDF
        </button>
        <br />
        <br />
        <label htmlFor="">Image Form</label>&nbsp;&nbsp;&nbsp;
        <button
          onClick={() => {
            screen.props.showModal();
            screen.setState({
              tableMode: "imgrender render",
              downloader: downloadPNG,
              download: true
            });
          }}
        >
          PNG
        </button>
        &nbsp;
        <button
          onClick={() => {
            screen.props.showModal();
            screen.setState({
              tableMode: "imgrender render",
              downloader: downloadJPEG,
              download: true
            });
          }}
        >
          JPEG
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            screen.props.unshowModal();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default Exporter;
