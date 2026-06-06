import { useState } from 'react';
import './index.css';
function Square({X,setX}) {
  const [value, setValue] = useState(null);

  function handleClick() {
    if(value){
      return;
    }
    if(X){
      setValue('X');
      setX(false);
    }else{
      setValue('O');
      setX(true);
    }
  }

  return (
    <button
      className="square"
      onClick={handleClick}
    >
      {value}
    </button>
  );
}
export default function Board() {
  const [X,setX] = useState(true);
  return (
    <>
    <h1>下一个落子的玩家是{X ? 'X' : 'O'}</h1>
    <div>
      <div className="board-row">
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />
      </div>
      <div className="board-row">
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />  
      </div>
      <div className="board-row">
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />
        <Square X={X} setX={setX} />
      </div>
    </div>
    </>
  );
}
