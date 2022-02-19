# UikitBtn

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'uikitbtn'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <UikitBtn>
    {{ 'Hello UikitBtn' }}
  </UikitBtn>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { UikitBtn } from './UikitBtn';

  @Component(
    components: {
      UikitBtn
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
