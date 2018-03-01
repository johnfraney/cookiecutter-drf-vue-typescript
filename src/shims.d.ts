import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

// VueCoreAPI
declare module 'vue/types/vue' {
  interface Vue {
    $coreapi: any
  }
}
