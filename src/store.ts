import Vue from 'vue'
import Vuex from 'vuex'
import { isAfter } from 'date-fns'
import { FixedUxEvent, UxEvent } from './types'

Vue.use(Vuex)

type UxEventFragment = {
  score?: string | number
  description?: string
  date?: Date
}

function filter(value: UxEventFragment): UxEventFragment {
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

export default new Vuex.Store({
  state: {
    expectedUx: { score: 0, description: '' } as FixedUxEvent,
    actualUx: { score: 0, description: '',
      get date() { return new Date() } } as UxEvent,
    uxEvents: [] as Array<UxEvent>
  },
  mutations: {
    updateExpectedUx(state, payload: UxEventFragment) {
      state.expectedUx = Object.assign(
        state.expectedUx,
        filter(payload)
      )
    },
    updateActualUx(state, payload: UxEventFragment) {
      state.actualUx = Object.assign(
        state.actualUx,
        filter(payload)
      )
    },
    addUxEvent(state, payload: UxEvent) {
      state.uxEvents.push(payload)
      state.uxEvents.sort((a, b) => {
        return (isAfter(a.date, b.date)) ? 1 : -1
      })
    },
    updateUxEvent(state, payload: { key: number, value: UxEventFragment }) {
      const { key, value } = payload
      const uxEvent: UxEvent = Object.assign(
        state.uxEvents[key],
        filter(value)
      )
      state.uxEvents.splice(key, 1 , uxEvent)
      state.uxEvents.sort((a, b) => {
        return (isAfter(a.date, b.date)) ? 1 : -1
      })
    },
    deleteUxEvent(state, payload: { key: number }) {
      const { key } = payload
      state.uxEvents.splice(key, 1)
    }
  },
  actions: {

  }
})
