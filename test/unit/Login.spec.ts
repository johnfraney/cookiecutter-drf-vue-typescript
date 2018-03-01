import {t} from 'jest-t-assert'
import {Wrapper, createLocalVue, shallow} from '@vue/test-utils'
import {VueCoreAPI} from '@/plugins/VueCoreAPI'
import Login from '@/views/Login.vue'

const localVue = createLocalVue()
localVue.use(VueCoreAPI, {
  baseUrl: 'http://localhost:8000/api/',
  schemaUrl: 'http://localhost:8000/api/schema/'
})

describe('Login.vue', () => {
  let wrapper: Wrapper<Login>

  beforeEach(() => {
    wrapper = shallow(Login, {
      localVue,
      mocks: {
        localStorage: (value: any) => value
      }
    })
  })

  it('is a Vue component', () => {
    t.true(wrapper.isVueInstance())
  })

  it('fetches the Core API schema when created', () => {


  })
})
