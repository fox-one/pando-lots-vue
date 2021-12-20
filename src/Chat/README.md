# Chat

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'chat'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <Chat>
    {{ 'Hello Chat' }}
  </Chat>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Chat } from './Chat';

  @Component(
    components: {
      Chat
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
