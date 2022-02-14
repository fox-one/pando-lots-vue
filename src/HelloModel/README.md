# HelloModel

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'hellomodel'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <HelloModel>
    {{ 'Hello HelloModel' }}
  </HelloModel>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { HelloModel } from './HelloModel';

  @Component(
    components: {
      HelloModel
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
