import React, { useEffect, useRef } from "react";

export default function UseRefDemo() {
  // 声明一个新的叫做 “count” 的 state 变量
  const ref = useRef();

  useEffect(() => {
    let timer = setInterval(() => {
      ref.current.innerText = new Date().getTime();
    }, 1000);
  });

  return (
    <div>
      当前时间：
      <span ref={ref}></span>
    </div>
  );
}
