import { IchervProps } from '../../Interfaces/IChervProps'
import './chervyak.css'

const getRotate = (direction: string) => {
  switch (direction) {
    case 'right':
      return '270deg'
    case 'left':
      return '90deg'
    case 'up':
      return '180deg'
    case 'down':
      return '0deg'
    default:
      break
  }
}

export const Chervyak = (data: IchervProps) => {
  return (
    <div
      className={data.isHead ? 'chervHead' : 'cherv'}
      style={data.isHead ? { transform: `rotate(${getRotate(data.dir)})` } : {}}
    ></div>
  )
}
