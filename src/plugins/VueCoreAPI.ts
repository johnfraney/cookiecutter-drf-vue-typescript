import coreapi from 'coreapi'

export const VueCoreAPI = {
  install: function (Vue, options) {
    const codec = new coreapi.codecs.CoreJSONCodec()
    const baseUrl = options.baseUrl
    const schemaUrl = options.schemaUrl

    Vue.prototype.$coreapi = {
      action (action, params = {}) {
        const client = this._getClient()
        const schema = this._getSchema()
        return client.action(schema, action, params)
      },

      /**
       * Returns a form object given a Core API action
       * @param {string|string[]} action
       */
      buildFormObjectFromAction(action) {
        const form = {}
        let fields
        const schema = JSON.parse(localStorage.getItem('schema'))
        if (action instanceof Array) {
          let node = schema
          for (const actionPart of action) {
            node = node[actionPart]
          }
          fields = node.fields
        }
        else if (action instanceof String) {
          fields = schema[action].fields
        }
        for (const field of fields) {
          field.value = ''
          form[field.name] = field
        }
        return form
      },

      get (url) {
        const client = this._getClient()
        return client.get(url)
      },

      fetchSchema () {
        let headers = {}
        const token = this._getToken()
        if (token) headers = new Headers({'Authorization': `Token ${token}`})
        return fetch(schemaUrl, {headers})
          .then(response => response.json())
          .then(schema => {
            localStorage.setItem('schema', JSON.stringify(schema))
          })
      },

      _getClient () {
        let auth = null
        const token = this._getToken()
        if (token) {
          auth = new coreapi.auth.TokenAuthentication({
            token,
            scheme: 'Token'
          })
        }
        return new coreapi.Client({auth})
      },

      _getSchema () {
        let schema = null
        const schemaString = localStorage.getItem('schema')
        if (schemaString) schema = codec.decode(schemaString, {url: baseUrl})
        return schema
      },

      _getToken () {
        return localStorage.getItem('token')
      }
    }
  }
}
