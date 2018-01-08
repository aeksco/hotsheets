
<template>
  	<LayoutView :collection="collection"/>
</template>

<!-- // // // //  -->

<script>

import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: '<%= resource_name %>_list',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= resource_title %>' // title is now "NAME - <%= resource_title %>"
  },
  computed: {
    collection () {
      return store.getters['<%= resource_name %>/collection']
    }
  },
  mounted () {
    return store.dispatch('<%= resource_name %>/fetchCollection')
  }
}
</script>


