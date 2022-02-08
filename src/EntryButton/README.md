# EntryButton

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'entrybutton'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <EntryButton>
    {{ 'Hello EntryButton' }}
  </EntryButton>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { EntryButton } from './EntryButton';

  @Component(
    components: {
      EntryButton
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
