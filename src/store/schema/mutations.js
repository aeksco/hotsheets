import _ from 'lodash'
// import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

// // // //

// Project Module mutations
const mutations = {
  sync (state, collection) {
    state.collection = _.sortBy(collection, (s) => { return s.order })
  },
  // updateSelected
  // Inserts the updated step into
  // it's correct position in workflow.steps
  updateSelected (state, { schema, attr }) {
    if (!attr._id) {
      attr._id = _.uniqueId('attr_')
      schema.attributes.push(attr)
      state.selectedAttribute = null
      return
    }

    schema.attributes = _.chain(schema.attributes)
      .map((s) => {
        if (s._id !== attr._id) {
          return s
        } else {
          return attr
        }
      })
      .value()

    // Clears state.selectedAttribute step
    state.selectedAttribute = null
  },
  create (state, { schema }) {
    state.collection.push(_.cloneDeep(schema))
    console.log('SUBMIT SUBMIT SUBTMIS???')
    window.location = '/#/schemas'
  },
  update (state, { schema }) {
    state.collection = _.map(state.collection, (s) => {
      if (s._id === schema._id) {
        return schema
      } else {
        return s
      }
    })
    window.location = '/#/schemas'
  },
  destroy (state, { schema }) {
    state.collection = _.filter(state.collection, (s) => { return s._id !== schema._id })
  },
  selectAttribute (state, { attr }) {
    state.selectedAttribute = _.cloneDeep(attr)
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
