
<template>
  <LayoutView :schema="schema"/>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
// import LayoutView from './components/layout.vue'
import LayoutView from '../schema_new/components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'schema - Edit' // title is now "HotSheets - Workflow - Edit"
  },
  props: ['id'],
  computed: {
    schema () {
      let schemas = store.getters['schema/collection']
      return _.find(schemas, { _id: this.id })
    }
  }
}
</script>


