import React, { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError() {
    return { error: true };
  }

  render() {
    return (
      <>
        {this.state.error ? (
          <h1>Custome Page For Error Handling</h1>
        ) : (
          this.props.children
        )}
      </>
    );
  }
}
