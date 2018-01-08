import _ from 'lodash'
// import { TEXT_WORKFLOW_STEP, MACRO_WORKFLOW_STEP, DELAY_WORKFLOW_STEP, KEY_WORKFLOW_STEP, KEY_DN_POSITION, KEY_UP_POSITION, KEY_PR_POSITION } from './constants'

// // // //

// Record Module mutations
const mutations = {
  sync (state, collection) {
    state.collection = _.sortBy(collection, (s) => { return s.order })
  },
  persist (state, { schema, record }) {
    if (record._id) {
      state.collection = _.map(state.collection, (s) => {
        if (s._id === record._id) {
          return record
        } else {
          return s
        }
      })
    } else {
      record._id = 'rec_' + Math.floor((Math.random() * 100000000000000) + 1)
      state.collection.push(record)
    }

    window.location = '/#/schemas/' + schema._id
  },
  destroy (state, { record }) {
    state.collection = _.filter(state.collection, (s) => { return s._id !== record._id })
  }
}

// // // //

export default mutations
