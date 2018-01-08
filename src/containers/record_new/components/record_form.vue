
<template>
<div class="row">
  <div class="col-lg-12">

    <div class="form-group" v-for="attr in schema.attributes" :key="attr._id">
      <label>
        {{ attr.label }}
        <span class='text-danger' v-if="attr.required">*</span>
      </label>
      <small class="form-text text-muted">{{attr.help}}</small>
      <input type="text" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'TEXT'">
      <input type="date" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'DATE'">
      <input type="checkbox" class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'BOOL'">
      <input type="number" class="form-control" :placeholder="attr.label" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'NUMBER'">
      <select class="form-control" v-model="record.attributes[attr.identifier]" v-if="attr.datatype === 'SCHEMA'">
        <option v-for="rec in schemaDropdown(attr.datatypeOptions.schema_id)" :key="rec._id" :value="rec._id">{{ rec.attributes[attr.datatypeOptions.schema_attribute_identifier] }}</option>
      </select>
    </div>

  </div>

  <div class="col-lg-12 text-right">
    <a class="btn btn-outline-light mr-2" :href="'#/schemas/' + schema._id">
      <i class="fa fa-fw fa-times mr-1"></i>
      Cancel
    </a>

    <button class="btn btn-outline-success" @click="createRecord" v-if="schema._id">
      <i class="fa fa-fw fa-plus mr-1"></i>
      Update {{ schema.label }}
    </button>

    <button class="btn btn-outline-success" @click="createRecord" v-if="!schema._id">
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

export default {
  props: ['schema', 'record'],
  methods: {
    createRecord () {
      store.commit('record/persist', { schema: this.schema, record: this.record })
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


