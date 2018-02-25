import { t } from 'jest-t-assert'
import { shallow } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallow(HelloWorld, {
      propsData: { msg }
    })
    t.true(wrapper.text().indexOf(msg) > -1)
  })
})
