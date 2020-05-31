import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import { FixedUxEvent, UxEvent } from '@/types'
import { Subject, ExpectedUx, ActualUx, UxEvents, LastChosenUnitKey } from './modules'

type Modules = {
  Subject: { subject: string },
  ExpectedUx: { expectedUx: FixedUxEvent },
  ActualUx: { actualUx: UxEvent },
  UxEvents: { uxEvents: Array<UxEvent> },
  LastChosenUnitKey: { lastChosenUnitKey: string }
}

const vuexLocal = new VuexPersist({
  reducer: (state: Modules) => {
    const { Subject, ExpectedUx, ActualUx, UxEvents } = state
    return {
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
    Subject,
    ExpectedUx,
    ActualUx,
    UxEvents,
    LastChosenUnitKey
  },
  plugins: [vuexLocal.plugin]
})
