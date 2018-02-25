import { t } from 'jest-t-assert'
import Vuex from 'vuex'

import store from '@/store'

describe('store.ts', () => {
  it('exports a Vuex Store instance', () => {
    t.true(store instanceof Vuex.Store)
  })
})

