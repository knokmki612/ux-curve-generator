import Vue from 'vue'
import Vuex from 'vuex'
import { isAfter } from 'date-fns'
import {  FixedUxEvent, UxEvent } from './interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    expectedUx: { score: 0 } as FixedUxEvent,
    actualUx: { score: 0 } as FixedUxEvent,
    uxEvents: [] as Array<UxEvent>
  },
  mutations: {
    updateExpectedUx(state, payload) {
      state.expectedUx = Object.assign(
        state.expectedUx,
        payload
      )
    },
    updateActualUx(state, payload) {
      state.actualUx = Object.assign(
        state.actualUx,
        payload
      )
    },
    addUxEvent(state, payload: UxEvent) {
      state.uxEvents.push(payload)
      state.uxEvents.sort((a, b) => {
        return (isAfter(a.date, b.date)) ? 1 : -1
      })
    },
    updateUxEvent(state, payload) {
      const { key, value } = payload
      const uxEvent: UxEvent = Object.assign(
        state.uxEvents[key],
        value
      )
      state.uxEvents.splice(key, 1 , uxEvent)
      state.uxEvents.sort((a, b) => {
        return (isAfter(a.date, b.date)) ? 1 : -1
      })
    },
    deleteUxEvent(state, payload) {
      const { key } = payload
      state.uxEvents.splice(key, 1)
    }
  },
  actions: {

  }
})
