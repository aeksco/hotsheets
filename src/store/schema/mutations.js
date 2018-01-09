import _ from 'lodash'
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

    window.location = '#/schemas'
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
  addAttribute (state, { schema }) {
    let new_attribute = {
      order: schema.attributes.length + 1,
      label: '',
      help: '',
      required: false,
      datatype: 'TEXT',
      datatypeOptions: {}
    }

    state.selectedAttribute = new_attribute
  }
}

// // // //

export default mutations
