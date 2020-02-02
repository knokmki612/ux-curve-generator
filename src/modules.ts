import { Module, VuexModule, Mutation } from 'vuex-module-decorators'
import { isAfter } from 'date-fns'
import { FixedUxEvent, UxEvent } from './types'

type UxEventFragment = {
  score?: string | number
  description?: string
  date?: string
}

function filter (value: UxEventFragment): UxEventFragment {
  const isString = (score: string | number | undefined): score is string =>
    typeof score === 'string'
  if (!isString(value.score)) return value
  const score = parseInt(value.score, 10)
  return {
    score: isNaN(score) ? 0
      : score > 100 ? 100
        : score < -100 ? -100
          : score
  }
}

@Module({ namespaced: true })
export class Subject extends VuexModule {
  subject: string = ''

  @Mutation
  updateSubject (payload: string) {
    this.subject = payload
  }
}

@Module({ namespaced: true })
export class ExpectedUx extends VuexModule {
  expectedUx: FixedUxEvent = {
    score: 0,
    description: ''
  }

  @Mutation
  updateExpectedUx (payload: UxEventFragment) {
    this.expectedUx = Object.assign(
      this.expectedUx,
      filter(payload)
    )
  }
}

@Module({ namespaced: true })
export class ActualUx extends VuexModule {
  actualUx: UxEvent = {
    score: 0,
    description: '',
    date: new Date().toISOString()
  }

  @Mutation
  updateActualUx (payload: UxEventFragment) {
    this.actualUx = Object.assign(
      this.actualUx,
      filter(payload),
      { date: new Date().toISOString() }
    )
  }
}

@Module({ namespaced: true })
export class UxEvents extends VuexModule {
  uxEvents: Array<UxEvent> = []

  @Mutation
  addUxEvent (payload: UxEvent) {
    this.uxEvents.push(payload)
    this.uxEvents.sort((a, b) => {
      return (isAfter(new Date(a.date), new Date(b.date))) ? 1 : -1
    })
  }

  @Mutation
  updateUxEvent (payload: { key: number, value: UxEventFragment }) {
    const { key, value } = payload
    const uxEvent: UxEvent = Object.assign(
      this.uxEvents[key],
      filter(value)
    )
    this.uxEvents.splice(key, 1, uxEvent)
    this.uxEvents.sort((a, b) => {
      return (isAfter(new Date(a.date), new Date(b.date))) ? 1 : -1
    })
  }

  @Mutation
  deleteUxEvent (payload: { key: number }) {
    const { key } = payload
    this.uxEvents.splice(key, 1)
  }
}

@Module({ namespaced: true })
export class LastChosenUnitKey extends VuexModule {
  lastChosenUnitKey: string = 'year'

  @Mutation
  updateUnitKey (payload: string) {
    this.lastChosenUnitKey = payload
  }
}
