import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { Chervyak } from './componennts/Chervyak/chervyak'
import { Apple } from './componennts/Apple/apple'
import { ICherv } from './Interfaces/ICherv'
import { MouseControll } from './componennts/MouseControll/MouseControll'
import { GameOverBoard } from './componennts/GameOverBoard/GameOverBoard'
import { StartBoard } from './componennts/StartBoard/StartBoard'
import { Timer } from './componennts/Timer/Timer'

const getDeviceType = () => {
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return 'mobile'
  }
  return 'desktop'
}

const userDevice = getDeviceType()

function App() {
  const BOARD_LENGTH = 10
  const [direction, setDirection] = useState('right')
  const [blocked, setBlocked] = useState('left')
  const [Chervi, setChervi] = useState<ICherv[]>([
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ])

  const [speed, setSpeed] = useState(1)
  const [score, setScore] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [bestTime, setBestTime] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const isTrainCheck = (element: ICherv, i: number) => {
    const x = i % BOARD_LENGTH
    const y = Math.floor(i / BOARD_LENGTH)
    return element.x === x && element.y === y
  }

  const format = (time: number) => {
    let hours = Math.floor((time / 60 / 60) % 24)
    let min = Math.floor((time / 60) % 60)
    let sec = Math.floor(time % 60)

    const formattedHours = hours < 10 ? '0' + hours : hours.toString()
    const formattedMinutes = min < 10 ? '0' + min : min.toString()
    const formattedSeconds = sec < 10 ? '0' + sec : sec.toString()

    return formattedHours + ':' + formattedMinutes + ':' + formattedSeconds
  }

  const pressKeyHandler = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
          if (blocked !== 'right') {
            setDirection('right')
          }
          break
        case 'ArrowLeft':
          if (blocked !== 'left') {
            setDirection('left')
          }
          break
        case 'ArrowUp':
          if (blocked !== 'up') {
            setDirection('up')
          }
          break
        case 'ArrowDown':
          if (blocked !== 'down') {
            setDirection('down')
          }
          break
        default:
          break
      }
    },
    [direction, blocked]
  )

  const generateApple = () => {
    const x = Math.floor(Math.random() * BOARD_LENGTH)
    const y = Math.floor(Math.random() * BOARD_LENGTH)
    return { x, y }
  }

  const [gameOver, setGameOver] = useState(false)
  const [apple, setApple] = useState(generateApple())
  const [isGame, setIsGame] = useState(false)

  const StartGameHandler = () => {
    setSpeed(1)
    setScore(0)
    setGameOver(false)
    setIsGame(true)
    setDirection('right')
    setBlocked('left')
    setChervi([
      { x: 1, y: 0 },
      { x: 0, y: 0 },
    ])
    setApple(generateApple())
  }

  useEffect(() => {
    if (apple.x === Chervi[0].x && apple.y === Chervi[0].y) {
      setApple(generateApple())
      const newCherv = [...Chervi]
      const tail = { ...newCherv[newCherv.length - 1] }
      setScore((prev) => (prev += 100))
      if (score % 200 === 0 && speed < 13) {
        setSpeed((prev) => prev + 1)
      }
      newCherv.push(tail)
      setChervi(newCherv)
    }
    for (let i = 1; i < Chervi.length; i++) {
      if (Chervi[0].x === Chervi[i].x && Chervi[0].y === Chervi[i].y) {
        setGameOver(true)
        if (score > bestScore) {
          localStorage.setItem('bestScore', JSON.stringify(score))
          setBestScore(score)
          localStorage.setItem('bestTime', JSON.stringify(currentTime))
          setBestTime(currentTime)
        } else if (score === bestScore && currentTime < bestTime) {
          localStorage.setItem('bestTime', JSON.stringify(currentTime))
          setBestTime(currentTime)
        }
      }
    }
  }, [apple, Chervi, bestScore, score, speed])

  const chervMoveHandler = useCallback(() => {
    const newChervi = [...Chervi]
    const ChervHead = { ...newChervi[0] }
    switch (direction) {
      case 'right':
        setBlocked('left')
        ChervHead.x > BOARD_LENGTH - 2 ? (ChervHead.x = 0) : (ChervHead.x += 1)
        break

      case 'left':
        setBlocked('right')
        ChervHead.x < 1 ? (ChervHead.x = 9) : (ChervHead.x -= 1)
        break

      case 'up':
        setBlocked('down')
        ChervHead.y < 1 ? (ChervHead.y = 9) : (ChervHead.y -= 1)
        break

      case 'down':
        setBlocked('up')
        ChervHead.y > BOARD_LENGTH - 2 ? (ChervHead.y = 0) : (ChervHead.y += 1)
        break
    }
    newChervi.unshift(ChervHead)
    if (newChervi.length > 1) {
      newChervi.pop()
    }
    setChervi(newChervi)
  }, [Chervi, direction, blocked])

  useEffect(() => {
    const moveInterval = setInterval(chervMoveHandler, 750 - speed * 50)
    return () => {
      clearInterval(moveInterval)
    }
  }, [chervMoveHandler, speed])

  useEffect(() => {
    document.addEventListener('keydown', pressKeyHandler)
    return () => {
      document.removeEventListener('keydown', pressKeyHandler)
    }
  }, [pressKeyHandler])

  useEffect(() => {
    const newBestScore = localStorage.getItem('bestScore')
    if (!newBestScore) {
      localStorage.setItem('bestScore', JSON.stringify(0))
    } else {
      setBestScore(Number(newBestScore))
    }
  }, [bestScore])

  useEffect(() => {
    const newBestTime = localStorage.getItem('bestTime')
    if (!newBestTime) {
      localStorage.setItem('bestTime', JSON.stringify(0))
    } else {
      setBestTime(Number(newBestTime))
    }
  }, [bestTime])

  return (
    <div className='App'>
      <main>
        <div className='game'>
          <h1>Chervyak Offline</h1>
          <div className='centerGrid'>
            <section className='GameInfo'>
              {isGame && (
                <>
                  <p>Score: {score}</p>
                  <p>Speed: {speed}</p>
                  <Timer
                    running={isGame && !gameOver}
                    updTime={setCurrentTime}
                    formation={format}
                  />
                </>
              )}
            </section>
            {!isGame ? (
              <StartBoard
                startFn={StartGameHandler}
                bScore={bestScore}
                bTime={bestTime}
                formation={format}
              />
            ) : (
              <div className='gameBoard'>
                {!gameOver ? (
                  <Apple x={apple.x} y={apple.y} />
                ) : (
                  <GameOverBoard
                    startFn={StartGameHandler}
                    bScore={bestScore}
                    bTime={bestTime}
                    formation={format}
                  />
                )}
                {Array.from({ length: BOARD_LENGTH * BOARD_LENGTH }, (_, i) => (
                  <div className='cell' key={i}>
                    {!gameOver &&
                      Chervi.some((element) => isTrainCheck(element, i)) && (
                        <Chervyak
                          isHead={isTrainCheck(Chervi[0], i)}
                          dir={direction}
                        />
                      )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {userDevice !== 'desktop' ? (
          <MouseControll blocked={blocked} setDir={setDirection} />
        ) : (
          <></>
        )}
      </main>
      <footer>🪱 Created by main чорвяк of the world uglystasik</footer>
    </div>
  )
}

export default App
