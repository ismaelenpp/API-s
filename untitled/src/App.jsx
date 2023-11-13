import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import {Square} from './components/Square'
import {TURNS} from './components/constant.js'
import './App.css'
import confetti from 'canvas-confetti'
import { WinnerModal } from './Components/WinnerModal.jsx'
import { checkWinner, checkEndGame } from './logic/board.js'

function App() {
    const [board, setBoard ]= useState(() => {
        const boardFromStorage = window.localStorage.getItem('board')
        if (boardFromStorage) {
            return JSON.parse(boardFromStorage)
        }
        return Array(9).fill(null)
    })
    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem('turn')
        if (turnFromStorage) {
            return turnFromStorage
        }
        return TURNS.X
    })
    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)
        window.localStorage.removeItem('board')
        window.localStorage.removeItem('turn')
    }

    const updateBoard = (index) => {
        if (board[index] || winner) {
            return
        }
        const newBoard = [...board]
        newBoard[index] = turn
        setBoard(newBoard)

        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        window.localStorage.setItem('board', JSON.stringify(newBoard))
        window.localStorage.setItem('turn', newTurn)
        
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            alert('Empate')
            setWinner(false)
        }

    }

  return(
    <main className='board'>
    <h1>Tic tac toe</h1>
        <section className='game'>
            {
                board.map((_, index) => {
                    return (
                        <Square key={index} index={index} updateBoard={updateBoard}>
                            {board[index]}
                        </Square>
                            )
                })
            }
        </section>

            <section className="turn">
                <Square isSelected={turn === TURNS.x}>{TURNS.X}</Square>
                <Square isSelected={turn === TURNS.o}>{TURNS.O}</Square>
            </section>

            <WinnerModal winner={winner} resetGame={resetGame} />

    </main>

  )

}
export default App
