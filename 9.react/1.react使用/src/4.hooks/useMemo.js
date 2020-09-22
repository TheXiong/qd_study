//useMemo,useCallback
import React, { memo, useMemo, useCallback, useState } from "react";

// memo可以自动比较props传入的参数是否改变，也可以在memo函数第二个参数自定义比较，实现shouldComponentUpdate的功能
const Foo = memo((props) => {
  let count = props.count;
  console.log("函数重新渲染");
  return <div onClick={props.addCount}>count:{count}</div>;
});

const App = memo(() => {
  const [count, setCount] = useState(0);
  let double = useMemo(() => {
    return count * 2;
  }, [count == 3]);
  let addCount = useCallback(() => {
    //useCallback 可以看成useMemo返回函数时的简写，赋值给onClick 不会引发函数重新渲染
    setCount((count) => count + 1);
  }, []); //括号可以看成依赖数组，当为空时，只有第一次挂载时才会渲染，当有数据时如[count]，当count改变时才会改变，有多个数据时，所有数据改变时才会改变
  // const addCount=()=>{
  //   setCount((count) => count + 1)
  // }
  return (
    <div>
      <Foo addCount={addCount} count={double}></Foo>
      <button
        onClick={() => {
          setCount((count) => count + 1);
        }}
      >
        count+1
      </button>
    </div>
  );
});
export default App;
