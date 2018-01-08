
<template>
  <LayoutView :schema="schema"/>
</template>

<!-- // // // //  -->

<script>
// import _ from 'lodash'
// import store from '@/store'
import LayoutView from './components/layout.vue'

export default {
  components: {
    LayoutView
  },
  metaInfo: {
    title: 'Schemas - New' // title is now "HotSheets - Schemas - New"
  },
  data () {
    let schema = {
      label: '',
      identifier: '',
      _id: null,
      attributes: []
    }
    return { schema }
  }
}
</script>


