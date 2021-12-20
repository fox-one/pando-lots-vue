# Stream

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'stream'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <Stream>
    {{ 'Hello Stream' }}
  </Stream>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Stream } from './Stream';

  @Component(
    components: {
      Stream
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
