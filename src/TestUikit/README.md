# TestUikit

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'testuikit'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <TestUikit>
    {{ 'Hello TestUikit' }}
  </TestUikit>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { TestUikit } from './TestUikit';

  @Component(
    components: {
      TestUikit
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
