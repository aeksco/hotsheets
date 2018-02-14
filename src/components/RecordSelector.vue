
<template>
  <!-- <vue-good-table :columns="table.columns" :rows="table.rows" :paginate="true" :lineNumbers="true" /> -->

  <table class="table table-striped table-hover">
    <thead>
      <th v-for="attr in schema.attributes" :key="attr._id" v-if="attr.datatype !=='HAS_MANY' && attr.datatype !=='HAS_AND_BELONGS_TO_MANY' && attr.datatype !=='HAS_ONE' && attr.identifier !== ignoreAttribute">
        {{attr.label}}
        <i class="fa fa-fw fa-question-circle-o" v-b-tooltip.hover.bottom :title="attr.help" ></i>
      </th>
      <th></th>
    </thead>
    <tbody>

      <tr v-for="record in records" :key="record._id">

        <!-- Record Data -->
        <td v-for="attr in schema.attributes" :key="attr._id" v-if="attr.datatype !== 'HAS_MANY' && attr.datatype !== 'HAS_AND_BELONGS_TO_MANY' && attr.datatype !=='HAS_ONE' && attr.identifier !== ignoreAttribute">
          <a v-if="attr.datatype === 'BELONGS_TO'" :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])">
            {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }}
          </a>
          <!-- <a v-if="attr.datatype === 'HAS_ONE'" :href="getLinkedSchemaHref(attr, record.attributes[attr.identifier])"> -->
            <!-- {{ getLinkedSchemaLabel(attr, record.attributes[attr.identifier]) }} -->
          <!-- </a> -->
          <a v-else-if="attr.unique" :href=" '#/schemas/' + schema._id + '/records/' + record._id">
            {{ record.attributes[attr.identifier] }}
          </a>
          <span v-else-if="attr.datatype === 'BOOL'">
            <i class="fa fa-fw fa-check-square-o" v-if="record.attributes[attr.identifier]"></i>
            <i class="fa fa-fw fa-square-o" v-if="!record.attributes[attr.identifier]"></i>
          </span>
          <span v-else-if="attr.datatype === 'COLOR'">
            <i class="fa fa-fw fa-lg fa-square" :style="'color:' + record.attributes[attr.identifier]"></i>
          </span>
          <span v-else>
            {{record.attributes[attr.identifier] || attr.datatypeOptions.default }}
          </span>
        </td>

        <!-- Select -->
        <td class='text-right'>
          <input type="checkbox" v-model="checkboxes[record._id].checked" @click="updateValue()">
        </td>

      </tr>

    </tbody>
  </table>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'

export default {
  props: ['schema', 'records', 'ignoreAttribute', 'value'],
  data () {
    let allRecords = this.$store.getters['record/collection']
    let checkboxes = {}

    _.each(allRecords, (r) => {
      if (r.schema_id === this.schema._id) {
        checkboxes[r._id] = {
          id: r._id,
          checked: this.value.includes(r._id)
        }
      }
    })

    // console.log(checkboxes)
    return {
      checkboxes
    }
  },
  methods: {
    onConfirmDestroy (record) {
      return this.$store.commit('record/destroy', { record })
    },
    getLinkedSchemaHref (attr, record_id) {
      let allRecords = this.$store.getters['record/collection']
      let allSchemas = this.$store.getters['schema/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return
      let schema = _.find(allSchemas, { _id: record.schema_id })
      return '#/schemas/' + schema._id + '/records/' + record._id
    },
    getLinkedSchemaLabel (attr, record_id) {
      let allRecords = this.$store.getters['record/collection']
      let record = _.find(allRecords, { _id: record_id })
      if (!record) return

      let identifier = attr.datatypeOptions.schema_attribute_identifier
      return record.attributes[identifier]
    },
    updateValue () {
      console.log(this.checkboxes)
      let latestValue = _.chain(this.checkboxes)
        .reject((box) => {
          console.log(box.checked)
          return !box.checked
        })
        .map((box) => {
          console.log(box.id)
          return box.id
        })
        .value()

      console.log('Latest: ', latestValue)
      this.$emit('input', latestValue)
      // this.$emit('input', _.map(this.checkboxes, (r) => { return r.value }))
    }
  }
}
</script>
