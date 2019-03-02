import Vue from 'vue'
import Vuex from 'vuex'
import { isAfter } from 'date-fns'
import { UxEvent } from './interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uxEvents: [] as Array<UxEvent>
  },
  mutations: {
    createUxEvent(state) {
      state.uxEvents.push({ score: 0 } as unknown as UxEvent)
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
