
<template>
  <LayoutView :collection="collection"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import { mapGetters } from 'vuex'
export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Sheets'
  },
  computed: mapGetters({
    collection: 'schema/collection'
  })
}
</script>
