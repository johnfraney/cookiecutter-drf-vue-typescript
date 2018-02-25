import { t } from 'jest-t-assert'
import Router from 'vue-router'

import router from '@/router'

describe('router.ts', () => {
  it('exports a Router instance', () => {
    t.true(router instanceof Router)
  })
})
