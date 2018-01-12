
<template>
<div class="row">

  <div v-for="attr in schema.attributes" :key="attr._id" :class="getColspanCss(attr)" v-if="attr.datatype !== 'HAS_MANY' && attr.datatype !== 'HAS_ONE'">
    <div class="form-group">
      <label>
        {{ attr.label }}
        <span class='text-danger' v-if="attr.required">*</span>
      </label>
      <small class="form-text text-muted">{{attr.help}}</small>
      <input type="text" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TEXT'">
      <input type="date" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'DATE'">
      <input type="time" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TIME'">
      <input type="checkbox" class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'BOOL'">
      <input type="number" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'NUMBER'">
      <masked-input type="tel" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" mask="\+\1 (111) 111-1111" v-if="attr.datatype === 'PHONE_NUMBER'"/>
      <select class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'BELONGS_TO'">
        <option v-for="rec in schemaDropdown(attr.datatypeOptions.schema_id)" :key="rec._id" :value="rec._id">{{ rec.attributes[attr.datatypeOptions.schema_attribute_identifier] }}</option>
      </select>
      <select class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TEXT_SELECT' || attr.datatype === 'NUMBER_SELECT'">
        <option v-for="opt in attr.datatypeOptions.dropdownOptions" :key="opt" :value="opt">{{ opt }}</option>
      </select>
    </div>
  </div>

  <div class="col-lg-12 text-right">
    <button class="btn btn-outline-light mr-2" @click="cancelForm">
      <i class="fa fa-fw fa-times mr-1"></i>
      Cancel
    </button>

    <button class="btn btn-outline-success" @click="persistRecord(schema, record, relatedAttr)" v-if="record._id">
      <i class="fa fa-fw fa-plus mr-1"></i>
      Update {{ schema.label }}
    </button>

    <button class="btn btn-outline-success" @click="persistRecord(schema, record, relatedAttr)" v-if="!record._id">
      <i class="fa fa-fw fa-plus mr-1"></i>
      Create {{ schema.label }}
    </button>

  </div>
</div>
</template>

<!-- // // // //  -->

<script>
import _ from 'lodash'
import store from '@/store'
import MaskedInput from 'vue-masked-input'

export default {
  props: ['schema', 'record', 'relatedAttr', 'persistRecord', 'cancelForm'],
  components: {
    MaskedInput
  },
  methods: {
    getColspanCss (attr) {
      if (!attr.col_span) {
        return 'col-lg-12'
      } else {
        return `col-lg-${attr.col_span}`
      }
    },
    schemaDropdown (schema_id) {
      let allRecords = store.getters['record/collection']
      let dropdownRecords = _.filter(allRecords, (r) => { return r.schema_id === schema_id })
      return dropdownRecords
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


