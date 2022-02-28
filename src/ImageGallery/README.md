# ImageGallery

## APIs

### Props
| Name | Description | Type | Default |
| --- | --- | --- | --- |
| prefixCls(optional) | The classname prefix for wholly control the component style | string | `'imagegallery'` | 

### Slots
| Name | Description |
| --- | --- |
| default(optional) | The default Vue slot |

## Example

```vue
<template>
  <ImageGallery>
    {{ 'Hello ImageGallery' }}
  </ImageGallery>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { ImageGallery } from './ImageGallery';

  @Component(
    components: {
      ImageGallery
    }
  )
  export class App extends Vue {
    mounted () {
      console.info('mounted!')
    }
  }
</script>
```
