import React from "react";
import store from "../store";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().root.count
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      console.log(store.getState());
      this.setState({
        count: store.getState().root.count
      })
    });
  }
  render() {
    return (
      <div className="wraper">
        <div onClick={()=>store.dispatch({type:"MINUS"})}>-</div>
        <div>{this.state.count}</div>
        <div onClick={()=>store.dispatch({type:"ADD"})}>+</div>
      </div>
    );
  }
}
