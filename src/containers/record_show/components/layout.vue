
<template>
  <div class="container">

    <div class="row">
      <div class="col-lg-12">
        <div class="card card-body bg-dark color-light border-light">

          <div class="row">
            <div class="col-lg-12">
              <h2>{{schema.label}} Detail</h2>
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
                    <td>{{record.attributes[attr.identifier]}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="row mt-4" v-for="rel in schema.relations" :key="rel._id">

      <!-- Relation Viewer -->
      <div class="col-lg-12">
        <div class="card card-body bg-dark color-light border-light">
          <p class="lead mb">Related {{ relatedSchemaName(rel) }}</p>
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


