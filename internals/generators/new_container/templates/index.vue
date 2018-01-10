
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'

export default {
  name: '<%= schema.identifier %>_new',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= schema.label %> - New' // title is now "TITLE - <%= schema.label %> - New"
  },
  data () {
    return {
      model: {}
    }
  }
}
</script>
