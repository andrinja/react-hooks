import React, { Component } from "react";

class App extends Component {
  state = {
    count: 0,
    isOn: false,
    x: null,
    y: null
  };

  componentDidMount() {
    document.title = `You have been clicked ${this.state.count} times`;
    // when component mounts an active listener is set up
    window.addEventListener("mousemove", this.handleMouseMove);
  }

  componentDidUpdate() {
    document.title = `You have been clicked ${this.state.count} times`;
  }

  componentWillUnmount() {
    // remove listener when component unmounts. To avoid memory leak
    window.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseMove = event => {
    this.setState({
      x: event.pageX,
      y: event.pageY
    });
  };

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  toggleLight = () => {
    this.setState(prevState => ({
      isOn: !prevState.isOn
    }));
  };

  render() {
    return (
      <>
        <title></title>
        <button onClick={this.incrementCount}>
          This was clicked {this.state.count}
        </button>
        <h3>Toggle Light</h3>
        <div
          style={{
            width: "50px",
            height: "50px",
            background: this.state.isOn ? "yellow" : "grey"
          }}
          onClick={this.toggleLight}
        ></div>
        <h2>Mouse position</h2>
        <p>X position: {this.state.x}</p>
        <p>Y position: {this.state.y}</p>
      </>
    );
  }
}

export default App;
