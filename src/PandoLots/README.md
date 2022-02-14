# PandoLots

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'pandolots'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <PandoLots>
    {{ 'Hello PandoLots' }}
  </PandoLots>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { PandoLots } from './PandoLots';

  @Component(
    components: {
      PandoLots
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
