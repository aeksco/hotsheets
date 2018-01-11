import _ from 'lodash'
import router from '@/routers'
// import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

// // // //

// Project Module mutations
const mutations = {
  sync (state, collection) {
    state.collection = _.sortBy(collection, (s) => { return s.order })
  },
  persist (state, { schema }) {
    if (schema._id) {
      state.collection = _.map(state.collection, (s) => {
        if (s._id === schema._id) {
          return schema
        } else {
          return s
        }
      })
    } else {
      schema._id = 'schema_' + Math.floor((Math.random() * 100000000000000) + 1)
      state.collection.push(schema)
    }

    return router.go(-1)
  },
  destroy (state, { schema }) {
    state.collection = _.filter(state.collection, (s) => { return s._id !== schema._id })
  },
  selectAttribute (state, { attr }) {
    state.selectedAttribute = _.cloneDeep(attr)
  },
  selectSchema (state, { _id }) {
    state.selectedSchema = _.cloneDeep(_.find(state.collection, { _id }))
  },
  clearSelectedSchema (state) {
    state.selectedSchema = null
  },
  clearSelectedAttribute (state) {
    state.selectedAttribute = null
  },
  removeAttribute (state, { schema, attr }) {
    schema.attributes = _.filter(schema.attributes, (s) => { return s._id !== attr._id })
  },
  persistSelectedAttribute (state, { attr }) {
    if (attr._id) {
      state.selectedSchema.attributes = _.map(state.selectedSchema.attributes, (a) => { // QUESTION - just .map()
        if (a._id === attr._id) {
          return attr
        } else {
          return a
        }
      })
    } else {
      attr._id = 'attr_' + Math.floor((Math.random() * 100000000000000) + 1)
      state.selectedSchema.attributes.push(attr)
    }
    state.selectedAttribute = null
  },
  addAttribute (state, { schema }) {
    let new_attribute = {
      order: schema.attributes.length + 1,
      label: '',
      help: '',
      required: false,
      unique: false,
      preferred: false,
      col_span: 6,
      datatype: 'TEXT',
      datatypeOptions: {}
    }

    state.selectedAttribute = new_attribute
  }
}

// // // //

export default mutations
