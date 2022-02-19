# UiKitTest

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'uikittest'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <UiKitTest>
    {{ 'Hello UiKitTest' }}
  </UiKitTest>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { UiKitTest } from './UiKitTest';

  @Component(
    components: {
      UiKitTest
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
