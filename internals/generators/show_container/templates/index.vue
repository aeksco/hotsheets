
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: '<%= resource_name %>_show',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= resource_name %>s - Show' // title is now "RCOS - Loading..."
  },
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('<%= resource_name %>/fetchModel', this.id)
    }
  },
  computed: {
    model () {
      return store.getters['<%= resource_name %>/current']
    }
  }
}
</script>
