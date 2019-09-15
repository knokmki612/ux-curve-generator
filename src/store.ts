import Vue from 'vue'
import Vuex from 'vuex'
import { ExpectedUx, ActualUx, UxEvents, LastChosenUnitKey } from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ActualUx,
    ExpectedUx,
    UxEvents,
    LastChosenUnitKey
  }
})
