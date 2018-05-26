
<template>
  <div class="card card-body bg-dark text-light border-light">

    <!-- Attribute Form -->
    <div class="row" v-if="selectedAttr">
      <div class="col-lg-12">

        <div class="row">
          <div class="col-lg-8">
            <p class="lead mb-0">Decorator</p>
            <small class="form-text text-muted">Define the core parameters that are used to create a valid Decorator.</small>
          </div>
          <div class="col-lg-4 text-right">
            <div class="btn-group w-100" v-if="selectedAttr">

              <button class="btn btn-sm btn-outline-secondary w-50" @click="clearSelected()">
                <i class="fa fa-fw mr-1 fa-angle-left"></i>
                Back
              </button>

              <button class="btn btn-sm btn-outline-success w-50" @click="updateSelected(selectedAttr)">
                <i class="fa fa-fw mr-1 fa-check"></i>
                Submit
              </button>

            </div>
          </div>
        </div>

        <hr>

        <div class="row">

          <div class="col-lg-12">
            <p class="lead mb-0">Properties</p>
          </div>

          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label>
                Label
                <span class='text-danger'>*</span>
              </label>
              <small class="form-text text-muted">Example: 'Last Name'<br>The human-readable name for this attribute.</small>
              <input type="text" class="form-control" placeholder="Label" v-model="selectedAttr.label" >
            </div>
          </div>

          <div class="col-lg-6 col-sm-12">
            <div class="form-group">
              <label>
                Identifier
                <span class='text-danger'>*</span>
              </label>
              <small class="form-text text-muted">Example: 'last_name'<br>Lowercase, no spaces.</small>
              <input type="text" class="form-control" placeholder="Identifier" v-model="selectedAttr.identifier" >
            </div>
          </div>

        </div>

      </div>
    </div>

    <div class="row" v-if="!selectedAttr">
      <div class="col-lg-12">

        <p class="lead mb-0">Decorators</p>
        <small class="mb-2 form-text text-muted">Defines a new Decorator for this schema.</small>
        <hr>

        <draggable class='list-group' v-model='decorators' :options="sortableOptions">
          <DecoratorItem v-for="each in decorators" :item="each" :key="each._id" :remove="removeDecorator" :edit="editDecorator" />
          <li class="px-2 py-4 text-center list-group-item list-group-item-info" @click="addDecorator()" v-if="!decorators.length">
            <i class="fa fa-fw fa-plus mr-2"></i>
            <br>
            Click to add your first Attribute.
          </li>
        </draggable>

        <!-- Attribute Editor Controls -->
        <div class="btn-group w-100 mt-3" v-if="!selectedAttr && decorators.length">
          <button class="btn btn-light w-100" @click="addDecorator()">
            <i class="fa fa-fw fa-plus mr-2"></i>
            Add Attribute
          </button>
        </div>

      </div>
    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import draggable from 'vuedraggable'
import DecoratorItem from './DecoratorItem'
import ArrayInput from '@/components/ArrayInput'

// availableActions: [
//   { action: 'literal',                icon: 'fa-quote-right',   text: 'Literal', default: true }
//   # { action: 'block',                  icon: 'fa-hand-stop-o',   text: 'Blocking' }
//   { action: 'filter',                 icon: 'fa-filter',        text: 'Filter' }
//   { action: 'replace',                icon: 'fa-strikethrough', text: 'Replace' }
//   { action: 'clone',                  icon: 'fa-copy',          text: 'Clone' }
//   { action: 'index_from_split',       icon: 'fa-code-fork',     text: 'Split and Index' }
//   { action: 'index_from_regex_match', icon: 'fa-registered',    text: 'Index from RegEx Match' }
// ]

export default {
  props: ['schema'],
  components: {
    draggable,
    DecoratorItem,
    ArrayInput
  },
  methods: {
    addDecorator () {
      store.commit('decorator/add', { schema: this.schema })
    },
    removeDecorator (attr) {
      store.commit('decorator/remove', { schema: this.schema, attr: attr })
    },
    editDecorator (attr) {
      store.commit('decorator/select', { attr })
    },
    clearSelected () {
      store.commit('decorator/clear')
    },
    updateSelected (attr) {
      store.commit('decorator/persist', { schema: this.schema, attr: attr })
    },
    schemaAttributes (schema_id) {
      if (!schema_id) return [{ label: 'Please Select A Schema' }]
      let allSchemas = store.getters['schema/collection']
      let schema = _.find(allSchemas, { _id: schema_id })
      if (!schema) return [{ label: 'Please Select A Schema' }]
      return schema.attributes
    }
  },
  computed: {
    allSchemas () {
      return store.getters['schema/collection']
    },
    selectedAttr () {
      return store.getters['schema/selectedAttribute']
    },
    sortableOptions () {
      return {
        draggable: '.draggable',
        animation: 150,
        fallbackTolerance: 100
      }
    },
    decorators: {
      get () {
        // TODO - this should be moved into Vuex store
        this.schema.decorators = _.orderBy(this.schema.decorators, ['order'], ['asc'])
        return this.schema.decorators
      },
      set (value) {
        _.each(value, (s, i) => { s.order = i })
      }
    }
  }
}
</script>

<style lang="sass">
  .form-group
    label
      margin-bottom: 0
    small
      margin-bottom: .6rem
</style>
