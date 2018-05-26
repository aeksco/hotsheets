import _ from 'lodash'

// // // //

// selectAttribute (state, { attr }) {
//   state.selectedAttribute = _.cloneDeep(attr)
// },
// clearSelectedAttribute (state) {
//   state.selectedAttribute = null
// },
// removeAttribute (state, { schema, attr }) {
//   schema.attributes = _.filter(schema.attributes, (s) => { return s._id !== attr._id })
// },
// persistSelectedAttribute (state, { schema, attr }) {
//   if (attr._id) {
//     schema.attributes = _.map(schema.attributes, (a) => { // QUESTION - just .map()
//       if (a._id === attr._id) {
//         return attr
//       } else {
//         return a
//       }
//     })
//   } else {
//     attr._id = 'attr_' + Math.floor((Math.random() * 100000000000000) + 1)
//     if (attr.datatype !== 'TEXT_SELECT' && attr.datatype !== 'NUMBER_SELECT') {
//       delete attr.datatypeOptions.dropdownOptions
//     }
//     schema.attributes.push(_.cloneDeep(attr))
//   }

//   // QUESTION - add REVERSE RELATION?
//   // if (attr.datatype === 'BELONGS_TO') {
//   //   let relatedSchema = _.find(state.collection, { _id: attr.datatypeOptions.schema_id })
//   //   let relatedAttr = _.filter(relatedSchema.attributes, (a) => { return a.datatype === 'HAS_MANY' && a.datatypeOptions.schema_id === schema._id })
//   //   console.log(relatedAttr)
//   // }

//   // Clears the selectedAttribute
//   state.selectedAttribute = null
// },
// addAttribute (state, { schema }) {
//   let new_attribute = {
//     order: schema.attributes.length + 1,
//     label: '',
//     help: '',
//     required: false,
//     unique: false,
//     col_span: 6,
//     datatype: 'TEXT',
//     datatypeOptions: {}
//   }

//   state.selectedAttribute = new_attribute
// }

export const NESTED_MUTATIONS = ({ parent_attribute, empty_child, child_label }) => {
  let mutations = {}
  const key = `selected${child_label}` // i.e. selectedAttribute, selectedDecorator

  // Add
  const addChildKey = `add${child_label}`
  const addChild = (state, { parent }) => {
    let new_child_order = parent[parent_attribute].length + 1
    let new_child = _.extend(empty_child, { order: new_child_order })
    state[key] = new_child
  }

  mutations[addChildKey] = addChild

  return mutations
}

// // // //
// Adds a Collection to a Vuex module

export const COLLECTION_GETTERS = {
  collection: state => {
    return state.collection
  },
  fetching: state => {
    return state.fetching
  }
}

export const COLLECTION_MUTATIONS = {
  collection (state, collection) {
    state.collection = collection
  },
  fetching (state, isFetching) {
    state.fetching = isFetching
  }
}

export const COLLECTION_STATE = {
  collection: [],
  fetching: false
}

// // // //
// Adds a Model definition to a Vuex module
export const MODEL_GETTERS = {
  model: state => {
    return state.model
  }
}

export const MODEL_MUTATIONS = {
  model (state, model) {
    state.model = model
  }
}

export const MODEL_STATE = {
  model: {}
}

// // // //
// Adds Collection filtering to a Vuex module
// TODO - abstract `showingInactive` into a separate mixin

export const FILTER_GETTERS = {
  filteredCollection: state => {
    return state.filteredCollection
  },
  filter: state => {
    return state.filter
  },
  showingInactive: state => {
    return state.showingInactive
  },
  orderBy: state => {
    return state.orderBy
  }
}

export const FILTER_MUTATIONS = {
  filteredCollection (state, filteredCollection) {
    state.filteredCollection = filteredCollection
  },
  filter (state, filter) {
    state.filter = filter
  },
  showingInactive (state, show) {
    state.showingInactive = show
  },
  orderBy (state, orderBy) {
    state.orderBy = orderBy
  }
}

export const FILTER_STATE = {
  filteredCollection: [],
  filter: '',
  showingInactive: false,
  orderBy: 'asc' // 'asc' or 'desc'
}

export const FILTER_ACTIONS = {
  // module/toggleOrderBy
  toggleOrderBy ({ state, commit, dispatch }) {
    const ORDER_ASC = 'asc'
    const ORDER_DESC = 'desc'
    if (state.orderBy === ORDER_ASC) {
      commit('orderBy', ORDER_DESC)
    } else {
      commit('orderBy', ORDER_ASC)
    }
    dispatch('filteredCollection')
  },

  // module/toggleInactive
  toggleInactive ({ state, commit, dispatch }) {
    if (state.showingInactive) {
      commit('showingInactive', false)
    } else {
      commit('showingInactive', true)
    }
    // Re-fetches the collection
    dispatch('fetchCollection')
  },

  // module/setFilter
  // Updates the current search query, invokes the module/filter mutation
  setFilter ({ commit, dispatch }, filter) {
    commit('filter', filter)
    dispatch('filteredCollection')
  }
}

// // // //
// Pagination Mixins

export const PAGINATION_STATE = {
  start: 0,
  pageSize: 3,
  currentPage: 1,
  paginatedCollection: []
}

export const PAGINATION_ACTIONS = {
  paginatedCollection ({ state, commit }) {
    let collection = state.filteredCollection || state.collection

    function paginate () {
      return _.chain(collection)
      .drop(state.start)
      .take(state.pageSize)
      .value()
    }

    let paginatedCollection = paginate()

    if (paginatedCollection.length === 0 && state.currentPage > 1) {
      commit('currentPage', 1)
      commit('paginatedCollection', paginate())
    } else {
      commit('paginatedCollection', paginatedCollection)
    }
  },
  pageSize ({ dispatch, commit }, newSize) {
    commit('pageSize', newSize)
    dispatch('paginatedCollection')
  },
  goToPage ({ dispatch, commit }, page) {
    commit('currentPage', page)
    dispatch('paginatedCollection')
  },
  prevPage ({ dispatch, state, commit }) {
    commit('currentPage', state.currentPage - 1)
    dispatch('paginatedCollection')
  },
  nextPage ({ dispatch, state, commit }) {
    commit('currentPage', state.currentPage + 1)
    dispatch('paginatedCollection')
  },
  firstPage ({ dispatch, commit }) {
    commit('currentPage', 1)
    dispatch('paginatedCollection')
  },
  lastPage ({ dispatch, state, commit }) {
    let collection = state.filteredCollection || state.collection
    commit('currentPage', Math.ceil(collection.length / state.pageSize))
    dispatch('paginatedCollection')
  }
}

export const PAGINATION_MUTATIONS = {
  currentPage (state, page) {
    state.currentPage = page
    state.start = (page - 1) * state.pageSize
  },
  pageSize (state, newSize) {
    state.pageSize = newSize
    state.start = (state.currentPage - 1) * state.pageSize
  },
  start (state, start) {
    state.start = start
  },
  paginatedCollection (state, paginatedCollection) {
    state.paginatedCollection = paginatedCollection
  }
}

export const PAGINATION_GETTERS = {
  pages: state => {
    let collection = state.filteredCollection || state.collection
    let total = Math.ceil(collection.length / state.pageSize)
    let current = Math.ceil(state.start / state.pageSize) + 1
    let pages = _.times(total, index => {
      return {
        current: index + 1 === current,
        page: index + 1
      }
    })

    return pages
  },
  currentPage: state => {
    return state.currentPage
  },
  totalPages: state => {
    let collection = state.filteredCollection || state.collection
    return Math.ceil(collection.length / state.pageSize)
  },
  prevPage: state => {
    return state.currentPage - 1 > 0 ? state.currentPage - 1 : false
  },
  nextPage: state => {
    let collection = state.filteredCollection || state.collection
    let total = Math.ceil(collection.length / state.pageSize)
    return state.currentPage < total ? state.currentPage + 1 : false
  },
  paginatedCollection: state => {
    return state.paginatedCollection
  }
}
