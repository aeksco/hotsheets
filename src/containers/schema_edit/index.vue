
<template>
  <LayoutView :schema="schema"/>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import LayoutView from '../schema_new/components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Schema - Edit' // title is now "HotSheets - Schema - Edit"
  },
  props: ['id'],
  created () {
    store.commit('schema/selectSchema', { _id: this.id })
  },
  beforeDestroy () {
    store.commit('schema/clearSelectedSchema')
  },
  data () {
    let allSchemas = store.getters['schema/collection']
    let schema = _.cloneDeep(_.find(allSchemas, { _id: this.id }))
    return { schema }
  }
}
</script>


