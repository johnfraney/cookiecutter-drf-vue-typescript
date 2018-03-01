<template>
  <div>
    <h1>This is a login page</h1>
    <p>The login obtains an authentication token from Django REST Framework and adds it to localStorage</p><p/><form @submit.prevent="login">
      <div v-if="errors.length > 0">
        Errors:
        <ul>
          <li
            v-for="error of errors"
            :key="error">{{ error }}</li>
        </ul>
      </div>
      <div v-if="Object.keys(form).length">
        <label for="username">{{ form.username.schema.title }}</label>
        <input
          v-model="form.username.value"
          :required="form.username.required"
          type="text"
          name="username">
        <label for="password">{{ form.password.schema.title }}</label>
        <input
          v-model="form.password.value"
          :required="form.password.required"
          type="password"
          name="password">
        <button type="submit">Login</button>
      </div>
    </form>
    <div v-if="users.length > 0">
      <h3>Users (token-authenticated request)</h3>
      <div
        v-for="user in users"
        :key="user.url">{{ user.username }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Login extends Vue {
  errors: string[] = []
  form: {[key: string]: any} = {}
  users: object[] = []

  async created() {
    await this.$coreapi.fetchSchema()
    this.form = this.$coreapi.buildFormObjectFromAction(['token-auth', 'create'])
  }

  async login () {
    this.errors = []
    try {
      // Attempt token login
      let response = await this.$coreapi.action(['token-auth', 'create'], {
        username: this.form.username.value,
        password: this.form.password.value
      })
      // Add token to local storage
      localStorage.setItem('token', response.token)
      // Add Core API schema to local storage
      await this.$coreapi.fetchSchema()
    }
    catch (error) {
      let response = error
      for (let field of Object.keys(response.content)) {
        if (field === 'non_field_errors') {
          this.errors = this.errors.concat(response.content[field])
        }
        else {
          this.errors.push(`${field} ${response.content[field]}`)
        }
      }
    }
  }
}
</script>
