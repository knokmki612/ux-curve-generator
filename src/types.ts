export type FixedUxEvent = {
  score: number,
  description: string
}

export type UxEvent = FixedUxEvent & {
  date: string
}

export type RelativeDateStringProps = {
  targetDate: Date,
  nextDate: Date
}

export type RelativeDateInputProps = {
  prevUxEvent?: UxEvent,
  nextUxEvent?: UxEvent
}
