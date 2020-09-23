import React from "react";
import { connect } from "react-redux";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { count, dispatch } = this.props;
    console.log(this.props);
    return (
      <div className="wraper">
        <button
          style={{ margin: "0 5px" }}
          onClick={() => dispatch({ type: "MINUS" })}
        >
          MINUS
        </button>
        <span style={{ margin: "0 5px" }}>{count}</span>
        <button
          style={{ margin: "0 5px" }}
          onClick={() => dispatch({ type: "ADD" })}
        >
          ADD
        </button>
        <button
          style={{ margin: "0 5px" }}
          onClick={() => dispatch({ type: "ADD_ASYNC" })}
        >
          ADD_ASYNC
        </button>
      </div>
    );
  }
}

export default connect((state) => state)(Counter);
