export interface IGameProps {
  startFn: () => void
  bScore: number
  bTime: number
  formation: (time: number) => string
}
