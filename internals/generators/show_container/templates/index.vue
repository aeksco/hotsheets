
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: '<%= schema.identifier %>_show',
  components: {
    LayoutView
  },
  metaInfo: {
    title: '<%= schema.label %>s - Show'
  },
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('<%= schema.identifier %>/fetchModel', this.id)
    }
  },
  computed: {
    model () {
      return store.getters['<%= schema.identifier %>/current']
    }
  }
}
</script>
