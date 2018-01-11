
<template>
  <LayoutView :model="model"/>
</template>

<!-- // // // //  -->

<script>
import LayoutView from './components/layout.vue'
import store from '@/store'

export default {
  name: 'application_show',
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Applications - Show'
  },
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('application/fetchModel', this.id)
    }
  },
  computed: {
    model () {
      return store.getters['application/current']
    }
  }
}
</script>
