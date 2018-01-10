
<template>
  <LayoutView :schema="schema"/>
</template>

<!-- // // // //  -->

<script>
// import _ from 'lodash'
import store from '@/store'
// import LayoutView from './components/layout.vue'
import LayoutView from '../schema_new/components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Schema - Edit' // title is now "HotSheets - Schema - Edit"
  },
  created () {
    store.commit('schema/selectSchema', { _id: this.id })
  },
  props: ['id'],
  computed: {
    schema () {
      return store.getters['schema/selectedSchema']
    }
  }
}
</script>


