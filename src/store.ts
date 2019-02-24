import Vue from 'vue'
import Vuex from 'vuex'
import { UxEvent } from './interfaces'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    uxEvents: [] as Array<UxEvent>
  },
  mutations: {
    createUxEvent(state) {
      console.log('a')
      console.log(state.uxEvents)
      state.uxEvents.push({} as UxEvent)
    },
    updateUxEvent(state, payload: Object) {
      const { key, value } = payload
      const uxEvent: UxEvent = Object.assign(
        state.uxEvents[key],
        value
      )
      state.uxEvents.splice(key, 1 , uxEvent)
    },
    deleteUxEvent(state, payload: Object) {
      const { key } = payload
      state.uxEvents.splice(key, 1)
    }
  },
  actions: {

  }
})
