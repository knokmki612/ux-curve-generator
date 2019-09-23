import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { Subject, ExpectedUx, ActualUx, UxEvents, LastChosenUnitKey } from './modules'

const vuexLocal = new VuexPersist()

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Subject,
    ExpectedUx,
    ActualUx,
    UxEvents,
    LastChosenUnitKey
  },
  plugins: [vuexLocal.plugin]
})
