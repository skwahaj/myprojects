import React, { useState } from "react";

export const UndoRedu = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [redu, setRedu] = useState([]);
  console.log(redu);

  const handleAdd = () => {
    // const addData = data.addData;
    setData([...data, text]);
  };
 
  const handleRedu = () => {
    const result = redu.length - 1;
    const flt = redu.filter((item, i) => result == i);
    console.log(flt);
    const newData = redu.pop();
    setData([...data, ...flt]);
  };

  const handleUndo = () => {
    const result = data.length - 1;
    const flt = data.filter((item, i) => result == i);
    setRedu([...redu, ...flt]);
    console.log(flt);
    const newData = data.pop();
    setData([...data]);
  };
  // const handleRedo = () => {};

  return (
    <>
      <h1>Task</h1>
      <input type="text" onChange={(e) => setText(e.target.value)} />
      <button onClick={handleUndo}>undo</button>
      <button onClick={handleAdd}>add</button>
      <button onClick={handleRedu}>redo</button>

      {data.length > 0 &&
        data.map((item) => {
          return (
            <div>
              <h1>{item}</h1>
            </div>
          );
        })}
    </>
  );
};