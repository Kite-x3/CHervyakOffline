import { FC } from 'react'
import './MouseControll.css'

type TMosueControllProps = {
  setDir: (data: string) => void
  blocked: string
}

export const MouseControll: FC<TMosueControllProps> = ({ setDir, blocked }) => {
  const SetDirController = (data: string) => {
    switch (data) {
      case 'ArrowRight':
        if (blocked !== 'right') {
          setDir('right')
        }
        break
      case 'ArrowLeft':
        if (blocked !== 'left') {
          setDir('left')
        }
        break
      case 'ArrowUp':
        if (blocked !== 'up') {
          setDir('up')
        }
        break
      case 'ArrowDown':
        if (blocked !== 'down') {
          setDir('down')
        }
        break
      default:
        break
    }
  }
  return (
    <div className='controll'>
      <div>
        <button onClick={() => SetDirController('ArrowLeft')}>←</button>
        <button onClick={() => SetDirController('ArrowRight')}>→</button>
      </div>
      <div>
        <button onClick={() => SetDirController('ArrowUp')}>↑</button>
        <button onClick={() => SetDirController('ArrowDown')}>↓</button>
      </div>
    </div>
  )
}
