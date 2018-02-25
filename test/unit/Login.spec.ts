import {t} from 'jest-t-assert'
import {createLocalVue, shallow} from '@vue/test-utils'
import {VueCoreAPI} from '@/plugins/VueCoreAPI'
import Login from '@/views/Login.vue'

const localVue = createLocalVue()
localVue.use(VueCoreAPI, {
  baseUrl: 'http://localhost:8000/api/',
  schemaUrl: 'http://localhost:8000/api/schema/'
})

describe('HelloWorld.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(Login, {
      localVue,
      mocks: {
        localStorage: (value) => value
      }
    })
  })

  it('is a Vue component', () => {
    t.true(wrapper.isVueComponent)
  })

  it('fetches the Core API schema when created', () => {


  })
})
