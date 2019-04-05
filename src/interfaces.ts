export interface FixedUxEvent {
  score: number
  description: string
}

export interface UxEvent extends FixedUxEvent {
  date: Date
}
