import { FC } from 'react'
import './StartBoard.css'
import { IGameProps } from '../../Interfaces/IGameProps'

export const StartBoard: FC<IGameProps> = ({
  startFn,
  bScore,
  bTime,
  formation,
}) => {
  return (
    <div className='startWindow'>
      <p>READY?</p>
      <p>Best score {bScore}</p>
      <p>Best time {formation(bTime)}</p>
      <button onClick={startFn}>GO</button>
    </div>
  )
}
