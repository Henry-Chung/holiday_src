import React from "react";

let dialogStyles = {
  width: "500px",
  maxWidth: "100%",
  margin: "0 auto",
  position: "fixed",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
  zIndex: "999",
  backgroundColor: "#eee",
  padding: "10px 20px 40px",
  borderRadius: "8px",
  display: "flex",
  flexDirection: "column"
};

let dialogCloseButtonStyles = {
  marginBottom: "15px",
  padding: "3px 8px",
  cursor: "pointer",
  borderRadius: "50%",
  border: "none",
  width: "30px",
  height: "30px",
  fontWeight: "bold",
  alignSelf: "flex-end"
};

export default class Notes extends React.Component {
  render() {
    let notes = (
      <div style={dialogStyles}>
        <button style={dialogCloseButtonStyles} onClick={this.props.onClose}>
          x
        </button>
        <div align="left">{this.props.children}</div>
      </div>
    );

    if (!this.props.isOpen) {
      notes = null;
    }
    return <div>{notes}</div>;
  }
}
