
<template>
  <div class="container">
    <h2>New Schema</h2>
    <!-- <h2 v-if="!selectedAttr">New Schema</h2> -->
    <!-- <h2 v-if="selectedAttr">New Attribute</h2> -->
    <hr>
    <div class="row">
      <div class="col-lg-12">


        <div class="card card-body bg-dark text-light border-light">

          <!-- Attribute Form -->
          <div class="row" v-if="selectedAttr">
            <div class="col-lg-12">

              <div class="form-group">
                <label>
                  Label
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The human-readable name for this attribute. Example: 'Last Name'</small>
                <input type="text" class="form-control" placeholder="Label" v-model="selectedAttr.label" >
              </div>

              <div class="form-group">
                <label>
                  Identifier
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The lowercase-only version of the identifier with spaces instead of underscores. Example: 'last_name'</small>
                <input type="text" class="form-control" placeholder="Identifier" v-model="selectedAttr.identifier" >
              </div>

              <div class="form-group">
                <label>
                  Help Text
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The text provided to an end-user to aid in their understanding of this attribute (this text here).</small>
                <input type="text" class="form-control" placeholder="Help" v-model="selectedAttr.help" >
              </div>

              <!-- TODO - scope under 'validations' -->
              <div class="form-group">
                <label>
                  Required
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">Whether or not to enforce unique values for this attribute.</small>
                <input type="checkbox" class="form-control" v-model="selectedAttr.required" >
              </div>

              <!-- TODO - scope under 'validations' -->
              <div class="form-group">
                <label>Unique</label>
                <small class="form-text text-muted">Whether or not this attribute is required.</small>
                <input type="checkbox" class="form-control" v-model="selectedAttr.unique" >
              </div>

              <!-- <div class="form-group"> -->
                <!-- <label>Preferred Display Attribute</label> -->
                <!-- <small class="form-text text-muted">This attribute will be the user-facing label when entities belonging to this schema are referenced in a relation.</small> -->
                <!-- <input type="checkbox" class="form-control" v-model="selectedAttr.preferred" > -->
              <!-- </div> -->

              <div class="form-group">
                <label>DataType</label>
                <small class="form-text text-muted">The type of data represented by this attribute.</small>
                <select class="form-control" placeholder="Datatype" v-model="selectedAttr.datatype" >
                  <option value='TEXT'>Text</option>
                  <option value='DATE'>Date</option>
                  <option value='BOOL'>Checkbox</option>
                  <option value='NUMBER'>Number</option>
                  <option value='SCHEMA'>Schema</option>
                </select>
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'SCHEMA'">
                <label>Related Schema</label>
                <small class="form-text text-muted">The Schema to which this attribute represents a relation.</small>
                <select class="form-control" v-model="selectedAttr.datatypeOptions.schema_id" >
                  <option v-for="s in allSchemas" :key="s._id" :value="s._id">{{s.label}}</option>
                </select>
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'SCHEMA'">
                <label>Related Schema Key</label>
                <small class="form-text text-muted">The name of the attribute on the related schema that is stored in this schema as a means of linking the two.</small>
                <select class="form-control" v-model="selectedAttr.datatypeOptions.schema_attribute_identifier" >
                  <option v-for="a in schemaAttributes(selectedAttr.datatypeOptions.schema_id)" :key="a._id" :value="a.identifier">{{a.label}}</option>
                </select>
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'NUMBER'">
                <label>Default Value</label>
                <small class="form-text text-muted">The default value for this attribute when none is available.</small>
                <input type="number" class="form-control" placeholder="Default Value" v-model="selectedAttr.datatypeOptions.default" >
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'TEXT'">
                <label>Default Value</label>
                <small class="form-text text-muted">The default value for this attribute when none is available.</small>
                <input type="text" class="form-control" placeholder="Default Value" v-model="selectedAttr.datatypeOptions.default" >
              </div>

<!--               <div class="form-group" v-if="selectedAttr.datatype === 'NUMBER'">
                <label>Minimum Value</label>
                <input type="number" class="form-control" placeholder="Minimum value" v-model="selectedAttr.datatypeOptions.min" >
                <small class="form-text text-muted">The minimum value allowed for this attribute.</small>
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'NUMBER'">
                <label>Maximum Value</label>
                <input type="number" class="form-control" placeholder="Maximum value" v-model="selectedAttr.datatypeOptions.max" >
                <small class="form-text text-muted">The maximum value allowed for this attribute.</small>
              </div>

              <div class="form-group" v-if="selectedAttr.datatype === 'NUMBER'">
                <label>Step Size</label>
                <input type="number" class="form-control" placeholder="Maximum value" v-model="selectedAttr.datatypeOptions.step" >
                <small class="form-text text-muted">The size of numerical step allowed for end-user input (i.e. count by 10s)</small>
              </div> -->

            </div>
          </div>

          <!-- Schema Form -->
          <div class="row" v-if="!selectedAttr">
            <div class="col-lg-12">

              <div class="form-group">
                <label>
                  Label
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The human-readable name for a single entity of this schema. Example: 'Odd Job'</small>
                <input type="text" class="form-control" placeholder="Label" v-model="schema.label" >
              </div>

              <div class="form-group">
                <label>
                  Plural Label
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The plural version of the Label attribute. Example: 'Odd Jobs'</small>
                <input type="text" class="form-control" placeholder="Plural Label" v-model="schema.label_plural" >
              </div>

              <div class="form-group">
                <label>
                  Identifier
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The lowercase-only version of the identifier with spaces instead of underscores. Example: 'odd_jobs'</small>
                <input type="text" class="form-control" placeholder="Identifier" v-model="schema.identifier" >
              </div>

              <div class="form-group">
                <label>
                  Plural Identifier
                  <span class='text-danger'>*</span>
                </label>
                <small class="form-text text-muted">The plural version Identifier attribute. Example: 'odd_jobs'</small>
                <input type="text" class="form-control" placeholder="Plural Identifier" v-model="schema.plural_identifier" >
              </div>

            </div>
          </div>

          <div class="row" v-if="!selectedAttr">
            <div class="col-lg-12">

              <p class="lead mb-0">Attributes</p>
              <small class="mb-2 form-text text-muted">Defines the attributes that can be assigned to an entity of this schema.</small>
              <draggable class='list-group' v-model='attributes' :options="sortableOptions">
                <AttributeItem v-for="each in attributes" :item="each" :key="each._id" :remove="removeAttribute" :edit="editAttribute" />
                <li class="px-2 py-4 text-center list-group-item list-group-item-info" @click="addAttribute()" v-if="!attributes.length">
                  <i class="fa fa-fw fa-plus mr-2"></i>
                  <br>
                  Click to add your first Attribute.
                </li>
              </draggable>

              <!-- Attribute Editor Controls -->
              <div class="btn-group w-100 mt-3" v-if="!selectedAttr && attributes.length">
                <button class="btn btn-light w-100" @click="addAttribute()">
                  <i class="fa fa-fw fa-plus mr-2"></i>
                  Add Attribute
                </button>
              </div>

            </div>
          </div>

          <div class="row mt-2" v-if="!selectedAttr">
            <div class="col-lg-12">
              <hr>
            </div>
          </div>

          <div class="row mt-2">
            <div class="col-lg-12">

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

              <button class="btn btn-outline-success btn-block" @click="onSubmit()" v-if="!selectedAttr">
                <i class="fa fa-fw mr-1 fa-check"></i>
                Submit
              </button>

            </div>
          </div>

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
import AttributeItem from '../../schema_edit/components/workflow_item'

export default {
  props: ['schema'],
  components: {
    draggable,
    AttributeItem
  },
  data () {
    if (this.schema._id) {
      return { new: false }
    } else {
      return { new: true }
    }
  }
  methods: {
    onSubmit () {
      if (this.schema.label && this.schema.identifier) {
        store.commit('schema/create', { schema: this.schema })
      }
    },
    addAttribute () {
      store.commit('schema/addAttribute', { schema: this.schema })
    },
    removeAttribute (attr) {
      store.commit('schema/removeAttribute', { schema: this.schema, attr: attr })
    },
    editAttribute (attr) {
      store.commit('schema/selectAttribute', { attr })
    },
    clearSelected () {
      store.commit('schema/clearSelectedAttribute')
    },
    updateSelected (attr) {
      store.commit('schema/updateSelected', { schema: this.schema, attr: attr })
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
    attributes: {
      get () {
        // TODO - this should be moved into Vuex store
        // this.schema.attributes = _.orderBy(this.schema.attributes, ['order'], ['asc'])
        return this.schema.attributes
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
