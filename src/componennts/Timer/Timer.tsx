import { useEffect, useState, FC, useRef } from 'react'
import { ITimerProps } from '../../Interfaces/ITimerProps'
import './Timer.css'

export const Timer: FC<ITimerProps> = ({ running, updTime, formation }) => {
  const [time, setTime] = useState(0)

  const timer = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      timer.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1
          updTime(newTime)
          return newTime
        })
      }, 1000)
    } else {
      setTime(0)
    }
    return () => {
      if (timer.current !== null) {
        clearInterval(timer.current)
      }
    }
  }, [running])

  return <div className='timer'>Time: {formation(time)}</div>
}
