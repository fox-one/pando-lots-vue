# Wrapper

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'wrapper'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <Wrapper>
    {{ 'Hello Wrapper' }}
  </Wrapper>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Wrapper } from './Wrapper';

  @Component(
    components: {
      Wrapper
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
