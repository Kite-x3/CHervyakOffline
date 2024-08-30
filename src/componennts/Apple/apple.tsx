import React from 'react'
import './apple.css'

export const Apple: React.FC<{ x: number; y: number }> = ({ x, y }) => {
  return (
    <div
      className='apple'
      style={{ left: `${x * 32}px`, top: `${y * 32}px` }}
    ></div>
  )
}
