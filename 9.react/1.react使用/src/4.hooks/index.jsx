import React from "react";
import UseStateDemo from "./useStateDemo.js";
import UseEffectDemo from "./useEffectDemo.js";
import UseRef from "./useRef.js";
import ForwardRef from "./forwardRef.js";

export default function Hooks() {
  return (
    <>
      UseStateDemo:
      <UseStateDemo />
      <br />
      UseEffectDemo:
      <UseEffectDemo />
      <br />
      UseRef:
      <UseRef />
      <br/>
      ForwardRef:
      <ForwardRef />
    </>
  );
}
