# pando-lots-vue

[English](./README.md) | 简体中文

[示例](https://fox-one.github.io/pando-lots-vue/)

## 快速开始
### 安装
```shell
npm i -S @foxone/pando-lots-vue
# 或者
yarn add @foxone/pando-lots-vue
# 或者
pnpm i -S @foxone/pando-lots-vue
```

### 使用
- 引入
  ```js
  import PandoLots from '@foxone/pando-lots-vue';
  import "@foxone/pando-lots-vue/lib/index.css";

  Vue.use(PandoLots);
  ```

- 在某个 **.vue 文件中

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
        自定义入口
      </button>
    </template>
  </pando-lots>
  ```

## 开发
对于调试或维护，可以将项目 clone 到本地，然后启动项目。

```shell
git clone --depth 1

yarn && yarn dev
```

[更多详情](./DEV.zh-CN.md)
