import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { Duration, Subject, ExpectedUx, ActualUx, UxEvents, LastChosenUnitKey } from './modules'

const vuexLocal = new VuexPersist({
  reducer: (state: any) => {
    const { Duration, Subject, ExpectedUx, ActualUx, UxEvents } = state
    return {
      Duration,
      Subject,
      ExpectedUx,
      ActualUx,
      UxEvents
    }
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Duration,
    Subject,
    ExpectedUx,
    ActualUx,
    UxEvents,
    LastChosenUnitKey
  },
  plugins: [vuexLocal.plugin]
})
