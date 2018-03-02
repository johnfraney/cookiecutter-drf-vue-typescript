import coreapi from 'coreapi'

interface VueCoreAPIOptions {
  [key: string]: any
}

export const VueCoreAPI = {
  install(Vue: any, options: VueCoreAPIOptions) {
    const codec = new coreapi.codecs.CoreJSONCodec()
    const baseUrl: string = options.baseUrl
    const schemaUrl: string = options.schemaUrl

    Vue.prototype.$coreapi = {
      action(action: string[], params = {}) {
        const client = this._getClient()
        const schema = this._getSchema()
        return client.action(schema, action, params)
      },

      /**
       * Returns a form object given a Core API action
       * @param {string|string[]} action
       */
      buildFormObjectFromAction(action: string | string[]) {
        const form: {[key: string]: any} = {}
        const savedSchema = localStorage.getItem('schema')
        if (savedSchema === null) { return form }
        const schema: any = JSON.parse(savedSchema)
        let fields
        if (action instanceof Array) {
          let node = schema
          for (const actionPart of action) {
            node = node[actionPart]
          }
          fields = node.fields
        }
        else if (typeof action === 'string') {
          fields = schema[action].fields
        }
        for (const field of fields) {
          field.value = ''
          form[field.name] = field
        }
        return form
      },

      get(url: string) {
        const client = this._getClient()
        return client.get(url)
      },

      fetchSchema() {
        let headers = {}
        const token = this._getToken()
        if (token) { headers = new Headers({Authorization: `Token ${token}`}) }
        return fetch(schemaUrl, {headers})
          .then((response) => response.json())
          .then((schema) => {
            localStorage.setItem('schema', JSON.stringify(schema))
          })
      },

      _getClient() {
        let auth = null
        const token = this._getToken()
        if (token) {
          auth = new coreapi.auth.TokenAuthentication({
            token,
            scheme: 'Token',
          })
        }
        return new coreapi.Client({auth})
      },

      _getSchema() {
        let schema = null
        const schemaString = localStorage.getItem('schema')
        if (schemaString) { schema = codec.decode(schemaString, {url: baseUrl}) }
        return schema
      },

      _getToken() {
        return localStorage.getItem('token')
      },
    }
  },
}
