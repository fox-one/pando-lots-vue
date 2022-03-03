# pando-lots-vue

English | [简体中文](./README.zh-CN.md)

[Demo](https://fox-one.github.io/pando-lots-vue/)

## Quick start
### Install
```shell
npm i -S @foxone/pando-lots-vue
# or
yarn add @foxone/pando-lots-vue
# or
pnpm i -S @foxone/pando-lots-vue
```

### Usage
- Import
  ```js
  import PandoLots from '@foxone/pando-lots-vue';
  import "@foxone/pando-lots-vue/lib/index.css";

  Vue.use(PandoLots);
  ```

- In any **.vue file

  ```html
  <pando-lots
    type="card"
    group-id="7000103413"
    theme-color="#88E108"
    @error="handleError"
    api-base="https://dev-courses-api.firesbox.com/v1"
    ws-base="wss://dev-courses-ws.firesbox.com"
  />
  
  <pando-lots
    type="button"
    group-id="7000103417"
    theme-color="#EE4596"
    @error="handleError"
    api-base="https://dev-courses-api.firesbox.com/v1"
    ws-base="wss://dev-courses-ws.firesbox.com"
  />

  <pando-lots
    group-id="7000104299"
    theme-color="#88E108"
    api-base="https://dev-courses-api.firesbox.com/v1"
    ws-base="wss://dev-courses-ws.firesbox.com"
  >
    <template #activator="{ on }">
      <button v-on="on">
        Custom Entry
      </button>
    </template>
  </pando-lots>
  ```

## Dev
For debugging or maintenance, you can clone the whole git repository and run the project:

```shell
git clone --depth 1

yarn && yarn dev
```

[More Detials](./DEV.md)
