import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

function Input(props, ref) {
  const refInput = useRef();
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        refInput.current.focus()
      },
    };
  });
  return (
    <div>
      <input type="text" ref={refInput} />
    </div>
  );
}
let MInput = forwardRef(Input);

export default function parent() {
  // 声明一个新的叫做 “count” 的 state 变量
  const ref = useRef();

  useEffect(() => {
    console.log(ref);
  });
  let handleClick = () => {
    console.log(ref);
    ref.current.focus();
  };

  return (
    <div>
      <button onClick={() => handleClick()}>获得焦点</button>
      <MInput ref={ref} />
    </div>
  );
}
