import React, { Component } from "react";

import Block from "./Block";

import { connect } from "react-redux";

import { deleteBlock } from "../../actions";

class Table extends Component {
  state = {
    blocks: this.props.blocks
  };
  render() {
    let base = this.props.base;
    let BaseBlockKey = this.props.baseBlockKey;
    let rows = this.props.rows;
    let RowsBlockKey = this.props.rowsBlockKey;
    let cols = this.props.cols;
    let ColsBlockKey = this.props.colsBlockKey;
    let blocks = this.state.blocks;
    let mode = this.props.mode;
    return (
      <div key={this.props.id}>
        <table>
          <thead>
            <tr>
              <td>{base != null ? base.name : null}</td>
              {cols.map(col => {
                return <td key={"c" + col.id}>{col.name}</td>;
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map(row => {
              return (
                <tr key={"r" + row.id}>
                  <td>{row.name}</td>
                  {cols.map(col => {
                    let block = blocks.filter(
                      block =>
                        block[BaseBlockKey] === base.id &&
                        block[RowsBlockKey] === row.id &&
                        block[ColsBlockKey] === col.id
                    );
                    if (block.length === 0) {
                      if (mode === "print") {
                        return <td key={"emp" + col.id} />;
                      }
                      return (
                        <td
                          onClick={() => {
                            let params = {};
                            params[BaseBlockKey] = base.id;
                            params[RowsBlockKey] = row.id;
                            params[ColsBlockKey] = col.id;
                            this.props.displayAddModal(params);
                          }}
                          key={"b" + col.id}
                        >
                          <button>+</button>
                        </td>
                      );
                    } else {
                      return (
                        <td key={"b" + col.id} className="table-block">
                          <Block
                            block={block[0]}
                            delete={id =>
                              this.props.deleteBlock(
                                this.props.collectionID,
                                id
                              )
                            }
                          />
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { blocks: state.BlocksList };
};

export default connect(
  mapStateToProps,
  {
    deleteBlock
  }
)(Table);
