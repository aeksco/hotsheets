
<template>
  <div class="container">
    <a :href="'/#/<%= resource_route %>/' + id">Back</a>
    <h2><%= resource_title %> Edit - {{model.name}}</h2>
    <hr>

    <form v-on:submit.prevent="formSubmit">
      <div class="form-group">
        <label name="<%= resource_name %>_label">Label</label>
        <input type="text" class="form-control" v-model="model.label" id="<%= resource_name %>_label" required>
      </div>

      <div class="form-group">
        <button class="btn btn-primary">Update</button>
      </div>
    </form>

  </div>
</template>

<!-- // // // //  -->

<script>
import store from '@/store'

export default {
  props: ['id'],
  created () {
    this.fetch()
  },
  methods: {
    fetch () {
      return store.dispatch('<%= resource_name %>/fetchModel', this.id)
    },
    formSubmit () {
      // TODO - validations
      return store.dispatch('<%= resource_name %>/update', this.model)
    }
  },
  computed: {
    model () {
      return store.getters['<%= resource_name %>/current']
    }
  }

}
</script>


