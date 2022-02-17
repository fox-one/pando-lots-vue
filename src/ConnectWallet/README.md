# ConnectWallet

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'connectwallet'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <ConnectWallet>
    {{ 'Hello ConnectWallet' }}
  </ConnectWallet>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ConnectWallet } from './ConnectWallet';

  @Component(
    components: {
      ConnectWallet
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
