# Auth

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'Auth'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <Auth>
    {{ 'Hello Auth' }}
  </Auth>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Auth } from './Auth';

  @Component(
    components: {
      Auth
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
