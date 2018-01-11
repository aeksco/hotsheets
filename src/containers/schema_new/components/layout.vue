
<template>
  <div class="container-fluid">
    <h2 v-if="!schema._id">New Schema</h2>
    <h2 v-if="schema._id">Edit Schema</h2>
    <hr>
    <div class="row">
      <div class="col-lg-6">
        <div class="card card-body bg-dark text-light border-light">

          <!-- Schema Form -->
          <!-- <div class="row" v-if="!selectedAttr"> -->
          <div class="row">
            <div class="col-lg-12">

              <p class="lead mb-0">Schema Properties</p>
              <small class="mb-2 form-text text-muted">Defines the core properties that are used to create a valid schema.</small>

              <hr>

              <div class="form-group">
                <label>
                  Label
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">Example: 'Odd Job'<br>The human-readable name for a single entity of this schema.</small>
                <input type="text" class="form-control" placeholder="Label" v-model="schema.label" >
              </div>

              <div class="form-group">
                <label>
                  Plural Label
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">Example: 'Odd Jobs'<br>The plural version of the Label attribute.</small>
                <input type="text" class="form-control" placeholder="Plural Label" v-model="schema.label_plural" >
              </div>

              <div class="form-group">
                <label>
                  Identifier
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">Example: 'odd_job'<br>The lowercase-only version of the identifier with spaces instead of underscores.</small>
                <input type="text" class="form-control" placeholder="Identifier" v-model="schema.identifier" >
              </div>

              <div class="form-group">
                <label>
                  Plural Identifier
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">Example: 'odd_jobs'<br>The plural version Identifier attribute.</small>
                <input type="text" class="form-control" placeholder="Plural Identifier" v-model="schema.plural_identifier" >
              </div>

            </div>
          </div>

          <hr>

          <div class="row mt-2">
            <div class="col-lg-12">
              <button class="btn btn-outline-success btn-block" @click="onSubmit()">
                <i class="fa fa-fw mr-1 fa-check"></i>
                Submit
              </button>

            </div>
          </div>

        </div>
      </div>

      <div class="col-lg-6">
        <AttributeForm :schema="schema"/>
      </div>
    </div>
  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'
import draggable from 'vuedraggable'
import AttributeItem from '../../schema_edit/components/workflow_item'
import AttributeForm from './AttributeForm'

export default {
  props: ['schema'],
  components: {
    draggable,
    AttributeItem,
    AttributeForm
  },
  beforeMount () {
    store.commit('schema/clearSelectedAttribute')
  },
  methods: {
    onSubmit () {
      if (this.schema.label && this.schema.identifier && this.schema.label_plural) {
        store.commit('schema/persist', { schema: this.schema })
      }
    },
    clearSelected () {
      store.commit('schema/clearSelectedAttribute')
    }
  },
  computed: {
    selectedAttr () {
      return store.getters['schema/selectedAttribute']
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
