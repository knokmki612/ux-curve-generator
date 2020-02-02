export type FixedUxEvent = {
  score: number,
  description: string
}

export type UxEvent = FixedUxEvent & {
  date: string
}
