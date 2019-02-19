import React, { Component } from "react";

import { connect } from "react-redux";

import Table from "./Table";

import Modal from "../Modal";
import FormEditor from "../collections/areas/FormEditor";

import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

import { selectCollection, createBlock } from "../../actions";

class Display extends Component {
  state = {
    mode: "edit",
    download: false,
    downloadType: "pdf",
    addModal: false,
    addModalParams: {}
  };
  downloadPDF() {
    let screen = this.refs.screen;
    let doc = new jsPDF({ orientation: "landscape" });
    doc.fromHTML(screen);
    doc.save("file.pdf");
  }
  downloadPNG() {
    let screen = this.refs.screen;
    domtoimage
      .toPng(screen, { bgcolor: "#fff" })
      .then(function(dataUrl) {
        let link = document.createElement("a");
        link.href = dataUrl;
        link.download = "file.png";
        link.target = "_blank";
        link.click();
      })
      .catch(error => {
        console.error("Error converting to PNG Image");
      });
  }
  downloadJPEG() {
    let screen = this.refs.screen;
    domtoimage
      .toJpeg(screen, { bgcolor: "#fff" })
      .then(function(dataUrl) {
        let link = document.createElement("a");
        link.download = "file.jpeg";
        link.href = dataUrl;
        link.target = "_blank";
        link.click();
      })
      .catch(error => {
        console.error("Error converting to JPEG Image");
      });
  }
  componentDidUpdate() {
    if (this.state.download) {
      switch (this.state.downloadType) {
        case "pdf":
        default:
          this.downloadPDF();
          break;
        case "png":
          this.downloadPNG();
          break;
        case "jpeg":
          this.downloadJPEG();
          break;
      }
    }
  }
  addModal() {
    let params = this.state.addModalParams;
    if (this.state.addModal) {
      let keys = [
        {
          name: "text",
          required: true,
          locked: true,
          show: false
        },
        {
          name: "name",
          required: true
        },
        { name: "customText" },
        {
          name: "day",
          type: "select",
          list: this.props.days,
          required: true
        },
        {
          name: "place",
          type: "select",
          list: this.props.places,
          required: true
        },
        {
          name: "time",
          type: "select",
          list: this.props.times,
          required: true
        },
        {
          name: "batch",
          type: "select",
          list: this.props.batches,
          required: true
        },
        {
          name: "subject",
          type: "select",
          list: this.props.subjects,
          required: true
        },
        {
          name: "teacher",
          type: "select",
          list: this.props.teachers,
          required: true
        },
        {
          name: "display",
          type: "textarea",
          required: true,
          default: "%batch%%subject%%teacher%"
        }
      ];
      Object.keys(params).forEach(p => {
        if (params[p] !== null) {
          keys.forEach(k => {
            if (k != null && k.name === p) {
              k.default = params[p];
              k.show = false;
            }
          });
        }
      });
      return (
        <Modal
          type="content"
          display={true}
          cancel={() => {
            this.setState({ addModal: false, addModalParams: {} });
          }}
        >
          <FormEditor
            property={{}}
            keys={keys}
            save={data => {
              this.props.createBlock(this.props.selected.id, data);
              this.setState({ addModal: false, addModalParams: {} });
            }}
            nounmount={true}
          />
        </Modal>
      );
    }
  }
  screen() {
    let {
      tables,
      blocks,
      batches,
      days,
      times,
      places,
      subjects,
      teachers
    } = this.props;
    let objector = {
      tables,
      blocks,
      batches,
      days,
      times,
      places,
      subjects,
      teachers
    };

    return (
      <div>
        <h1>Acadtable</h1>
        <div>{this.addModal()}</div>
        <div>
          <button
            onClick={() => {
              this.setState({
                mode: "print",
                downloadType: "pdf",
                download: true
              });
            }}
          >
            Download As PDF
          </button>
          <button
            onClick={() => {
              this.setState({
                mode: "print",
                downloadType: "png",
                download: true
              });
            }}
          >
            Download As PNG
          </button>
          <button
            onClick={() => {
              this.setState({
                mode: "print",
                downloadType: "jpeg",
                download: true
              });
            }}
          >
            Download As JPEG
          </button>
        </div>
        <div>
          <button
            onClick={() => {
              this.setState({ mode: "edit" });
            }}
            className={this.state.mode === "edit" ? "btn-red" : ""}
          >
            edit
          </button>
          <button
            onClick={() => {
              this.setState({ mode: "print" });
            }}
            className={this.state.mode === "print" ? "btn-red" : ""}
          >
            print
          </button>
        </div>
        <div ref="screen">
          {tables.map(table => {
            let base = objector[table.base].filter(
              i => i.id === table.baseValue
            )[0];
            let rows = objector[table.rows];
            let cols = objector[table.cols];
            return (
              <Table
                id={table.id}
                key={table.id}
                mode={this.state.mode}
                base={base}
                rows={rows}
                cols={cols}
                blocks={blocks}
                displayAddModal={params => {
                  Object.keys(objector).map(listName => {
                    let key = listName;
                    if (
                      params[key] == null &&
                      key !== "table" &&
                      key !== "block"
                    ) {
                      params[key] = null;
                    }
                    return null;
                  });
                  this.setState({ addModal: true, addModalParams: params });
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
  render() {
    return this.screen();
  }
}

const mapStateToProps = state => {
  return {
    collections: state.Collections,
    selected: state.User,
    tables: state.Tables,
    days: state.Days,
    places: state.Places,
    times: state.Times,
    blocks: state.Blocks,
    batches: state.Batches,
    subjects: state.Subjects,
    teachers: state.Teachers
  };
};

export default connect(
  mapStateToProps,
  {
    selectCollection,
    createBlock
  }
)(Display);
