import _ from 'lodash'
import store from '@/store'
// import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

// NESTED_MUTATIONS = ({ parent_attribute, empty_child, child_identifier, child_label })
import { NESTED_MUTATIONS } from '@/store/lib/mixins'
console.log(NESTED_MUTATIONS)

let nested_options = {
  parent_attribute: 'decorators',
  child_label: 'Decorator', // addDecorator, persistDecorator
  empty_child: {
    label: 'New Decorator',
    target_property: 'row_color',
    definitions: [
      {
        _id: 'def_0009999',
        operation: {
          type: 'exact_match',
          source_attribute_id: 'attr_1',
          value: 'Al Schwaa'
        },
        action: {
          type: 'literal',
          value: 'bg-danger'
        }
      }
    ]
  }
}
console.log(nested_options)

// // // //

// Schema Module mutations
const mutations = {
  ...NESTED_MUTATIONS(nested_options),
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

    // Update existing records of this schema
    _.each(schema.attributes, (attr) => {
      if (attr.datatype === 'HAS_AND_BELONGS_TO_MANY') {
        let allRecords = store.getters['record/collection']
        _.each(allRecords, (r) => {
          if (!r.attributes[attr.identifier] || !Array.isArray(r.attributes[attr.identifier])) {
            r.attributes[attr.identifier] = []
          }
        })
      }
    })

    // Updates attributes order
    schema.attributes = _.orderBy(schema.attributes, ['order'], ['asc'])
    state.selectedSchema = null
  },
  destroy (state, { schema }) {
    state.collection = _.filter(state.collection, (s) => { return s._id !== schema._id })
  },
  selectAttribute (state, { attr }) {
    state.selectedAttribute = _.cloneDeep(attr)
  },
  selectSchema (state, { _id }) {
    state.selectedSchema = _id
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
  persistSelectedAttribute (state, { schema, attr }) {
    if (attr._id) {
      schema.attributes = _.map(schema.attributes, (a) => { // QUESTION - just .map()
        if (a._id === attr._id) {
          return attr
        } else {
          return a
        }
      })
    } else {
      attr._id = 'attr_' + Math.floor((Math.random() * 100000000000000) + 1)
      if (attr.datatype !== 'TEXT_SELECT' && attr.datatype !== 'NUMBER_SELECT') {
        delete attr.datatypeOptions.dropdownOptions
      }
      schema.attributes.push(_.cloneDeep(attr))
    }

    // QUESTION - add REVERSE RELATION?
    // if (attr.datatype === 'BELONGS_TO') {
    //   let relatedSchema = _.find(state.collection, { _id: attr.datatypeOptions.schema_id })
    //   let relatedAttr = _.filter(relatedSchema.attributes, (a) => { return a.datatype === 'HAS_MANY' && a.datatypeOptions.schema_id === schema._id })
    //   console.log(relatedAttr)
    // }

    // Clears the selectedAttribute
    state.selectedAttribute = null
  },
  addAttribute (state, { schema }) {
    let new_attribute = {
      order: schema.attributes.length + 1,
      label: '',
      help: '',
      required: false,
      unique: false,
      col_span: 6,
      datatype: 'TEXT',
      datatypeOptions: {}
    }

    state.selectedAttribute = new_attribute
  }
}

// // // //

export default mutations
