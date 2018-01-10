
<template>
  <!-- <vue-good-table :columns="table.columns" :rows="table.rows" :paginate="true" :lineNumbers="true" /> -->

  <table class="table table-striped table-hover">
    <thead>
      <th v-for="attr in schema.attributes" v-bind:key="attr._id">
        {{attr.label}}
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom :title="attr.help" ></i>
      </th>
      <th></th>
    </thead>
    <tbody>

      <tr v-for="record in records" v-bind:key="record._id">

        <!-- Record Data -->
        <td v-for="attr in schema.attributes" v-bind:key="attr._id">
          <a v-if="attr.datatype === 'SCHEMA'" :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])">
            {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }}
          </a>
          <a v-else-if="attr.unique" :href=" '#/schemas/' + schema._id + '/records/' + record._id">
            {{ record.attributes[attr.identifier] }}
          </a>
          <span v-else-if="attr.datatype === 'BOOL'">
            <i class="fa fa-fw fa-check-square-o" v-if="record.attributes[attr.identifier]"></i>
            <i class="fa fa-fw fa-square-o" v-if="!record.attributes[attr.identifier]"></i>
          </span>
          <span v-else>
            {{record.attributes[attr.identifier] || attr.datatypeOptions.default }}
          </span>
        </td>

        <!-- Record Controls -->
        <td class='text-right'>

          <!-- Edit Record -->
          <a class="btn btn-sm btn-outline-warning" :href=" '#/schemas/' + schema._id + '/records/' + record._id + '/edit' ">
            <i class="fa fa-fw fa-pencil"></i>
          </a>

          <!-- Destroy Record Confirmation -->
          <button class="btn btn-sm btn-outline-danger" v-b-modal="'modal_' + record._id">
            <i class="fa fa-fw fa-trash"></i>
          </button>

          <!-- Bootstrap Modal Component -->
          <!-- TODO - move this outside the scope of the loop, and instead pass only the options into a single instance -->
          <b-modal :id="'modal_' + record._id"
            :title="'Destroy ' + schema.label + '?'"
            @ok="onConfirmDestroy(record)"
            header-bg-variant="dark"
            header-text-variant="light"
            body-bg-variant="dark"
            body-text-variant="light"
            footer-bg-variant="danger"
            footer-text-variant="light"
            ok-variant='danger'
            ok-title='DESTROY'
            cancel-title='Cancel'
            cancel-variant='dark'
          >
            <p class="text-left">Are you sure you want to destroy this {{ schema.label }}?</p>
          </b-modal>

        </td>

      </tr>

      <tr v-if="!records.length">
        <td v-for="attr, i in schema.attributes">
          <span v-if="i === 0">
            <span class="text-warning mr-2">No records found.</span>
            <span class="">Click</span>
            <a :href=" '#/schemas/' + schema._id + '/records/new' "> here </a>
            to create {{ schema.label_plural.toLowerCase() }}.
          </span>
        </td>
      </tr>

    </tbody>
  </table>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'

export default {
  props: ['schema', 'records'],
  methods: {
    onConfirmDestroy (record) {
      return store.commit('record/destroy', { record })
    },
    getLinkedSchemaHref (attr, record_id) {
      let allRecords = store.getters['record/collection']
      let allSchemas = store.getters['schema/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return
      let schema = _.find(allSchemas, { _id: record.schema_id })
      return '#/schemas/' + schema._id + '/records/' + record._id
    },
    getLinkedSchemaLabel (attr, record_id) {
      let allRecords = store.getters['record/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return

      let identifier = attr.datatypeOptions.schema_attribute_identifier
      return record.attributes[identifier]
    }
  },
  computed: {
    table () {
      let table = []

      // Builds Headers
      table.columns = _.map(this.schema.attributes, (attr) => {
        return {
          label: attr.label,
          field: attr.identifier,
          type: attr.datatype.toLowerCase()
        }
      })

      // Builds Rows
      table.rows = _.map(this.records, (r) => {
        return r.attributes
      })

      return table
    }
  }
}
</script>

