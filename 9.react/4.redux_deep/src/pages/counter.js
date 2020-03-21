import React from "react";
import store from "../store";
import * as actions from "../action.js";
import {bindActionCreators} from "../../redux";

// function bindActionCreators(actions,dispatch){
//   let newAction = {}
//   for (const type in actions) {
//     newAction[type] = ()=>{
//       dispatch(actions[type]())
//     }
//   }
//   return newAction
// }
let newActions = bindActionCreators(actions,store.dispatch)

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: store.getState().root.count
    };
  }
  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        count: store.getState().root.count
      })
    });
  }
  render() {
    return (
      <div className="wraper">
        {/* <span style={{margin:"10px",cursor:"pointer"}} onClick={()=>store.dispatch(actions.asyncMinus())}>async-</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={()=>store.dispatch(actions.minus())}>-</span>
        <span style={{margin:"10px"}}>{this.state.count}</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={()=>store.dispatch(actions.add())}>+</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={()=>store.dispatch(actions.asyncAdd())}>async+</span> */}
        <span style={{margin:"10px",cursor:"pointer"}} onClick={newActions.asyncMinus}>async-</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={newActions.minus}>-</span>
        <span style={{margin:"10px"}}>{this.state.count}</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={newActions.add}>+</span>
        <span style={{margin:"10px",cursor:"pointer"}} onClick={newActions.asyncAdd}>async+</span>
      </div>
    );
  }
}
