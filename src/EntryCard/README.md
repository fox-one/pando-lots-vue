# EntryCard

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'entrycard'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <EntryCard>
    {{ 'Hello EntryCard' }}
  </EntryCard>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { EntryCard } from './EntryCard';

  @Component(
    components: {
      EntryCard
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
