# Comment

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'comment'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <Comment>
    {{ 'Hello Comment' }}
  </Comment>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Comment } from './Comment';

  @Component(
    components: {
      Comment
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
