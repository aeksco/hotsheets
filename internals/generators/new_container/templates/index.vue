
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'

export default {
  name: '<%= resource_name %>_new',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= resource_name %>s - New' // title is now "TITLE - <%= resource_name %> - New"
  },
  data () {
    return {
      model: {}
    }
  }
}
</script>
