import './App.css'
import { useState } from 'react';



function Square({value, onSquareClick}: {value: string, onSquareClick: () => void}) {

  function handleClick(): void {
    onSquareClick()
  }
  return ( 
    <button 
      className='square'
      onClick={handleClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [squares, setSquares] = useState<Array<string>>(Array(9).fill(''));
  const [setX, changeSetItem] = useState<boolean>(true)
  function calcurateWinner(squares: Array<string>): string {
    const lines : Array<Array<number>> = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    let winner : string = ''
    lines.forEach(line => {
      const [a, b, c] = line
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        winner = squares[a];
      }
    })
    return winner

  }

  function handleClick(i: number) {
    
    const winner : string = calcurateWinner(squares)
    const nextSquares : Array<string> = squares.slice();

    if (nextSquares[i] != '' || winner != '') return ;

    if (setX) {
      nextSquares[i] = 'X'
      changeSetItem(false)
    }
    else {
      nextSquares[i] = 'O'
      changeSetItem(true)
    }
    setSquares(nextSquares);
  }

  function judgeEnd(squares: Array<string>): boolean {
    let end :boolean = true
    squares.forEach(square => {
      if (square == '') {
        end = false
      }
    })
    return end
  }

  const winner : string = calcurateWinner(squares)

  const end : boolean = judgeEnd(squares)

  let status
  if (winner) {
    status = 'Winner is ' + winner
  } else if (end) {
    status = 'Draw'
  }else {
    status = 'Next player is ' + (setX ? 'X': 'O')
  }
  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}></Square>
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}></Square>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}></Square> 
      </div>
      <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}></Square>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}></Square>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}></Square> 
      </div>
      <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}></Square>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}></Square>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}></Square> 
      </div>
    </>
  
  );
}