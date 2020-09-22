import React, { useState, useEffect } from "react";

export default function UseEffectDemo() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((x) => x + 1);
    }, 1000);
    return () => {
      //每次卸载组件前都会执行
      console.log("clear");
      clearTimeout(timer)
    };
  }, [count]); //传空数组只是第一次渲染执行，否则依赖存在变化就会执行


  return (
    <div>
      <p>count {count} times per 1s</p>
    </div>
  );
}
