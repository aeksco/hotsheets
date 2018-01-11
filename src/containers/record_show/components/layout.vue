
<template>
  <div class="container">

    <div class="row">
      <div class="col-lg-12">
        <div class="card card-body bg-dark color-light border-light">

          <div class="row">
            <div class="col-lg-8">
              <h2>{{schema.label}} Detail</h2>
            </div>
            <div class="col-lg-4 text-right">
              <a class="btn btn-outline-warning btn-sm" :href="'#/schemas/' + schema._id + '/records/' + record._id + '/edit'">
                <i class="fa fa-fw fa-pencil mr-1"></i>
                Edit
              </a>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <table class="table table-striped table-hover">
                <tbody>
                  <tr v-for="attr in schema.attributes" :key="attr._id" v-if="attr.datatype !== 'HAS_MANY'">
                    <td class='text-left'>
                      <strong>
                        {{attr.label}}
                      </strong>
                    </td>
                    <td>
                      <a v-if="attr.datatype === 'BELONGS_TO'" :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])">
                        {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }}
                      </a>
                      <span v-else-if="attr.datatype === 'BOOL'">
                        <i class="fa fa-fw fa-check-square-o" v-if="record.attributes[attr.identifier]"></i>
                        <i class="fa fa-fw fa-square-o" v-if="!record.attributes[attr.identifier]"></i>
                      </span>
                      <span v-else>{{record.attributes[attr.identifier]}}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row">
      <!-- Relation Viewer -->
      <div :class="'mt-4 col-lg-' + attr.col_span" v-for="attr in schema.attributes" :key="attr._id" v-if="attr.datatype === 'HAS_MANY'">
        <div class="card card-body bg-dark color-light border-light">
          <div class="row">
            <div class="col-lg-8">
              <p class="lead mb">{{ relatedSchemaName(attr) }}</p>
            </div>
            <div class="col-lg-4 text-right">
              <a class="btn btn-outline-success btn-sm" :href="'#/schemas/' + relatedSchema(attr)._id + '/records/new'">
                <i class="fa fa-fw fa-plus mr-1"></i>
                Add
              </a>
            </div>
          </div>

          <RecordTable :schema="relatedSchema(attr)" :records="getRelatedRecords(attr)" :ignoreAttribute="schema.identifier + '_id'"/>
        </div>
      </div>

    </div>

  </div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import RecordTable from '@/components/RecordTable'

export default {
  props: ['schema', 'record'],
  components: {
    RecordTable
  },
  methods: {
    getLinkedSchemaHref (attr, record_id) { // TODO - abstract to component
      let allRecords = store.getters['record/collection']
      let allSchemas = store.getters['schema/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return
      let schema = _.find(allSchemas, { _id: record.schema_id })
      return '#/schemas/' + schema._id + '/records/' + record._id
    },
    getLinkedSchemaLabel (attr, record_id) { // TODO - abstract to component
      let allRecords = store.getters['record/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return

      let identifier = attr.datatypeOptions.schema_attribute_identifier
      return record.attributes[identifier]
    },
    relatedSchema (attr) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let relatedSchema = _.find(allSchemas, { _id: attr.datatypeOptions.schema_id })
      return relatedSchema
    },
    relatedSchemaName (attr) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let relatedSchema = _.find(allSchemas, { _id: attr.datatypeOptions.schema_id })
      if (attr.datatype === 'HAS_MANY') {
        return relatedSchema.label_plural
      } else {
        return relatedSchema.label
      }
    },
    getRelatedRecords (attr) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let allRecords = store.getters['record/collection']
      let relatedSchema = _.find(allSchemas, { _id: attr.datatypeOptions.schema_id })

      // TODO - handle other attr types
      if (attr.datatype === 'HAS_MANY') {
        let relatedRecords = _.filter(allRecords, (r) => {
          return r.schema_id === relatedSchema._id && r.attributes[`${this.schema.identifier}_id`] === this.record._id
        })
        return relatedRecords
      }
    }
  }
}
</script>


