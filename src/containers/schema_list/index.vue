
<template>
  <LayoutView :collection="collection"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Schemas' // title is now "HotSheets - Schemas"
  },
  computed: {
    collection () {
      return store.getters['schema/collection']
    }
  }
}
</script>


