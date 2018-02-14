
<template>
  	<LayoutView :collection="collection"/>
</template>

<!-- // // // //  -->

<script>

import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: '<%= schema.identifier %>_list',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= schema.label_plural %>' // title is now "NAME - <%= schema.label_plural %>"
  },
  computed: {
    collection () {
      return store.getters['<%= schema.identifier %>/collection']
    }
  },
  mounted () {
    return store.dispatch('<%= schema.identifier %>/fetchCollection')
  }
}
</script>


