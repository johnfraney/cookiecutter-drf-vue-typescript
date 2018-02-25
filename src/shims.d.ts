declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'jest-t-assert' {
  export class t {
    public true(expression: boolean): () => void
  }
}
