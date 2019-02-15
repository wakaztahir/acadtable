import React, { Component } from "react";

class Table extends Component {
  render() {
    let base = this.props.base;
    let BaseBlockKey = this.props.baseBlockKey;
    let rows = this.props.rows;
    let RowsBlockKey = this.props.rowsBlockKey;
    let cols = this.props.cols;
    let ColsBlockKey = this.props.colsBlockKey;
    let blocks = this.props.blocks;
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
                      return (
                        <td
                          onClick={() => {
                            let params = {};
                            params[BaseBlockKey] = this.props.id;
                            params[RowsBlockKey] = row.id;
                            params[ColsBlockKey] = col.id;
                          }}
                          key={"b" + col.id}
                        >
                          +
                        </td>
                      );
                    } else {
                      return <td key={"b" + col.id}>{block[0].text}</td>;
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

export default Table;
