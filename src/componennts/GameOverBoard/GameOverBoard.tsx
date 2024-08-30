import { FC } from 'react'
import './GameOverBoard.css'
import { IGameProps } from '../../Interfaces/IGameProps'

export const GameOverBoard: FC<IGameProps> = ({
  startFn,
  bScore,
  bTime,
  formation,
}) => {
  return (
    <div className='gameOverBoard'>
      <h2 className='gameOverText'>Game over</h2>
      <p>Best score {bScore}</p>
      <p>Best time {formation(bTime)}</p>
      <p>Want to try again?</p>
      <button onClick={startFn}>GO</button>
    </div>
  )
}
