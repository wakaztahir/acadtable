import React, { Component } from "react";

class List extends Component {
  render() {
    return (
      <div className="list-container">
        {this.props.list.map(item => {
          let selectClass =
            this.props.selected === item.id ? "selected-card" : "";
          let selectedItem = this.props.selected === item.id ? true : false;
          return (
            <div key={item.id} className={`table-card card-box ${selectClass}`}>
              <div className="card-title">{item.name}</div>
              <div className="buttons-list blue">
                {this.props.buttons.map(button => {
                  let restrictSelected =
                    button.selected == null ? false : button.selected;
                  if (restrictSelected) {
                    if (selectedItem) {
                      return null;
                    }
                  }
                  return (
                    <button
                      onClick={() => {
                        button.action(item.id);
                      }}
                      key={button.name}
                    >
                      {button.name}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default List;
