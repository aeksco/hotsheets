import _ from 'lodash'

// Schema Module Getters
const getters = {
  new: state => {
    let schema = {
      label: '',
      identifier: '',
      _id: null,
      attributes: []
    }
    return _.cloneDeep(schema)
  },
  collection: state => {
    return state.collection
  },
  selectedSchema: state => {
    return state.selectedSchema
  },
  selectedAttribute: state => {
    return state.selectedAttribute
  }
}

export default getters
