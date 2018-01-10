
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
                  <tr v-for="attr in schema.attributes" :key="attr._id">
                    <td class='text-left'>
                      <strong>
                        {{attr.label}}
                      </strong>
                    </td>
                    <td>
                      <a v-if="attr.datatype === 'SCHEMA'" :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])">
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

    <div class="row mt-4" v-for="rel in schema.relations" :key="rel._id" v-if="rel.type === 'HAS_MANY'">

      <!-- Relation Viewer -->
      <div class="col-lg-12">
        <div class="card card-body bg-dark color-light border-light">
          <div class="row">
            <div class="col-lg-8">
              <p class="lead mb">Related {{ relatedSchemaName(rel) }}</p>
            </div>
            <div class="col-lg-4 text-right">
              <a class="btn btn-outline-success btn-sm" :href="'#/schemas/' + relatedSchema(rel)._id + '/records/new'">
                <i class="fa fa-fw fa-plus mr-1"></i>
                New
              </a>
            </div>
          </div>

          <RecordTable :schema="relatedSchema(rel)" :records="getRelatedRecords(rel)"/>
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
    relatedSchema (relation) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let relatedSchema = _.find(allSchemas, { _id: relation.schema_id })
      return relatedSchema
    },
    relatedSchemaName (relation) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let relatedSchema = _.find(allSchemas, { _id: relation.schema_id })
      if (relation.type === 'HAS_MANY') {
        return relatedSchema.label_plural
      } else {
        return relatedSchema.label
      }
    },
    getRelatedRecords (relation) { // TODO - this should be moved into a getter
      let allSchemas = store.getters['schema/collection']
      let allRecords = store.getters['record/collection']
      let relatedSchema = _.find(allSchemas, { _id: relation.schema_id })

      // TODO - handle other relation types
      if (relation.type === 'HAS_MANY') {
        let relatedRecords = _.filter(allRecords, (r) => {
          return r.schema_id === relatedSchema._id && r.attributes[`${this.schema.identifier}_id`] === this.record._id
        })
        return relatedRecords
      }

      if (relation.type === 'BELONGS_TO') {
        let relatedRecords = _.filter(allRecords, (r) => {
          // return r.schema_id === relatedSchema._id && r.attributes[_id] === this.record._id
          return r.schema_id === relatedSchema._id && this.record.attributes[`${relatedSchema.identifier}_id`] === r._id
        })
        return relatedRecords
      }
    }
  }
}
</script>


