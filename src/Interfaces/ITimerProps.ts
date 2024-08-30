export interface ITimerProps {
  running: boolean
  updTime: (time: number) => void
  formation: (time: number) => string
}
